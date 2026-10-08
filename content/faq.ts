import type { Locale } from '@/config/locales';

export type FaqItem = { q: string; a: string };
export type FaqGroup = { slug: string; title: string; items: FaqItem[] };

const en: FaqGroup[] = [
  {
    slug: 'general',
    title: 'About Deploris',
    items: [
      {
        q: 'What does Deploris do?',
        a: 'Deploris delivers two service lines under one team: (1) hardware and infrastructure support from desktop support to data-center maintenance and (2) custom software development, including CRMs, RAG systems, AI agents and automation, and bespoke systems.',
      },
      {
        q: 'Where are your clients based?',
        a: 'We serve businesses in the United States and Germany. All communication is available in English or German (formal Sie).',
      },
      {
        q: 'How does engagement start?',
        a: 'Send us your requirements via the contact form or the multi-step quote form. You receive a written scope, timeline, and price band within one business day no sales dance.',
      },
    ],
  },
  {
    slug: 'crm',
    title: 'Custom CRM development',
    items: [
      {
        q: 'What is custom CRM development?',
        a: 'Custom CRM development is designing and building a customer-relationship-management system that fits your sales process, integrations, and access-control needs, instead of forcing your team to fit off-the-shelf software.',
      },
      {
        q: 'When is a custom CRM cheaper than HubSpot or Salesforce?',
        a: 'Once per-seat licensing crosses roughly $50k–$150k per year, or once configuration work exceeds a few months per year to keep an off-the-shelf CRM aligned with your process, a custom system usually wins on 3-year TCO.',
      },
      {
        q: 'How long does a custom CRM take to build?',
        a: 'A useful first release is typically live for internal users at week 4–6 of the build. Full replacement of an existing system usually lands within 3–6 months depending on integrations and data migration.',
      },
    ],
  },
  {
    slug: 'rag',
    title: 'RAG systems',
    items: [
      {
        q: 'What is a RAG system?',
        a: 'A RAG (retrieval-augmented generation) system grounds a large-language-model’s answers in your own documents. It retrieves the most relevant passages from your knowledge, then uses the LLM to answer using those passages and cites them so a human can verify.',
      },
      {
        q: 'How is RAG different from a fine-tuned model?',
        a: 'Fine-tuning changes the model’s weights. RAG leaves the model as-is and instead feeds it your current documents at query time. RAG is faster to update, easier to audit, and safer for regulated content because you can prove which source drove which answer.',
      },
      {
        q: 'Does RAG expose our internal data to the model provider?',
        a: 'Only the retrieved passages that answer a specific question are sent to the model. With enterprise API tiers those passages are not used for training. If exposure must be zero, we can run the pipeline against an on-prem or EU-hosted model.',
      },
    ],
  },
  {
    slug: 'automation',
    title: 'AI agents and automation',
    items: [
      {
        q: 'What is an AI agent?',
        a: 'An AI agent is a program that decides which tool to use, in what order, and what to do with the result to complete a task end-to-end. Good agents work under strict guardrails: a defined scope, a fixed set of tools, human-in-the-loop review at risky steps, and full logging.',
      },
      {
        q: 'How do you decide what to automate?',
        a: 'We look for tasks that are repeatable, well-defined, cost measurable time, and have a clear success signal. Anything without a success signal or with high blast-radius on failure stays human-owned or gets a human-review gate.',
      },
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware & infrastructure',
    items: [
      {
        q: 'Do you sign SLAs?',
        a: 'Yes every managed engagement has a written SLA with response times, escalation paths, and reporting cadence.',
      },
      {
        q: 'Do you handle both remote and on-site work?',
        a: 'Yes. We deliver desktop support, IMAC, break-fix, and data-center work remote-first, with on-site dispatch where physical presence is required.',
      },
      {
        q: 'Are you vendor-neutral?',
        a: 'Yes. We operate the technology you already own. We do not resell hardware as a primary business we advise on what to buy, but you keep the purchasing relationship.',
      },
    ],
  },
  {
    slug: 'security-privacy',
    title: 'Security & privacy',
    items: [
      {
        q: 'Where is data processed?',
        a: 'For German and EU clients, we default to EU-region processing (Frankfurt serverless functions, EU-hosted providers). For US clients we use US-region processing.',
      },
      {
        q: 'How do you handle GDPR data-subject requests?',
        a: 'Every project ships with a data-request workflow. Article 15 (access) and Article 17 (erasure) requests are triaged within statutory windows and answered in writing.',
      },
      {
        q: 'Do you sign an AVV / DPA?',
        a: 'Yes. We provide an Auftragsverarbeitungsvertrag (AVV) template compliant with GDPR Article 28 for German clients, and a standard DPA for US clients.',
      },
    ],
  },
];

const de: FaqGroup[] = [
  {
    slug: 'ueber-uns',
    title: 'Über Deploris',
    items: [
      {
        q: 'Was macht Deploris?',
        a: 'Deploris liefert zwei Leistungsfelder aus einer Hand: (1) Hardware- und Infrastruktur-Support vom Desktop-Support bis zur Rechenzentrum-Wartung und (2) individuelle Softwareentwicklung, inklusive CRM-Systemen, RAG-Systemen, KI-Agenten sowie Automatisierung und Individualsoftware.',
      },
      {
        q: 'Wo sitzen Ihre Kunden?',
        a: 'Wir betreuen Unternehmen in den USA und in Deutschland. Kommunikation auf Englisch oder Deutsch (formales Sie).',
      },
      {
        q: 'Wie startet eine Zusammenarbeit?',
        a: 'Senden Sie uns Ihre Anforderungen über das Kontaktformular oder das mehrstufige Angebotsformular. Innerhalb eines Werktags erhalten Sie eine schriftliche Leistungsbeschreibung, einen Zeitplan und eine Preisspanne ohne Verkaufstänze.',
      },
    ],
  },
  {
    slug: 'crm-entwicklung',
    title: 'CRM-Entwicklung',
    items: [
      {
        q: 'Was ist CRM-Entwicklung?',
        a: 'CRM-Entwicklung ist der Entwurf und Aufbau eines Customer-Relationship-Management-Systems, das zu Ihrem Vertriebsprozess, Ihren Integrationen und Ihrer Zugriffssteuerung passt anstatt Ihr Team an Standardsoftware anzupassen.',
      },
      {
        q: 'Wann ist ein individuelles CRM günstiger als HubSpot oder Salesforce?',
        a: 'Sobald die Lizenzkosten pro Nutzer 50.000–150.000 € pro Jahr überschreiten oder die laufende Konfiguration mehrere Monate pro Jahr bindet, gewinnt ein individuelles System in der Regel bei der 3-Jahres-TCO.',
      },
      {
        q: 'Wie lange dauert die Entwicklung eines individuellen CRM?',
        a: 'Ein nutzbares erstes Release läuft üblicherweise ab Woche 4–6 im internen Einsatz. Der vollständige Ersatz eines bestehenden Systems ist meist innerhalb von 3–6 Monaten erreicht abhängig von Integrationen und Datenmigration.',
      },
    ],
  },
  {
    slug: 'rag-systeme',
    title: 'RAG-Systeme',
    items: [
      {
        q: 'Was ist ein RAG-System?',
        a: 'Ein RAG-System (Retrieval-Augmented Generation) verankert die Antworten eines Sprachmodells in Ihren eigenen Dokumenten. Es sucht die relevantesten Passagen in Ihrem Wissen heraus und lässt das Sprachmodell auf dieser Basis antworten mit Quellenangabe zur menschlichen Überprüfung.',
      },
      {
        q: 'Worin unterscheidet sich RAG von einem feinjustierten Modell?',
        a: 'Fine-Tuning verändert die Modellgewichte. RAG belässt das Modell wie es ist und übergibt ihm zur Laufzeit Ihre aktuellen Dokumente. RAG ist schneller aktualisierbar, besser auditierbar und für regulierte Inhalte sicherer, weil jede Antwort quellenprüfbar ist.',
      },
      {
        q: 'Gehen unsere internen Daten an den Modell-Anbieter?',
        a: 'Nur die zur Beantwortung einer konkreten Frage abgerufenen Passagen. In Enterprise-Tarifen werden diese nicht zum Training verwendet. Wenn kein Datenabfluss zulässig ist, betreiben wir die Pipeline gegen ein On-Prem- oder EU-gehostetes Modell.',
      },
    ],
  },
  {
    slug: 'ki-agenten',
    title: 'KI-Agenten und Automatisierung',
    items: [
      {
        q: 'Was ist ein KI-Agent?',
        a: 'Ein KI-Agent ist ein Programm, das entscheidet, welches Werkzeug es in welcher Reihenfolge einsetzt und was es mit dem Ergebnis tut um eine Aufgabe end-to-end zu erledigen. Gute Agenten arbeiten mit klaren Guardrails: definiertem Scope, festem Toolset, Freigabepunkten und vollem Logging.',
      },
      {
        q: 'Wie entscheiden Sie, was automatisiert wird?',
        a: 'Wir suchen Aufgaben, die wiederholbar und klar definiert sind, messbar Zeit kosten und ein klares Erfolgssignal haben. Ohne Erfolgssignal oder mit hohem Fehler-Schaden bleibt die Aufgabe menschlich oder erhält ein Freigabe-Gate.',
      },
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware & Infrastruktur',
    items: [
      {
        q: 'Unterzeichnen Sie SLAs?',
        a: 'Ja jede Managed-Zusammenarbeit hat eine schriftliche SLA mit Reaktionszeiten, Eskalationswegen und Reporting-Kadenz.',
      },
      {
        q: 'Übernehmen Sie sowohl Remote- als auch Vor-Ort-Einsätze?',
        a: 'Ja. Desktop-Support, IMAC, Break-Fix und Rechenzentrum-Arbeiten liefern wir remote-first und mit Vor-Ort-Einsatz, wo physische Präsenz nötig ist.',
      },
      {
        q: 'Sind Sie herstellerneutral?',
        a: 'Ja. Wir betreiben die Technik, die Sie bereits besitzen. Hardware-Weiterverkauf ist nicht unser Kerngeschäft wir beraten beim Einkauf, die Beschaffungsbeziehung bleibt bei Ihnen.',
      },
    ],
  },
  {
    slug: 'sicherheit-datenschutz',
    title: 'Sicherheit & Datenschutz',
    items: [
      {
        q: 'Wo werden Daten verarbeitet?',
        a: 'Für deutsche und EU-Kunden erfolgt die Verarbeitung standardmäßig in der EU (Frankfurt-Serverless-Funktionen, EU-gehostete Anbieter). Für US-Kunden erfolgt die Verarbeitung in den USA.',
      },
      {
        q: 'Wie gehen Sie mit DSGVO-Betroffenenrechten um?',
        a: 'Jedes Projekt enthält einen Daten-Anfrage-Workflow. Anfragen nach Art. 15 (Auskunft) und Art. 17 (Löschung) werden innerhalb der gesetzlichen Fristen triagiert und schriftlich beantwortet.',
      },
      {
        q: 'Schließen Sie eine Auftragsverarbeitungsvereinbarung (AVV) ab?',
        a: 'Ja. Wir stellen eine AVV nach Art. 28 DSGVO für deutsche Kunden bereit sowie eine Standard-DPA für US-Kunden.',
      },
    ],
  },
];

export const faqData: Record<Locale, FaqGroup[]> = { en, de };
