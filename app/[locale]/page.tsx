import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { Hero } from '@/components/marketing/Hero';
import { LogoStrip } from '@/components/marketing/LogoStrip';
import { DualServiceSplit } from '@/components/marketing/DualServiceSplit';
import { ValuePropGrid } from '@/components/marketing/ValueProp';
import { StatCounterGrid } from '@/components/marketing/StatCounter';
import { TestimonialCarousel } from '@/components/marketing/TestimonialCarousel';
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
    title: t('hero_title'),
    description: t('hero_body'),
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

      <LogoStrip label={t('trust_bar')} count={6} />

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
          { label: t('stats_uptime'), value: 999, suffix: '‰' },
          { label: t('stats_response'), value: 15, suffix: ' min' },
          { label: t('stats_countries'), value: 12 },
        ]}
      />

      <TestimonialCarousel
        items={[
          {
            quote:
              locale === 'de'
                ? 'Deploris hat unser CRM in acht Wochen abgelöst vom Kick-off bis zum produktiven Rollout. Der Support-Prozess läuft heute reibungslos.'
                : 'Deploris replaced our CRM in eight weeks from kickoff to production rollout. Support has been rock-steady since.',
            author: 'Placeholder Contact',
            role: 'Head of Revenue Ops',
            company: 'Client A',
          },
          {
            quote:
              locale === 'de'
                ? 'Die Kombination aus Infrastruktur-Know-how und Softwareentwicklung war für uns entscheidend eine Verantwortlichkeit statt drei Dienstleister.'
                : 'Their combination of infra know-how and software chops was decisive one throat to choke instead of three vendors.',
            author: 'Placeholder Contact',
            role: 'CTO',
            company: 'Client B',
          },
        ]}
      />

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
