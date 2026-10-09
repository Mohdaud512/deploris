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
      {
        q: 'What jurisdictions do you operate in?',
        a: 'Deploris is registered as DEPLORIS LLC in Florida, USA (document L24000491676). For German clients we invoice and contract via that entity and offer EU-region processing where needed.',
      },
      {
        q: 'Is EU-region hosting available?',
        a: 'Yes. For German and EU clients the default is Frankfurt-region serverless + EU-hosted providers. US clients default to US-region. Residency is per contract.',
      },
      {
        q: 'What SLAs do you offer?',
        a: 'Managed engagements default to P1 15-min response / 4-hour resolution target, P2 1-hour / 1-business-day, P3 1-business-day / 5-business-days. Infrastructure engagements target 99.9% monthly uptime for services under our operational control.',
      },
      {
        q: 'How is pricing structured?',
        a: 'Fixed-scope projects use a written price band (e.g. $40k–$90k) with a fixed-fee structure once scope is signed. Managed-ops engagements use a monthly retainer tied to the SLA tier. Scoped-and-written response within one business day of enquiry.',
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
      {
        q: 'Which CRMs can we migrate from?',
        a: 'We regularly migrate from HubSpot, Salesforce, Pipedrive, Zoho, and legacy in-house tools. Migration runs under change control with typed ETL and a reversible cutover.',
      },
      {
        q: 'Do you own ongoing maintenance after launch?',
        a: 'Optional. Many clients take a monthly managed-ops retainer; others handle in-house and we return for scoped feature work.',
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
      {
        q: 'How is prompt injection mitigated?',
        a: 'Tagged retrieval boundaries so retrieved content cannot override system instructions, system reminders at every turn, and tool-use allow-lists. Logging makes every attempt reviewable after the fact.',
      },
      {
        q: 'How do you measure RAG quality?',
        a: 'A labelled eval set that grows as real questions come in; retrieval precision, answer faithfulness (grounded in retrieved content), and refusal rate on out-of-scope questions. Weekly report during active engagements.',
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
      {
        q: 'What guardrails do production agents run under?',
        a: 'Named scope (one-sentence job description), fixed tool list (specific APIs, specific write permissions), human review at risky steps, full trace logging of every decision and tool call, and a kill switch that stops the agent immediately.',
      },
    ],
  },
  {
    slug: 'hardware',
    title: 'Hardware & infrastructure (general)',
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
  // Per-service hardware FAQ groups (one group per service page so each
  // page emits its own non-duplicated FAQPage schema).
  {
    slug: 'infrastructure-support',
    title: 'IT infrastructure support',
    items: [
      {
        q: 'What does IT infrastructure support cover?',
        a: 'Monitoring, patching, capacity planning, change control, and 24/7 incident response across servers, storage, networking, firewalls, and virtualization under a written SLA.',
      },
      {
        q: 'What response targets do you commit to?',
        a: 'Priority-1 (business-impacting): 15-minute median first response. P2: 1-hour. P3: next business day. Resolution targets vary by contract.',
      },
      {
        q: 'Do you support hybrid cloud?',
        a: 'Yes. We support on-prem, colo, AWS, Azure, GCP, and hybrid combinations. Infrastructure-as-code tooling (Terraform, Pulumi, Ansible) depends on client preference.',
      },
    ],
  },
  {
    slug: 'network-support',
    title: 'Network support',
    items: [
      {
        q: 'Which network vendors do you support?',
        a: 'Cisco, Juniper, Aruba, Fortinet, MikroTik, pfSense, OPNsense, Ubiquiti UniFi, Meraki, and Palo Alto. Vendor-neutral we support what you own.',
      },
      {
        q: 'How do you handle firewall change control?',
        a: 'Every rule change is ticketed, reviewed by a second engineer, applied in a defined change window, logged, and reversible for at least 48 hours.',
      },
      {
        q: 'Do you manage SD-WAN?',
        a: 'Yes. Deployment, policy design, and ongoing path selection + failover drills for Fortinet, Cisco Meraki, VeloCloud, Silver Peak and others.',
      },
    ],
  },
  {
    slug: 'rollout-migrations',
    title: 'IT rollout and migration',
    items: [
      {
        q: 'What does a rollout engagement include?',
        a: 'Site surveys, staging, imaging, logistics coordination, cutover with reversible rollback plan, and post-cutover support.',
      },
      {
        q: 'How many sites can you roll out in parallel?',
        a: 'Typical parallelism is 3–5 sites per week with a shared playbook; more with staged crews. All assets tagged and reconciled.',
      },
      {
        q: 'What does a reversible cutover plan look like?',
        a: 'Both old and new systems ready to serve, DNS / traffic switch at a defined moment, 48-hour window during which traffic can be reverted without data loss.',
      },
    ],
  },
  {
    slug: 'desktop-support',
    title: 'Desktop support',
    items: [
      {
        q: 'Which operating systems and platforms do you support?',
        a: 'Windows, macOS, Microsoft 365, Google Workspace, and identity providers Entra ID, Okta, Google. Linux desktop supported on request.',
      },
      {
        q: 'What tier structure do you use?',
        a: 'L1 first-touch (scripted) with 4-hour SLA, L2 specialist (remote) with 2-hour SLA, L3 senior (remote or on-site) with 15-minute SLA for business-impacting incidents.',
      },
      {
        q: 'Do you offer on-site dispatch?',
        a: 'Yes. On-site dispatch for anything that cannot be fixed remotely available in US and DE service regions.',
      },
    ],
  },
  {
    slug: 'imac-projects',
    title: 'IMAC and projects',
    items: [
      {
        q: 'What does IMAC stand for?',
        a: 'Install, Move, Add, Change the everyday hardware work of installing, moving, adding, and changing endpoints, peripherals, and network gear.',
      },
      {
        q: 'Do you track assets?',
        a: 'Every IMAC action generates an asset-ledger entry with source location, destination, asset tag, and timestamp. Reconciled monthly against the client register.',
      },
      {
        q: 'Can you handle meeting-room installs end-to-end?',
        a: 'Yes mounting, cabling, display + audio commissioning, room booking integration, and acceptance test against a written checklist.',
      },
    ],
  },
  {
    slug: 'hardware-break-fix',
    title: 'Hardware break-fix',
    items: [
      {
        q: 'What SLA options are available?',
        a: 'Same-business-day 4-hour window; next-business-day 24-hour window. Weekend coverage optional per contract.',
      },
      {
        q: 'Do you keep a spare pool?',
        a: 'Yes a managed spare pool sized to the client fleet, with rotation policy and refresh cycle documented per contract.',
      },
      {
        q: 'Which hardware is covered?',
        a: 'Servers, network gear, endpoints, and peripherals. Vendor-specific repairs honored through our partnerships (HPE, Dell, Lenovo, Cisco, HP, Apple).',
      },
    ],
  },
  {
    slug: 'wifi-surveys',
    title: 'WiFi surveys',
    items: [
      {
        q: 'What is a predictive WiFi survey?',
        a: 'A software model of the site with AP placement, materials, and interference modeled. Catches obvious mistakes before any hardware ships.',
      },
      {
        q: 'What does the deliverable include?',
        a: 'Signal strength + SNR heatmaps, channel plan with rationale, interference report naming sources, bill of materials sized to actual load, and a roaming plan for the devices that matter.',
      },
      {
        q: 'When is a passive on-site survey needed?',
        a: 'Any time the environment has unknown interference (adjacent tenants, legacy radios, unusual materials) or when post-install SLA requires validated measurements. We recommend predictive + passive for every production deployment.',
      },
    ],
  },
  {
    slug: 'data-center-maintenance',
    title: 'Data-center maintenance & 24/7 support',
    items: [
      {
        q: 'What does "remote hands" include?',
        a: 'Physical tasks performed by Deploris staff on your behalf cable swaps, media insert/eject, button-press on remote console, visual inspection, photo documentation, hardware swap-in from spare.',
      },
      {
        q: 'What SLA do you commit to for data-center engagements?',
        a: '99.95% monthly uptime target for services under our operational control, with 15-min P1 first response. Specific SLAs per contract.',
      },
      {
        q: 'Do you support colo + on-prem both?',
        a: 'Yes. Deploris operates in client-owned data centers and colos (Equinix, Digital Realty, CoreSite, Interxion, NTT, and regional providers).',
      },
    ],
  },
  // Development per-service groups
  {
    slug: 'custom-systems',
    title: 'Custom systems & integrations',
    items: [
      {
        q: 'What counts as a "custom system"?',
        a: 'An internal tool, data pipeline, SaaS backend, migration tool, or admin surface that no commercial vendor sells cleanly, built production-grade with security review and documented handover.',
      },
      {
        q: 'When should we build vs. buy?',
        a: 'Buy when a commercial product covers 80%+ of the need with light config. Build when existing vendors force structural compromises or when the capability itself is a differentiator worth owning.',
      },
      {
        q: 'How do you keep built systems maintainable?',
        a: 'Written architecture decision records, test coverage on critical paths, deployment runbooks, and a documented handover session. Optional ongoing support under published SLA.',
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
      {
        q: 'What security headers does the Deploris site ship with?',
        a: 'Hardened CSP, HSTS, Permissions-Policy, X-Frame-Options, Referrer-Policy on every public response. Server-only secret envelopes, no credentials in the client bundle.',
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
      {
        q: 'In welchen Jurisdiktionen sind Sie aktiv?',
        a: 'Deploris ist als DEPLORIS LLC in Florida, USA registriert (Dokument L24000491676). Für deutsche Kunden rechnen und kontraktieren wir über diese Entität und bieten bei Bedarf EU-Region-Verarbeitung.',
      },
      {
        q: 'Ist EU-Hosting verfügbar?',
        a: 'Ja. Für deutsche und EU-Kunden ist der Standard Frankfurt-Region-Serverless + EU-gehostete Anbieter. US-Kunden standardmäßig US-Region. Residenz pro Vertrag.',
      },
      {
        q: 'Welche SLAs bieten Sie?',
        a: 'Managed-Engagements standardmäßig P1 15-min Reaktion / 4-h Lösungsziel, P2 1-h / 1 Werktag, P3 1 Werktag / 5 Werktage. Infrastruktur-Engagements zielen auf 99,9 % monatliche Verfügbarkeit für von uns betriebene Dienste.',
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
  // Per-service DE groups (slug = service.id so service pages can look up
  // the right group regardless of locale).
  {
    slug: 'infrastructure-support',
    title: 'IT-Infrastruktur-Support',
    items: [
      {
        q: 'Was umfasst IT-Infrastruktur-Support?',
        a: 'Monitoring, Patching, Kapazitätsplanung, Change-Kontrolle und 24/7 Incident-Response für Server, Storage, Netzwerk, Firewalls und Virtualisierung unter schriftlicher SLA.',
      },
      {
        q: 'Welche Reaktionsziele garantieren Sie?',
        a: 'Priorität 1 (geschäftskritisch): 15-min mediane Erst-Reaktion. P2: 1 Stunde. P3: nächster Werktag. Lösungsziele je Vertrag.',
      },
      {
        q: 'Unterstützen Sie Hybrid-Cloud?',
        a: 'Ja on-prem, Colo, AWS, Azure, GCP und hybride Kombinationen. IaC-Werkzeuge (Terraform, Pulumi, Ansible) nach Kundenpräferenz.',
      },
    ],
  },
  {
    slug: 'network-support',
    title: 'Netzwerk-Support',
    items: [
      {
        q: 'Welche Netzwerk-Hersteller unterstützen Sie?',
        a: 'Cisco, Juniper, Aruba, Fortinet, MikroTik, pfSense, OPNsense, Ubiquiti UniFi, Meraki und Palo Alto. Herstellerneutral wir betreiben, was Sie besitzen.',
      },
      {
        q: 'Wie läuft Firewall-Change-Kontrolle?',
        a: 'Jede Regeländerung ist ticketbasiert, wird von einem zweiten Engineer geprüft, in einem definierten Change-Window angewendet, geloggt und mindestens 48 Stunden reversibel.',
      },
      {
        q: 'Betreuen Sie SD-WAN?',
        a: 'Ja. Deployment, Policy-Design und laufende Path-Selection + Failover-Drills für Fortinet, Cisco Meraki, VeloCloud, Silver Peak und andere.',
      },
    ],
  },
  {
    slug: 'rollout-migrations',
    title: 'IT-Rollouts & Migrationen',
    items: [
      {
        q: 'Was enthält ein Rollout-Projekt?',
        a: 'Standort-Erhebung, Staging, Imaging, Logistik, Cutover mit reversiblem Rollback-Plan und Post-Cutover-Support.',
      },
      {
        q: 'Wie viele Standorte parallel sind machbar?',
        a: 'Typische Parallelität: 3–5 Standorte pro Woche mit gemeinsamem Playbook; mehr mit gestaffelten Teams. Alle Assets getaggt und abgeglichen.',
      },
      {
        q: 'Wie sieht ein reversibler Cutover aus?',
        a: 'Altes und neues System sind beide bereit, DNS-/Traffic-Umschaltung zum definierten Zeitpunkt, 48-Stunden-Fenster für risikolose Rückrollung ohne Datenverlust.',
      },
    ],
  },
  {
    slug: 'desktop-support',
    title: 'Desktop-Support',
    items: [
      {
        q: 'Welche Betriebssysteme und Plattformen werden unterstützt?',
        a: 'Windows, macOS, Microsoft 365, Google Workspace sowie Identity-Provider Entra ID, Okta, Google. Linux-Desktop auf Anfrage.',
      },
      {
        q: 'Welche Tier-Struktur nutzen Sie?',
        a: 'L1 First-Touch (skriptbasiert) mit 4-h-SLA, L2 Spezialist (remote) mit 2-h-SLA, L3 Senior (remote oder vor Ort) mit 15-Min-SLA bei geschäftskritischen Vorfällen.',
      },
      {
        q: 'Bieten Sie Vor-Ort-Einsätze?',
        a: 'Ja. Vor-Ort-Dispatch für alles, was remote nicht lösbar ist in US- und DACH-Service-Regionen.',
      },
    ],
  },
  {
    slug: 'imac-projects',
    title: 'IMAC und Projekte',
    items: [
      {
        q: 'Wofür steht IMAC?',
        a: 'Install, Move, Add, Change die regelmäßigen Hardware-Arbeiten zum Installieren, Verlegen, Hinzufügen und Ändern von Endgeräten, Peripherie und Netzwerk-Technik.',
      },
      {
        q: 'Tracken Sie Assets?',
        a: 'Jede IMAC-Aktion erzeugt einen Asset-Ledger-Eintrag mit Quellort, Zielort, Asset-Tag und Zeitstempel. Monatlich gegen das Kundenregister abgeglichen.',
      },
      {
        q: 'Übernehmen Sie Meetingraum-Installationen end-to-end?',
        a: 'Ja Montage, Verkabelung, Display- und Audio-Inbetriebnahme, Room-Booking-Integration und Abnahme nach schriftlicher Checkliste.',
      },
    ],
  },
  {
    slug: 'hardware-break-fix',
    title: 'Hardware Break-Fix',
    items: [
      {
        q: 'Welche SLA-Optionen gibt es?',
        a: 'Same-Business-Day 4-Stunden-Fenster oder Next-Business-Day 24-Stunden-Fenster. Wochenend-Abdeckung optional pro Vertrag.',
      },
      {
        q: 'Halten Sie Ersatzteile vor?',
        a: 'Ja ein Managed Spare Pool, dimensioniert für die Kundenflotte, mit Rotations- und Refresh-Policy pro Vertrag.',
      },
      {
        q: 'Welche Hardware ist abgedeckt?',
        a: 'Server, Netzwerk-Technik, Endgeräte und Peripherie. Hersteller-Reparaturen über unsere Partnerschaften (HPE, Dell, Lenovo, Cisco, HP, Apple).',
      },
    ],
  },
  {
    slug: 'wifi-surveys',
    title: 'WLAN-Ausleuchtung',
    items: [
      {
        q: 'Was ist eine prädiktive WLAN-Ausleuchtung?',
        a: 'Ein Software-Modell des Standorts mit AP-Platzierung, Baumaterialien und modellierter Interferenz. Fängt offensichtliche Fehler ab, bevor Hardware beschafft wird.',
      },
      {
        q: 'Was enthält das Deliverable?',
        a: 'Signalstärke- und SNR-Heatmaps, Kanalplan mit Begründung, Interferenz-Bericht mit benannten Quellen, Stückliste nach realer Last und Roaming-Plan für die wichtigsten Geräte.',
      },
      {
        q: 'Wann ist eine passive Vor-Ort-Vermessung nötig?',
        a: 'Immer dann, wenn die Umgebung unbekannte Interferenz hat (Nachbarmieter, Alt-Funk, ungewöhnliche Materialien) oder wenn die Post-Install-SLA validierte Messungen verlangt. Empfehlung: Predictive + passiv für jede produktive Installation.',
      },
    ],
  },
  {
    slug: 'data-center-maintenance',
    title: 'Rechenzentrum-Wartung & 24/7-Support',
    items: [
      {
        q: 'Was umfasst "Remote Hands"?',
        a: 'Physische Arbeiten durch Deploris-Personal für Sie Kabeltausch, Medienwechsel, Button-Press an Remote-Console, Sichtprüfung, Fotodokumentation, Hardware-Swap aus Spare-Pool.',
      },
      {
        q: 'Welche SLA bieten Sie für Rechenzentrum-Projekte?',
        a: '99,95 % monatliches Uptime-Ziel für von uns betriebene Dienste, 15-Min P1-Erst-Reaktion. Spezifische SLAs pro Vertrag.',
      },
      {
        q: 'Unterstützen Sie Colo und On-Prem?',
        a: 'Ja. Deploris arbeitet in Kunden-RZs und Colos (Equinix, Digital Realty, CoreSite, Interxion, NTT und regionale Anbieter).',
      },
    ],
  },
  {
    slug: 'custom-systems',
    title: 'Individualsoftware & Integrationen',
    items: [
      {
        q: 'Was zählt als "Individualsoftware"?',
        a: 'Ein internes Tool, eine Daten-Pipeline, ein SaaS-Backend, ein Migrations-Werkzeug oder eine Admin-Oberfläche, die kein kommerzielles Produkt sauber abdeckt gebaut in Produktionsqualität mit Sicherheits-Review und dokumentierter Übergabe.',
      },
      {
        q: 'Wann besser kaufen als bauen?',
        a: 'Kaufen, wenn ein kommerzielles Produkt 80 %+ des Bedarfs mit leichter Konfiguration abdeckt. Bauen, wenn Vendor-Lösungen strukturelle Kompromisse erzwingen oder die Fähigkeit selbst ein Differenzierer ist.',
      },
      {
        q: 'Wie halten Sie gebaute Systeme wartbar?',
        a: 'Schriftliche Architektur-Entscheidungen (ADRs), Testabdeckung auf kritischen Pfaden, Deployment-Runbooks und eine dokumentierte Übergabe-Session. Optional laufender Support unter veröffentlichter SLA.',
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
      {
        q: 'Welche Security-Header liefert die Deploris-Website aus?',
        a: 'Gehärtete CSP, HSTS, Permissions-Policy, X-Frame-Options und Referrer-Policy auf jeder öffentlichen Antwort. Server-only-Secret-Envelopes, keine Credentials im Client-Bundle.',
      },
    ],
  },
];

export const faqData: Record<Locale, FaqGroup[]> = { en, de };
