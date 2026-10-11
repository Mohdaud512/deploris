import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CTASection } from '@/components/marketing/CTASection';
import { DevelopmentAnimation } from '@/components/marketing/DevelopmentAnimation';
import { developmentServices } from '@/config/services';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/services/development',
    title: locale === 'de' ? 'Softwareentwicklung: CRM, RAG, KI-Agenten' : 'Custom AI Software Development: CRM, RAG, Agents',
    description: locale === 'de'
      ? 'Individuelle CRM-Systeme, RAG-Systeme, KI-Agenten und maßgeschneiderte Softwarelösungen produktionsreif, sicherheitsgeprüft, vollständig dokumentiert.'
      : 'Custom CRM, RAG systems, AI agents, and bespoke software production-grade from day one, security-reviewed, and fully documented for your team.',
  });
}

export default async function DevelopmentLandingPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const de = locale === 'de';
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const root = `${prefix}/services/development`;

  return (
    <>
      <section className="container grid gap-10 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
            {de ? 'Leistungen' : 'Services'}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
            {de
              ? 'Individuelle Software gebaut, um zu halten.'
              : 'Custom software engineered to last.'}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-brand-900/85 dark:text-white/85">
            {de
              ? 'CRM, RAG-Systeme, KI-Agenten und Individualsoftware, mit klarem Scope, sauberer Übergabe und produktiver Security-Review.'
              : 'CRM, RAG systems, AI agents, and bespoke software with a written scope, clean handover, and production security review.'}
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
          <DevelopmentAnimation />
        </div>
      </section>

      <section className="container pb-16" aria-labelledby="dev-services-heading">
        <h2
          id="dev-services-heading"
          className="font-display text-xl font-bold text-brand-900 md:text-2xl dark:text-white"
        >
          {de ? 'Services in diesem Leistungsfeld' : 'Services in this line'}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {developmentServices.map((s) => (
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
        title={de ? 'Ein realer Scope statt einer Demo.' : 'A real scope, not a demo.'}
        body={de
          ? 'Sagen Sie uns, was Sie brauchen. Wir antworten mit Preisspanne und Zeitplan.'
          : 'Tell us what you need. We come back with a price band and a schedule.'}
        primaryHref={`${prefix}/quote`}
        primaryLabel={tCommon('cta_quote')}
      />
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: de ? 'Leistungen' : 'Services', href: `${prefix}/services` },
            { name: de ? 'Softwareentwicklung' : 'Software Development', href: `${prefix}/services/development` },
          ]),
        ]}
      />
    </>
  );
}
