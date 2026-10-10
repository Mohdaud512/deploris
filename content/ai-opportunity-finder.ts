import type { Locale } from '@/config/locales';

/**
 * Deterministic rule-based scoring. Each answer contributes integer weights
 * across four axes. Final recommendation picks the top-scoring axis; the next
 * axis is surfaced as a secondary fit. Zero LLM calls, zero network — fully
 * static, works for anonymous visitors.
 */
export type Axis = 'crm' | 'rag' | 'agents' | 'managedIt';

export type Weights = Partial<Record<Axis, number>>;
export type Option = { id: string; label: string; weights: Weights };
export type Question = { id: string; prompt: string; options: Option[] };

type Content = {
  intro: {
    eyebrow: string;
    title: string;
    deck: string;
    bullets: string[];
    startLabel: string;
  };
  questions: Question[];
  axes: Record<Axis, { label: string; summary: string; serviceHref: string; serviceLabel: string }>;
  result: {
    eyebrow: string;
    titleTemplate: string;
    recommendedKicker: string;
    secondaryKicker: string;
    bodyIntro: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    restart: string;
    disclaimer: string;
  };
  common: {
    questionOf: (n: number, total: number) => string;
    back: string;
    next: string;
    finish: string;
  };
};

const EN: Content = {
  intro: {
    eyebrow: 'AI Opportunity Finder',
    title: 'Ten questions. One honest recommendation.',
    deck: 'No form, no email, no download. Answer where you actually are today and we score your situation against the four problems Deploris solves — custom CRM, RAG, AI agents, managed IT — and tell you which fits (or if none does).',
    bullets: [
      'Three minutes, ten questions',
      'Deterministic scoring, same answers → same result',
      'No email required to see the result',
    ],
    startLabel: 'Start the assessment',
  },
  questions: [
    {
      id: 'q1_painpoint',
      prompt: 'Where is the biggest operational pain in your business right now?',
      options: [
        { id: 'sales', label: 'Sales / customer-management workflow is a mess', weights: { crm: 3 } },
        { id: 'knowledge', label: 'Our team can\'t find or trust internal knowledge fast enough', weights: { rag: 3 } },
        { id: 'repetitive', label: 'Too much repetitive back-office work (triage, drafts, routing)', weights: { agents: 3 } },
        { id: 'itops', label: 'Infrastructure, uptime, or security is a constant headache', weights: { managedIt: 3 } },
      ],
    },
    {
      id: 'q2_tools',
      prompt: 'How many SaaS tools does your revenue team currently juggle for customer-related work?',
      options: [
        { id: 'few', label: '0–1 (we barely have one in place)', weights: { crm: 1 } },
        { id: 'some', label: '2–4 (manageable but there are seams)', weights: { crm: 2 } },
        { id: 'many', label: '5+ (CRM, marketing tool, support tool, billing, enrichment …)', weights: { crm: 3, agents: 1 } },
        { id: 'na', label: 'Not applicable — we\'re not a revenue-team-driven business', weights: {} },
      ],
    },
    {
      id: 'q3_knowledge',
      prompt: 'Where does most of your institutional knowledge live today?',
      options: [
        { id: 'docs', label: 'Wiki, Notion, Confluence, Google Drive', weights: { rag: 2 } },
        { id: 'tickets', label: 'Support tickets, past customer conversations', weights: { rag: 3, agents: 1 } },
        { id: 'email', label: 'Email threads and chat scrollback', weights: { rag: 2, agents: 1 } },
        { id: 'heads', label: 'Mostly in people\'s heads', weights: { rag: 1 } },
      ],
    },
    {
      id: 'q4_pilots',
      prompt: 'Have you shipped an AI pilot in production before?',
      options: [
        { id: 'none', label: 'No, this would be our first', weights: {} },
        { id: 'failed', label: 'Yes, and it didn\'t stick — want help getting it right', weights: { agents: 2, rag: 1 } },
        { id: 'working', label: 'Yes, one is live, looking to expand', weights: { agents: 2, rag: 2 } },
        { id: 'many', label: 'Multiple pilots in flight, need help picking winners', weights: { agents: 3, rag: 1 } },
      ],
    },
    {
      id: 'q5_itheadache',
      prompt: 'What\'s your biggest IT operations headache?',
      options: [
        { id: 'uptime', label: 'Uptime / incident response', weights: { managedIt: 3 } },
        { id: 'security', label: 'Security posture / audits / compliance', weights: { managedIt: 2 } },
        { id: 'spend', label: 'Infrastructure spend / vendor sprawl', weights: { managedIt: 2 } },
        { id: 'none', label: 'IT runs fine, software is the bottleneck', weights: {} },
      ],
    },
    {
      id: 'q6_residency',
      prompt: 'How critical is EU / German data residency for your workload?',
      options: [
        { id: 'low', label: 'Not important', weights: {} },
        { id: 'medium', label: 'Nice to have', weights: { rag: 1, managedIt: 1 } },
        { id: 'high', label: 'Mandatory — regulated industry or German B2B', weights: { rag: 2, managedIt: 2, agents: 1 } },
      ],
    },
    {
      id: 'q7_size',
      prompt: 'Rough team size?',
      options: [
        { id: 'xs', label: 'Under 50', weights: {} },
        { id: 's', label: '50–200', weights: { crm: 1, agents: 1 } },
        { id: 'm', label: '200–2,000 (Deploris sweet spot)', weights: { crm: 1, rag: 1, agents: 1, managedIt: 1 } },
        { id: 'l', label: '2,000+', weights: { managedIt: 1 } },
      ],
    },
    {
      id: 'q8_timeline',
      prompt: 'What\'s the realistic timeline for the first production outcome?',
      options: [
        { id: '30d', label: 'Next 30 days — something is already on fire', weights: { managedIt: 2, agents: 1 } },
        { id: '90d', label: '1–3 months — budget approved, need to move', weights: { crm: 1, rag: 2, agents: 1 } },
        { id: '180d', label: '3–6 months — mapping out the quarter', weights: { crm: 2, rag: 1 } },
        { id: 'explore', label: 'Exploring — no deadline', weights: {} },
      ],
    },
    {
      id: 'q9_crm_state',
      prompt: 'Describe your current CRM situation.',
      options: [
        { id: 'none', label: 'Don\'t have one', weights: { crm: 2 } },
        { id: 'sheets', label: 'Spreadsheets and willpower', weights: { crm: 3 } },
        { id: 'painful', label: 'Off-the-shelf (HubSpot / Salesforce) but we fight it daily', weights: { crm: 3 } },
        { id: 'fine', label: 'Off-the-shelf and it works fine', weights: {} },
      ],
    },
    {
      id: 'q10_owner',
      prompt: 'Who owns the budget for this decision?',
      options: [
        { id: 'cto', label: 'CTO / VP Engineering', weights: { rag: 1, agents: 2, managedIt: 1 } },
        { id: 'cio', label: 'CIO / Head of IT', weights: { managedIt: 2, rag: 1 } },
        { id: 'coo', label: 'COO / Head of Ops', weights: { agents: 2, crm: 1 } },
        { id: 'cfo', label: 'CFO / Finance', weights: { crm: 1, managedIt: 1 } },
        { id: 'ceo', label: 'CEO / Founder', weights: { crm: 1, rag: 1, agents: 1 } },
      ],
    },
  ],
  axes: {
    crm: {
      label: 'Custom CRM development',
      summary: 'Your pain is customer-management shape, not AI shape. A custom CRM that fits your actual sales process — and replaces license bloat — is the highest-ROI next step.',
      serviceHref: '/services/development/custom-crm',
      serviceLabel: 'See custom CRM service',
    },
    rag: {
      label: 'RAG systems',
      summary: 'Your team is drowning in knowledge they can\'t retrieve or trust. A retrieval-augmented generation system grounded in your docs, with cited answers, is the right first AI build.',
      serviceHref: '/services/development/rag-systems',
      serviceLabel: 'See RAG service',
    },
    agents: {
      label: 'AI agents and automation',
      summary: 'You have repetitive, well-defined work that an AI agent with proper guardrails can take over end-to-end. Human-in-the-loop at the risky steps, full logging, kill switch.',
      serviceHref: '/services/development/ai-agents-automation',
      serviceLabel: 'See AI agents service',
    },
    managedIt: {
      label: 'Managed IT & infrastructure',
      summary: 'The software side matters less than keeping the lights on. 24/7 monitoring, patching, incident response under a written SLA is the next step.',
      serviceHref: '/services/hardware/infrastructure-support',
      serviceLabel: 'See infrastructure support',
    },
  },
  result: {
    eyebrow: 'Your result',
    titleTemplate: 'Best fit: {label}',
    recommendedKicker: 'Primary recommendation',
    secondaryKicker: 'Also worth looking at',
    bodyIntro: 'Based on your answers, Deploris would open with this. If it\'s wildly off, your inputs were probably ambiguous — try again or jump straight to a conversation.',
    ctaPrimary: 'Book a 30-min scoping call',
    ctaPrimaryHref: '/contact',
    ctaSecondary: 'Request a written quote',
    ctaSecondaryHref: '/quote',
    restart: 'Start over',
    disclaimer: 'Rule-based scoring from your inputs. No answers are stored; nothing is sent anywhere unless you reach out.',
  },
  common: {
    questionOf: (n, total) => `Question ${n} of ${total}`,
    back: 'Back',
    next: 'Next',
    finish: 'See the recommendation',
  },
};

