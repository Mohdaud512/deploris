import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { ToolFooter } from '@/components/tools/ToolFooter';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/demos',
    title: locale === 'de'
      ? 'Demo-Galerie Produktionsbeispiele aus unseren Projekten'
      : 'Demo gallery production samples from our builds',
    description: locale === 'de'
      ? 'Drei anonymisierte Beispiele aus Deploris-Projekten: eine RAG-Abfrage mit Quellen, ein Agenten-Trace mit Tool-Calls, ein CRM-Datenmodell. Vor dem ersten Gespräch prüfbar.'
      : 'Three anonymised samples from real Deploris engagements: a RAG query with sources, an agent trace with tool calls, a custom CRM data model. Inspectable before any sales call.',
  });
}

export default async function DemosPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const de = locale === 'de';
  const prefix = de ? '/de' : '';

  const copy = de
    ? {
        eyebrow: 'Demo-Galerie',
        title: 'Durchsuchbare Beispiele. Keine Verkaufsgespräche nötig.',
        deck: 'Drei Artefakte aus echten Deploris-Projekten, anonymisiert und auf Papier gebracht. Ihr:e Ingenieur:in kann sie prüfen, bevor Sie mit uns sprechen.',
        rag: {
          tag: 'RAG · Retrieval mit Quellen',
          title: 'Was kostet uns ein spätes Signoff bei Lieferant X?',
          description: 'Beispielhafte RAG-Antwort über ein Dokumentenkorpus aus Verträgen und E-Mail-Threads. Antwort grounded, Zitate pro Behauptung, Nicht-Antwort bei fehlender Grundlage.',
          sources: 'Quellen: 3 Dokumente, 7 Passagen',
        },
        agent: {
          tag: 'Agent · Trace eines Produktionslaufs',
          title: 'Reichweite eines verlorenen Opportunities analysieren',
          description: 'Trace eines KI-Agenten mit vier Tool-Calls, einem Human-in-the-Loop-Review und einem automatisch generierten CRM-Update. Jeder Schritt protokolliert, reversibel.',
        },
        crm: {
          tag: 'CRM · Datenmodell-Auszug',
          title: 'Account-Hierarchie für Mehrstandort-Vertrieb',
          description: 'Ausschnitt aus einem individuellen CRM-Datenmodell: Account-Hierarchie, Deal-Pipeline, Aktivitäten mit RBAC-Scopes. Editierbar, versioniert, auditierbar.',
        },
        ctaRag: 'Zum RAG-Service',
        ctaAgent: 'Zum KI-Agenten-Service',
        ctaCrm: 'Zum CRM-Service',
        hrefRag: `${prefix}/services/development/rag-systeme`,
        hrefAgent: `${prefix}/services/development/ki-automatisierung`,
        hrefCrm: `${prefix}/services/development/crm-entwicklung`,
        disclaimer: 'Hinweis: Alle Daten in den Beispielen sind synthetisch. Reale Kundendaten erscheinen nie in öffentlichen Materialien.',
      }
    : {
        eyebrow: 'Demo gallery',
        title: 'Inspectable samples. No sales call required.',
        deck: 'Three artifacts from real Deploris engagements, anonymised and on paper. Your engineer can poke at them before you talk to us.',
        rag: {
          tag: 'RAG · retrieval with sources',
          title: 'What does a late signoff from Supplier X actually cost us?',
          description: 'Sample RAG answer over a corpus of contracts and email threads. Grounded answer, source citation per claim, principled non-answer when evidence is missing.',
          sources: 'Sources: 3 docs, 7 passages',
        },
        agent: {
          tag: 'Agent · production run trace',
          title: 'Analyse the reach of a lost opportunity',
          description: 'Trace of a production agent with four tool calls, one human-in-the-loop review, and one auto-generated CRM update. Every step logged, every write reversible.',
        },
        crm: {
          tag: 'CRM · data model excerpt',
          title: 'Account hierarchy for multi-location sales',
          description: 'Slice of a custom CRM data model: account hierarchy, deal pipeline, activities with RBAC scopes. Editable, versioned, auditable.',
        },
        ctaRag: 'See RAG service',
        ctaAgent: 'See AI agents service',
        ctaCrm: 'See custom CRM service',
        hrefRag: `${prefix}/services/development/rag-systems`,
        hrefAgent: `${prefix}/services/development/ai-agents-automation`,
        hrefCrm: `${prefix}/services/development/custom-crm`,
        disclaimer: 'Note: all data in the samples is synthetic. Real client data never appears in public material.',
      };

  return (
    <>
      <section className="container py-14 md:py-20">
        <div className="max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent-600 dark:text-accent-400">{copy.eyebrow}</p>
          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-brand-900 md:text-5xl dark:text-white">{copy.title}</h1>
          <p className="mt-5 text-lg text-brand-900/80 dark:text-white/80">{copy.deck}</p>
        </div>

        {/* RAG sample */}
        <article className="mt-14 grid gap-6 rounded-2xl border border-brand-900/10 bg-white p-6 md:p-8 lg:grid-cols-[1fr_1.4fr] dark:border-white/10 dark:bg-white/5">
          <header>
            <span className="rounded-full border border-accent-500/40 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent-700 dark:text-accent-300">
              {copy.rag.tag}
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-brand-900 dark:text-white">{copy.rag.title}</h2>
            <p className="mt-2 text-sm text-brand-900/75 dark:text-white/70">{copy.rag.description}</p>
            <Link href={copy.hrefRag} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-300">
              {copy.ctaRag} →
            </Link>
          </header>
          <div className="min-w-0 overflow-hidden rounded-xl border border-brand-900/10 bg-brand-50/70 p-5 font-mono text-[0.78rem] leading-relaxed text-brand-900 dark:border-white/10 dark:bg-brand-950/60 dark:text-white/90">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-brand-900/10 pb-2 dark:border-white/10">
              <span className="text-brand-900/60 dark:text-white/50">query.jsonl</span>
              <span className="whitespace-nowrap text-accent-700 dark:text-accent-300">{copy.rag.sources}</span>
            </div>
            <RagTrace de={de} />
          </div>
        </article>

        {/* Agent sample */}
        <article className="mt-6 grid gap-6 rounded-2xl border border-brand-900/10 bg-white p-6 md:p-8 lg:grid-cols-[1fr_1.4fr] dark:border-white/10 dark:bg-white/5">
          <header>
            <span className="rounded-full border border-accent-500/40 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent-700 dark:text-accent-300">
              {copy.agent.tag}
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-brand-900 dark:text-white">{copy.agent.title}</h2>
            <p className="mt-2 text-sm text-brand-900/75 dark:text-white/70">{copy.agent.description}</p>
            <Link href={copy.hrefAgent} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-300">
              {copy.ctaAgent} →
            </Link>
          </header>
          <div className="min-w-0 overflow-x-auto rounded-xl border border-brand-900/10 bg-brand-50/70 p-5 font-mono text-[0.78rem] leading-relaxed text-brand-900 dark:border-white/10 dark:bg-brand-950/60 dark:text-white/90">
            <AgentTrace de={de} />
          </div>
        </article>

        {/* CRM sample */}
        <article className="mt-6 grid gap-6 rounded-2xl border border-brand-900/10 bg-white p-6 md:p-8 lg:grid-cols-[1fr_1.4fr] dark:border-white/10 dark:bg-white/5">
          <header>
            <span className="rounded-full border border-accent-500/40 bg-accent-500/10 px-2.5 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-accent-700 dark:text-accent-300">
              {copy.crm.tag}
            </span>
            <h2 className="mt-4 font-display text-xl font-semibold text-brand-900 dark:text-white">{copy.crm.title}</h2>
            <p className="mt-2 text-sm text-brand-900/75 dark:text-white/70">{copy.crm.description}</p>
            <Link href={copy.hrefCrm} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 hover:underline dark:text-accent-300">
              {copy.ctaCrm} →
            </Link>
          </header>
          <div className="min-w-0 overflow-x-auto rounded-xl border border-brand-900/10 bg-brand-50/70 p-5 font-mono text-[0.78rem] leading-relaxed text-brand-900 dark:border-white/10 dark:bg-brand-950/60 dark:text-white/90">
            <CrmModel de={de} />
          </div>
        </article>

        <p className="mt-10 max-w-3xl text-xs text-brand-900/55 dark:text-white/50">{copy.disclaimer}</p>
      </section>
      <ToolFooter
        locale={locale}
        breadcrumbTrail={[
          { label: 'Home', href: prefix || '/' },
          { label: de ? 'Demo-Galerie' : 'Demo gallery', href: `${prefix}/demos` },
        ]}
        nextSteps={[
          {
            label: de ? 'Zum RAG-Service' : 'See the RAG systems service',
            href: copy.hrefRag,
          },
          {
            label: de ? 'Zum KI-Agenten-Service' : 'See the AI agents service',
            href: copy.hrefAgent,
          },
          {
            label: de ? 'Zum CRM-Service' : 'See the custom CRM service',
            href: copy.hrefCrm,
          },
          {
            label: de ? 'KI-Chancen-Finder (10 Fragen)' : 'AI Opportunity Finder (10 questions)',
            href: `${prefix}/ai-opportunity-finder`,
          },
        ]}
      />
    </>
  );
}

