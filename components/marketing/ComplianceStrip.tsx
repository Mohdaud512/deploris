import type { Locale } from '@/config/locales';

/**
 * One-line compliance commitment band. Pattern lifted from MaibornWolff
 * ("DSGVO, EU AI Act, ISO 27001, Architektur, nicht Add-on") but trimmed to
 * claims Deploris can defend today: DSGVO-konformer Betrieb, EU-Region
 * Hosting, Auftragsverarbeitungsvertrag auf Anfrage, EU AI Act aligned by
 * design. No cert claims without an actual certificate.
 *
 * Shows on DE pages prominently (Mittelstand procurement checklist signal);
 * EN version shows softer language because US buyers don't weight it the
 * same way.
 */
export function ComplianceStrip({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  const items = de
    ? [
        'DSGVO-konformer Betrieb',
        'EU-Region Hosting (Frankfurt)',
        'AV-Vertrag auf Anfrage',
        'EU AI Act aligned by design',
      ]
    : [
        'GDPR-compliant',
        'EU-region hosting (Frankfurt)',
        'DPA on request',
        'EU AI Act aligned by design',
      ];

  const lede = de
    ? 'Datenschutz, Souveränität, Sorgfalt, ab dem ersten Commit, nicht als Add-on.'
    : 'Privacy, sovereignty, due diligence, from the first commit, not bolted on.';

  const linkText = de ? 'Compliance & Datenschutz ansehen' : 'Review compliance & privacy';

  return (
    <section
      aria-label={de ? 'Compliance und Datenschutz' : 'Compliance and privacy'}
      className="border-y border-brand-900/10 bg-brand-50 py-3 text-brand-900 dark:border-white/10 dark:bg-brand-950 dark:text-white"
    >
      <div className="container flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
          {de ? 'Vertrauen' : 'Trust'}
        </span>
        <span className="text-brand-900/80 dark:text-white/80">{lede}</span>
        <ul className="order-last flex w-full flex-wrap items-center gap-x-4 gap-y-1 md:order-none md:ml-auto md:w-auto">
          {items.map((it) => (
            <li key={it} className="flex items-center gap-1.5 text-brand-900/90 dark:text-white/85">
              <CheckDot />
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <a
          href={`${prefix}/legal/privacy`}
          className="font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent-600 underline-offset-4 hover:underline dark:text-accent-400"
        >
          {linkText} →
        </a>
      </div>
    </section>
  );
}

function CheckDot() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-3.5 w-3.5 flex-shrink-0 text-accent-600 dark:text-accent-400"
    >
      <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" strokeWidth="1.25" opacity="0.5" />
      <path d="M5 8.2l2.1 2.1L11 6.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
