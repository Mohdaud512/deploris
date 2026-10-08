import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CTASection } from '@/components/marketing/CTASection';
import { hardwareServices } from '@/config/services';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/services/hardware',
    title:
      locale === 'de'
        ? 'Hardware & Infrastruktur IT Infrastruktur Support | Deploris'
        : 'Hardware & Infrastructure IT infrastructure support | Deploris',
    description:
      locale === 'de'
        ? 'Managed IT-Infrastruktur, Netzwerk-Support, Rollouts, Desktop-Support, WLAN-Ausleuchtung und 24/7 Rechenzentrum-Support unter schriftlicher SLA.'
        : 'Managed IT infrastructure, network support, rollouts, desktop support, WiFi surveys, and 24/7 data-center support under a written SLA.',
  });
}

export default async function HardwareLandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const de = locale === 'de';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const root = locale === 'en' ? '/services/hardware' : '/de/leistungen/hardware';

  return (
    <>
      <section className="container py-16">
        <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
          {de ? 'Leistungen' : 'Services'}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {de
            ? 'Hardware & Infrastruktur, die einfach läuft.'
            : 'Hardware and infrastructure that just runs.'}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-brand-900/85 dark:text-white/85">
          {de
            ? 'Von der Netzwerkbetreuung bis zum 24/7 Rechenzentrum-Support geliefert unter schriftlicher SLA, herstellerneutral, dokumentiert.'
            : 'From network support to 24/7 data-center operations delivered under a written SLA, vendor-neutral, documented.'}
        </p>
      </section>

      <section className="container pb-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hardwareServices.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.copy[locale].title}
              summary={s.copy[locale].summary}
              href={`${root}/${s.copy[locale].slug}`}
              keyword={s.primaryKeyword[locale]}
              cta={tCommon('cta_learn')}
            />
          ))}
        </div>
      </section>

      <CTASection
        title={de ? 'Brauchen Sie eine SLA, die hält?' : 'Need an SLA with real teeth?'}
        body={de ? 'Schriftlicher Scope innerhalb eines Werktags.' : 'Written scope within one business day.'}
        primaryHref={`${prefix}/quote`}
        primaryLabel={tCommon('cta_quote')}
      />
    </>
  );
}