function RagTrace({ de }: { de: boolean }) {
  const dim = 'text-brand-900/70 dark:text-white/55';
  const num = 'text-accent-700 dark:text-accent-300';
  const quote = 'text-brand-900/85 dark:text-white/85';

  const question = de
    ? 'Wie viel kostet uns ein später Signoff bei Lieferant X pro Monat?'
    : 'How much does a late signoff from Supplier X cost us per month?';
  const src1Quote = de ? '... Verzugspauschale 1,8% der Monatsrechnung ...' : '... delay penalty 1.8% of monthly invoice ...';
  const src2Doc = de ? 'rechnungen-2026' : 'invoices-2026';
  const src2Quote = de ? 'Monatsrechnung Lieferant X: 84.300 €' : 'Monthly invoice Supplier X: €84,300';
  const src3Quote = de ? '... Signoff kam am 11. jedes Monats, 8 Tage spät ...' : '... signoff landed on the 11th, 8 days late ...';
  const answer = de
    ? '~1.517 € pro Monat Verzugspauschale (1,8 % × 84.300 €), über die letzten vier Monate durchgängig ausgelöst, ca. 18.200 € jährlicher Mehraufwand bei unverändertem Signoff-Rhythmus. Quellen [1][2][3].'
    : '~€1,517/month in delay penalties (1.8% × €84,300), triggered every month for the last four, approximately €18,200/year of avoidable spend at the current signoff cadence. Sources [1][2][3].';

  return (
    <pre className="whitespace-pre-wrap break-words font-mono">
      <span className={num}>&gt;</span> {question}
      {'\n\n'}
      <span className={dim}>retrieval:</span>
      {'\n  '}
      <span className={num}>[1]</span> contract-supplier-x-v3.pdf §12.2
      {'\n      "'}<span className={quote}>{src1Quote}</span>{'"'}
      {'\n  '}
      <span className={num}>[2]</span> finance-ops/{src2Doc}.csv row 142
      {'\n      "'}<span className={quote}>{src2Quote}</span>{'"'}
      {'\n  '}
      <span className={num}>[3]</span> email/thread-9821.eml
      {'\n      "'}<span className={quote}>{src3Quote}</span>{'"'}
      {'\n\n'}
      <span className={dim}>answer:</span>
      {'\n  '}{answer}
      {'\n\n'}
      <span className={dim}>confidence:</span> <span className={num}>0.92</span>
      {'\n'}
      <span className={dim}>refusal_if_unsupported:</span> true
    </pre>
  );
}

