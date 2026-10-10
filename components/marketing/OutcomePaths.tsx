import Link from 'next/link';
import type { Locale } from '@/config/locales';

/**
 * Outcome-first entry row that sits above the services split. Mid-market
 * buyers scan for the outcome, not the SKU; this gives them four doors
 * that match the buying intent, plus a thinner role row for buying-committee
 * self-sorting below.
 */
export function OutcomePaths({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  const copy = de
    ? {
        eyebrow: 'Nach Ergebnis einsteigen',
        title: 'Was möchten Sie als Nächstes lösen?',
        outcomes: [
          {
            tag: 'CRM',
            title: 'Drei SaaS-Tools durch ein CRM ersetzen',
            desc: 'Individuelles CRM, das zum Vertriebsprozess passt statt umgekehrt. Erste Nutzer:innen produktiv ab Woche 4–6.',
            href: `${prefix}/services/development/crm-entwicklung`,
          },
          {
            tag: 'RAG',
            title: 'Produktives RAG-System in 8 Wochen ausliefern',
            desc: 'Wissensbasis, abgesichertes Retrieval, auditierbare Antworten mit Quellen in Ihrer EU-Region, auf Ihrem Modell.',
            href: `${prefix}/services/development/rag-systeme`,
          },
          {
            tag: '24/7',
            title: 'Infrastruktur unter Vertrag am Laufen halten',
            desc: 'Monitoring, Patching, Rufbereitschaft 24/7 unter schriftlicher SLA. P1-Erst-Reaktion 15 Minuten median.',
            href: `${prefix}/services/hardware/infrastruktur-support`,
          },
          {
            tag: 'Audit',
            title: 'Bestehende KI-Piloten bewerten',
            desc: 'Kostenloses Self-Assessment: 10 Fragen, individueller Report, welcher nächste Schritt sich wirklich lohnt.',
            href: `${prefix}/ai-opportunity-finder`,
          },
        ],
        rolesLabel: 'Oder nach Rolle:',
        roles: [
          { label: 'CTO', href: `${prefix}/services` },
          { label: 'Head of IT', href: `${prefix}/services/hardware` },
          { label: 'COO', href: `${prefix}/industries` },
          { label: 'CFO', href: `${prefix}/quote` },
        ],
      }
    : {
        eyebrow: 'Enter by outcome',
        title: 'What do you want to solve next?',
        outcomes: [
          {
            tag: 'CRM',
            title: 'Replace three SaaS tools with one custom CRM',
            desc: 'A CRM that fits your sales process instead of the other way around. First users live in week 4–6.',
            href: `${prefix}/services/development/custom-crm`,
          },
          {
            tag: 'RAG',
            title: 'Ship a production RAG system in 8 weeks',
            desc: 'Grounded retrieval, auditable answers with sources, running in your EU region on your choice of model.',
            href: `${prefix}/services/development/rag-systems`,
          },
          {
            tag: '24/7',
            title: 'Keep infrastructure running under contract',
            desc: 'Monitoring, patching, 24/7 on-call under a written SLA. P1 first-response, 15-minute median.',
            href: `${prefix}/services/hardware/infrastructure-support`,
          },
          {
            tag: 'Audit',
            title: 'Audit our existing AI pilots',
            desc: 'Free self-serve assessment: 10 questions, tailored report on what next step actually makes sense.',
            href: `${prefix}/ai-opportunity-finder`,
          },
        ],
        rolesLabel: 'Or by role:',
        roles: [
          { label: 'CTO', href: `${prefix}/services` },
          { label: 'Head of IT', href: `${prefix}/services/hardware` },
          { label: 'COO', href: `${prefix}/industries` },
          { label: 'CFO', href: `${prefix}/quote` },
        ],
      };

  return (
    <section className="border-b border-brand-900/10 bg-white py-14 md:py-16 dark:border-white/10 dark:bg-brand-950">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
              {copy.eyebrow}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
              {copy.title}
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {copy.outcomes.map((o) => (
            <Link
              key={o.tag}
              href={o.href}
              className="group relative flex min-h-[11.5rem] flex-col rounded-2xl border border-brand-900/10 bg-brand-50/60 p-5 transition-colors hover:border-accent-500/60 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:border-accent-400/60 dark:hover:bg-white/10"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-accent-500/40 bg-white px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent-600 dark:bg-brand-950 dark:text-accent-400">
                  {o.tag}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-sm text-brand-900/40 transition-transform group-hover:translate-x-0.5 dark:text-white/40"
                >
                  →
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold leading-snug text-brand-900 dark:text-white">
                {o.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-900/70 dark:text-white/70">{o.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/50">
            {copy.rolesLabel}
          </span>
          {copy.roles.map((r) => (
            <Link
              key={r.label}
              href={r.href}
              className="rounded-full border border-brand-900/15 bg-white px-3.5 py-1.5 text-sm font-medium text-brand-900 transition-colors hover:border-accent-500/60 hover:bg-accent-500/10 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-accent-400/60 dark:hover:bg-accent-400/10"
            >
              {r.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
