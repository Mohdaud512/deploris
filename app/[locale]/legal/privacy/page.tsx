import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/privacy',
    title: locale === 'de' ? 'Datenschutzerklärung | Deploris' : 'Privacy notice | Deploris',
    description:
      locale === 'de'
        ? 'Wie wir personenbezogene Daten erheben, verarbeiten und schützen gemäß DSGVO.'
        : 'How we collect, process, and protect personal data GDPR-compliant.',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  return (
    <section className="container py-14">
      <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {de ? 'Datenschutzerklärung' : 'Privacy notice'}
      </h1>
      <div className="prose prose-brand mt-6 max-w-3xl dark:prose-invert">
        <p>
          {de
            ? 'Diese Datenschutzerklärung erläutert, welche personenbezogenen Daten wir erheben, wenn Sie unsere Website nutzen oder mit uns Kontakt aufnehmen, und wie wir diese verarbeiten. Wir orientieren uns an der DSGVO.'
            : 'This notice explains what personal data we collect when you use our website or contact us, and how we process it. We follow the GDPR standard.'}
        </p>

        <h2>{de ? 'Verantwortlicher' : 'Data controller'}</h2>
        <p>
          {site.legalName}, {site.contact.address.street}, {site.contact.address.locality}, {site.contact.address.region} {site.contact.address.postalCode}, {site.contact.address.country}.{' '}
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>

        <h2>{de ? 'Zwecke und Rechtsgrundlagen' : 'Purposes and legal bases'}</h2>
        <ul>
          <li>{de ? 'Kontaktformular: Anfrageabwicklung, Art. 6 Abs. 1 lit. b/f DSGVO.' : 'Contact form: to handle your enquiry Art. 6(1)(b)/(f) GDPR.'}</li>
          <li>{de ? 'Angebotsanfrage: Vertragsanbahnung, Art. 6 Abs. 1 lit. b DSGVO.' : 'Quote request: contract initiation Art. 6(1)(b) GDPR.'}</li>
          <li>{de ? 'Newsletter: Einwilligung mit Double-Opt-In, Art. 6 Abs. 1 lit. a DSGVO.' : 'Newsletter: consent with double opt-in Art. 6(1)(a) GDPR.'}</li>
          <li>{de ? 'Analytik: Einwilligung, Art. 6 Abs. 1 lit. a DSGVO.' : 'Analytics: consent Art. 6(1)(a) GDPR.'}</li>
          <li>{de ? 'Sicherheit / Serverlogs: berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO.' : 'Security / server logs: legitimate interest Art. 6(1)(f) GDPR.'}</li>
        </ul>

        <h2>{de ? 'Empfänger und Auftragsverarbeiter' : 'Recipients and processors'}</h2>
        <p>{de ? 'Wir setzen sorgfältig ausgewählte Auftragsverarbeiter ein, u. a.:' : 'We use carefully selected processors, including:'}</p>
        <ul>
          <li>Vercel Inc. {de ? 'Hosting (Frankfurt/EU-Region konfiguriert).' : 'hosting (Frankfurt/EU region configured).'}</li>
          <li>Resend {de ? 'transaktionale E-Mails.' : 'transactional email.'}</li>
          <li>hCaptcha {de ? 'Spam-Schutz.' : 'anti-spam.'}</li>
          <li>Upstash {de ? 'Rate-Limiting (EU-Region).' : 'rate limiting (EU region).'}</li>
          <li>{de ? 'Optional: Plausible, Google Analytics 4, Microsoft Clarity nach Einwilligung.' : 'Optional: Plausible, Google Analytics 4, Microsoft Clarity after consent.'}</li>
          <li>{de ? 'Optional: xAI (Grok) für die KI-Chat-Funktion, sobald aktiviert.' : 'Optional: xAI (Grok) for the AI chat feature once enabled.'}</li>
        </ul>

        <h2>{de ? 'Speicherdauer' : 'Retention'}</h2>
        <p>
          {de
            ? 'Kontakt- und Angebotsanfragen werden bis zum Abschluss der Kommunikation und darüber hinaus für die gesetzlichen Aufbewahrungsfristen gespeichert. Newsletter-Daten bis zum Widerruf. Analytik nur mit aktiver Einwilligung.'
            : 'Contact and quote data is kept until the conversation ends plus the statutory retention window. Newsletter data until you unsubscribe. Analytics only while consent is active.'}
        </p>

        <h2>{de ? 'Ihre Rechte' : 'Your rights'}</h2>
        <p>
          {de
            ? 'Sie haben ein Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Zur Ausübung nutzen Sie bitte '
            : 'You have the right to access (Art. 15), rectification (Art. 16), erasure (Art. 17), restriction (Art. 18), portability (Art. 20), and objection (Art. 21). To exercise these rights, use '}
          <a href={`${prefix}/legal/data-request`}>
            {de ? 'unser Datenauskunfts-Formular' : 'our data-request form'}
          </a>
          .
        </p>

        <h2>{de ? 'Beschwerderecht' : 'Right to complain'}</h2>
        <p>
          {de
            ? 'Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Mitgliedstaat Ihres Wohnsitzes, Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes.'
            : 'You have the right to lodge a complaint with a supervisory authority, in particular in the Member State of your residence, place of work, or place of the alleged infringement.'}
        </p>
      </div>
    </section>
  );
}
