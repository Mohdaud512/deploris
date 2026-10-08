import Link from 'next/link';
import { useTranslations } from 'next-intl';
import type { Locale } from '@/config/locales';

export function DualServiceSplit({ locale }: { locale: Locale }) {
  const t = useTranslations('home');
  const servicesRoot = locale === 'en' ? '/services' : `/${locale}/services`;
  return (
    <section aria-labelledby="dual-title" className="container py-16">
      <h2 id="dual-title" className="sr-only">
        {locale === 'de' ? 'Unsere beiden Leistungsbereiche' : 'Our two service lines'}
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href={`${servicesRoot}/hardware`}
          className="group relative overflow-hidden rounded-2xl border border-brand-900/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-900">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M4 4h16v10H4zM6 18h12v2H6z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-semibold text-brand-900 dark:text-white">
            {t('split_hardware_title')}
          </h3>
          <p className="mt-2 text-brand-900/80 dark:text-white/80">{t('split_hardware_body')}</p>
          <span className="mt-4 inline-flex text-sm font-medium text-brand-700 group-hover:underline dark:text-accent-400">
            {locale === 'de' ? 'Zu den Leistungen →' : 'Explore services →'}
          </span>
        </Link>

        <Link
          href={`${servicesRoot}/development`}
          className="group relative overflow-hidden rounded-2xl border border-brand-900/10 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
        >
          <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent-500/20 text-accent-600">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M8 5l-6 7 6 7 1.5-1.5L4.8 12 9.5 6.5zM16 5l-1.5 1.5L19.2 12l-4.7 5.5L16 19l6-7z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-semibold text-brand-900 dark:text-white">
            {t('split_dev_title')}
          </h3>
          <p className="mt-2 text-brand-900/80 dark:text-white/80">{t('split_dev_body')}</p>
          <span className="mt-4 inline-flex text-sm font-medium text-brand-700 group-hover:underline dark:text-accent-400">
            {locale === 'de' ? 'Zu den Leistungen →' : 'Explore services →'}
          </span>
        </Link>
      </div>
    </section>
  );
}
