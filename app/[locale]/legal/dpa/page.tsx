import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/dpa',
    title: locale === 'de' ? 'AVV / Auftragsverarbeitung | Deploris' : 'Data Processing Agreement | Deploris',
    description:
      locale === 'de'
        ? 'Auftragsverarbeitungsvertrag nach Art. 28 DSGVO Muster und Anfrageweg.'
        : 'Data Processing Agreement per Art. 28 GDPR template and how to request it.',
  });
}

export default async function DpaPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  return (
    <section className="container py-14">
      <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {de ? 'Auftragsverarbeitung (AVV) / DPA' : 'Data Processing Agreement (DPA)'}
      </h1>
      <div className="prose prose-brand mt-6 max-w-3xl dark:prose-invert">
        <p>
          {de
            ? 'Für Kunden im EWR bieten wir einen Auftragsverarbeitungsvertrag nach Art. 28 DSGVO an. Für US-Kunden stellen wir eine Standard-DPA bereit.'
            : 'For EEA clients we provide an Auftragsverarbeitungsvertrag under Art. 28 GDPR. For US clients we provide a standard DPA.'}
        </p>
        <p>
          {de ? 'Fordern Sie das Dokument per E-Mail an ' : 'Request the document by email at '}
          <a href={`mailto:${site.contact.email}?subject=DPA%20request`}>{site.contact.email}</a>
          {de ? ' oder ' : ' or via '}
          <a href={`${prefix}/contact`}>{de ? 'über unser Kontaktformular' : 'our contact form'}</a>
          .
        </p>
        <p data-placeholder="dpa-template">
          {de
            ? 'Platzhalter Volltext der AVV wird nach juristischer Prüfung eingesetzt.'
            : 'Placeholder full DPA text will be inserted after legal review.'}
        </p>
      </div>
    </section>
  );
}
