'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Three-state theme selector: Light / System / Dark.
 *
 * - "System" clears the saved preference so the next load (and any OS
 *   theme change while this page is open) tracks `prefers-color-scheme`.
 * - "Light" and "Dark" write a saved preference to localStorage and
 *   immediately set `data-theme` + `color-scheme` on <html>.
 *
 * The initial render matches whatever the pre-paint bootstrap script in
 * app/[locale]/layout.tsx already applied, so there is no flash.
 * `aria-pressed` reflects the user's intent (light / system / dark), not
 * the resolved effective theme — which matches how a user reasons about
 * their own choice ("I set this to System").
 */
type ThemeMode = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'deploris-theme';

function osPref(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function readSavedMode(): ThemeMode {
  if (typeof window === 'undefined') return 'system';
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === 'light' || s === 'dark') return s;
  } catch {
    /* localStorage blocked (private mode, etc.) */
  }
  return 'system';
}

function applyMode(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const effective = mode === 'system' ? osPref() : mode;
  const root = document.documentElement;
  root.setAttribute('data-theme', effective);
  root.style.colorScheme = effective;
}

export function ThemeToggle() {
  const t = useTranslations('theme');
  const [mode, setMode] = useState<ThemeMode>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMode(readSavedMode());
    setMounted(true);
  }, []);

  // When the mode is "system", keep tracking OS theme changes live.
  useEffect(() => {
    if (!mounted || mode !== 'system') return;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => applyMode('system');
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [mode, mounted]);

  const choose = useCallback((next: ThemeMode) => {
    try {
      if (next === 'system') localStorage.removeItem(STORAGE_KEY);
      else localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage blocked; still apply for this session */
    }
    setMode(next);
    applyMode(next);
  }, []);

  // Render a stable placeholder on first paint so the SSR'd DOM matches
  // the first client render; swap in the real control once mounted and
  // we know the saved mode.
  if (!mounted) {
    return (
      <div
        aria-hidden
        className="inline-flex h-8 w-[6.5rem] items-center rounded-full border border-brand-900/15 bg-white/60 dark:border-white/15 dark:bg-white/5"
      />
    );
  }

  const options: { id: ThemeMode; label: string }[] = [
    { id: 'light', label: t('light') },
    { id: 'system', label: t('system') },
    { id: 'dark', label: t('dark') },
  ];

  return (
    <div
      role="group"
      aria-label={t('group_label')}
      className="inline-flex items-center rounded-full border border-brand-900/15 bg-white/60 p-0.5 dark:border-white/15 dark:bg-white/5"
    >
      {options.map((o) => {
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => choose(o.id)}
            aria-pressed={active}
            aria-label={o.label}
            title={o.label}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition ${
              active
                ? 'bg-brand-900 text-white dark:bg-accent-500 dark:text-brand-950'
                : 'text-brand-900/60 hover:text-brand-900 dark:text-white/60 dark:hover:text-white'
            }`}
          >
            <Icon mode={o.id} />
          </button>
        );
      })}
    </div>
  );
}

function Icon({ mode }: { mode: ThemeMode }) {
  if (mode === 'light') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="10" cy="10" r="3.2" />
        <path d="M10 2v2M10 16v2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M2 10h2M16 10h2M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
      </svg>
    );
  }
  if (mode === 'dark') {
    return (
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 11.5A6.5 6.5 0 1 1 8.5 4a5 5 0 0 0 7.5 7.5Z" />
      </svg>
    );
  }
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2.5" y="3.5" width="15" height="11" rx="1.5" />
      <path d="M7 17.5h6M10 14.5v3" />
    </svg>
  );
}
