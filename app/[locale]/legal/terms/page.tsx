import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/terms',
    title: locale === 'de' ? 'Allgemeine Geschäftsbedingungen (AGB)' : 'Terms of service for Deploris engagements',
    description: locale === 'de'
      ? 'Allgemeine Geschäftsbedingungen von Deploris für Nutzung dieser Website sowie Beauftragung und Lieferung unserer Hardware- und Softwareleistungen.'
      : 'The terms that govern use of the Deploris website and the engagement and delivery of our hardware, infrastructure, and custom-software services.',
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';

  return (
    <section className="container py-14">
      <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {de ? 'Allgemeine Geschäftsbedingungen' : 'Terms of service'}
      </h1>
      <div
        role="note"
        className="mt-6 max-w-3xl rounded-xl border border-amber-500/40 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-200"
      >
        <strong>{de ? 'Hinweis: Platzhalter' : 'Notice: placeholder'}</strong>
        {' '}
        {de
          ? 'Dieser Text ist eine Vorab-Fassung. Die rechtsgeprüften AGB werden hier veröffentlicht, sobald sie freigegeben sind. Bis dahin gelten die Regelungen aus den individuellen Verträgen.'
          : 'This text is a draft. The legally reviewed terms will be published here once approved. Until then, the terms of the individual engagement letters and signed agreements take precedence.'}
      </div>
      <div className="prose prose-brand mt-6 max-w-3xl dark:prose-invert">
        <p data-placeholder="terms">
          {de
            ? 'Platzhalter die vollständige AGB-Fassung wird nach juristischer Prüfung eingesetzt. Bis dahin gelten die Regelungen aus den individuellen Auftragsbestätigungen und Verträgen von '
            : 'Placeholder the full terms of service will be inserted after legal review. Until then, the terms of the individual engagement letters and signed agreements from '}
          <strong>{site.legalName}</strong>
          {de ? ' Vorrang.' : ' take precedence.'}
        </p>
        <h2>{de ? 'Kontakt' : 'Contact'}</h2>
        <p>
          {site.legalName}
          <br />
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        </p>
      </div>
    </section>
  );
}
