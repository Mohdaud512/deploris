import Link from 'next/link';
import { useLocale } from 'next-intl';

export default function NotFound() {
  // NOTE: in the App Router, `notFound()` from a locale segment renders
  // this UI. `useLocale` may not be available before the intl provider is
  // ready; we fall back to English if so.
  let locale = 'en';
  try {
    locale = useLocale();
  } catch {
    /* SSR fallback */
  }
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const de = locale === 'de';
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {de ? 'Diese Seite existiert nicht.' : 'That page could not be found.'}
      </h1>
      <p className="mt-3 max-w-md text-brand-900/85 dark:text-white/85">
        {de
          ? 'Der Link ist womöglich veraltet oder eingetippt. Zurück zur Startseite oder direkt zu den Leistungen.'
          : 'The link may be stale or mistyped. Head back home or straight to services.'}
      </p>
      <div className="mt-6 flex gap-3">
        <Link href={prefix || '/'} className="rounded-full bg-brand-900 px-4 py-2 text-white hover:bg-brand-800">
          {de ? 'Startseite' : 'Home'}
        </Link>
        <Link
          href={`${prefix}/services/hardware`}
          className="rounded-full border border-brand-900/20 px-4 py-2 text-brand-900 dark:border-white/20 dark:text-white"
        >
          {de ? 'Leistungen' : 'Services'}
        </Link>
      </div>
    </section>
  );
}
