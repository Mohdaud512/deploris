import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { CTASection } from '@/components/marketing/CTASection';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema } from '@/lib/schema';

type CompareCopy = {
  title: string;
  intro: string;
  headers: [string, string, string];
  rows: [string, string, string][];
  verdict: string;
};

const compares: Record<string, Record<Locale, CompareCopy>> = {
  'custom-crm-vs-off-the-shelf': {
    en: {
      title: 'Custom CRM vs. off-the-shelf CRM',
      intro:
        'Off-the-shelf CRMs get you started quickly. Custom CRMs pay back once configuration cost, licensing, or process fit becomes a bottleneck. Here is how they compare.',
      headers: ['Dimension', 'Off-the-shelf', 'Custom'],
      rows: [
        ['Time to first release', '~1–2 weeks (basic)', '~4–6 weeks (fits your process)'],
        ['Per-seat cost', 'Grows with team', 'Flat running cost'],
        ['Process fit', 'You adapt to the tool', 'The tool matches your process'],
        ['Integration flexibility', 'Marketplace-driven', 'Any API, any auth'],
        ['Vendor lock-in', 'High', 'Low (you own the code)'],
        ['Compliance / audit', 'Vendor-dependent', 'Built for your controls'],
      ],
      verdict:
        'If you can live inside a standard CRM, keep buying. If you are already paying for extensive configuration or license bloat, a custom build usually wins on 3-year TCO.',
    },
    de: {
      title: 'Individuelles CRM vs. Standard-CRM',
      intro:
        'Standard-CRMs sind schnell gestartet. Individuelle CRMs rechnen sich, sobald Konfigurationsaufwand, Lizenzkosten oder Prozessfit zum Engpass werden. Hier der Vergleich.',
      headers: ['Dimension', 'Standard', 'Individuell'],
      rows: [
        ['Zeit bis zum ersten Release', '~1–2 Wochen (Basis)', '~4–6 Wochen (Prozess passt)'],
        ['Kosten pro Nutzer', 'Wachsen mit dem Team', 'Konstanter Betrieb'],
        ['Prozessfit', 'Sie passen sich an', 'Tool passt zum Prozess'],
        ['Integrationsflexibilität', 'Marketplace-getrieben', 'Beliebige API, beliebige Auth'],
        ['Vendor-Lock-in', 'Hoch', 'Gering (Sie besitzen den Code)'],
        ['Compliance / Audit', 'Anbieter-abhängig', 'Auf Ihre Kontrollen zugeschnitten'],
      ],
      verdict:
        'Wenn Sie mit einem Standard-CRM leben können, bleiben Sie beim Kauf. Bei aufwendiger Konfiguration oder Lizenz-Bloat gewinnt eine Eigenlösung meist bei der 3-Jahres-TCO.',
    },
  },
  'rag-vs-traditional-search': {
    en: {
      title: 'RAG vs. traditional search',
      intro: 'RAG systems and traditional search look similar from the outside. The difference is what the user gets back and how much they still have to piece together.',
      headers: ['Dimension', 'Traditional search', 'RAG'],
      rows: [
        ['Output', 'Ranked links', 'Composed answer with citations'],
        ['Coverage of long-tail', 'Depends on keywords', 'Broader, semantically matched'],
        ['Freshness', 'Index-dependent', 'Index-dependent (retriever)'],
        ['Auditability', 'Direct source', 'Direct source + composed reasoning'],
        ['Hallucination risk', 'None', 'Present must be measured'],
      ],
      verdict:
        'Traditional search wins when the user is happy with a link. RAG wins when the user wants an answer and you can invest in the eval loop that makes it trustworthy.',
    },
    de: {
      title: 'RAG vs. klassische Suche',
      intro: 'RAG-Systeme und klassische Suche sehen von außen ähnlich aus. Der Unterschied liegt darin, was der Nutzer zurückbekommt und wie viel er selbst zusammenpuzzeln muss.',
      headers: ['Dimension', 'Klassische Suche', 'RAG'],
      rows: [
        ['Ergebnis', 'Rangliste von Links', 'Formulierte Antwort mit Zitat'],
        ['Long-Tail-Abdeckung', 'Keyword-abhängig', 'Breiter, semantisch'],
        ['Aktualität', 'Index-abhängig', 'Index-abhängig (Retriever)'],
        ['Auditierbarkeit', 'Direkte Quelle', 'Direkte Quelle + Argumentation'],
        ['Halluzinationsrisiko', 'Keins', 'Vorhanden muss gemessen werden'],
      ],
      verdict:
        'Klassische Suche gewinnt, wenn ein Link genügt. RAG gewinnt, wenn eine formulierte Antwort gefragt ist und Sie in Evaluation investieren.',
    },
  },
  'ai-agents-vs-automation': {
    en: {
      title: 'AI agents vs. traditional automation',
      intro: 'Traditional automation is deterministic. AI agents are non-deterministic powerful in the right places, dangerous in the wrong ones.',
      headers: ['Dimension', 'Traditional automation', 'AI agent'],
      rows: [
        ['Determinism', 'High', 'Low (per step)'],
        ['Handles unstructured input', 'Poorly', 'Well'],
        ['Debuggability', 'Straightforward', 'Requires trace logging'],
        ['Guardrails', 'Rare need', 'Required'],
        ['Blast radius on error', 'Bounded', 'Depends on tool permissions'],
      ],
      verdict:
        'Use deterministic automation for structured, high-volume paths. Use agents for the messy inputs that used to require a human with strict guardrails and human review at risky steps.',
    },
    de: {
      title: 'KI-Agenten vs. klassische Automatisierung',
      intro: 'Klassische Automatisierung ist deterministisch. KI-Agenten sind nicht-deterministisch stark am richtigen Platz, gefährlich am falschen.',
      headers: ['Dimension', 'Klassische Automatisierung', 'KI-Agent'],
      rows: [
        ['Determinismus', 'Hoch', 'Gering (pro Schritt)'],
        ['Unstrukturierte Eingaben', 'Schlecht', 'Gut'],
        ['Debug-Fähigkeit', 'Einfach', 'Erfordert Trace-Logging'],
        ['Guardrails', 'Selten nötig', 'Erforderlich'],
        ['Fehler-Radius', 'Begrenzt', 'Abhängig von Tool-Rechten'],
      ],
      verdict:
        'Deterministische Automatisierung für strukturierte, häufige Pfade. Agenten für die chaotischen Eingaben, die früher einen Menschen brauchten mit strengen Guardrails.',
    },
  },
};

