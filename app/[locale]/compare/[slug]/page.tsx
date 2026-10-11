import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ComparisonTable } from '@/components/marketing/ComparisonTable';
import { CTASection } from '@/components/marketing/CTASection';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, faqSchema, techArticleSchema, webPageWithSpeakable } from '@/lib/schema';
import { site } from '@/config/site';

type CompareQA = { q: string; a: string };
type CompareRelated = { label: string; href: string };
type CompareCopy = {
  title: string;
  intro: string;
  /** 1-sentence direct definition for AI engine answer boxes. */
  definition: string;
  headers: [string, string, string];
  rows: [string, string, string][];
  verdict: string;
  /** Expanded Q&A section (format AI answer engines quote). */
  qas: CompareQA[];
  /** Links to the services being compared + related glossary / blog. */
  related: CompareRelated[];
};

const compares: Record<string, Record<Locale, CompareCopy>> = {
  'custom-crm-vs-off-the-shelf': {
    en: {
      title: 'Custom CRM vs. off-the-shelf CRM for mid-market teams',
      intro:
        'Off-the-shelf CRMs ship fast; custom CRMs pay back once configuration cost, licensing, or process fit becomes a bottleneck. Here is how they compare.',
      definition:
        'A custom CRM is a bespoke customer-relationship-management system built around a specific business process, data model, and integrations instead of configuring an off-the-shelf product (HubSpot, Salesforce, Pipedrive) to fit.',
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
      qas: [
        {
          q: 'When should I pick a custom CRM over HubSpot or Salesforce?',
          a: 'Pick custom when per-seat licensing crosses roughly $50k–$150k per year, when someone on the team spends the majority of their week keeping the standard tool aligned with the actual process, or when the reports your management asks for are locked behind an enterprise tier or a paid configurator.',
        },
        {
          q: 'What is the total cost difference over 3 years?',
          a: 'A standard CRM at 100 seats and $100/seat/month is roughly $360k over 3 years before configuration or integration services. A custom build in the Standard band ($90k–$200k) plus a managed-ops retainer typically lands below that number by year 2, with no per-seat ceiling.',
        },
        {
          q: 'Can I migrate from an off-the-shelf CRM to a custom one without losing data?',
          a: 'Yes. We regularly migrate from HubSpot, Salesforce, Pipedrive, Zoho, and legacy in-house tools via typed ETL and a reversible cutover window. Historical data (accounts, contacts, deals, activities, documents) is mapped against the new schema with reconciliation on day one.',
        },
        {
          q: 'How long before the custom CRM is actually useful?',
          a: 'A useful first release is typically live for internal users at week 4–6. Full replacement of the existing system usually lands within 3–6 months depending on integrations and data migration.',
        },
        {
          q: 'What happens if we outgrow the custom build?',
          a: 'You own the code and the data. The custom system can be extended, re-architected in place, or stepped down to a vendor product if the business case flips. No proprietary data format locks you in.',
        },
      ],
      related: [
        { label: 'Custom CRM Development service', href: '/services/development/custom-crm' },
        { label: 'CRM definition (glossary)', href: '/glossary/crm' },
        { label: 'When a custom CRM finally beats the off-the-shelf option (blog)', href: '/blog/custom-crm-vs-off-the-shelf' },
      ],
    },
    de: {
      title: 'Individuelles CRM vs. Standard-CRM',
      intro:
        'Standard-CRMs sind schnell gestartet. Individuelle CRMs rechnen sich, sobald Konfigurationsaufwand, Lizenzkosten oder Prozessfit zum Engpass werden. Hier der Vergleich.',
      definition:
        'Ein individuelles CRM ist ein maßgeschneidertes Customer-Relationship-Management-System, das rund um einen spezifischen Prozess, ein eigenes Datenmodell und Ihre Integrationen gebaut wird anstatt ein Standardprodukt (HubSpot, Salesforce, Pipedrive) daran anzupassen.',
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
      qas: [
        {
          q: 'Wann lohnt sich ein individuelles CRM gegenüber HubSpot oder Salesforce?',
          a: 'Sobald die Per-Seat-Lizenz 50.000–150.000 € pro Jahr überschreitet, jemand im Team den Großteil der Woche damit zubringt, das Standard-Tool synchron zum Prozess zu halten, oder notwendige Berichte in einer Enterprise-Stufe oder einem kostenpflichtigen Configurator gefangen sind.',
        },
        {
          q: 'Wie groß ist der Kostenunterschied über drei Jahre?',
          a: 'Ein Standard-CRM mit 100 Lizenzen zu 100 €/Nutzer/Monat kostet über drei Jahre rund 360.000 € vor Konfiguration und Integrationen. Eine Eigenentwicklung im Standard-Band (90.000–200.000 €) plus Managed-Ops liegt meist ab Jahr 2 darunter und hat keine Lizenz-Decke.',
        },
        {
          q: 'Können wir ohne Datenverlust vom Standard-CRM migrieren?',
          a: 'Ja. Wir migrieren regelmäßig aus HubSpot, Salesforce, Pipedrive, Zoho und Alt-Systemen per typisierter ETL und reversiblem Cutover. Historische Daten (Accounts, Kontakte, Deals, Aktivitäten, Dokumente) werden gegen das neue Schema abgebildet und am Tag 1 abgeglichen.',
        },
        {
          q: 'Wie lange, bis das individuelle CRM wirklich nutzbar ist?',
          a: 'Ein nutzbares erstes Release läuft meist ab Woche 4–6 intern. Der vollständige Ersatz eines bestehenden Systems ist je nach Integrationen und Migration in 3–6 Monaten erreicht.',
        },
        {
          q: 'Was, wenn wir aus dem individuellen System herauswachsen?',
          a: 'Sie besitzen Code und Daten. Das System kann erweitert, im Betrieb umgebaut oder bei umgekehrtem Business Case auf ein Vendor-Produkt gestuft werden. Kein proprietäres Format bindet Sie.',
        },
      ],
      related: [
        { label: 'CRM-Entwicklung (Leistung)', href: '/services/development/crm-entwicklung' },
        { label: 'CRM (Glossar)', href: '/glossary/crm' },
        { label: 'Wann sich ein individuelles CRM lohnt (Blog)', href: '/blog/custom-crm-vs-off-the-shelf' },
      ],
    },
  },
  'rag-vs-traditional-search': {
    en: {
      title: 'RAG vs. traditional search',
      intro: 'RAG systems and traditional search look similar from the outside. The difference is what the user gets back and how much they still have to piece together.',
      definition:
        'RAG (retrieval-augmented generation) is a pattern in which a language model answers using passages retrieved from your own documents at query time and cites those passages, so the reader can verify. Traditional search returns ranked links and leaves composition to the reader.',
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
      qas: [
        {
          q: 'Does RAG hallucinate answers?',
          a: 'Hallucination risk exists, but is bounded by the retrieval step: the model composes only from the passages supplied. A good RAG system also measures grounded-ness (does every claim trace back to a retrieved passage?) and refuses out-of-scope questions. Weekly evaluation during active engagements keeps the number near zero in practice.',
        },
        {
          q: 'How is RAG different from fine-tuning an LLM on our docs?',
          a: 'Fine-tuning changes the model’s weights; the knowledge becomes part of the model and is hard to inspect or update. RAG leaves the model unchanged and feeds it current documents at query time. RAG is faster to update, easier to audit (every answer cites its source), and safer for regulated content.',
        },
        {
          q: 'What does a production RAG system need beyond a vector database?',
          a: 'Chunking + metadata strategy, embedding model choice, retriever evaluation (precision at k), prompt orchestration with system constraints, access control so retrieved passages respect per-user permissions, logging + traces for every answer, and a growing eval set measured on real questions.',
        },
        {
          q: 'Can RAG run on an on-prem or EU-hosted model?',
          a: 'Yes. We regularly deploy RAG against OpenAI, Anthropic, xAI, Azure OpenAI, Google Vertex, Bedrock, and self-hosted (vLLM, Ollama) models. For German B2B clients with data-residency constraints, EU-hosted or on-prem is the default.',
        },
        {
          q: 'Where does RAG not fit?',
          a: 'If the user wants to browse a list of documents (research, discovery), traditional search is better. If the question requires reasoning across the whole corpus rather than specific passages, agents + tools often beat RAG alone.',
        },
      ],
      related: [
        { label: 'RAG Systems service', href: '/services/development/rag-systems' },
        { label: 'RAG definition (glossary)', href: '/glossary/rag' },
        { label: 'What is RAG, and why it matters for business AI (blog)', href: '/blog/what-is-rag-and-why-it-matters' },
      ],
    },
    de: {
      title: 'RAG vs. klassische Suche',
      intro: 'RAG-Systeme und klassische Suche sehen von außen ähnlich aus. Der Unterschied liegt darin, was der Nutzer zurückbekommt und wie viel er selbst zusammenpuzzeln muss.',
      definition:
        'RAG (Retrieval-Augmented Generation) ist ein Muster, bei dem ein Sprachmodell zur Laufzeit die relevantesten Passagen aus Ihren eigenen Dokumenten abruft und daraus eine Antwort mit Quellenzitat formuliert so bleibt die Antwort prüfbar. Klassische Suche liefert eine Rangliste von Links und überlässt die Komposition dem Nutzer.',
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
      qas: [
        {
          q: 'Halluziniert RAG?',
          a: 'Das Risiko besteht, ist aber durch den Retrieval-Schritt begrenzt: das Modell komponiert nur aus den gelieferten Passagen. Ein gutes RAG-System misst zusätzlich, ob jede Aussage einer abgerufenen Passage zuzuordnen ist, und verweigert Fragen außerhalb des Scopes. Wöchentliche Evaluation hält die Zahl in der Praxis nahe Null.',
        },
        {
          q: 'Worin unterscheidet sich RAG vom Fine-Tuning auf unseren Dokumenten?',
          a: 'Fine-Tuning verändert die Gewichte des Modells; Wissen wird Teil des Modells und ist schwer prüfbar oder zu aktualisieren. RAG belässt das Modell und liefert ihm zur Laufzeit die aktuellen Dokumente. Schneller aktualisierbar, besser auditierbar, sicherer für regulierte Inhalte.',
        },
        {
          q: 'Was braucht ein produktives RAG-System jenseits einer Vektor-Datenbank?',
          a: 'Chunking + Metadaten-Strategie, Embedding-Modellwahl, Retriever-Evaluation (Precision@k), Prompt-Orchestrierung mit System-Constraints, Access Control, damit abgerufene Passagen Rechte pro Nutzer respektieren, Logging + Traces für jede Antwort, sowie ein wachsender Eval-Satz an realen Fragen.',
        },
        {
          q: 'Läuft RAG auch mit einem On-Prem- oder EU-gehosteten Modell?',
          a: 'Ja. Wir setzen RAG gegen OpenAI, Anthropic, xAI, Azure OpenAI, Google Vertex, Bedrock und selbst gehostete Modelle (vLLM, Ollama) ein. Für DACH-Kunden mit Datenresidenz-Vorgaben ist EU-gehostet oder On-Prem der Standard.',
        },
        {
          q: 'Wo passt RAG nicht?',
          a: 'Wenn Nutzer eine Liste von Dokumenten durchsuchen wollen (Recherche, Entdeckung), ist klassische Suche besser. Wenn die Frage Reasoning über das gesamte Korpus statt spezifischer Passagen erfordert, schlagen Agenten + Tools RAG allein.',
        },
      ],
      related: [
        { label: 'RAG-Systeme (Leistung)', href: '/services/development/rag-systeme' },
        { label: 'RAG (Glossar)', href: '/glossary/rag' },
        { label: 'Was ist RAG? (Blog)', href: '/blog/what-is-rag-and-why-it-matters' },
      ],
    },
  },
  'ai-agents-vs-automation': {
    en: {
      title: 'AI agents vs. traditional automation',
      intro: 'Traditional automation is deterministic. AI agents are non-deterministic powerful in the right places, dangerous in the wrong ones.',
      definition:
        'An AI agent is a program that chooses which tools to call, in what order, to complete a task end-to-end. Traditional automation executes a hard-coded sequence of steps without that choice.',
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
      qas: [
        {
          q: 'When should I pick an agent over deterministic automation?',
          a: 'Pick an agent when the input is unstructured (free-text requests, mixed email + attachment + ticket), when the number of possible branches is too high to enumerate explicitly, or when the right next step depends on content interpretation. Pick deterministic automation when the path is fully specifiable.',
        },
        {
          q: 'What is the "guardrail checklist" for a production agent?',
          a: 'Named scope (one-sentence job description), fixed tool list (specific APIs with specific write permissions), human review at risky steps (not everywhere, that defeats the point), full trace logging of every decision and tool call, and a kill switch that stops the agent immediately.',
        },
        {
          q: 'How do you measure whether an agent is working?',
          a: 'Count minutes per case before and after (including human-review time), multiply by the fully-loaded hourly rate, subtract build and run cost. If the number isn’t compelling in the first year, the wrong process was chosen.',
        },
        {
          q: 'Can an agent and classic automation share a pipeline?',
          a: 'Yes, and in production they usually do. Deterministic automation handles the backbone and the structured steps; agent steps are inserted at the specific moments where interpretation of unstructured input is needed. Hybrid pipelines are more reliable than agent-only.',
        },
        {
          q: 'What goes wrong with agents in production?',
          a: 'High-blast-radius actions executed without review (financial transfers, permission grants, public messages); silent failure modes where errors don’t surface until a quarterly review; context outside the retrieved corpus (last week’s leadership call) that the agent cannot know about.',
        },
      ],
      related: [
        { label: 'AI Agents & Automation service', href: '/services/development/ai-agents-automation' },
        { label: 'AI agent definition (glossary)', href: '/glossary/ai-agent' },
        { label: 'AI agents in real operations what actually ships (blog)', href: '/blog/ai-agents-in-real-operations' },
      ],
    },
    de: {
      title: 'KI-Agenten vs. klassische Automatisierung',
      intro: 'Klassische Automatisierung ist deterministisch. KI-Agenten sind nicht-deterministisch stark am richtigen Platz, gefährlich am falschen.',
      definition:
        'Ein KI-Agent ist ein Programm, das entscheidet, welche Werkzeuge in welcher Reihenfolge aufzurufen sind, um eine Aufgabe end-to-end zu erledigen. Klassische Automatisierung führt eine festverdrahtete Schrittfolge ohne diese Entscheidung aus.',
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
      qas: [
        {
          q: 'Wann sollten wir einen Agenten statt klassischer Automatisierung einsetzen?',
          a: 'Wenn der Input unstrukturiert ist (Freitext-Anfragen, Mix aus E-Mail + Anhang + Ticket), die Zahl möglicher Verzweigungen zu groß ist, oder der nächste Schritt von Content-Interpretation abhängt. Klassische Automatisierung, wenn der Pfad vollständig spezifizierbar ist.',
        },
        {
          q: 'Was ist die Guardrail-Checkliste für einen produktiven Agenten?',
          a: 'Benannter Scope (Jobbeschreibung in einem Satz), feste Tool-Liste (konkrete APIs mit konkreten Schreibrechten), Human Review an riskanten Schritten (nicht überall sonst entfällt der Sinn), vollständiges Trace-Logging jeder Entscheidung und jedes Tool-Aufrufs und ein Kill-Switch, der den Agenten sofort stoppt.',
        },
        {
          q: 'Wie messen Sie, ob ein Agent funktioniert?',
          a: 'Minuten pro Vorgang vorher und nachher zählen (inklusive Review-Zeit), mit dem Vollkostensatz multiplizieren, Entwicklungs- und Betriebskosten abziehen. Ist die Zahl im ersten Jahr nicht überzeugend, war der Prozess falsch gewählt.',
        },
        {
          q: 'Können Agent und klassische Automatisierung zusammen arbeiten?',
          a: 'Ja in Produktion ist Hybrid die Regel. Deterministische Automatisierung bildet das Rückgrat und die strukturierten Schritte; Agent-Schritte werden exakt dort eingesetzt, wo unstrukturierter Input interpretiert werden muss. Zuverlässiger als Agent-only.',
        },
        {
          q: 'Was geht in Produktion mit Agenten schief?',
          a: 'Risikoreiche Aktionen ohne Review (Überweisungen, Rechtevergabe, öffentliche Kommunikation); stille Fehlerpfade, die erst im Quartals-Review auffallen; Kontext außerhalb des Korpus (Leitungskreis letzter Woche), den der Agent nicht kennen kann.',
        },
      ],
      related: [
        { label: 'KI-Agenten & Automatisierung (Leistung)', href: '/services/development/ki-automatisierung' },
        { label: 'KI-Agent (Glossar)', href: '/glossary/ki-agent' },
        { label: 'KI-Agenten im echten Betrieb (Blog)', href: '/blog/ai-agents-in-real-operations' },
      ],
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
  return buildMetadata({ locale, path: `/compare/${slug}`, title: c.title, description: c.intro, type: 'article' });
}

export default async function ComparePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const found = compares[slug];
  if (!found) notFound();
  setRequestLocale(locale);
  const c = found[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const pageUrl = `${site.url}${prefix}/compare/${slug}`;

  return (
    <>
      <section className="container py-14">
        <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">{c.title}</h1>
        {/* 1-sentence definition under the H1 — the format AI answer engines
            quote directly in overviews. */}
        <p className="mt-4 max-w-3xl text-lg font-medium text-brand-900 dark:text-white">
          {c.definition}
        </p>
        <p className="mt-4 max-w-3xl text-brand-900/85 dark:text-white/85">{c.intro}</p>
      </section>

      <ComparisonTable headers={c.headers} rows={c.rows} />

      <section className="container py-8">
        <div className="rounded-2xl bg-brand-50 p-6 dark:bg-white/5">
          <p className="text-brand-900 dark:text-white">
            <strong>{locale === 'de' ? 'Fazit:' : 'Verdict:'}</strong> {c.verdict}
          </p>
        </div>
      </section>

      {/* Q&A section — one H2 per question, 50-120 words per answer. This is
          the format Perplexity + ChatGPT + Google AI Overviews quote from. */}
      <section className="container py-10">
        <h2 className="font-display text-2xl font-bold text-brand-900 dark:text-white">
          {locale === 'de' ? 'Häufige Fragen' : 'Common questions'}
        </h2>
        <div className="mt-6 space-y-8">
          {c.qas.map((qa, i) => (
            <article key={qa.q} id={`faq-${i + 1}`}>
              <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
                {qa.q}
              </h3>
              <p className="mt-2 max-w-3xl text-brand-900/85 dark:text-white/85">{qa.a}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Related reading — the single highest-leverage internal links on the
          site. Compare pages are discovery entry points, so they must link
          to the services they discuss. */}
      <section
        aria-labelledby="related-reading"
        className="container border-t border-brand-900/10 py-10 dark:border-white/10"
      >
        <h2 id="related-reading" className="font-display text-xl font-semibold text-brand-900 dark:text-white">
          {locale === 'de' ? 'Weiterführend' : 'Related reading'}
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {c.related.map((r) => (
            <li key={r.href}>
              <Link
                href={`${prefix}${r.href}`}
                className="inline-flex rounded-full border border-brand-900/20 bg-white px-4 py-2 text-sm font-medium text-brand-900 hover:border-brand-900/40 dark:border-white/20 dark:bg-white/5 dark:text-white"
              >
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CTASection
        title={locale === 'de' ? 'Passt es zu Ihrer Situation?' : 'Does it fit your situation?'}
        body={locale === 'de' ? 'Kurze schriftliche Einschätzung binnen eines Werktags.' : 'Short written assessment within one business day.'}
        primaryHref={`${prefix}/contact`}
        primaryLabel={locale === 'de' ? 'Kontakt aufnehmen' : 'Contact us'}
      />

      <SchemaJsonLd
        data={[
          techArticleSchema({
            locale,
            path: `/compare/${slug}`,
            title: c.title,
            description: c.intro,
            about: c.title,
          }),
          faqSchema(c.qas, { pageUrl }),
          webPageWithSpeakable({
            locale,
            path: `/compare/${slug}`,
            title: c.title,
            description: c.intro,
            cssSelectors: ['h1', 'main > section:first-of-type p.font-medium'],
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Vergleich' : 'Compare', href: `${prefix}/compare/${slug}` },
            { name: c.title, href: `${prefix}/compare/${slug}` },
          ]),
        ]}
      />
    </>
  );
}
