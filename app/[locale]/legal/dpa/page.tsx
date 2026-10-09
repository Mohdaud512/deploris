import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/dpa',
    title: locale === 'de' ? 'Auftragsverarbeitung (AVV) nach Art. 28 DSGVO' : 'Data Processing Agreement (DPA) per GDPR Art. 28',
    description: locale === 'de'
      ? 'Auftragsverarbeitungsvertrag (AVV) nach Art. 28 DSGVO für EWR-Kunden und Standard-DPA für US-Kunden Muster, Umfang, Subunternehmer und Anfrageweg.'
      : 'Deploris Data Processing Agreement (DPA) for EEA clients per GDPR Article 28 and the standard DPA for US clients template, scope, subprocessors, and how to request it.',
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
      <div
        role="note"
        className="mt-6 max-w-3xl rounded-xl border border-amber-500/40 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200"
      >
        <strong>{de ? 'Hinweis: Platzhalter-Volltext' : 'Notice: placeholder full text'}</strong>
        {' '}
        {de
          ? 'Der juristisch geprüfte AVV-Volltext wird hier eingesetzt, sobald er freigegeben ist. Für konkrete Verhandlungen fordern Sie bitte die aktuelle Fassung per E-Mail an.'
          : 'The legally reviewed full DPA text will be inserted here once approved. For an actionable copy, please request the current draft by email.'}
      </div>
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
