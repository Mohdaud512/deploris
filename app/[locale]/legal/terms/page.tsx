import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/terms',
    title: locale === 'de' ? 'AGB | Deploris' : 'Terms of service | Deploris',
    description:
      locale === 'de'
        ? 'Allgemeine Geschäftsbedingungen für die Nutzung dieser Website und der über sie angebotenen Leistungen.'
        : 'Terms governing use of this website and the services offered through it.',
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
