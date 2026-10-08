import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/impressum',
    title: locale === 'de' ? 'Impressum | Deploris' : 'Imprint | Deploris',
    description: locale === 'de' ? 'Anbieterkennzeichnung gemäß § 5 TMG.' : 'Provider identification per § 5 TMG.',
    noIndex: false,
  });
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';

  return (
    <section className="container py-14">
      <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {de ? 'Impressum' : 'Imprint'}
      </h1>
      <div className="prose prose-brand mt-6 max-w-3xl dark:prose-invert">
        <h2>{de ? 'Angaben gemäß § 5 TMG' : 'Provider identification per § 5 TMG'}</h2>
        <p>
          <strong>{site.legalName}</strong>
          <br />
          {site.contact.address.street}
          <br />
          {site.contact.address.locality}, {site.contact.address.region} {site.contact.address.postalCode}
          <br />
          {site.contact.address.country}
        </p>
        <p>
          {de ? 'Kontakt: ' : 'Contact: '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          {' · '}
          <a href={`tel:${site.contact.phoneRaw}`}>{site.contact.phone}</a>
        </p>

        <h2>
          {de
            ? 'Vertretungsberechtigte(r) / Geschäftsführer'
            : 'Authorized representative / managing member'}
        </h2>
        <p>{site.managingMember}</p>

        <h2>{de ? 'Rechtsform und Registrierung' : 'Legal form and registration'}</h2>
        <p>
          {site.jurisdiction}
          <br />
          {de ? 'Dokumentnummer' : 'Document number'}: {site.documentNumber}
        </p>

        <h2>{de ? 'Steuernummer (EIN)' : 'Federal EIN'}</h2>
        <p>{site.ein}</p>

        <h2>
          {de ? 'Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV' : 'Editorially responsible per § 55(2) RStV'}
        </h2>
        <p>
          {site.managingMember}, {site.contact.address.street}, {site.contact.address.locality}, {site.contact.address.region} {site.contact.address.postalCode}
        </p>

        <h2>{de ? 'Streitschlichtung' : 'Consumer dispute resolution'}</h2>
        <p>
          {de
            ? 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: '
            : 'The European Commission provides a platform for online dispute resolution (ODR): '}
          <a href="https://ec.europa.eu/consumers/odr/" rel="noopener noreferrer" target="_blank">
            https://ec.europa.eu/consumers/odr/
          </a>
          .{' '}
          {de
            ? 'Wir sind nicht bereit und nicht verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.'
            : 'We are neither willing nor obliged to participate in dispute-resolution proceedings before a consumer arbitration board.'}
        </p>
      </div>
    </section>
  );
}
