import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CTASection } from '@/components/marketing/CTASection';
import { developmentServices } from '@/config/services';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/services/development',
    title:
      locale === 'de'
        ? 'Softwareentwicklung CRM, RAG, KI-Automatisierung, Individualsoftware | Deploris'
        : 'Software Development Custom CRM, RAG, AI Automation, Custom Systems | Deploris',
    description:
      locale === 'de'
        ? 'Individuelle CRM-Systeme, RAG-Systeme, KI-Agenten und Individualsoftware produktionsreif, sicherheitsgeprüft, dokumentiert.'
        : 'Custom CRMs, RAG systems, AI agents, and bespoke software production-grade, security-reviewed, documented.',
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
      <section className="container py-16">
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
      </section>

      <section className="container pb-16">
        <div className="grid gap-4 md:grid-cols-2">
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
    </>
  );
}
