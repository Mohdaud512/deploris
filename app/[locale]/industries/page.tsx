import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { useCases } from '@/config/use-cases';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/industries',
    title: locale === 'de' ? 'Branchen und Anwendungsfälle für CRM, RAG und IT' : 'Industries and use cases for CRM, RAG, and IT operations',
    description: locale === 'de'
      ? 'Wie Deploris IT-Infrastruktur, individuelle CRM-Systeme, RAG und KI-Automatisierung in konkreten Branchen vom Mittelstand-Vertrieb bis zur Rechenzentrumsmigration liefert.'
      : 'How Deploris delivers IT infrastructure, custom CRM, RAG, and AI automation across specific industries from mid-market revenue teams to data-center migrations.',
  });
}

export default async function IndustriesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return (
    <section className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {locale === 'de' ? 'Branchen & Anwendungsfälle' : 'Industries & use cases'}
      </h1>
      <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
        {locale === 'de'
          ? 'Wo unsere zwei Leistungsfelder in der Praxis den größten Unterschied machen. Jede Karte öffnet eine ausführliche Pfeilerseite mit Scope, Vorgehensweise, Käufer-Checkliste und FAQ.'
          : 'Where our two service lines actually move the needle. Each card opens a full pillar page with scope, process, buyer checklist, and FAQ.'}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {useCases.map((u) => {
          const c = u.copy[locale];
          return (
            <Link
              key={u.id}
              href={`${prefix}/use-cases/${c.slug}`}
              className="group flex h-full flex-col justify-between rounded-2xl border border-brand-900/10 bg-white p-6 transition hover:border-accent-500/60 hover:bg-brand-50/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
            >
              <div>
                <h2 className="font-display text-lg font-semibold text-brand-900 group-hover:text-accent-700 dark:text-white dark:group-hover:text-accent-300">
                  {c.h1}
                </h2>
                <p className="mt-2 text-sm text-brand-900/85 dark:text-white/85">{c.deck}</p>
              </div>
              <p className="mt-5 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-accent-700 dark:text-accent-300">
                {locale === 'de' ? 'Pfeilerseite öffnen' : 'Read the pillar'} →
              </p>
            </Link>
          );
        })}
      </div>
      <SchemaJsonLd
        data={[
          collectionPageSchema({
            locale,
            path: '/industries',
            title: locale === 'de' ? 'Deploris Branchen & Anwendungsfälle' : 'Deploris Industries & Use Cases',
            description: locale === 'de'
              ? 'Konkrete Anwendungsfälle für CRM, RAG, KI-Automatisierung und IT-Infrastruktur in einzelnen Branchen.'
              : 'Concrete use cases for CRM, RAG, AI automation, and IT infrastructure across specific industries.',
            hasPart: useCases.map((u) => ({
              name: u.copy[locale].h1,
              url: `${prefix}/use-cases/${u.copy[locale].slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Branchen' : 'Industries', href: `${prefix}/industries` },
          ]),
        ]}
      />
    </section>
  );
}
