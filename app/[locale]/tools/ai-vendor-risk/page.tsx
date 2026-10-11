import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { AiVendorRisk } from '@/components/tools/AiVendorRisk';
import { ToolFooter } from '@/components/tools/ToolFooter';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/tools/ai-vendor-risk',
    title: locale === 'de'
      ? 'KI-Vendor-Risiko-Checkliste 15 Fragen für Beschaffung'
      : 'AI vendor risk checklist 15 questions for procurement',
    description: locale === 'de'
      ? 'Fünfzehn Fragen, die eine Beschaffung an jeden KI-Anbieter stellen sollte. Ihre Antworten erzeugen eine kurze Scorecard mit Risikoband und kritischen Lücken.'
      : 'Fifteen questions procurement should ask any AI vendor. Your answers produce a short scorecard with a risk band and critical gaps.',
  });
}

export default async function AiVendorRiskPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  return (
    <>
      <section className="container pt-12 md:pt-16">
        <nav aria-label="Breadcrumb" className="font-mono text-[0.72rem] uppercase tracking-[0.1em] text-brand-900/60 dark:text-white/60">
          <Link href={`${prefix}/tools`} className="hover:underline">
            {de ? 'Werkzeuge' : 'Utilities'}
          </Link>
          <span className="mx-2 opacity-60">/</span>
          <span>{de ? 'KI-Vendor-Risiko' : 'AI vendor risk'}</span>
        </nav>
        <div className="mt-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">
            {de ? '15 Fragen an jeden KI-Anbieter.' : '15 questions for every AI vendor.'}
          </h1>
          <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">
            {de
              ? 'Von Verschlüsselung über Datenhoheit und Austrittsklauseln bis zum EU AI Act. Markieren Sie, was Ihr aktueller oder künftiger Anbieter erfüllt. Score und kritische Lücken rechnen wir sofort.'
              : 'From encryption through data governance, exit clauses, and the EU AI Act. Tick what your current or prospective vendor meets. Score and critical gaps appear immediately.'}
          </p>
        </div>
      </section>
      <AiVendorRisk locale={locale} />
      <ToolFooter
        locale={locale}
        breadcrumbTrail={[
          { label: 'Home', href: prefix || '/' },
          { label: de ? 'Werkzeuge' : 'Utilities', href: `${prefix}/tools` },
          { label: de ? 'KI-Vendor-Risiko' : 'AI vendor risk', href: `${prefix}/tools/ai-vendor-risk` },
        ]}
        nextSteps={[
          {
            label: de ? 'Zum KI-Agenten-Service' : 'See the AI agents service',
            href: `${prefix}/services/development/${de ? 'ki-automatisierung' : 'ai-agents-automation'}`,
          },
          {
            label: de ? 'Zum RAG-Service' : 'See the RAG systems service',
            href: `${prefix}/services/development/${de ? 'rag-systeme' : 'rag-systems'}`,
          },
          {
            label: de ? 'KI-Chancen-Finder (10 Fragen)' : 'AI Opportunity Finder (10 questions)',
            href: `${prefix}/ai-opportunity-finder`,
          },
          {
            label: de ? 'Datenschutzerklärung ansehen' : 'See our privacy posture',
            href: `${prefix}/legal/privacy`,
          },
        ]}
      />
    </>
  );
}
