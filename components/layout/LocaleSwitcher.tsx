'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales, localeLabels, localeFlags, type Locale } from '@/config/locales';

/**
 * Segmented EN / DE toggle in the site header.
 * Renders both languages side by side; the active one is highlighted with the
 * brand colour, the inactive one is a subtle chip on any background (light or dark).
 */
export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const active = useLocale() as Locale;

  function switchTo(next: Locale) {
    if (next === active) return;
    const segments = pathname.split('/').filter(Boolean);
    if (segments[0] && (locales as readonly string[]).includes(segments[0])) {
      segments.shift();
    }
    const rest = segments.join('/');
    const target = next === 'en' ? `/${rest}` : `/${next}${rest ? `/${rest}` : ''}`;
    router.push(target || '/');
  }

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center gap-1 rounded-full border border-brand-900/15 bg-brand-50/60 p-1 text-xs dark:border-white/15 dark:bg-white/5"
    >
      {locales.map((l) => {
        const isActive = active === l;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={isActive}
            title={localeLabels[l]}
            lang={l}
            className={
              isActive
                ? 'flex items-center gap-1 rounded-full bg-brand-900 px-3 py-1 font-semibold text-white shadow-sm'
                : 'flex items-center gap-1 rounded-full px-3 py-1 font-medium text-brand-900/85 hover:bg-brand-900/5 hover:text-brand-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
            }
          >
            <span aria-hidden>{localeFlags[l]}</span>
            <span>{l.toUpperCase()}</span>
            <span className="sr-only"> ({localeLabels[l]})</span>
          </button>
        );
      })}
    </div>
  );
}
