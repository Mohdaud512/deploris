import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { hardwareServices, findServiceBySlug } from '@/config/services';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, faqSchema, serviceSchema } from '@/lib/schema';
import { ProcessSteps } from '@/components/marketing/ProcessSteps';
import { FAQGroup } from '@/components/marketing/FAQGroup';
import { CTASection } from '@/components/marketing/CTASection';
import { site } from '@/config/site';
import { faqData } from '@/content/faq';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    hardwareServices.map((s) => ({ locale, slug: s.copy[locale as Locale].slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = findServiceBySlug(locale, slug);
  if (!svc || svc.line !== 'hardware') return {};
  const c = svc.copy[locale];
  return buildMetadata({
    locale,
    path: `/services/hardware/${slug}`,
    title: c.metaTitle,
    description: c.metaDescription,
  });
}

export default async function HardwareServiceDetail({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = findServiceBySlug(locale, slug);
  if (!svc || svc.line !== 'hardware') notFound();
  setRequestLocale(locale);
  const c = svc.copy[locale];
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  // Pick a hardware-oriented FAQ group if it exists in the locale's data.
  const hardwareGroup = faqData[locale].find((g) => g.slug === 'hardware' || g.slug === 'hardware');
  const faqItems = hardwareGroup?.items ?? [];

  return (
    <>
      <section className="container py-14">
        <nav aria-label="Breadcrumb" className="text-xs text-brand-900/80 dark:text-white/60">
          <a href={`${prefix}/services/hardware`} className="hover:underline">
            {locale === 'de' ? 'Hardware & Infrastruktur' : 'Hardware & Infrastructure'}
          </a>{' '}
          / <span>{c.title}</span>
        </nav>
        <h1 className="mt-3 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {c.h1}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">{c.summary}</p>
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
          {locale === 'de' ? 'Ergebnisse, die Sie erwarten können' : 'Outcomes you can expect'}
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {c.outcomes.map((o) => (
            <li key={o} className="flex items-start gap-2 rounded-xl border border-brand-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-900 dark:bg-accent-400" aria-hidden />
              <span className="text-brand-900/85 dark:text-white/85">{o}</span>
            </li>
          ))}
        </ul>
      </section>

      <ProcessSteps steps={c.process} />

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
        title={locale === 'de' ? 'Schriftliches Angebot in einem Werktag.' : 'Written scope within one business day.'}
        body={locale === 'de'
          ? `Schildern Sie uns Ihre Situation. Wir antworten mit SLA-Vorschlag, Zeitplan und Preisspanne.`
          : `Tell us your situation. We reply with a proposed SLA, timeline, and price band.`}
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
            { name: locale === 'de' ? 'Hardware & Infrastruktur' : 'Hardware & Infrastructure', href: `${prefix}/services/hardware` },
            { name: c.title, href: `${prefix}/services/hardware/${slug}` },
          ]),
          ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
        ]}
      />
    </>
  );
}
