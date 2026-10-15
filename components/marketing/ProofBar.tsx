import type { Locale } from '@/config/locales';

/**
 * Four-point proof bar below the hero. Each proof slot = one Deploris
 * commitment the engagement is written around. Copy is Deploris-native
 * (named engineers, scope in writing, client ownership, 15-min P1), the
 * same four claims already surfaced on every use-case pillar's at-a-glance
 * tiles and FAQ. Rendered on a light-purple ground that reads as a
 * horizontal rule between the hero and the rest of the page.
 */
type Proof = { heading: string; body: string };

const PROOFS: Record<Locale, [Proof, Proof, Proof, Proof]> = {
  en: [
    {
      heading: 'Named senior engineers',
      body: 'The person who writes your code is the person on your on-call escalation.',
    },
    {
      heading: 'Scope and timeline in writing',
      body: 'Written scope, defensible price band, deliverables per phase, inside one business day.',
    },
    {
      heading: 'You own everything',
      body: 'Your accounts, your repositories, your data, your audit trail. No Deploris black box.',
    },
    {
      heading: '15-minute P1 response',
      body: 'Priority-one tickets, median first-response, measured monthly against the written SLA.',
    },
  ],
  de: [
    {
      heading: 'Benannte Senior-Ingenieure',
      body: 'Die Person, die Ihren Code schreibt, ist die Person in Ihrer On-Call-Eskalation.',
    },
    {
      heading: 'Scope und Zeitplan schriftlich',
      body: 'Schriftlicher Scope, belastbare Preisspanne, Lieferergebnisse pro Phase, innerhalb eines Werktags.',
    },
    {
      heading: 'Alles gehört Ihnen',
      body: 'Ihre Accounts, Ihre Repositories, Ihre Daten, Ihr Audit-Trail. Keine Deploris-Blackbox.',
    },
    {
      heading: '15-Minuten P1-Erstreaktion',
      body: 'Priorität-1-Tickets, Median-Erstreaktion, monatlich gegen die schriftliche SLA gemessen.',
    },
  ],
};

export function ProofBar({ locale }: { locale: Locale }) {
  const items = PROOFS[locale];
  return (
    <section
      aria-label={locale === 'de' ? 'Was Sie von jedem Mandat erwarten können' : 'What every engagement commits to'}
      className="border-y border-brand-900/10 bg-brand-50 py-8 dark:border-white/10 dark:bg-brand-950/60"
    >
      <div className="container">
        <dl className="grid gap-6 md:grid-cols-4 md:gap-8">
          {items.map((p) => (
            <div key={p.heading} className="min-w-0">
              <dt className="font-display text-base font-bold text-brand-900 underline decoration-accent-500 decoration-2 underline-offset-[6px] dark:text-white">
                {p.heading}
              </dt>
              <dd className="mt-3 text-sm leading-relaxed text-brand-900/75 dark:text-white/75">
                {p.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
