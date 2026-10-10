import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { CrmTco } from '@/components/tools/CrmTco';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/tools/crm-tco',
    title: locale === 'de'
      ? 'CRM-TCO-Rechner HubSpot und Salesforce vs. individuelles CRM über drei Jahre'
      : 'CRM three-year TCO estimator HubSpot and Salesforce vs. custom',
    description: locale === 'de'
      ? 'Vergleichen Sie Lizenz, Setup, Admin-Overhead und individuelle Integrationen über drei Jahre: HubSpot oder Salesforce gegen ein individuelles Deploris-CRM. Keine Formel versteckt.'
      : 'Compare licence, setup, admin overhead, and custom integrations across three years: HubSpot or Salesforce versus a custom Deploris CRM. No formula hidden.',
  });
}

export default async function CrmTcoPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  return (
    <>
      <section className="container pt-12 md:pt-16">
        <nav aria-label="Breadcrumb" className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-brand-900/60 dark:text-white/60">
          <Link href={`${prefix}/tools`} className="hover:underline">
            {de ? 'Werkzeuge' : 'Utilities'}
          </Link>
          <span className="mx-2 opacity-60">/</span>
          <span>CRM TCO</span>
        </nav>
        <div className="mt-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">
            {de ? 'Was kostet Ihr CRM über drei Jahre wirklich?' : 'What does your CRM actually cost over three years?'}
          </h1>
          <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">
            {de
              ? 'Lizenzen sind nur ein Teil der Rechnung. Interner Konfigurationsaufwand, Spezial-Integrationen und Admin-Overhead verändern das Bild oft komplett. Setzen Sie Ihre Zahlen ein.'
              : 'Licence is only a slice of the bill. Internal configuration, custom integrations, and admin overhead often flip the picture entirely. Plug in your numbers.'}
          </p>
        </div>
      </section>
      <CrmTco locale={locale} />
    </>
  );
}
