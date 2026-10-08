'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

/**
 * Minimal in-house cookie banner that emits a `ks-consent` event and stores
 * granular preferences. In production this should be swapped for a certified
 * CMP (Usercentrics or Cookiebot) env vars are already wired in `.env.example`
 * and the `<ConsentGate>` listener will honor whichever emits the event.
 *
 * Deny-by-default: analytics + marketing OFF until the user opts in.
 */

const KEY = 'ks-consent-v1';

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

const denyAll: ConsentState = { necessary: true, analytics: false, marketing: false };

function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed !== 'object' || parsed === null) return null;
    return {
      necessary: true,
      analytics: !!parsed.analytics,
      marketing: !!parsed.marketing,
    };
  } catch {
    return null;
  }
}

function writeConsent(state: ConsentState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new CustomEvent<ConsentState>('ks-consent', { detail: state }));
}

export function CookieConsent() {
  const t = useTranslations('cookies');
  const [open, setOpen] = useState(false);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const existing = readConsent();
    if (!existing) {
      setOpen(true);
    } else {
      // Re-broadcast on mount so late-mounted analytics loaders pick it up.
      window.dispatchEvent(new CustomEvent<ConsentState>('ks-consent', { detail: existing }));
    }
    function onOpen() {
      const c = readConsent();
      setAnalytics(!!c?.analytics);
      setMarketing(!!c?.marketing);
      setManage(true);
      setOpen(true);
    }
    window.addEventListener('ks-open-cookies', onOpen);
    return () => window.removeEventListener('ks-open-cookies', onOpen);
  }, []);

  if (!open) return null;

  function acceptAll() {
    writeConsent({ necessary: true, analytics: true, marketing: true });
    setOpen(false);
  }
  function rejectAll() {
    writeConsent(denyAll);
    setOpen(false);
  }
  function save() {
    writeConsent({ necessary: true, analytics, marketing });
    setOpen(false);
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-brand-900/10 bg-white shadow-2xl dark:border-white/10 dark:bg-surface-dark"
    >
      <div className="container flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2 id="cookie-title" className="text-sm font-semibold text-brand-900 dark:text-white">
            {t('title')}
          </h2>
          <p className="mt-1 text-sm text-brand-900/80 dark:text-white/80">{t('body')}</p>
          {manage && (
            <div className="mt-3 grid gap-2 text-sm">
              <label className="flex items-center gap-2 opacity-60">
                <input type="checkbox" checked readOnly aria-label={t('categories.necessary')} />
                <span>{t('categories.necessary')}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  aria-label={t('categories.analytics')}
                />
                <span>{t('categories.analytics')}</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  aria-label={t('categories.marketing')}
                />
                <span>{t('categories.marketing')}</span>
              </label>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {!manage && (
            <button
              type="button"
              onClick={() => setManage(true)}
              className="rounded border border-brand-900/20 px-3 py-2 text-sm text-brand-900 hover:bg-brand-50 dark:border-white/20 dark:text-white"
            >
              {t('manage')}
            </button>
          )}
          <button
            type="button"
            onClick={rejectAll}
            className="rounded border border-brand-900/20 px-3 py-2 text-sm text-brand-900 hover:bg-brand-50 dark:border-white/20 dark:text-white"
          >
            {t('reject_all')}
          </button>
          {manage ? (
            <button
              type="button"
              onClick={save}
              className="rounded bg-brand-900 px-3 py-2 text-sm text-white hover:bg-brand-800"
            >
              {t('save')}
            </button>
          ) : (
            <button
              type="button"
              onClick={acceptAll}
              className="rounded bg-brand-900 px-3 py-2 text-sm text-white hover:bg-brand-800"
            >
              {t('accept_all')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent('ks-open-cookies'));
}