const DE: Content = {
  intro: {
    eyebrow: 'KI-Chancen-Finder',
    title: 'Zehn Fragen. Eine ehrliche Empfehlung.',
    deck: 'Kein Formular, keine E-Mail, kein Download. Antworten Sie dort, wo Sie heute wirklich stehen — wir bewerten Ihre Situation gegen die vier Probleme, die Deploris löst (individuelle CRM-Systeme, RAG, KI-Agenten, Managed IT) und sagen Ihnen, was passt. Oder dass keines passt.',
    bullets: [
      'Drei Minuten, zehn Fragen',
      'Deterministische Bewertung: gleiche Antworten → gleiches Ergebnis',
      'Keine E-Mail nötig, um das Ergebnis zu sehen',
    ],
    startLabel: 'Assessment starten',
  },
  questions: [
    {
      id: 'q1_painpoint',
      prompt: 'Wo ist aktuell der größte operative Schmerz in Ihrem Unternehmen?',
      options: [
        { id: 'sales', label: 'Vertriebs- und Kundenprozesse laufen chaotisch', weights: { crm: 3 } },
        { id: 'knowledge', label: 'Unser Team findet internes Wissen nicht schnell oder zuverlässig', weights: { rag: 3 } },
        { id: 'repetitive', label: 'Zu viel repetitive Back-Office-Arbeit (Triage, Entwürfe, Routing)', weights: { agents: 3 } },
        { id: 'itops', label: 'Infrastruktur, Verfügbarkeit oder Sicherheit sind Dauerbaustellen', weights: { managedIt: 3 } },
      ],
    },
    {
      id: 'q2_tools',
      prompt: 'Wie viele SaaS-Tools nutzt Ihr Vertriebs-Team heute für kundenbezogene Arbeit?',
      options: [
        { id: 'few', label: '0–1 (kaum eins im Einsatz)', weights: { crm: 1 } },
        { id: 'some', label: '2–4 (handhabbar, aber mit Brüchen)', weights: { crm: 2 } },
        { id: 'many', label: '5+ (CRM, Marketing, Support, Billing, Enrichment …)', weights: { crm: 3, agents: 1 } },
        { id: 'na', label: 'Nicht relevant — wir sind kein vertriebsgetriebenes Geschäft', weights: {} },
      ],
    },
    {
      id: 'q3_knowledge',
      prompt: 'Wo liegt das meiste institutionelle Wissen heute?',
      options: [
        { id: 'docs', label: 'Wiki, Notion, Confluence, Google Drive', weights: { rag: 2 } },
        { id: 'tickets', label: 'Support-Tickets, vergangene Kundenkommunikation', weights: { rag: 3, agents: 1 } },
        { id: 'email', label: 'E-Mail-Threads, Chat-Scrollback', weights: { rag: 2, agents: 1 } },
        { id: 'heads', label: 'Vor allem in den Köpfen der Mitarbeitenden', weights: { rag: 1 } },
      ],
    },
    {
      id: 'q4_pilots',
      prompt: 'Haben Sie bereits einen KI-Piloten in Produktion gebracht?',
      options: [
        { id: 'none', label: 'Nein, das wäre unser erster', weights: {} },
        { id: 'failed', label: 'Ja, hat aber nicht gegriffen — brauche Unterstützung', weights: { agents: 2, rag: 1 } },
        { id: 'working', label: 'Ja, einer läuft, wir wollen ausbauen', weights: { agents: 2, rag: 2 } },
        { id: 'many', label: 'Mehrere Piloten parallel, brauchen Hilfe beim Priorisieren', weights: { agents: 3, rag: 1 } },
      ],
    },
    {
      id: 'q5_itheadache',
      prompt: 'Was ist Ihre größte IT-Betrieb-Baustelle?',
      options: [
        { id: 'uptime', label: 'Verfügbarkeit / Incident-Response', weights: { managedIt: 3 } },
        { id: 'security', label: 'Security-Posture / Audits / Compliance', weights: { managedIt: 2 } },
        { id: 'spend', label: 'Infrastruktur-Kosten / Vendor-Wildwuchs', weights: { managedIt: 2 } },
        { id: 'none', label: 'IT läuft, der Engpass sitzt in der Software', weights: {} },
      ],
    },
    {
      id: 'q6_residency',
      prompt: 'Wie kritisch ist EU- oder deutsche Datenresidenz für Ihre Workloads?',
      options: [
        { id: 'low', label: 'Nicht wichtig', weights: {} },
        { id: 'medium', label: 'Nice to have', weights: { rag: 1, managedIt: 1 } },
        { id: 'high', label: 'Zwingend — regulierte Branche oder deutsches B2B', weights: { rag: 2, managedIt: 2, agents: 1 } },
      ],
    },
    {
      id: 'q7_size',
      prompt: 'Wie groß ist Ihr Team ungefähr?',
      options: [
        { id: 'xs', label: 'Unter 50', weights: {} },
        { id: 's', label: '50–200', weights: { crm: 1, agents: 1 } },
        { id: 'm', label: '200–2.000 (Deploris-Sweet-Spot)', weights: { crm: 1, rag: 1, agents: 1, managedIt: 1 } },
        { id: 'l', label: '2.000+', weights: { managedIt: 1 } },
      ],
    },
    {
      id: 'q8_timeline',
      prompt: 'Realistischer Zeitrahmen für das erste produktive Ergebnis?',
      options: [
        { id: '30d', label: 'Nächste 30 Tage — etwas brennt bereits', weights: { managedIt: 2, agents: 1 } },
        { id: '90d', label: '1–3 Monate — Budget steht, es muss vorwärtsgehen', weights: { crm: 1, rag: 2, agents: 1 } },
        { id: '180d', label: '3–6 Monate — wir planen das Quartal', weights: { crm: 2, rag: 1 } },
        { id: 'explore', label: 'Explorativ — keine Deadline', weights: {} },
      ],
    },
    {
      id: 'q9_crm_state',
      prompt: 'Beschreiben Sie Ihre aktuelle CRM-Situation.',
      options: [
        { id: 'none', label: 'Haben keins', weights: { crm: 2 } },
        { id: 'sheets', label: 'Excel-Tabellen und Disziplin', weights: { crm: 3 } },
        { id: 'painful', label: 'Standardtool (HubSpot / Salesforce) — kämpfen aber täglich damit', weights: { crm: 3 } },
        { id: 'fine', label: 'Standardtool, funktioniert gut', weights: {} },
      ],
    },
    {
      id: 'q10_owner',
      prompt: 'Wer trägt das Budget für diese Entscheidung?',
      options: [
        { id: 'cto', label: 'CTO / VP Engineering', weights: { rag: 1, agents: 2, managedIt: 1 } },
        { id: 'cio', label: 'CIO / IT-Leitung', weights: { managedIt: 2, rag: 1 } },
        { id: 'coo', label: 'COO / Operations', weights: { agents: 2, crm: 1 } },
        { id: 'cfo', label: 'CFO / Finance', weights: { crm: 1, managedIt: 1 } },
        { id: 'ceo', label: 'CEO / Gründer:in', weights: { crm: 1, rag: 1, agents: 1 } },
      ],
    },
  ],
  axes: {
    crm: {
      label: 'Individuelle CRM-Entwicklung',
      summary: 'Ihr Schmerz hat CRM-Form, nicht KI-Form. Ein individuelles CRM, das zu Ihrem Vertriebsprozess passt — und Lizenzbloat ersetzt — ist der Schritt mit dem besten Hebel.',
      serviceHref: '/de/services/development/crm-entwicklung',
      serviceLabel: 'Zum CRM-Service',
    },
    rag: {
      label: 'RAG-Systeme',
      summary: 'Ihr Team ertrinkt in Wissen, das es nicht findet oder dem es nicht vertraut. Ein RAG-System, das in Ihren Dokumenten verankert ist und zitierbar antwortet, ist der richtige erste KI-Bau.',
      serviceHref: '/de/services/development/rag-systeme',
      serviceLabel: 'Zum RAG-Service',
    },
    agents: {
      label: 'KI-Agenten und Automatisierung',
      summary: 'Sie haben wiederholbare, klar definierte Arbeit, die ein KI-Agent mit sauberen Guardrails end-to-end übernehmen kann. Human-in-the-Loop an Risikopunkten, vollständiges Logging, Kill-Switch.',
      serviceHref: '/de/services/development/ki-automatisierung',
      serviceLabel: 'Zum KI-Agenten-Service',
    },
    managedIt: {
      label: 'Managed IT & Infrastruktur',
      summary: 'Die Software-Seite steht hinten an, Hauptsache die Lichter bleiben an. 24/7-Monitoring, Patching, Incident-Response unter schriftlicher SLA ist der nächste Schritt.',
      serviceHref: '/de/services/hardware/infrastruktur-support',
      serviceLabel: 'Zum Infrastruktur-Support',
    },
  },
  result: {
    eyebrow: 'Ihr Ergebnis',
    titleTemplate: 'Beste Passung: {label}',
    recommendedKicker: 'Primäre Empfehlung',
    secondaryKicker: 'Auch einen Blick wert',
    bodyIntro: 'Auf Basis Ihrer Antworten würde Deploris hier einsteigen. Wenn das weit danebenliegt, war der Input vermutlich mehrdeutig — nochmal starten oder direkt ins Gespräch.',
    ctaPrimary: '30-Min-Scoping-Call vereinbaren',
    ctaPrimaryHref: '/de/contact',
    ctaSecondary: 'Schriftliches Angebot anfragen',
    ctaSecondaryHref: '/de/quote',
    restart: 'Neu starten',
    disclaimer: 'Regelbasierte Bewertung Ihrer Eingaben. Nichts wird gespeichert; nichts wird übermittelt, bis Sie uns schreiben.',
  },
  common: {
    questionOf: (n, total) => `Frage ${n} von ${total}`,
    back: 'Zurück',
    next: 'Weiter',
    finish: 'Empfehlung sehen',
  },
};

export function getContent(locale: Locale): Content {
  return locale === 'de' ? DE : EN;
}

export function scoreAnswers(locale: Locale, answers: Record<string, string>): Record<Axis, number> {
  const content = getContent(locale);
  const totals: Record<Axis, number> = { crm: 0, rag: 0, agents: 0, managedIt: 0 };
  for (const q of content.questions) {
    const chosen = answers[q.id];
    if (!chosen) continue;
    const opt = q.options.find((o) => o.id === chosen);
    if (!opt) continue;
    for (const [axis, w] of Object.entries(opt.weights)) {
      totals[axis as Axis] += w ?? 0;
    }
  }
  return totals;
}
