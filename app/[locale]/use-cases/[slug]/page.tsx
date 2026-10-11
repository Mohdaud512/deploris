import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { useCases, findUseCaseBySlug } from '@/config/use-cases';
import { findService } from '@/config/services';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import {
  breadcrumbSchema,
  faqSchema,
  serviceSchema,
  howToSchema,
  webPageWithSpeakable,
} from '@/lib/schema';
import { FAQGroup } from '@/components/marketing/FAQGroup';
import { CTASection } from '@/components/marketing/CTASection';
import { site } from '@/config/site';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    useCases.map((u) => ({ locale, slug: u.copy[locale as Locale].slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const uc = findUseCaseBySlug(locale, slug);
  if (!uc) return {};
  const c = uc.copy[locale];
  return buildMetadata({
    locale,
    path: `/use-cases/${slug}`,
    pathByLocale: {
      en: `/use-cases/${uc.copy.en.slug}`,
      de: `/use-cases/${uc.copy.de.slug}`,
    },
    title: c.metaTitle,
    description: c.metaDescription,
    type: 'article',
  });
}

export default async function UseCaseLandingPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const uc = findUseCaseBySlug(locale, slug);
  if (!uc) notFound();
  setRequestLocale(locale);
  const c = uc.copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const pageUrl = `${site.url}${prefix}/use-cases/${slug}`;

  // Underlying service for the "related" link + Service JSON-LD reuse.
  const svc = findService(uc.serviceId);
  const svcHref = svc ? `${prefix}/services/${svc.line}/${svc.copy[locale].slug}` : null;

  return (
    <>
      {/* HERO */}
      <section className="container pt-14 pb-10">
        <nav aria-label="Breadcrumb" className="text-xs text-brand-900/80 dark:text-white/60">
          <Link href={prefix || '/'} className="hover:underline">
            {locale === 'de' ? 'Start' : 'Home'}
          </Link>{' '}
          /{' '}
          <Link href={`${prefix}/use-cases`} className="hover:underline">
            {locale === 'de' ? 'Anwendungsfälle' : 'Use cases'}
          </Link>{' '}
          / <span>{c.eyebrow}</span>
        </nav>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
          {c.eyebrow}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {c.h1}
        </h1>
        {/* Direct one-sentence AEO/GEO answer, high in the DOM so answer
            engines (Perplexity, Google AI Overviews, Gemini, ChatGPT) quote
            it. Also wrapped in `article` so the speakable selector finds it. */}
        <article>
          <p className="mt-5 max-w-3xl text-lg font-medium text-brand-900 dark:text-white">
            {c.tldr}
          </p>
          <p className="mt-4 max-w-3xl text-brand-900/85 dark:text-white/85">{c.deck}</p>
        </article>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`${prefix}/quote`}
            className="rounded-full bg-brand-900 px-5 py-3 font-medium text-white hover:bg-brand-800 dark:bg-accent-500 dark:text-brand-950 dark:hover:bg-accent-400"
          >
            {c.cta.primary}
          </Link>
          <Link
            href={`${prefix}/demos`}
            className="rounded-full border border-brand-900/20 px-5 py-3 font-medium text-brand-900 hover:bg-brand-900/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
          >
            {c.cta.secondary}
          </Link>
        </div>
      </section>

      {/* AT A GLANCE — fact tiles for scannability + AEO extraction */}
      <section
        aria-label={locale === 'de' ? 'Auf einen Blick' : 'At a glance'}
        className="container pb-10"
      >
        <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.atAGlance.map((f) => (
            <div
              key={f.label}
              className="rounded-xl border border-brand-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
            >
              <dt className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
                {f.label}
              </dt>
              <dd className="mt-1.5 font-display text-base font-semibold text-brand-900 dark:text-white">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* PROBLEM */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {c.problem.title}
        </h2>
        <p className="mt-4 max-w-3xl text-brand-900/85 dark:text-white/85">{c.problem.body}</p>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {c.problem.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 rounded-xl border border-brand-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5"
            >
              <span className="mt-1 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-accent-500" aria-hidden />
              <span className="text-brand-900/85 dark:text-white/85">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* HOW IT WORKS — numbered steps, powers HowTo JSON-LD */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {c.howItWorks.title}
        </h2>
        <p className="mt-3 max-w-3xl text-brand-900/85 dark:text-white/85">{c.howItWorks.intro}</p>
        <ol className="mt-6 grid gap-4 md:grid-cols-2">
          {c.howItWorks.steps.map((s, i) => (
            <li
              key={s.step}
              className="rounded-2xl border border-brand-900/10 bg-white p-5 dark:border-white/10 dark:bg-white/5"
            >
              <div className="flex items-baseline gap-3">
                <span
                  aria-hidden
                  className="font-mono text-sm text-accent-600 tabular-nums dark:text-accent-400"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
                  {s.step}
                </h3>
              </div>
              <p className="mt-2 text-brand-900/85 dark:text-white/85">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* BUYER CHECKLIST */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {c.checklist.title}
        </h2>
        <p className="mt-3 max-w-3xl text-brand-900/85 dark:text-white/85">{c.checklist.intro}</p>
        <ul className="mt-6 grid gap-2 md:grid-cols-2">
          {c.checklist.items.map((it) => (
            <li
              key={it}
              className="flex items-start gap-3 rounded-lg border border-brand-900/10 bg-white px-4 py-3 dark:border-white/10 dark:bg-white/5"
            >
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="mt-1 h-4 w-4 flex-shrink-0 text-accent-600 dark:text-accent-400"
              >
                <path
                  d="M3 8.2l2.1 2.1L11 6.4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-brand-900/85 dark:text-white/85">{it}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SCENARIO */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {c.scenario.title}
        </h2>
        <p className="mt-4 max-w-3xl text-brand-900/85 dark:text-white/85">{c.scenario.body}</p>
      </section>

      {/* PRICING POSTURE */}
      <section className="container py-10">
        <div className="rounded-2xl border border-accent-500/40 bg-accent-500/5 p-6 dark:border-accent-400/40 dark:bg-accent-400/10 md:p-8">
          <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
            {c.pricingPosture.title}
          </h2>
          <p className="mt-3 max-w-3xl text-brand-900/85 dark:text-white/85">{c.pricingPosture.body}</p>
        </div>
      </section>

      {/* COMPARISON — structured table LLMs can reproduce verbatim */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {c.comparison.title}
        </h2>
        <p className="mt-3 max-w-3xl text-brand-900/85 dark:text-white/85">{c.comparison.intro}</p>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse rounded-xl border border-brand-900/10 bg-white text-sm dark:border-white/10 dark:bg-white/5">
            <thead>
              <tr className="border-b border-brand-900/10 bg-brand-50/60 text-left dark:border-white/10 dark:bg-white/5">
                <th className="w-1/3 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-900/70 dark:text-white/70">
                  {locale === 'de' ? 'Option' : 'Option'}
                </th>
                <th className="w-1/3 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-900/70 dark:text-white/70">
                  {locale === 'de' ? 'Wofür es gut ist' : 'What it is good at'}
                </th>
                <th className="w-1/3 px-4 py-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-brand-900/70 dark:text-white/70">
                  {locale === 'de' ? 'Lücken' : 'Gaps'}
                </th>
              </tr>
            </thead>
            <tbody>
              {c.comparison.rows.map((r, i) => {
                const isDeploris = i === c.comparison.rows.length - 1;
                return (
                  <tr
                    key={r.contender}
                    className={`border-b border-brand-900/5 last:border-b-0 dark:border-white/5 ${
                      isDeploris ? 'bg-accent-500/10 dark:bg-accent-400/10' : ''
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-4 py-4 text-left align-top font-semibold text-brand-900 dark:text-white"
                    >
                      {r.contender}
                    </th>
                    <td className="px-4 py-4 align-top text-brand-900/85 dark:text-white/85">{r.wins}</td>
                    <td className="px-4 py-4 align-top text-brand-900/85 dark:text-white/85">{r.gaps}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-10">
        <FAQGroup
          title={locale === 'de' ? 'Häufige Fragen' : 'Common questions'}
          items={c.faq}
          idPrefix={`uc-${uc.id}-faq`}
        />
      </section>

      {/* RELATED READING */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {c.related.title}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {c.related.items.map((r) => (
            <Link
              key={r.href}
              href={`${prefix}${r.href}`}
              className="group rounded-2xl border border-brand-900/10 bg-white p-5 transition hover:border-accent-500/60 hover:bg-brand-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <h3 className="font-display text-lg font-semibold text-brand-900 group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-300">
                {r.label} →
              </h3>
              <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{r.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection
        title={locale === 'de' ? 'Nur ein Scope, kein Verkaufsgespräch.' : 'Just a scope, not a sales pitch.'}
        body={
          locale === 'de'
            ? 'Innerhalb eines Werktags erhalten Sie eine schriftliche Leistungsbeschreibung mit Preisspanne, Zeitplan und Lieferergebnissen pro Phase.'
            : 'Within one business day you get a written scope with a defensible price band, a timeline, and the specific deliverables for each phase.'
        }
        primaryHref={`${prefix}/quote`}
        primaryLabel={c.cta.primary}
        secondaryHref={`${prefix}/contact`}
        secondaryLabel={c.cta.secondary}
      />

      {/* JSON-LD: speakable WebPage + Breadcrumb + Service (reused) + HowTo + FAQPage */}
      <SchemaJsonLd
        data={[
          webPageWithSpeakable({
            locale,
            path: `/use-cases/${slug}`,
            title: c.metaTitle,
            description: c.metaDescription,
            cssSelectors: ['h1', 'article p:first-of-type'],
          }),
          breadcrumbSchema([
            { name: locale === 'de' ? 'Start' : 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Anwendungsfälle' : 'Use cases', href: `${prefix}/use-cases` },
            { name: c.eyebrow, href: `${prefix}/use-cases/${slug}` },
          ]),
          // Reuse the Service schema from the underlying capability so this
          // page shows up in Google's Service rich result with the same
          // offers, provider, and areaServed as the service page itself.
          ...(svc ? [serviceSchema(svc.id, locale)!] : []),
          howToSchema({
            locale,
            name: c.howItWorks.title,
            description: c.howItWorks.intro,
            steps: c.howItWorks.steps.map((s) => ({ name: s.step, text: s.body })),
          }),
          faqSchema(c.faq, { pageUrl }),
        ]}
      />

      {/* Pin the related-service pointer at the end for crawlers, visible as
          a thin cross-link row so humans see it too. */}
      {svcHref && svc && (
        <section className="container pb-12">
          <p className="text-sm text-brand-900/70 dark:text-white/70">
            {locale === 'de' ? 'Zugrunde liegende Leistung: ' : 'Underlying service: '}
            <Link href={svcHref} className="font-medium text-accent-700 underline-offset-4 hover:underline dark:text-accent-300">
              {svc.copy[locale].title}
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