function AgentTrace({ de }: { de: boolean }) {
  const t = de
    ? {
        title: 'agent://opportunity-recall',
        tool1: 'crm.getOpportunity(id=OPP-8421)',
        tool1res: 'owner: alex@…  stage: Closed-Lost  value: €62k  closed: 2026-07-14',
        tool2: 'email.search({"account":"OPP-8421.accountId", "last":"90d"})',
        tool2res: 'found 23 messages across 5 threads',
        tool3: 'rag.query("why did we lose", scope=OPP-8421)',
        tool3res: '→ pricing mentioned 6× in last two threads; incumbent 15% below quote',
        tool4: 'calendar.proposeSlot(owner="alex", purpose="renewal nudge", window="next 10 days")',
        gateTitle: 'HUMAN REVIEW',
        gateBody: 'Draft outreach to decision-maker + proposed talking points shown to alex@ for approval. Approved at 14:03 CET.',
        write: 'crm.updateOpportunity(id=OPP-8421, nextAction="renewal-nudge", followUp="2026-10-18")',
        status: '✓ run complete · 4 tool calls · 1 HITL gate · 1 reversible write',
      }
    : {
        title: 'agent://opportunity-recall',
        tool1: 'crm.getOpportunity(id=OPP-8421)',
        tool1res: 'owner: alex@…  stage: Closed-Lost  value: $62k  closed: 2026-07-14',
        tool2: 'email.search({"account":"OPP-8421.accountId", "last":"90d"})',
        tool2res: 'found 23 messages across 5 threads',
        tool3: 'rag.query("why did we lose", scope=OPP-8421)',
        tool3res: '→ pricing mentioned 6× in last two threads; incumbent 15% below quote',
        tool4: 'calendar.proposeSlot(owner="alex", purpose="renewal nudge", window="next 10 days")',
        gateTitle: 'HUMAN REVIEW',
        gateBody: 'Draft outreach to decision-maker + proposed talking points shown to alex@ for approval. Approved at 14:03 CET.',
        write: 'crm.updateOpportunity(id=OPP-8421, nextAction="renewal-nudge", followUp="2026-10-18")',
        status: '✓ run complete · 4 tool calls · 1 HITL gate · 1 reversible write',
      };

  const line = (n: string, label: string, body: string, tone: 'tool' | 'write' | 'gate' | 'out') => (
    <div className="grid grid-cols-[2.5rem_1fr] gap-2">
      <span className="text-brand-900/50 dark:text-white/40">{n}</span>
      <div className="min-w-0">
        <div className={tone === 'write' ? 'text-accent-700 dark:text-accent-300' : tone === 'gate' ? 'text-brand-900 dark:text-white' : 'text-brand-900/80 dark:text-white/85'}>
          {label}
        </div>
        <div className="text-brand-900/60 dark:text-white/55">{body}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between border-b border-brand-900/10 pb-2 dark:border-white/10">
        <span className="text-brand-900/60 dark:text-white/50">{t.title}</span>
        <span className="text-accent-700 dark:text-accent-300">trace.jsonl</span>
      </div>
      {line('01', `→ ${t.tool1}`, t.tool1res, 'tool')}
      {line('02', `→ ${t.tool2}`, t.tool2res, 'tool')}
      {line('03', `→ ${t.tool3}`, t.tool3res, 'tool')}
      {line('04', `→ ${t.tool4}`, '', 'tool')}
      <div className="rounded-md border border-accent-500/40 bg-accent-500/10 p-3 text-brand-900 dark:text-white">
        <div className="font-mono text-[0.68rem] tracking-[0.1em] text-accent-700 dark:text-accent-300">{t.gateTitle}</div>
        <div className="mt-1 text-brand-900/80 dark:text-white/80">{t.gateBody}</div>
      </div>
      {line('05', `✎ ${t.write}`, '', 'write')}
      <div className="pt-1 text-accent-700 dark:text-accent-300">{t.status}</div>
    </div>
  );
}

function CrmModel({ de }: { de: boolean }) {
  return (
    <pre className="whitespace-pre overflow-x-auto">
{`model Account {
  id            String   @id
  name          String
  type          AccountType  // ${de ? 'HQ | SITE | FRANCHISE' : 'HQ | SITE | FRANCHISE'}
  parent        Account? @relation("hierarchy")
  region        Region
  createdBy     UserId
  @@index([region, type])
}

model Deal {
  id            String   @id
  accountId     Account.id
  owner         UserId
  stage         DealStage
  value         Money
  currency      ISO4217
  expectedClose Date
  rbac          Scope[]   // ${de ? 'wer darf lesen/schreiben' : 'who can read/write'}
}

model Activity {
  id            String   @id
  dealId        Deal.id
  kind          Kind       // ${de ? 'EMAIL | ANRUF | NOTIZ | AGENT_WRITE' : 'EMAIL | CALL | NOTE | AGENT_WRITE'}
  author        UserId | AgentId
  body          Text
  at            Timestamp
  reversible    Boolean    @default(true)
}`}
    </pre>
  );
}
