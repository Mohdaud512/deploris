import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { DualServiceSplit } from '@/components/marketing/DualServiceSplit';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CTASection } from '@/components/marketing/CTASection';
import { hardwareServices, developmentServices, allServices } from '@/config/services';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/services',
    title:
      locale === 'de'
        ? 'Leistungen: Hardware, Infrastruktur, CRM, RAG und KI | Deploris'
        : 'Services: Hardware, infrastructure, CRM, RAG and AI | Deploris',
    description:
      locale === 'de'
        ? 'Zwei Leistungsfelder aus einer Hand: Hardware- und Infrastruktur-Support sowie individuelle Softwareentwicklung, RAG-Systeme, KI-Agenten und Individualsoftware.'
        : 'Two service lines under one team: hardware and infrastructure operations, alongside custom software, RAG systems, AI agents, and bespoke systems.',
  });
}

export default async function ServicesIndex({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const de = locale === 'de';
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <section className="container py-16">
        <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
          {de ? 'Leistungen' : 'Services'}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {de
            ? 'Zwei Leistungsfelder. Ein Team. Eine Verantwortlichkeit.'
            : 'Two service lines. One team. One point of accountability.'}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-brand-900/85 dark:text-white/85">
          {de
            ? 'Wir liefern Hardware- und Infrastruktur-Support ebenso wie individuelle CRM-, RAG-, KI- und Softwareentwicklung. Wählen Sie unten das passende Feld.'
            : 'We deliver hardware and infrastructure operations alongside custom CRM, RAG, AI, and software engineering. Pick a line below.'}
        </p>
      </section>

      <DualServiceSplit locale={locale} />

      <section className="container py-8">
        <h2 className="font-display text-2xl font-semibold text-brand-900 dark:text-white">
          {de ? 'Hardware & Infrastruktur' : 'Hardware & Infrastructure'}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {hardwareServices.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.copy[locale].title}
              summary={s.copy[locale].summary}
              href={`${prefix}/services/hardware/${s.copy[locale].slug}`}
              keyword={s.primaryKeyword[locale]}
              cta={tCommon('cta_learn')}
            />
          ))}
        </div>
      </section>

      <section className="container py-8">
        <h2 className="font-display text-2xl font-semibold text-brand-900 dark:text-white">
          {de ? 'Softwareentwicklung' : 'Software Development'}
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {developmentServices.map((s) => (
            <ServiceCard
              key={s.id}
              title={s.copy[locale].title}
              summary={s.copy[locale].summary}
              href={`${prefix}/services/development/${s.copy[locale].slug}`}
              keyword={s.primaryKeyword[locale]}
              cta={tCommon('cta_learn')}
            />
          ))}
        </div>
      </section>

      <SchemaJsonLd
        data={[
          collectionPageSchema({
            locale,
            path: '/services',
            title: de ? 'Deploris Leistungen' : 'Deploris Services',
            description: de
              ? 'Alle Deploris-Leistungen Hardware & Infrastruktur und individuelle Softwareentwicklung.'
              : 'All Deploris services hardware & infrastructure and custom software development.',
            hasPart: allServices.map((s) => ({
              name: s.copy[locale].title,
              url: `${prefix}/services/${s.line}/${s.copy[locale].slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: de ? 'Leistungen' : 'Services', href: `${prefix}/services` },
          ]),
        ]}
      />

      <CTASection
        title={de ? 'Nicht sicher, wo Sie anfangen sollen?' : 'Not sure where to start?'}
        body={
          de
            ? 'Beschreiben Sie kurz Ihre Situation. Wir schlagen die passende Leistung vor und liefern innerhalb eines Werktags Preisrahmen und Zeitplan.'
            : "Describe your situation in a few lines. We'll recommend the right service and come back within one business day with a price band and schedule."
        }
        primaryHref={`${prefix}/contact`}
        primaryLabel={tCommon('cta_contact')}
        secondaryHref={`${prefix}/quote`}
        secondaryLabel={tCommon('cta_quote')}
      />
    </>
  );
}
