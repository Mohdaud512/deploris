import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/tools',
    title: locale === 'de'
      ? 'Werkzeuge für CTOs, IT- und COO-Teams gratis, keine Anmeldung'
      : 'Free utilities for CTOs, IT and COO teams no sign-up',
    description: locale === 'de'
      ? 'Drei Werkzeuge für ernste KI-, RAG- und CRM-Entscheidungen: Vendor-Risiko-Checkliste, RAG-Betriebskosten-Rechner, CRM-TCO-Vergleich.'
      : 'Three utilities for serious AI, RAG, and CRM decisions: vendor risk checklist, RAG cost-of-ops model, CRM three-year TCO estimator.',
  });
}

export default async function ToolsHubPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  const copy = de
    ? {
        eyebrow: 'Werkzeuge',
        title: 'Drei Werkzeuge, keine Verkaufsstrecke.',
        deck: 'Jedes dieser Werkzeuge löst eine konkrete Vorab-Frage, die Mittelstand-Käufer:innen ohnehin selbst beantworten müssen. Rechnen Sie damit, bevor Sie mit uns oder jemand anderem sprechen.',
        tools: [
          {
            tag: 'Vendor-Risiko',
            title: 'KI-Vendor-Risiko-Checkliste',
            desc: '15 Fragen, die eine Beschaffung an einen KI-Anbieter stellen sollte. Antworten erzeugen eine Scorecard als One-Pager.',
            href: `${prefix}/tools/ai-vendor-risk`,
            cta: 'Zur Checkliste',
          },
          {
            tag: 'RAG-Kosten',
            title: 'RAG-Betriebskostenmodell',
            desc: 'Volumen, Nutzung, Modellwahl → monatliche Kostenspanne. Transparentes Rechenmodell, keine Verkaufsmasche.',
            href: `${prefix}/tools/rag-cost-model`,
            cta: 'Zum Rechner',
          },
          {
            tag: 'CRM-TCO',
            title: 'CRM 3-Jahres-TCO-Rechner',
            desc: 'HubSpot/Salesforce vs. individuelles CRM, über drei Jahre. Lizenz, Konfiguration, Entwicklung, Wartung — alles berücksichtigt.',
            href: `${prefix}/tools/crm-tco`,
            cta: 'Zum TCO-Vergleich',
          },
        ],
      }
    : {
        eyebrow: 'Utilities',
        title: 'Three tools. No sales funnel.',
        deck: 'Each utility answers a concrete pre-sales question mid-market buyers have to run themselves anyway. Run them before you talk to us — or anyone else.',
        tools: [
          {
            tag: 'Vendor risk',
            title: 'AI vendor risk checklist',
            desc: 'Fifteen questions procurement should ask any AI vendor. Your answers produce a one-page scorecard.',
            href: `${prefix}/tools/ai-vendor-risk`,
            cta: 'Open checklist',
          },
          {
            tag: 'RAG cost',
            title: 'RAG cost-of-ops model',
            desc: 'Volume, usage, model choice → monthly cost band. Transparent calculation, no sales theatre.',
            href: `${prefix}/tools/rag-cost-model`,
            cta: 'Open calculator',
          },
          {
            tag: 'CRM TCO',
            title: 'CRM three-year TCO estimator',
            desc: 'HubSpot/Salesforce vs. custom CRM over three years. Licence, config, build, maintenance — all in.',
            href: `${prefix}/tools/crm-tco`,
            cta: 'Open comparator',
          },
        ],
      };

  return (
    <section className="container py-14 md:py-20">
      <div className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">{copy.eyebrow}</p>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">{copy.title}</h1>
        <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">{copy.deck}</p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {copy.tools.map((t) => (
          <Link
            key={t.tag}
            href={t.href}
            className="group relative flex flex-col rounded-2xl border border-brand-900/10 bg-white p-6 shadow-sm transition-colors hover:border-accent-500/60 dark:border-white/10 dark:bg-white/5 dark:hover:border-accent-400/60"
          >
            <span className="rounded-full border border-accent-500/40 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent-700 dark:text-accent-300">
              {t.tag}
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-brand-900 dark:text-white">{t.title}</h2>
            <p className="mt-2 flex-1 text-sm text-brand-900/75 dark:text-white/75">{t.desc}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 group-hover:underline dark:text-accent-300">
              {t.cta} <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        ))}
      </div>
      <SchemaJsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: de ? 'Werkzeuge' : 'Utilities', href: `${prefix}/tools` },
          ]),
        ]}
      />
    </section>
  );
}
