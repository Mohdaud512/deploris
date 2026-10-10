import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/config/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/legal/whistleblower',
    title: locale === 'de'
      ? 'Hinweisgeberportal interne Meldungen nach HinSchG'
      : 'Whistleblower channel internal reporting under German HinSchG',
    description: locale === 'de'
      ? 'Vertrauliche interne Meldestelle für Compliance- und Rechtsverstöße bei Deploris. Umsetzung nach dem deutschen Hinweisgeberschutzgesetz (HinSchG).'
      : 'Confidential internal reporting channel for compliance and legal concerns at Deploris. Operated in line with the German Whistleblower Protection Act (HinSchG).',
  });
}

export default async function WhistleblowerPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';

  const WB_EMAIL = `hinweisgeber@${site.contact.email.split('@')[1] ?? 'deploris.com'}`;

  return (
    <section className="container py-14 md:py-16">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
          {de ? 'Hinweisgeberportal' : 'Whistleblower channel'}
        </h1>
        <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">
          {de
            ? 'Vertrauliche Meldestelle für Hinweise auf Rechts- oder Regelverstöße bei Deploris oder in Projekten, die wir betreuen. Betrieb nach den Vorgaben des Hinweisgeberschutzgesetzes (HinSchG).'
            : 'Confidential channel for reports on legal or compliance concerns at Deploris or in engagements we operate. Run in line with the German Whistleblower Protection Act (HinSchG).'}
        </p>

        <div className="prose prose-brand mt-10 max-w-none dark:prose-invert">
          <h2>{de ? 'Was Sie melden können' : 'What you can report'}</h2>
          <ul>
            <li>{de ? 'Verstöße gegen EU- oder deutsches Recht im Geschäftsbetrieb von Deploris' : 'Breaches of EU or German law in Deploris business operations'}</li>
            <li>{de ? 'Verstöße gegen Datenschutz, IT-Sicherheit, Arbeits- oder Steuerrecht' : 'Breaches of data protection, IT security, employment, or tax law'}</li>
            <li>{de ? 'Interessenskonflikte, Betrugs- oder Korruptionsverdacht' : 'Conflicts of interest, suspected fraud or corruption'}</li>
            <li>{de ? 'Diskriminierung, Belästigung oder andere Verstöße gegen unsere Verhaltensgrundsätze' : 'Discrimination, harassment, or breaches of our code of conduct'}</li>
          </ul>

          <h2>{de ? 'Wie Sie melden' : 'How to report'}</h2>
          <p>
            {de ? 'Per E-Mail an unsere interne Meldestelle:' : 'By email to our internal reporting mailbox:'}{' '}
            <strong className="font-mono">{WB_EMAIL}</strong>
          </p>
          <p>
            {de
              ? 'Die Meldung wird ausschließlich von der verantwortlichen Person bearbeitet. Sie können anonym melden; wenn Sie Kontaktdaten angeben, bestätigen wir den Eingang innerhalb von sieben Tagen und melden das Ergebnis spätestens drei Monate nach der Bestätigung zurück.'
              : 'Reports are handled solely by the designated case officer. You can report anonymously; if you provide contact details, we confirm receipt within seven days and report back on outcome within three months of that confirmation.'}
          </p>

          <h2>{de ? 'Schutz vor Repressalien' : 'Protection against retaliation'}</h2>
          <p>
            {de
              ? 'Für Meldungen in gutem Glauben nach den Voraussetzungen des HinSchG besteht gesetzlicher Schutz vor Benachteiligung, Kündigung, Mobbing und anderen Repressalien. Deploris verpflichtet sich, keine Repressalien gegen hinweisgebende Personen zu dulden.'
              : 'Reports made in good faith under the conditions of the German Whistleblower Protection Act are protected by law against retaliation (dismissal, mobbing, disadvantage). Deploris commits to zero tolerance for retaliation against anyone who files a report.'}
          </p>

          <h2>{de ? 'Externe Meldestellen' : 'External reporting bodies'}</h2>
          <p>
            {de
              ? 'Sie können jederzeit zusätzlich oder stattdessen die externe Meldestelle des Bundesamts für Justiz (BfJ) nutzen: '
              : 'You may always, additionally or instead, use the external reporting body operated by the German Federal Office of Justice (BfJ): '}
            <a href="https://www.bundesjustizamt.de/DE/MeldestelledesBundes/MeldestelledesBundes_node.html" rel="noopener noreferrer" target="_blank">
              bundesjustizamt.de
            </a>
            .
          </p>

          <h2>{de ? 'Datenschutz' : 'Privacy'}</h2>
          <p>
            {de
              ? 'Alle übermittelten personenbezogenen Daten werden ausschließlich zur Bearbeitung Ihrer Meldung verarbeitet und nach Abschluss gemäß HinSchG § 11 aufbewahrt. Details in unserer '
              : 'Any personal data submitted is processed solely for handling your report and retained after case closure per § 11 HinSchG. Full details in our '}
            <a href={de ? '/de/legal/privacy' : '/legal/privacy'}>{de ? 'Datenschutzerklärung' : 'privacy notice'}</a>.
          </p>
        </div>
      </div>
    </section>
  );
}
