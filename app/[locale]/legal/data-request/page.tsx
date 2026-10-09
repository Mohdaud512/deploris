import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { DataRequestForm } from '@/components/forms/DataRequestForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/data-request',
    title: locale === 'de' ? 'Datenauskunft und Löschung nach DSGVO' : 'Data request and erasure under GDPR',
    description: locale === 'de'
      ? 'Auskunft, Berichtigung, Löschung oder Datenübertragung Ihre DSGVO-Betroffenenrechte in wenigen Feldern direkt an das Deploris-Datenschutzteam einreichen.'
      : 'Access, rectification, erasure, or portability submit a GDPR data-subject request to the Deploris privacy team through a short structured form.',
    // Form page that submits PII; disallowed in robots.txt, also noindex at
    // meta level as defense-in-depth so other engines (not just Google) honor
    // it.
    noIndex: true,
  });
}

export default async function DataRequestPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';

  return (
    <section className="container py-14">
      <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {de ? 'Datenauskunft / Löschung' : 'Data request / erasure'}
      </h1>
      <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
        {de
          ? 'Reichen Sie hier eine DSGVO-Anfrage ein. Wir antworten schriftlich innerhalb der gesetzlichen Fristen (in der Regel ein Monat).'
          : "Submit a GDPR request here. We respond in writing within the statutory window (typically one month)."}
      </p>
      <div className="mt-8 max-w-2xl">
        <DataRequestForm />
      </div>
    </section>
  );
}
