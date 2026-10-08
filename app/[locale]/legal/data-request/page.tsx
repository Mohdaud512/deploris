import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { DataRequestForm } from '@/components/forms/DataRequestForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/data-request',
    title: locale === 'de' ? 'Datenauskunft / Löschung | Deploris' : 'Data request / erasure | Deploris',
    description:
      locale === 'de'
        ? 'Auskunft, Berichtigung, Löschung, Datenübertragung reichen Sie eine DSGVO-Anfrage in wenigen Feldern ein.'
        : 'Access, rectification, erasure, portability submit a GDPR data request in a few fields.',
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
