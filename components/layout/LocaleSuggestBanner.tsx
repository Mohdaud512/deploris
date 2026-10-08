'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const DISMISS_KEY = 'ks-locale-banner-dismissed';

export function LocaleSuggestBanner() {
  const t = useTranslations('locale_banner');
  const locale = useLocale();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (locale !== 'en') return;
    if (typeof window === 'undefined') return;
    try {
      if (localStorage.getItem(DISMISS_KEY) === '1') return;
    } catch {
      /* storage blocked silently no-op */
    }
    const prefers = (navigator.language || '').toLowerCase();
    if (prefers.startsWith('de')) setVisible(true);
  }, [locale]);

  if (!visible) return null;

  const dePath = `/de${pathname === '/' ? '' : pathname}`;

  function dismiss() {
    try {
      localStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      className="border-b border-brand-900/10 bg-brand-50 text-brand-900"
    >
      <div className="container flex flex-col items-center justify-between gap-2 py-2 text-sm sm:flex-row">
        <p>{t('message')}</p>
        <div className="flex items-center gap-2">
          <Link
            href={dePath}
            className="rounded bg-brand-900 px-3 py-1 text-white hover:bg-brand-800"
            onClick={dismiss}
          >
            {t('switch')}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="rounded px-3 py-1 text-brand-900 hover:bg-brand-100"
          >
            {t('dismiss')}
          </button>
        </div>
      </div>
    </div>
  );
}
