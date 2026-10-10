'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import type { Locale } from '@/config/locales';

/**
 * Site-wide motion on/off toggle. Writes a `data-motion="off"` attribute on
 * the root element and persists the choice to localStorage. CSS in
 * app/globals.css respects the attribute by pausing SMIL + CSS animations
 * and transitions. Pattern lifted from Nearform's homepage.
 *
 * This complements prefers-reduced-motion (which the system sets via OS):
 * the explicit toggle lets a viewer override the OS setting in either
 * direction without touching their system preferences.
 */
export function MotionToggle() {
  const locale = useLocale() as Locale;
  const de = locale === 'de';
  const [motionOff, setMotionOff] = useState<boolean | null>(null);

  // Hydrate from storage or OS preference on mount.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('deploris-motion');
    } catch {
      /* private mode / blocked site data */
    }
    if (saved === 'off' || saved === 'on') {
      setMotionOff(saved === 'off');
    } else {
      const prefers = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setMotionOff(prefers);
    }
  }, []);

  // Reflect state to the DOM and storage.
  useEffect(() => {
    if (motionOff === null) return;
    const root = document.documentElement;
    if (motionOff) root.setAttribute('data-motion', 'off');
    else root.removeAttribute('data-motion');
    try {
      localStorage.setItem('deploris-motion', motionOff ? 'off' : 'on');
    } catch {
      /* ignore */
    }
  }, [motionOff]);

  const label = de ? 'Animationen' : 'Animations';
  const stateOn = de ? 'an' : 'on';
  const stateOff = de ? 'aus' : 'off';
  const aria = motionOff ? (de ? 'Animationen einschalten' : 'Turn animations on') : (de ? 'Animationen ausschalten' : 'Turn animations off');

  return (
    <button
      type="button"
      aria-pressed={motionOff === false}
      aria-label={aria}
      onClick={() => setMotionOff((v) => (v === null ? true : !v))}
      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 hover:text-white"
    >
      <span aria-hidden className={`inline-flex h-2 w-2 rounded-full ${motionOff === false ? 'bg-accent-400' : 'bg-white/40'}`} />
      <span>{label}</span>
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.08em] text-white/60">
        {motionOff === null ? '…' : motionOff ? stateOff : stateOn}
      </span>
    </button>
  );
}
