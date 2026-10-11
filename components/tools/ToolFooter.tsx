import Link from 'next/link';
import type { Locale } from '@/config/locales';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema } from '@/lib/schema';

/**
 * Shared footer surface for every interactive tool (CRM TCO, RAG cost
 * model, AI vendor risk, AI Opportunity Finder, demos). Fixes two SEO
 * issues flagged by the live-site audit at once:
 *
 * 1. Internal link density on tool pages was 0–1 links in content; the
 *    "After you run this" block adds 2–4 descriptive-anchor links per page
 *    (paired service, quote, comparator, demos).
 * 2. BreadcrumbList schema wasn't being emitted on hub + tool + demos +
 *    finder routes; the schema here closes that gap and keeps SERP
 *    breadcrumbs consistent with the service-detail pages.
 */
export type ToolLink = { label: string; href: string };

export function ToolFooter({
  locale,
  breadcrumbTrail,
  nextSteps,
}: {
  locale: Locale;
  /** Breadcrumb trail from Home down to this page. The last entry's `href`
   *  is the current page (its `item` is dropped automatically). */
  breadcrumbTrail: ToolLink[];
  /** Links to render in the visible "Next steps" strip. Keep to 2–4. */
  nextSteps: ToolLink[];
}) {
  const de = locale === 'de';
  return (
    <section
      aria-labelledby="tool-next-steps"
      className="border-t border-brand-900/10 bg-brand-50/60 py-10 md:py-14 dark:border-white/10 dark:bg-brand-950/30"
    >
      <div className="container">
        <h2
          id="tool-next-steps"
          className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400"
        >
          {de ? 'Nächste Schritte' : 'Next steps'}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {nextSteps.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group flex items-start gap-3 rounded-xl border border-brand-900/10 bg-white p-4 transition-colors hover:border-accent-500/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-accent-400/60"
              >
                <span className="font-medium text-brand-900 dark:text-white">
                  {link.label}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-brand-900/40 transition-transform group-hover:translate-x-0.5 dark:text-white/40"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <SchemaJsonLd data={[breadcrumbSchema(breadcrumbTrail.map(({ label, href }) => ({ name: label, href })))]} />
    </section>
  );
}
