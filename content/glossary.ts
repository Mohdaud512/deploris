import type { Locale } from '@/config/locales';

export type GlossaryTerm = {
  slug: string;
  term: string;
  description: string;
  body: string;
};

const en: GlossaryTerm[] = [
  {
    slug: 'crm',
    term: 'CRM (Customer Relationship Management)',
    description: 'A system for tracking accounts, contacts, deals, and interactions across the customer lifecycle.',
    body: `A CRM organizes customer data accounts, contacts, deals, and interactions so a sales, marketing, or support team can act on the same facts. A "custom" CRM is one built to match a specific business process instead of forcing that process into off-the-shelf software.`,
  },
  {
    slug: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    description: 'A pattern where an LLM answers using passages retrieved from your own documents at query time.',
    body: `RAG stands for retrieval-augmented generation. A retriever finds the most relevant passages in your knowledge base, then an LLM composes an answer using only those passages and cites the source. RAG is easier to update than fine-tuning and safer to audit because the source of each fact is visible.`,
  },
  {
    slug: 'ai-agent',
    term: 'AI agent',
    description: 'A program that decides which tools to use, in what order, to complete a task end-to-end.',
    body: `An AI agent selects and calls tools (APIs, databases, LLMs) to complete a task. Production agents run under guardrails: a defined scope, a fixed toolset, human review at risky steps, and full logging.`,
  },
  {
    slug: 'automation',
    term: 'Workflow automation',
    description: 'Deterministic execution of a business process without a person in every step.',
    body: `Workflow automation runs a defined process end-to-end using code and integrations. AI-assisted automation adds LLMs where variable inputs (documents, requests, tickets) need to be classified or transformed.`,
  },
  {
    slug: 'sla',
    term: 'SLA (Service-Level Agreement)',
    description: 'A written commitment to specific response and resolution times for defined incident classes.',
    body: `An SLA is a written service level. For managed IT it usually names response and resolution times per priority class, an escalation path, and reporting cadence. Without a written SLA, "we support you" is not an operational promise.`,
  },
  {
    slug: 'imac',
    term: 'IMAC (Install / Move / Add / Change)',
    description: 'The routine hardware work of installing, moving, adding, or changing endpoints, peripherals, and network gear.',
    body: `IMAC is the routine hardware work that keeps offices moving installing new gear, moving equipment, adding capacity, and changing configurations. Repeatable playbooks and CMDB updates are what separate a professional IMAC service from ad-hoc labor.`,
  },
  {
    slug: 'wifi-survey',
    term: 'WiFi survey',
    description: 'A structured measurement of wireless coverage, signal, and interference in a physical space.',
    body: `A predictive survey uses a model of the space. A passive on-site survey measures the actual radio environment. Both together produce an AP placement plan and channel plan you can trust.`,
  },
  {
    slug: 'break-fix',
    term: 'Break-fix maintenance',
    description: 'An SLA-backed model where a provider fixes hardware failures within a stated response time.',
    body: `Break-fix is the traditional model of paying for reactive hardware repair on demand usually with an SLA-defined response time. It suits businesses where a full managed contract would be over-spec.`,
  },
];

