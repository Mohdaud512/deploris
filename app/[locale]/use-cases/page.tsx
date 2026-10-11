import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { useCases } from '@/config/use-cases';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, collectionPageSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/use-cases',
    title:
      locale === 'de'
        ? 'Anwendungsfälle: CRM, KI, RAG, WLAN, Managed IT, Remote Hands'
        : 'Use cases: custom CRM, AI, RAG, WiFi, managed IT, remote hands',
    description:
      locale === 'de'
        ? 'Konkrete Mittelstands-Anwendungsfälle, in denen Deploris Software baut und die Infrastruktur unter einer schriftlichen SLA betreibt. Von individuellem CRM bis zu 24/7 Remote Hands im Rechenzentrum.'
        : 'Concrete mid-market use cases where Deploris both builds the software and runs the infrastructure under a written SLA. From custom CRM to 24/7 data-center remote hands.',
  });
}

export default async function UseCasesHub({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <section className="container pt-14 pb-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">
          {locale === 'de' ? 'Mittelstand · DACH + US' : 'Mid-market · DACH + US'}
        </p>
        <h1 className="mt-3 max-w-4xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {locale === 'de' ? 'Anwendungsfälle' : 'Use cases'}
        </h1>
        <article>
          <p className="mt-5 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">
            {locale === 'de'
              ? 'Sechs konkrete Anwendungsfälle, in denen eine Deploris-Mandat beide Hälften abdeckt: Softwarebau und Infrastrukturbetrieb, unter einer schriftlichen SLA, auf EU-Region-Infrastruktur, zweisprachig DE und EN. Jeder Fall ist eine eigenständige, SEO- und AEO-optimierte Pfeilerseite mit Scope, Vorgehensweise, Käufer-Checkliste und FAQ.'
              : 'Six concrete use cases where a Deploris engagement covers both halves: software build and infrastructure operation, under one written SLA, on EU-region infrastructure, delivered bilingual in English and German. Each is a standalone, SEO and AEO optimized pillar page with scope, process, buyer checklist, and FAQ.'}
          </p>
        </article>
      </section>

      <section className="container pb-16">
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => {
            const c = u.copy[locale];
            return (
              <li key={u.id}>
                <Link
                  href={`${prefix}/use-cases/${c.slug}`}
                  className="group flex h-full flex-col justify-between rounded-2xl border border-brand-900/10 bg-white p-6 transition hover:border-accent-500/60 hover:bg-brand-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <div>
                    <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
                      {c.eyebrow}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-semibold text-brand-900 group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-300">
                      {c.h1}
                    </h2>
                    <p className="mt-3 text-sm text-brand-900/80 dark:text-white/80">{c.deck}</p>
                  </div>
                  <p className="mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-accent-700 dark:text-accent-300">
                    {locale === 'de' ? 'Weiterlesen' : 'Read the pillar'} →
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <SchemaJsonLd
        data={[
          collectionPageSchema({
            locale,
            path: '/use-cases',
            title: locale === 'de' ? 'Deploris Anwendungsfälle' : 'Deploris Use Cases',
            description:
              locale === 'de'
                ? 'Mittelstands-Anwendungsfälle, in denen Deploris Software baut und Infrastruktur betreibt.'
                : 'Mid-market use cases where Deploris both builds the software and operates the infrastructure.',
            hasPart: useCases.map((u) => ({
              name: u.copy[locale].h1,
              url: `${prefix}/use-cases/${u.copy[locale].slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: locale === 'de' ? 'Start' : 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Anwendungsfälle' : 'Use cases', href: `${prefix}/use-cases` },
          ]),
        ]}
      />
    </>
  );
}
