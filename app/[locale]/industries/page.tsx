import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/industries',
    title:
      locale === 'de'
        ? 'Branchen & Anwendungsfälle | Deploris'
        : 'Industries & Use Cases | Deploris',
    description:
      locale === 'de'
        ? 'Wie Deploris IT-Infrastruktur, CRM, RAG und KI-Automatisierung in konkreten Branchen liefert.'
        : 'How Deploris delivers IT infrastructure, CRM, RAG, and AI automation in specific industries.',
  });
}

const usecases = [
  {
    en: { title: 'SMB revenue teams custom CRM', body: 'Replace license bloat with a CRM that matches your pipeline stages, integrations, and reporting.' },
    de: { title: 'Vertrieb im Mittelstand individuelles CRM', body: 'Ablösung von Lizenzballast durch ein CRM, das zu Ihren Pipeline-Stufen, Integrationen und Reports passt.' },
  },
  {
    en: { title: 'Operations AI automation', body: 'Take repeatable multi-step work off the plate of your ops team with agents that finish real work end-to-end.' },
    de: { title: 'Operations KI-Automatisierung', body: 'Wiederkehrende mehrstufige Arbeit übernehmen KI-Agenten end-to-end mit Freigabepunkten für Ihr Team.' },
  },
  {
    en: { title: 'Support RAG knowledge', body: "Ground answers in your latest documentation so agents don't quote stale wiki pages." },
    de: { title: 'Support RAG-Wissen', body: 'Antworten aus der aktuellen Dokumentation, damit veraltete Wiki-Seiten nicht mehr zitiert werden.' },
  },
  {
    en: { title: 'MSP handoff hardware managed IT', body: 'Move from break-fix to a managed contract with reporting and quarterly capacity reviews.' },
    de: { title: 'MSP-Übernahme Managed IT', body: 'Wechsel vom Break-Fix zu einem Managed-Vertrag mit Reporting und Quartalskapazitätsreview.' },
  },
  {
    en: { title: 'Retail / warehouse WiFi surveys', body: 'Predictive + on-site surveys so WiFi supports scanners, kiosks, and phones under real load.' },
    de: { title: 'Handel / Lager WLAN-Ausleuchtung', body: 'Prädiktive und Vor-Ort-Vermessung, damit WLAN Scanner, Kioske und Telefone unter realer Last trägt.' },
  },
  {
    en: { title: 'Data center 24/7 remote hands', body: 'Colo tenant with in-cage work and change control without maintaining 24/7 headcount.' },
    de: { title: 'Rechenzentrum 24/7 Remote Hands', body: 'Colo-Mieter mit Arbeit im Cage und Change-Kontrolle ohne eigene 24/7-Belegschaft.' },
  },
];

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
          ? 'Wo unsere zwei Leistungsfelder in der Praxis den größten Unterschied machen.'
          : "Where our two service lines actually move the needle."}
      </p>
      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {usecases.map((u) => {
          const c = u[locale];
          return (
            <article key={c.title} className="rounded-2xl border border-brand-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <h2 className="font-display text-lg font-semibold text-brand-900 dark:text-white">{c.title}</h2>
              <p className="mt-2 text-sm text-brand-900/85 dark:text-white/85">{c.body}</p>
            </article>
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
            hasPart: usecases.map((u) => ({
              name: u[locale].title,
              url: `${prefix}/industries`,
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