const de: GlossaryTerm[] = [
  {
    slug: 'crm',
    term: 'CRM (Customer Relationship Management)',
    description: 'System zur Verwaltung von Accounts, Kontakten, Deals und Interaktionen über den Kundenlebenszyklus.',
    body: `Ein CRM strukturiert Kundendaten Accounts, Kontakte, Deals und Interaktionen damit Vertrieb, Marketing und Support auf denselben Fakten arbeiten. Ein „individuelles" CRM ist auf einen konkreten Prozess zugeschnitten, statt den Prozess in Standardsoftware zu pressen.`,
  },
  {
    slug: 'rag',
    term: 'RAG (Retrieval-Augmented Generation)',
    description: 'Muster, bei dem ein Sprachmodell auf Basis von zur Laufzeit gefundenen Dokumentenpassagen antwortet.',
    body: `RAG steht für Retrieval-Augmented Generation. Ein Retriever findet die relevantesten Passagen in Ihrem Wissensbestand, das Sprachmodell erstellt daraus die Antwort und zitiert die Quelle. RAG ist einfacher zu aktualisieren als Fine-Tuning und besser auditierbar, weil jede Aussage einen sichtbaren Ursprung hat.`,
  },
  {
    slug: 'ki-agent',
    term: 'KI-Agent',
    description: 'Programm, das Werkzeuge in einer bestimmten Reihenfolge auswählt und aufruft, um eine Aufgabe abzuschließen.',
    body: `Ein KI-Agent wählt Werkzeuge (APIs, Datenbanken, LLMs) aus und ruft sie so auf, dass eine Aufgabe abgeschlossen wird. Produktive Agenten arbeiten mit Guardrails: definierter Scope, festes Toolset, menschliche Freigabe an kritischen Schritten und vollem Logging.`,
  },
  {
    slug: 'automatisierung',
    term: 'Workflow-Automatisierung',
    description: 'Deterministische Ausführung eines Geschäftsprozesses ohne Personen in jedem Schritt.',
    body: `Workflow-Automatisierung führt einen definierten Prozess end-to-end mit Code und Integrationen aus. KI-gestützte Automatisierung ergänzt LLMs, wo variable Inputs (Dokumente, Anfragen, Tickets) klassifiziert oder transformiert werden müssen.`,
  },
  {
    slug: 'sla',
    term: 'SLA (Service-Level-Agreement)',
    description: 'Schriftliche Zusage konkreter Reaktions- und Lösungszeiten für definierte Vorfallsklassen.',
    body: `Eine SLA ist ein schriftlicher Service-Level. Im Managed IT-Umfeld nennt sie Reaktions- und Lösungszeiten pro Prioritätsklasse, den Eskalationsweg und die Reporting-Kadenz. Ohne schriftliche SLA ist „wir betreuen Sie" keine betriebliche Zusage.`,
  },
  {
    slug: 'imac',
    term: 'IMAC (Install / Move / Add / Change)',
    description: 'Regelmäßige Hardware-Arbeiten zum Installieren, Verlegen, Hinzufügen und Ändern von Endgeräten und Netzwerkkomponenten.',
    body: `IMAC bezeichnet die regelmäßigen Hardware-Arbeiten, die den Bürobetrieb am Laufen halten neue Geräte installieren, Umzüge, Kapazität ergänzen, Konfigurationen ändern. Wiederholbare Playbooks und CMDB-Pflege trennen einen professionellen IMAC-Service von Ad-hoc-Arbeit.`,
  },
  {
    slug: 'wlan-ausleuchtung',
    term: 'WLAN-Ausleuchtung',
    description: 'Strukturierte Messung der drahtlosen Abdeckung, Signalstärke und Störungen in einem physischen Raum.',
    body: `Eine prädiktive Ausleuchtung nutzt ein Modell des Raums. Eine passive Vor-Ort-Vermessung misst die reale Funkumgebung. Beides zusammen ergibt einen belastbaren AP-Platzierungsplan und Kanalplan.`,
  },
  {
    slug: 'break-fix',
    term: 'Break-Fix-Wartung',
    description: 'SLA-basiertes Modell, bei dem der Anbieter Hardware-Ausfälle innerhalb einer festgelegten Zeit behebt.',
    body: `Break-Fix bedeutet, dass Sie reaktive Hardware-Reparatur bei Bedarf bezahlen üblicherweise mit einer SLA-Reaktionszeit. Passt zu Unternehmen, für die ein vollständiger Managed-Vertrag überdimensioniert wäre.`,
  },
];

export const glossaryData: Record<Locale, GlossaryTerm[]> = { en, de };
