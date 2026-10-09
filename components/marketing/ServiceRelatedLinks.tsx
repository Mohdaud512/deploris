import Link from 'next/link';
import type { Locale } from '@/config/locales';

/**
 * "Related reading" strip for service detail pages. Cross-links to the
 * relevant compare, glossary, and blog pages so each service page carries
 * real contextual outbound links and the entity graph is properly bound.
 *
 * The relatedness map is deliberately explicit (not inferred from tags) so
 * we don't accidentally link orphan or thin pages. If a service has no
 * curated related content it simply doesn't render.
 */

type RelatedBlock = { label: string; href: string };
type RelatedMap = Record<string, { compare?: RelatedBlock[]; glossary?: RelatedBlock[]; blog?: RelatedBlock[] }>;

const en: RelatedMap = {
  'custom-crm': {
    compare: [{ label: 'Custom CRM vs. off-the-shelf', href: '/compare/custom-crm-vs-off-the-shelf' }],
    glossary: [{ label: 'CRM', href: '/glossary/crm' }],
    blog: [{ label: 'When a custom CRM finally beats the off-the-shelf option', href: '/blog/custom-crm-vs-off-the-shelf' }],
  },
  'rag-systems': {
    compare: [{ label: 'RAG vs. traditional search', href: '/compare/rag-vs-traditional-search' }],
    glossary: [
      { label: 'RAG', href: '/glossary/rag' },
      { label: 'AI agent', href: '/glossary/ai-agent' },
    ],
    blog: [{ label: 'What is RAG, and why it matters for business AI', href: '/blog/what-is-rag-and-why-it-matters' }],
  },
  'ai-agents-automation': {
    compare: [{ label: 'AI agents vs. automation', href: '/compare/ai-agents-vs-automation' }],
    glossary: [
      { label: 'AI agent', href: '/glossary/ai-agent' },
      { label: 'Workflow automation', href: '/glossary/automation' },
    ],
    blog: [{ label: 'AI agents in real operations what actually ships', href: '/blog/ai-agents-in-real-operations' }],
  },
  'custom-systems': {
    glossary: [{ label: 'SLA', href: '/glossary/sla' }],
  },
  'infrastructure-support': {
    glossary: [{ label: 'SLA', href: '/glossary/sla' }],
    blog: [{ label: 'The quarterly data-center hygiene checklist we run for clients', href: '/blog/data-center-maintenance-checklist' }],
  },
  'network-support': {
    glossary: [{ label: 'SLA', href: '/glossary/sla' }],
  },
  'rollout-migrations': {
    glossary: [{ label: 'IMAC', href: '/glossary/imac' }],
  },
  'desktop-support': {
    glossary: [{ label: 'SLA', href: '/glossary/sla' }],
  },
  'imac-projects': {
    glossary: [{ label: 'IMAC', href: '/glossary/imac' }],
  },
  'hardware-break-fix': {
    glossary: [
      { label: 'Break-fix', href: '/glossary/break-fix' },
      { label: 'SLA', href: '/glossary/sla' },
    ],
  },
  'wifi-surveys': {
    glossary: [{ label: 'WiFi survey', href: '/glossary/wifi-survey' }],
    blog: [{ label: 'A practical guide to WiFi surveys that actually predict real-world coverage', href: '/blog/wifi-survey-guide' }],
  },
  'data-center-maintenance': {
    glossary: [{ label: 'SLA', href: '/glossary/sla' }],
    blog: [{ label: 'The quarterly data-center hygiene checklist we run for clients', href: '/blog/data-center-maintenance-checklist' }],
  },
};

export function ServiceRelatedLinks({ serviceId, locale }: { serviceId: string; locale: Locale }) {
  const entry = en[serviceId];
  if (!entry) return null;
  const anyLinks = (entry.compare?.length ?? 0) + (entry.glossary?.length ?? 0) + (entry.blog?.length ?? 0);
  if (anyLinks === 0) return null;

  const prefix = locale === 'en' ? '' : `/${locale}`;
  const t = {
    en: { title: 'Related reading', compare: 'Compare', glossary: 'Glossary', blog: 'From the blog' },
    de: { title: 'Weiterführende Inhalte', compare: 'Vergleich', glossary: 'Glossar', blog: 'Aus dem Blog' },
  }[locale];

  function Block({ label, items }: { label: string; items: RelatedBlock[] }) {
    return (
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-accent-400">
          {label}
        </h3>
        <ul className="mt-2 space-y-1">
          {items.map((i) => (
            <li key={i.href}>
              <Link
                href={`${prefix}${i.href}`}
                className="text-brand-900 underline underline-offset-2 hover:text-brand-700 dark:text-white dark:hover:text-accent-400"
              >
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="related-reading"
      className="container border-t border-brand-900/10 py-10 dark:border-white/10"
    >
      <h2 id="related-reading" className="font-display text-xl font-semibold text-brand-900 dark:text-white">
        {t.title}
      </h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {entry.compare?.length ? <Block label={t.compare} items={entry.compare} /> : null}
        {entry.glossary?.length ? <Block label={t.glossary} items={entry.glossary} /> : null}
        {entry.blog?.length ? <Block label={t.blog} items={entry.blog} /> : null}
      </div>
    </section>
  );
}