export function generateStaticParams() {
  return locales.flatMap((l) => Object.keys(compares).map((slug) => ({ locale: l, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const found = compares[slug];
  if (!found) return {};
  const c = found[locale];
  return buildMetadata({ locale, path: `/compare/${slug}`, title: `${c.title} | Deploris`, description: c.intro });
}

export default async function ComparePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const found = compares[slug];
  if (!found) notFound();
  setRequestLocale(locale);
  const c = found[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <>
      <section className="container py-14">
        <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">{c.title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">{c.intro}</p>
      </section>
      <ComparisonTable headers={c.headers} rows={c.rows} />
      <section className="container py-8">
        <div className="rounded-2xl bg-brand-50 p-6 dark:bg-white/5">
          <p className="text-brand-900 dark:text-white"><strong>{locale === 'de' ? 'Fazit:' : 'Verdict:'}</strong> {c.verdict}</p>
        </div>
      </section>
      <CTASection
        title={locale === 'de' ? 'Passt es zu Ihrer Situation?' : 'Does it fit your situation?'}
        body={locale === 'de' ? 'Kurze schriftliche Einschätzung binnen eines Werktags.' : 'Short written assessment within one business day.'}
        primaryHref={`${prefix}/contact`}
        primaryLabel={locale === 'de' ? 'Kontakt aufnehmen' : 'Contact us'}
      />
      <SchemaJsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: prefix || '/' },
          { name: c.title, href: `${prefix}/compare/${slug}` },
        ])}
      />
    </>
  );
}
