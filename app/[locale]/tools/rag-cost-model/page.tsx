import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { RagCostModel } from '@/components/tools/RagCostModel';
import { ToolFooter } from '@/components/tools/ToolFooter';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/tools/rag-cost-model',
    title: locale === 'de'
      ? 'RAG-Betriebskostenmodell: Monatskosten für Produktion'
      : 'RAG Cost Model: Monthly Production Cost Estimator',
    description: locale === 'de'
      ? 'Volumen, Nutzung und Modellwahl in ein transparentes Rechenmodell einsetzen und eine ehrliche monatliche Kostenspanne für ein RAG-System in Produktion sehen.'
      : 'Plug corpus size, usage, and model tier into a transparent calculation and see an honest monthly cost band for a production RAG system.',
  });
}

export default async function RagCostModelPage({ params }: { params: Promise<{ locale: Locale }> }) {
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
          <span>RAG {de ? 'Betriebskosten' : 'cost of ops'}</span>
        </nav>
        <div className="mt-4 max-w-3xl">
          <h1 className="font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">
            {de ? 'Was kostet ein produktives RAG-System pro Monat?' : 'What does a production RAG actually cost per month?'}
          </h1>
          <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">
            {de
              ? 'Keine Verkaufsmasche. Verschieben Sie die Regler, wählen Sie Ihre Modellstufe und EU-Hosting-Präferenz, und sehen Sie die monatliche Kostenspanne — mit vollständig offengelegter Rechenformel am Ende.'
              : 'No sales theatre. Move the sliders, pick your model tier and EU hosting preference, and see the monthly cost band — with the full formula disclosed at the bottom.'}
          </p>
        </div>
      </section>
      <RagCostModel locale={locale} />
      <ToolFooter
        locale={locale}
        breadcrumbTrail={[
          { label: 'Home', href: prefix || '/' },
          { label: de ? 'Werkzeuge' : 'Utilities', href: `${prefix}/tools` },
          { label: de ? 'RAG-Betriebskosten' : 'RAG cost model', href: `${prefix}/tools/rag-cost-model` },
        ]}
        nextSteps={[
          {
            label: de ? 'Zum RAG-Service' : 'See the RAG systems service',
            href: `${prefix}/services/development/${de ? 'rag-systeme' : 'rag-systems'}`,
          },
          {
            label: de ? 'RAG vs. klassische Suche' : 'RAG vs. traditional search',
            href: `${prefix}/compare/rag-vs-traditional-search`,
          },
          {
            label: de ? 'RAG-Beispiel im Demo-Gallery' : 'See a RAG demo artifact',
            href: `${prefix}/demos`,
          },
          {
            label: de ? 'Schriftliches Angebot anfragen' : 'Request a written quote',
            href: `${prefix}/quote`,
          },
        ]}
      />
    </>
  );
}
