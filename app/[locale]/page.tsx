import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/marketing/Hero';
import { LogoStrip } from '@/components/marketing/LogoStrip';
import { ComplianceStrip } from '@/components/marketing/ComplianceStrip';
import { OutcomePaths } from '@/components/marketing/OutcomePaths';
import { WhyBoth } from '@/components/marketing/WhyBoth';
import { DualServiceSplit } from '@/components/marketing/DualServiceSplit';
import { ValuePropGrid } from '@/components/marketing/ValueProp';
import { StatCounterGrid } from '@/components/marketing/StatCounter';
import { CTASection } from '@/components/marketing/CTASection';
import { RoiCalculator } from '@/components/marketing/RoiCalculator';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return buildMetadata({
    locale,
    path: '/',
    // Short meta title + description for SERP (the long hero_title/hero_body
    // are still used on-page as the H1 and intro paragraph; those read as
    // marketing copy, these read as index entries).
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'home' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <Hero
        eyebrow={t('hero_eyebrow')}
        title={t('hero_title')}
        body={t('hero_body')}
        primaryHref={`${prefix}/quote`}
        secondaryHref={`${prefix}/contact`}
      />

      <ComplianceStrip locale={locale} />

      <LogoStrip label={t('trust_bar')} count={6} />

      <OutcomePaths locale={locale} />

      <WhyBoth locale={locale} />

      <DualServiceSplit locale={locale} />

      <ValuePropGrid
        items={[
          { title: t('value_1_t'), body: t('value_1_b') },
          { title: t('value_2_t'), body: t('value_2_b') },
          { title: t('value_3_t'), body: t('value_3_b') },
          { title: t('value_4_t'), body: t('value_4_b') },
        ]}
      />

      <StatCounterGrid
        stats={[
          { label: t('stats_projects'), value: 240, suffix: '+' },
          { label: t('stats_uptime'), value: 99.9, suffix: '%', decimals: 1 },
          { label: t('stats_response'), value: 15, suffix: ' min' },
          { label: t('stats_countries'), value: 12 },
        ]}
      />

      {/* Testimonials are intentionally hidden until approved client quotes
          are available. Restore the <TestimonialCarousel /> when real items
          (quote + named author + role + company, with permission) land. */}

      <RoiCalculator locale={locale} />

      <CTASection
        title={t('cta_bottom_t')}
        body={t('cta_bottom_b')}
        primaryHref={`${prefix}/quote`}
        primaryLabel={tCommon('cta_quote')}
        secondaryHref={`${prefix}/contact`}
        secondaryLabel={tCommon('cta_contact')}
      />
    </>
  );
}
