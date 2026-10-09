import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { developmentServices, findServiceBySlug } from '@/config/services';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { FAQGroup } from '@/components/marketing/FAQGroup';
import { CTASection } from '@/components/marketing/CTASection';
import { PricingBand } from '@/components/marketing/PricingBand';
import { ServiceAnimationBySlug } from '@/components/marketing/ServiceAnimationBySlug';
import { faqData } from '@/content/faq';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    developmentServices.map((s) => ({ locale, slug: s.copy[locale as Locale].slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = findServiceBySlug(locale, slug);
  if (!svc || svc.line !== 'development') return {};
  const c = svc.copy[locale];
  return buildMetadata({
    locale,
    path: `/services/development/${slug}`,
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

const pricingByService: Record<string, { name: string; range: string; scope: string }[]> = {
  'custom-crm': [
    { name: 'Focused', range: '$40–90k', scope: 'Replace one platform, 4–8 weeks to production.' },
    { name: 'Standard', range: '$90–200k', scope: 'Full internal CRM with integrations, 3–5 months.' },
    { name: 'Enterprise', range: '$200k+', scope: 'Multi-country rollout with migration and change management.' },
  ],
  'rag-systems': [
    { name: 'Pilot', range: '$20–50k', scope: 'Scoped RAG on one corpus, evaluated on real questions.' },
    { name: 'Production', range: '$60–160k', scope: 'End-to-end pipeline with access control and monitoring.' },
    { name: 'Continuous', range: '$5–15k / mo', scope: 'Ongoing eval + retraining + optimization.' },
  ],
  'ai-agents-automation': [
    { name: 'Scoped agent', range: '$25–70k', scope: 'One process, one agent, shadow-mode + cutover.' },
    { name: 'Program', range: '$100–250k', scope: 'Multiple processes with shared platform.' },
    { name: 'Managed', range: '$4–12k / mo', scope: 'Ongoing agent ops, guardrails, and improvements.' },
  ],
  'custom-systems': [
    { name: 'Focused', range: '$30–80k', scope: 'One internal tool or integration, 4–8 weeks.' },
    { name: 'Standard', range: '$80–200k', scope: 'Multi-integration system with security review.' },
    { name: 'Enterprise', range: '$200k+', scope: 'Platform work with staged rollout and hypercare.' },
  ],
};

export default async function DevelopmentServiceDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = findServiceBySlug(locale, slug);
  if (!svc || svc.line !== 'development') notFound();
  setRequestLocale(locale);
  const c = svc.copy[locale];
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const svcFaqSlug =
    svc.id === 'custom-crm' ? (locale === 'de' ? 'crm-entwicklung' : 'crm') :
    svc.id === 'rag-systems' ? (locale === 'de' ? 'rag-systeme' : 'rag') :
    svc.id === 'ai-agents-automation' ? (locale === 'de' ? 'ki-agenten' : 'automation') :
    null;
  const faqItems = svcFaqSlug ? faqData[locale].find((g) => g.slug === svcFaqSlug)?.items ?? [] : [];

  const tiers = pricingByService[svc.id] ?? [];

  return (
    <>
      <section className="container grid gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <nav aria-label="Breadcrumb" className="text-xs text-brand-900/80 dark:text-white/60">
            <a href={`${prefix}/services/development`} className="hover:underline">
              {locale === 'de' ? 'Softwareentwicklung' : 'Software Development'}
            </a>{' '}
            / <span>{c.title}</span>
          </nav>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
            {c.h1}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">{c.summary}</p>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
          <ServiceAnimationBySlug serviceId={svc.id} />
        </div>
      </section>

      <section className="container grid gap-8 pb-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
            {locale === 'de' ? 'Was es ist' : 'What it is'}
          </h2>
          <p className="mt-3 text-brand-900/85 dark:text-white/85">{c.whatItIs}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
            {locale === 'de' ? 'Für wen es passt' : "Who it's for"}
          </h2>
          <p className="mt-3 text-brand-900/85 dark:text-white/85">{c.whoItsFor}</p>
        </div>
      </section>

      <section className="container py-8">
        <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
          {locale === 'de' ? 'Ergebnisse' : 'Outcomes'}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {c.outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2 rounded-xl border border-brand-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-accent-500" aria-hidden />
              <span className="text-brand-900/85 dark:text-white/85">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <ProcessSteps steps={c.process} />

      {tiers.length > 0 && <PricingBand tiers={tiers} />}

      {faqItems.length > 0 && (
        <section className="container py-8">
          <FAQGroup
            title={locale === 'de' ? 'Häufige Fragen' : 'Common questions'}
            items={faqItems}
            idPrefix={`svc-${svc.id}-faq`}
          />
        </section>
      )}

      <CTASection
        title={locale === 'de' ? 'Nur ein Scope, kein Verkaufsgespräch.' : 'Just a scope, not a sales pitch.'}
        body={locale === 'de'
          ? 'Innerhalb eines Werktags erhalten Sie eine schriftliche Leistungsbeschreibung mit Preisspanne.'
          : 'Within one business day you get a written scope and price band nothing more.'}
        primaryHref={`${prefix}/quote`}
        primaryLabel={tCommon('cta_quote')}
        secondaryHref={`${prefix}/contact`}
        secondaryLabel={tCommon('cta_contact')}
      />

      <SchemaJsonLd
        data={[
          serviceSchema(svc.id, locale)!,
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Softwareentwicklung' : 'Software Development', href: `${prefix}/services/development` },
            { name: c.title, href: `${prefix}/services/development/${slug}` },
          ]),
          ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
        ]}
      />
    </>
  );
}
