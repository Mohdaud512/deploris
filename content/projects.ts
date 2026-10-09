import type { Locale } from '@/config/locales';

export type ProjectCase = {
  slug: string;
  line: 'hardware' | 'development';
  /** Publication date for Article schema. Keep stable; don't tie to rebuild. */
  date: string;
  /** Industry + anonymized client descriptor used for schema.about. */
  about: string;
  copy: Record<Locale, {
    title: string;
    summary: string;
    result: string;
    challenge: string;
    solution: string;
    stack: string[];
    metrics: { label: string; value: string }[];
  }>;
};

export const projects: ProjectCase[] = [
  {
    slug: 'smb-crm-replacement',
    line: 'development',
    date: '2025-02-18',
    about: 'Custom CRM development for a 40-person US B2B revenue team.',
    copy: {
      en: {
        title: 'SMB revenue team replaces per-seat CRM in eight weeks',
        summary: 'A 40-person US B2B team retired a bloated CRM contract and moved to a custom system aligned to their sales stages.',
        result: '$110k / year saved and average deal cycle down by 12%.',
        challenge: 'The team had drifted onto a per-seat CRM that no longer matched their pipeline. Every stage change required a paid configurator; reporting was locked behind an enterprise tier.',
        solution: 'A custom CRM replicated the actual sales stages, integrated with billing and marketing, and shipped role-based access. Migration ran under change control.',
        stack: ['Next.js', 'Postgres', 'Prisma', 'Stripe', 'Segment'],
        metrics: [
          { label: 'License saved / yr', value: '$110k' },
          { label: 'Deal cycle', value: '−12%' },
          { label: 'Time to first release', value: '4 wk' },
        ],
      },
      de: {
        title: 'B2B-Team ersetzt Lizenz-CRM in acht Wochen',
        summary: 'Ein US-B2B-Team mit 40 Personen löste einen aufgeblähten CRM-Vertrag ab und wechselte auf ein individuelles System, das zu den realen Vertriebsstufen passt.',
        result: '110.000 $ / Jahr gespart, Deal-Zyklus um 12 % verkürzt.',
        challenge: 'Das Team war auf ein Per-Seat-CRM abgeglitten, das nicht mehr zur Pipeline passte. Jede Stufenänderung erforderte einen kostenpflichtigen Configurator; Reporting war in einer Enterprise-Stufe eingesperrt.',
        solution: 'Ein individuelles CRM bildete die realen Vertriebsstufen ab, integrierte Billing und Marketing und lieferte rollenbasierte Zugriffskontrolle. Migration unter Change-Kontrolle.',
        stack: ['Next.js', 'Postgres', 'Prisma', 'Stripe', 'Segment'],
        metrics: [
          { label: 'Lizenz-Ersparnis / Jahr', value: '$110k' },
          { label: 'Deal-Zyklus', value: '−12%' },
          { label: 'Zeit bis zum ersten Release', value: '4 Wo.' },
        ],
      },
    },
  },
  {
    slug: 'support-rag-knowledge',
    line: 'development',
    date: '2025-04-22',
    about: 'RAG assistant for a B2B SaaS support team.',
    copy: {
      en: {
        title: 'RAG assistant grounds support answers in current documentation',
        summary: 'A B2B SaaS support team stopped answering from a stale wiki and started answering from source-cited RAG results.',
        result: 'Repeat-question deflection up 34% with zero hallucinated fact incidents.',
        challenge: 'Support agents kept quoting a wiki that had drifted from product reality. Escalations spiked whenever the wiki was wrong.',
        solution: 'A RAG assistant indexes product docs, release notes, and known-issues, retrieves per-question, and cites source URLs. Weekly eval on a growing question set.',
        stack: ['TypeScript', 'pgvector', 'Postgres', 'OpenAI compatible LLM', 'Zendesk'],
        metrics: [
          { label: 'Deflection', value: '+34%' },
          { label: 'Hallucinated facts', value: '0' },
          { label: 'Median answer time', value: '−41%' },
        ],
      },
      de: {
        title: 'RAG-Assistent verankert Support-Antworten in aktueller Dokumentation',
        summary: 'Ein B2B-SaaS-Support wechselte von einem veralteten Wiki auf Antworten mit Quellenzitat aus einem RAG-System.',
        result: 'Deflection wiederkehrender Fragen +34 %, null Halluzinations-Vorfälle.',
        challenge: 'Agenten zitierten ein Wiki, das von der Produktrealität abwich. Eskalationen stiegen mit jedem Fehler.',
        solution: 'Ein RAG-Assistent indexiert Produkt-Docs, Release-Notes und Known-Issues, ruft je Frage die relevanten Passagen ab und zitiert Quellen. Wöchentliche Evaluation.',
        stack: ['TypeScript', 'pgvector', 'Postgres', 'OpenAI-kompatibles LLM', 'Zendesk'],
        metrics: [
          { label: 'Deflection', value: '+34%' },
          { label: 'Halluzinierte Fakten', value: '0' },
          { label: 'Mediane Antwortzeit', value: '−41%' },
        ],
      },
    },
  },
  {
    slug: 'multi-site-rollout',
    line: 'hardware',
    date: '2025-06-10',
    about: 'Multi-site endpoint and network refresh for a mid-market services firm.',
    copy: {
      en: {
        title: 'Twelve-site hardware refresh delivered under change control',
        summary: 'A mid-market services firm refreshed endpoints and network gear across twelve sites in seven weeks.',
        result: 'Zero critical incidents post-cutover; five percent under budget.',
        challenge: 'A fleet of aging endpoints and switches with no consistent standard, and a business unable to tolerate multi-day outages.',
        solution: 'Per-site playbook, staged pilot, weekend cutover windows, and hypercare for two weeks post-cutover.',
        stack: ['Windows 11 imaging', 'Intune', 'Cisco / Meraki networking', 'ConnectWise ticketing'],
        metrics: [
          { label: 'Sites delivered', value: '12' },
          { label: 'Critical incidents', value: '0' },
          { label: 'Budget variance', value: '−5%' },
        ],
      },
      de: {
        title: 'Hardware-Refresh an zwölf Standorten unter Change-Kontrolle',
        summary: 'Ein mittelständischer Dienstleister erneuerte Endgeräte und Netzwerk-Technik an zwölf Standorten in sieben Wochen.',
        result: 'Kein kritischer Vorfall nach dem Cutover, 5 % unter Budget.',
        challenge: 'Eine gealterte Flotte aus Endgeräten und Switches ohne konsistenten Standard bei geringer Toleranz für Ausfälle.',
        solution: 'Standort-Playbook, gestufter Pilot, Cutover in Wochenend-Fenstern und zwei Wochen Hypercare.',
        stack: ['Windows 11 Imaging', 'Intune', 'Cisco / Meraki Netzwerk', 'ConnectWise Ticketing'],
        metrics: [
          { label: 'Standorte umgesetzt', value: '12' },
          { label: 'Kritische Vorfälle', value: '0' },
          { label: 'Budgetabweichung', value: '−5%' },
        ],
      },
    },
  },
];
