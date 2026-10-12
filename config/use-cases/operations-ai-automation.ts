import type { UseCase } from './types';

/**
 * Use case: Mid-market operations teams, AI agents and workflow automation.
 * Underlying service: ai-agents-automation (config/services.ts).
 * Primary search intent: "AI automation for mid-market operations teams",
 *   "AI agents vs RPA", "replace brittle RPA scripts with AI agents".
 */
export const operationsAiAutomation: UseCase = {
  id: 'operations-ai-automation',
  serviceId: 'ai-agents-automation',
  primaryKeyword: {
    en: 'AI automation for mid-market operations teams',
    de: 'KI-Automation für Operations-Teams im Mittelstand',
  },
  secondaryKeywords: {
    en: [
      'AI agents for operations',
      'replace RPA with AI agents',
      'workflow automation with human in the loop',
      'invoice reconciliation AI agent',
      'order triage automation',
      'back-office exception handling AI',
    ],
    de: [
      'KI-Agenten Operations',
      'RPA durch KI-Agenten ersetzen',
      'Workflow-Automatisierung mit Human-in-the-Loop',
      'Rechnungsabgleich KI-Agent',
      'Auftragsrouting Automatisierung',
      'Backoffice Ausnahmebehandlung KI',
    ],
  },
  lastReviewed: '2026-10-11',
  copy: {
    en: {
      slug: 'operations-ai-automation',
      metaTitle: 'AI Automation for Mid-Market Operations Teams',
      metaDescription:
        'Replace brittle RPA scripts and SaaS automation chains with AI agents that finish real work end-to-end, with human-in-the-loop gates and reversible writes. Scoped in writing, operated by Deploris under one SLA.',
      eyebrow: 'Use case · Operations',
      h1: 'AI automation for mid-market operations teams.',
      deck: 'AI agents that complete repeatable multi-step work end-to-end, with human approval at the risky moments and reversible writes everywhere else. Deploris scopes the process, builds the agent, and operates the stack it runs on.',
      tldr: 'AI automation for a mid-market operations team is a set of task-specific AI agents, orchestrated with deterministic steps and human-in-the-loop approval gates, that finishes repeatable multi-step work (order triage, invoice reconciliation, exception handling, back-office routing) end-to-end against your systems of record, under one written SLA.',
      atAGlance: [
        { label: 'Who it is for', value: 'Operations teams of 200 to 2,000 seats' },
        { label: 'First release', value: '4 to 6 weeks' },
        { label: 'Full rollout', value: '3 to 6 months per process' },
        { label: 'Hosting', value: 'EU-region (Frankfurt) or your own cloud' },
        { label: 'SLA', value: '15-min P1 median, 99.9%+ uptime' },
        { label: 'Delivered by', value: 'Bilingual team, DE + EN' },
      ],
      problem: {
        title: 'Why mid-market operations teams need more than RPA or Zapier.',
        body:
          'The automation stack most mid-market operations teams inherited was built in two waves. Wave one was an RPA tool that recorded a screen path through the ERP; the script broke the next time the vendor shipped a UI change. Wave two was a SaaS automation chain (Zapier, Make, Workato) that wires public APIs together; it cannot touch the fields in your systems of record where the real work lives. Both waves share the same ceiling: they encode a happy path, so every real exception falls back on a human.',
        bullets: [
          'RPA scripts break on every UI release and nobody owns the fix queue.',
          'SaaS automation platforms cannot write to the parts of your ERP, warehouse, or billing system that actually matter.',
          'The exceptions (missing fields, bad data, mismatched totals, duplicate orders) still land in the same shared mailbox.',
          'Nobody can tell leadership what percentage of a process ran unattended last month, because the audit trail is split across three tools.',
          'The team keeps hiring to cover growth that should have been absorbed by software two years ago.',
        ],
      },
      howItWorks: {
        title: 'How we design, build, and run your AI automation.',
        intro: 'Six stages, every one documented, no surprises in the statement of work.',
        steps: [
          {
            step: 'Process discovery and minute-count',
            body: 'A senior engineer sits with the operations lead and the two people who actually run the process. We map the current path step by step, count the minutes per case, and classify every exception by frequency and risk. You walk away with a written scope, a target automation rate, and a defensible price band inside one business day of the second session.',
          },
          {
            step: 'Agent scope and guardrail design',
            body: 'We define exactly what the agent can read, what it can write, which tools it can call, where a human must approve, and where the kill switch lives. Every write is scoped to specific fields in specific systems. Every approval gate is named. Nothing in the design is implicit.',
          },
          {
            step: 'Build with reversible writes',
            body: 'Two-week iterations against the written scope. The agent lands in staging on EU-region infrastructure with the same observability the production stack will have. Every write is reversible for 48 hours, every tool call is logged, every decision is explainable.',
          },
          {
            step: 'Shadow run and calibration',
            body: 'The agent runs alongside the human operator for at least two weeks. We measure the gap between what the agent decided and what the human decided, tune the prompts and the guardrails, and only promote to active handling once the shadow metrics are inside tolerance.',
          },
          {
            step: 'Production cutover under SLA',
            body: 'Deploris operates the system under a written service-level agreement: 15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target, 48-hour reversibility on any shipped change, full audit trail per case. Human review stays on the risky steps, not on every step.',
          },
          {
            step: 'Steady state and quarterly review',
            body: 'A named on-call engineer, weekly patching window, monthly metrics review (automation rate, exception rate, hours saved, error rate), quarterly roadmap and capacity session with your operations leadership. New processes join the stack on the same two-week cadence.',
          },
        ],
      },
      checklist: {
        title: 'What to expect from any vendor doing this well.',
        intro: 'If a competing vendor cannot meet all ten, you are buying a demo dressed as a product.',
        items: [
          'Senior engineers in the discovery session, not account executives.',
          'A written scope, a target automation rate, and a defensible price band inside one business day.',
          'A named inventory of every system the agent reads from and every field it writes to.',
          'Explicit human-in-the-loop approval gates on the risky steps, named up front.',
          'Reversible writes with a stated reversibility window (48 hours or better).',
          'A kill switch any operations lead can trigger without engineering support.',
          'Per-case audit trails that an auditor can read without a database query.',
          'A shadow-run phase of at least two weeks before any human is removed from the loop.',
          'EU-region hosting option with a signed data processing agreement and EU AI Act documentation.',
          'A written service-level agreement with specific response, uptime, and reversibility numbers.',
        ],
      },
      scenario: {
        title: 'What this looks like in practice.',
        body:
          'A mid-market B2B distribution company with 240 operations seats across Germany and the United States was spending roughly 60 full-time-equivalent hours a week on invoice reconciliation. Three accounts-payable specialists matched supplier invoices against purchase orders and goods receipts, resolved missing fields over email, and routed the exceptions that could not be matched. An RPA script, built two years earlier by a Big Four implementation partner, had been quietly decommissioned after the ERP rolled a UI update and nobody could get it running again. We scoped a replacement in a single week: an AI agent that reads inbound invoices, matches them against purchase orders and goods receipts in the ERP, writes a reconciliation entry when all three agree inside tolerance, raises an exception with a one-line explanation and a proposed next step when they do not, and routes anything above a stated monetary threshold to a human approver. The first working version shipped at week five on EU-region infrastructure under a Deploris SLA, ran in shadow mode alongside the three specialists for two weeks, and took over active handling of straight-match cases in week eight. Twelve weeks after cutover, 68 percent of inbound invoices ran unattended, the specialists spent their time on genuine exceptions instead of data entry, and leadership could pull a monthly automation-rate number from a single dashboard. We do not publish the company name because the engagement is active and the procurement team prefers it that way.',
      },
      pricingPosture: {
        title: 'What this costs is a scope question, not a seat question.',
        body:
          'Deploris does not sell per-process licenses or per-execution fees. We scope every engagement in writing: the processes in play, the systems the agent will read from and write to, the exception volume, the SLA you need, and the hosting posture. You get a defensible price band, a timeline, and the specific deliverables for each phase inside one business day of the second discovery session. Nothing is quoted on the phone, nothing is held back for a "second call", and no number appears on a page before we understand your process.',
      },
      comparison: {
        title: 'Why Deploris, not the alternatives.',
        intro:
          'Three paths lead to a mid-market operations automation stack: keep patching DIY RPA scripts, chain SaaS automation platforms together, or hire a dev shop that builds the agent and walks away at launch. Deploris is the fourth path, and the only one of the four that both builds the automation and operates the infrastructure under one written contract.',
        rows: [
          {
            contender: 'DIY RPA scripts (UiPath, Automation Anywhere, Blue Prism)',
            wins: 'Low upfront cost; records the current click path quickly; well-known to procurement.',
            gaps: 'Breaks on every UI release; cannot handle exceptions; the fix queue has no owner; no explainability for auditors; each process rebuild starts from zero.',
          },
          {
            contender: 'SaaS automation platforms (Zapier, Make, Workato)',
            wins: 'Fast to wire up public APIs; large connector catalog; low ticket to entry.',
            gaps: 'Cannot touch the fields in your ERP, warehouse, or billing system where the real work lives; no reversibility story; audit trail is split across tools; data flows through a US SaaS vendor by default.',
          },
          {
            contender: 'Dev shop that builds the agent and walks away',
            wins: 'Lower initial cost than building in-house; faster than an internal build; produces a working agent.',
            gaps: 'Hand-off to a separate operations team at launch; two contracts, two SLAs, two on-call rotations; incidents bounce between the shop that wrote the agent and the MSP that runs the servers.',
          },
          {
            contender: 'Deploris, build and run under one SLA',
            wins: 'One team writes the agents and operates the servers they run on; written SLA from the first commit; reversible writes and named approval gates by default; EU-region hosting; bilingual DE + EN delivery; one invoice, one point of accountability.',
            gaps: 'Not a shrink-wrapped product; every engagement is scoped in writing and starts at mid-market scale (200 seats and up).',
          },
        ],
      },
      faq: [
        {
          q: 'How is an AI agent different from an RPA script?',
          a: 'An RPA script records a fixed click path through a user interface; it breaks when the interface changes and it has no way to handle a case it has not seen before. An AI agent reasons over the inputs, calls tools against your systems of record, follows written guardrails about what it can and cannot do, and escalates to a named human when a case falls outside its guardrails. It does not need to be rebuilt every time your ERP ships a new release.',
        },
        {
          q: 'How is this different from Zapier, Make, or Workato?',
          a: 'SaaS automation platforms are great at wiring public APIs together, but they cannot write to the specific fields in your ERP, warehouse, or billing system where real operations work happens, and the audit trail they produce is split across their platform and the systems they call. A Deploris AI automation runs against your systems of record with named writes, a 48-hour reversibility window, a single per-case audit trail, and EU-region hosting if you need it.',
        },
        {
          q: 'How long does it take to go live?',
          a: 'A first working version lands on your staging environment inside 4 to 6 weeks. A full production rollout for one process, including a two-week shadow run, typically completes in 3 to 6 months. Additional processes join the stack on the same two-week cadence once the operating model is in place.',
        },
        {
          q: 'Where will the agent and its data live?',
          a: 'By default in the Frankfurt (EU) region of a hyperscale cloud under a signed data processing agreement, with the option to run in your own cloud account. We do not route data through US-only services anywhere in the pipeline when EU-region hosting is in scope. The model provider, embedding provider, and vector store are named up front in the written scope.',
        },
        {
          q: 'What happens when the agent is wrong?',
          a: 'Every write the agent makes is reversible for 48 hours, every tool call is logged, every decision is explainable from the audit trail. If an exception is misclassified, the human reviewer corrects it, the correction feeds back into the calibration data, and the guardrails are updated in the next two-week increment. There is no case where an agent decision is unrecoverable and no case where leadership cannot see what the agent did.',
        },
        {
          q: 'Where do humans stay in the loop?',
          a: 'The written scope names every approval gate before any code is written: amounts above a monetary threshold, writes to specific sensitive fields, cases flagged with low confidence, counterparties on a watch list. Humans stay on the risky moments, not on every moment. The target is not zero humans; the target is zero humans on work that software should have done.',
        },
        {
          q: 'What is the service-level agreement after launch?',
          a: '15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target on the systems we operate, 48-hour reversibility on any shipped change with full audit trail, named on-call engineer, weekly patching window. Specific numbers are written into every engagement contract, not a marketing page.',
        },
        {
          q: 'How do you handle GDPR, DPA, and EU AI Act requirements?',
          a: 'A data processing agreement is signed before build begins and covers every system in the pipeline. EU-region hosting is the default; sub-processors (model provider, embedding provider, vector store) are listed and reviewed quarterly. Every AI automation is inventoried against the EU AI Act risk tiers and ships with the documentation that act requires: purpose, inputs, outputs, human oversight, monitoring, and incident procedure.',
        },
        {
          q: 'Which processes are a good fit for this?',
          a: 'Repeatable multi-step work with a defined start and end, written-down rules for most cases, named systems of record, and a measurable exception rate: order triage, invoice reconciliation, back-office routing, support ticket pre-triage, data entry from inbound documents, master data cleanup, vendor onboarding checks, SKU and catalog hygiene. If the process lives in one person\'s head and has never been written down, we start by writing it down.',
        },
        {
          q: 'Who owns the code, the prompts, and the data?',
          a: 'You do, in all three cases. The source repository, the prompt library, the infrastructure-as-code, and the data are yours from day one. Deploris operates the system under contract; nothing in the stack is a Deploris black box, and you can take operations in-house or move to a different operator at any time without a rewrite.',
        },
        {
          q: 'Can you work with our in-house engineering team instead of replacing them?',
          a: 'Yes. On many engagements Deploris leads the build and your in-house team learns the stack alongside the engineers, taking over selected agents over time. The written scope names which agents Deploris owns, which the client team owns, and which transition during the engagement.',
        },
        {
          q: 'Who is Deploris and why should we trust you to run our operations?',
          a: 'Deploris is a US-registered engineering firm (Colorado LLC 20268259375) with a DACH delivery team, built as the mid-market answer to the gap between dev shops that write software and MSPs that run infrastructure. Of 40 mid-market firms benchmarked across the US and DACH, we are the only team that covers both halves under one contract. The person on your on-call escalation is the same person who wrote the agent that paged.',
        },
      ],
      related: {
        title: 'Related reading',
        items: [
          {
            label: 'AI Agents & Automation service',
            href: '/services/development/ai-agents-automation',
            blurb: 'Underlying capability page: scope, process, outcomes, and the full AI agents and workflow automation offer.',
          },
          {
            label: 'AI agents vs workflow automation',
            href: '/compare/ai-agents-vs-automation',
            blurb: 'The decision framework for picking agents, deterministic automation, or a mix, with the real trade-offs for a mid-market operations team.',
          },
          {
            label: 'RAG cost model',
            href: '/tools/rag-cost-model',
            blurb: 'Model the running cost of a retrieval and generation workload, with every assumption on the page.',
          },
          {
            label: 'AI Opportunity Finder',
            href: '/ai-opportunity-finder',
            blurb: 'Not sure which process is the right first automation? Run a 10-minute scoping assessment first.',
          },
        ],
      },
      cta: {
        primary: 'Book a scoping call',
        secondary: 'See a sample scope document',
      },
    },
    de: {
      slug: 'ki-automation-operations',
      metaTitle: 'KI-Automation für Operations im Mittelstand',
      metaDescription:
        'Brüchige RPA-Skripte und SaaS-Automatisierungsketten durch KI-Agenten ersetzen, die echte Arbeit end-to-end erledigen, mit Freigabepunkten und rückrollbaren Schreibvorgängen. Schriftlich scoped, von Deploris unter einer SLA betrieben.',
      eyebrow: 'Anwendungsfall · Operations',
      h1: 'KI-Automation für Operations-Teams im Mittelstand.',
      deck: 'KI-Agenten, die wiederkehrende mehrstufige Arbeit end-to-end abschließen, mit menschlicher Freigabe an den riskanten Stellen und rückrollbaren Schreibvorgängen überall sonst. Deploris scoped den Prozess, baut den Agenten und betreibt den Stack, auf dem er läuft.',
      tldr: 'KI-Automation für ein Mittelstand-Operations-Team ist ein Set aufgabenspezifischer KI-Agenten, orchestriert mit deterministischen Schritten und Human-in-the-Loop-Freigabepunkten, das wiederkehrende mehrstufige Arbeit (Auftragsrouting, Rechnungsabgleich, Ausnahmebehandlung, Backoffice-Routing) end-to-end gegen Ihre Systems of Record abschließt, unter einer schriftlichen SLA.',
      atAGlance: [
        { label: 'Für wen', value: 'Operations-Teams von 200 bis 2.000 Sitzen' },
        { label: 'Erstes Release', value: '4 bis 6 Wochen' },
        { label: 'Voller Rollout', value: '3 bis 6 Monate pro Prozess' },
        { label: 'Hosting', value: 'EU-Region (Frankfurt) oder Ihre eigene Cloud' },
        { label: 'SLA', value: '15 Min P1-Median, 99,9 %+ Verfügbarkeit' },
        { label: 'Geliefert von', value: 'Zweisprachig DE + EN' },
      ],
      problem: {
        title: 'Warum Mittelstand-Operations mehr als RPA oder Zapier brauchen.',
        body:
          'Der Automatisierungs-Stack, den die meisten Mittelstands-Operations-Teams geerbt haben, ist in zwei Wellen entstanden. Welle eins war ein RPA-Tool, das einen Klickpfad durch die ERP-Oberfläche aufgezeichnet hat; das Skript brach beim nächsten UI-Release des Anbieters. Welle zwei war eine SaaS-Automatisierungskette (Zapier, Make, Workato), die öffentliche APIs verknüpft; sie kommt an die Felder in Ihren Systems of Record, in denen die eigentliche Arbeit stattfindet, nicht heran. Beide Wellen teilen dieselbe Deckelung: Sie kodieren einen Happy Path, also fällt jede echte Ausnahme auf einen Menschen zurück.',
        bullets: [
          'RPA-Skripte brechen bei jedem UI-Release, und niemand verantwortet die Fix-Queue.',
          'SaaS-Automatisierungsplattformen können die Teile Ihres ERP, Lagers oder Abrechnungssystems, auf die es ankommt, nicht beschreiben.',
          'Die Ausnahmen (fehlende Felder, schlechte Daten, nicht passende Summen, doppelte Aufträge) landen weiterhin in demselben Sammelpostfach.',
          'Niemand kann der Leitung sagen, welcher Prozentsatz eines Prozesses letzten Monat unbeaufsichtigt lief, weil der Audit-Trail auf drei Werkzeuge verteilt ist.',
          'Das Team stellt weiter ein, um Wachstum zu decken, das vor zwei Jahren von Software hätte aufgefangen werden sollen.',
        ],
      },
      howItWorks: {
        title: 'Wie wir Ihre KI-Automation designen, bauen und betreiben.',
        intro: 'Sechs Phasen, jede dokumentiert, keine Überraschungen in der Leistungsbeschreibung.',
        steps: [
          {
            step: 'Prozess-Erhebung und Minuten-Zählung',
            body: 'Ein Senior-Ingenieur arbeitet mit der Operations-Leitung und den zwei Personen zusammen, die den Prozess tatsächlich ausführen. Wir mappen den Ist-Pfad Schritt für Schritt, zählen die Minuten pro Fall und klassifizieren jede Ausnahme nach Häufigkeit und Risiko. Innerhalb eines Werktags nach dem zweiten Termin erhalten Sie einen schriftlichen Scope, eine Zielautomatisierungsrate und eine belastbare Preisspanne.',
          },
          {
            step: 'Agent-Scope und Guardrail-Design',
            body: 'Wir definieren genau, was der Agent lesen darf, was er schreiben darf, welche Tools er aufrufen darf, wo ein Mensch freigeben muss und wo der Notaus liegt. Jeder Schreibvorgang ist auf konkrete Felder in konkreten Systemen begrenzt. Jeder Freigabepunkt ist benannt. Nichts im Design bleibt implizit.',
          },
          {
            step: 'Bau mit rückrollbaren Schreibvorgängen',
            body: 'Zweiwöchige Iterationen gegen den schriftlichen Scope. Der Agent landet in Staging auf EU-Region-Infrastruktur mit der gleichen Observability wie die spätere Produktion. Jeder Schreibvorgang ist 48 Stunden rückrollbar, jeder Tool-Aufruf wird geloggt, jede Entscheidung ist erklärbar.',
          },
          {
            step: 'Shadow-Run und Kalibrierung',
            body: 'Der Agent läuft mindestens zwei Wochen parallel zum menschlichen Operator. Wir messen die Lücke zwischen Agent-Entscheidung und menschlicher Entscheidung, justieren Prompts und Guardrails und übergeben erst dann in den aktiven Betrieb, wenn die Shadow-Metriken im Zielbereich liegen.',
          },
          {
            step: 'Produktiv-Cutover unter SLA',
            body: 'Deploris betreibt das System unter einer schriftlichen Service-Level-Vereinbarung: 15-minütige Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit, 48 Stunden Rückrollbarkeit jeder ausgelieferten Änderung, voller Audit-Trail pro Fall. Menschliche Freigabe bleibt an den riskanten Schritten, nicht an jedem Schritt.',
          },
          {
            step: 'Steady-State und Quartalsreview',
            body: 'Ein benannter On-Call-Ingenieur, wöchentliches Patch-Fenster, monatliches Metrik-Review (Automatisierungsrate, Ausnahmequote, gesparte Stunden, Fehlerquote), quartalsweiser Roadmap- und Kapazitätstermin mit Ihrer Operations-Leitung. Neue Prozesse kommen im gleichen zweiwöchigen Takt in den Stack.',
          },
        ],
      },
      checklist: {
        title: 'Was Sie von jedem seriösen Anbieter erwarten sollten.',
        intro: 'Wenn ein konkurrierender Anbieter nicht alle zehn Punkte liefern kann, kaufen Sie eine Demo im Produkt-Gewand.',
        items: [
          'Senior-Ingenieure im Discovery-Termin, keine Vertriebsmitarbeiter.',
          'Schriftlicher Scope, Zielautomatisierungsrate und belastbare Preisspanne innerhalb eines Werktags.',
          'Ein benanntes Inventar jedes Systems, aus dem der Agent liest, und jedes Felds, in das er schreibt.',
          'Explizite Human-in-the-Loop-Freigabepunkte an den riskanten Schritten, von vornherein benannt.',
          'Rückrollbare Schreibvorgänge mit einem festgelegten Rückrollfenster (48 Stunden oder besser).',
          'Ein Notaus, den jede Operations-Leitung ohne Entwicklungssupport auslösen kann.',
          'Audit-Trails pro Fall, die eine Prüferin oder ein Prüfer ohne Datenbankabfrage lesen kann.',
          'Eine Shadow-Phase von mindestens zwei Wochen, bevor ein Mensch aus dem Loop genommen wird.',
          'EU-Region-Hosting-Option mit unterzeichnetem AV-Vertrag und EU-AI-Act-Dokumentation.',
          'Schriftliche Service-Level-Vereinbarung mit konkreten Reaktions-, Verfügbarkeits- und Rückrollzahlen.',
        ],
      },
      scenario: {
        title: 'Wie das in der Praxis aussieht.',
        body:
          'Ein mittelständisches B2B-Distributionsunternehmen mit 240 Operations-Sitzen in Deutschland und den USA verbrachte etwa 60 Vollzeit-Äquivalent-Stunden pro Woche mit dem Abgleich von Rechnungen. Drei Kreditorenbuchhalterinnen und -buchhalter glichen Lieferantenrechnungen gegen Bestellungen und Wareneingänge ab, klärten fehlende Felder per E-Mail und leiteten Ausnahmen weiter, die nicht abgeglichen werden konnten. Ein RPA-Skript, zwei Jahre zuvor von einem Big-Four-Umsetzungspartner gebaut, war nach einem ERP-UI-Update stillschweigend außer Betrieb gegangen, und niemand bekam es wieder zum Laufen. Wir haben die Ablösung in einer Woche scoped: ein KI-Agent, der eingehende Rechnungen liest, sie im ERP gegen Bestellungen und Wareneingänge abgleicht, einen Abgleichsvorgang innerhalb der Toleranz bucht, bei Abweichungen eine Ausnahme mit einer Begründung und einem Vorschlag für den nächsten Schritt öffnet und alles oberhalb eines definierten Betragsschwellenwerts an einen menschlichen Freigeber weiterleitet. Die erste funktionierende Version landete in Woche fünf auf EU-Region-Infrastruktur unter einer Deploris-SLA, lief zwei Wochen im Shadow-Modus parallel zu den drei Fachkräften und übernahm in Woche acht den aktiven Betrieb der direkten Abgleichsfälle. Zwölf Wochen nach dem Cutover liefen 68 Prozent der eingehenden Rechnungen unbeaufsichtigt, das Team arbeitete an echten Ausnahmen statt an Dateneingabe, und die Leitung konnte die monatliche Automatisierungsrate aus einem einzigen Dashboard ziehen. Den Firmennamen veröffentlichen wir nicht, weil das Mandat aktiv ist und die Einkaufsabteilung das so bevorzugt.',
      },
      pricingPosture: {
        title: 'Was es kostet, ist eine Scope-Frage, keine Lizenzfrage.',
        body:
          'Deploris verkauft weder Lizenzen pro Prozess noch Gebühren pro Ausführung. Wir scopen jedes Mandat schriftlich: beteiligte Prozesse, Systeme, aus denen der Agent liest und in die er schreibt, Ausnahmevolumen, benötigte SLA und Hosting-Posture. Innerhalb eines Werktags nach dem zweiten Discovery-Termin erhalten Sie eine belastbare Preisspanne, einen Zeitplan und die konkreten Lieferergebnisse jeder Phase. Nichts wird am Telefon zugesagt, nichts für einen "zweiten Termin" zurückgehalten, und auf keiner Seite steht eine Zahl, bevor wir Ihren Prozess verstanden haben.',
      },
      comparison: {
        title: 'Warum Deploris, nicht die Alternativen.',
        intro:
          'Drei Wege führen zu einem Mittelstand-Operations-Automatisierungs-Stack: eigene RPA-Skripte weiter flicken, SaaS-Automatisierungsplattformen verketten oder eine Agentur beauftragen, die den Agenten baut und beim Launch verschwindet. Deploris ist der vierte Weg und der einzige, der die Automation baut und die Infrastruktur unter einem schriftlichen Vertrag betreibt.',
        rows: [
          {
            contender: 'Eigene RPA-Skripte (UiPath, Automation Anywhere, Blue Prism)',
            wins: 'Niedrige Anfangskosten; nimmt den aktuellen Klickpfad schnell auf; dem Einkauf bekannt.',
            gaps: 'Bricht bei jedem UI-Release; kann keine Ausnahmen behandeln; die Fix-Queue hat keinen Owner; keine Erklärbarkeit für Prüfer; jeder Prozess-Nachbau beginnt bei Null.',
          },
          {
            contender: 'SaaS-Automatisierungsplattformen (Zapier, Make, Workato)',
            wins: 'Schnelles Verdrahten öffentlicher APIs; großer Konnektor-Katalog; niedrige Einstiegshürde.',
            gaps: 'Kommt an die Felder in Ihrem ERP, Lager oder Abrechnungssystem, in denen die eigentliche Arbeit stattfindet, nicht heran; keine Rückrollbarkeit; Audit-Trail auf Werkzeuge verteilt; Daten fließen per Default über einen US-SaaS-Anbieter.',
          },
          {
            contender: 'Agentur, die den Agenten baut und sich verabschiedet',
            wins: 'Niedrigere Anfangskosten als intern; schneller als interner Build; liefert einen funktionierenden Agenten.',
            gaps: 'Übergabe an ein separates Operations-Team zum Launch; zwei Verträge, zwei SLAs, zwei On-Call-Rotationen; Incidents springen zwischen der Agentur, die den Agenten geschrieben hat, und dem MSP, der die Server betreibt.',
          },
          {
            contender: 'Deploris: Bau und Betrieb unter einer SLA',
            wins: 'Ein Team schreibt die Agenten und betreibt die Server, auf denen sie laufen; schriftliche SLA ab dem ersten Commit; rückrollbare Schreibvorgänge und benannte Freigabepunkte per Default; EU-Region-Hosting; zweisprachige DE+EN-Lieferung; eine Rechnung, ein Verantwortungspunkt.',
            gaps: 'Kein Shrink-wrap-Produkt; jedes Mandat wird schriftlich scoped und startet im Mittelstand-Segment (ab 200 Sitzen).',
          },
        ],
      },
      faq: [
        {
          q: 'Wie unterscheidet sich ein KI-Agent von einem RPA-Skript?',
          a: 'Ein RPA-Skript zeichnet einen festen Klickpfad durch eine Oberfläche auf; es bricht, wenn sich die Oberfläche ändert, und es hat keine Möglichkeit, einen Fall zu behandeln, den es noch nicht gesehen hat. Ein KI-Agent reasoniert über die Eingaben, ruft Tools gegen Ihre Systems of Record auf, folgt schriftlichen Guardrails und eskaliert an einen benannten Menschen, wenn ein Fall außerhalb seiner Guardrails liegt. Er muss nicht bei jedem ERP-Release neu gebaut werden.',
        },
        {
          q: 'Wie unterscheidet sich das von Zapier, Make oder Workato?',
          a: 'SaaS-Automatisierungsplattformen sind gut darin, öffentliche APIs zu verdrahten, aber sie können nicht in die konkreten Felder in Ihrem ERP, Lager oder Abrechnungssystem schreiben, in denen echte Operations-Arbeit stattfindet, und der Audit-Trail, den sie erzeugen, ist zwischen Plattform und angerufenen Systemen aufgeteilt. Eine Deploris-KI-Automation läuft gegen Ihre Systems of Record mit benannten Schreibvorgängen, 48 Stunden Rückrollfenster, einem einzigen Audit-Trail pro Fall und EU-Region-Hosting, wenn Sie das benötigen.',
        },
        {
          q: 'Wie lange dauert es bis zum Produktivbetrieb?',
          a: 'Eine erste funktionierende Version landet innerhalb von 4 bis 6 Wochen in Ihrer Staging-Umgebung. Ein voller Produktiv-Rollout eines Prozesses inklusive zweiwöchiger Shadow-Phase dauert typischerweise 3 bis 6 Monate. Weitere Prozesse kommen im gleichen zweiwöchigen Takt in den Stack, sobald das Betriebsmodell steht.',
        },
        {
          q: 'Wo laufen der Agent und seine Daten?',
          a: 'Standardmäßig in der Region Frankfurt (EU) eines Hyperscale-Clouds unter unterzeichnetem AV-Vertrag, optional in Ihrem eigenen Cloud-Account. US-only-Dienste setzen wir in der Pipeline nicht ein, wenn EU-Region-Hosting im Scope ist. Modell-Anbieter, Embedding-Anbieter und Vektor-Store werden im schriftlichen Scope benannt.',
        },
        {
          q: 'Was passiert, wenn der Agent einen Fehler macht?',
          a: 'Jeder Schreibvorgang ist 48 Stunden rückrollbar, jeder Tool-Aufruf wird geloggt, jede Entscheidung ist aus dem Audit-Trail erklärbar. Wird eine Ausnahme falsch klassifiziert, korrigiert die menschliche Prüferin oder der Prüfer sie, die Korrektur fließt in die Kalibrierungsdaten zurück, und die Guardrails werden im nächsten zweiwöchigen Inkrement angepasst. Es gibt keinen Fall, in dem eine Agent-Entscheidung nicht rücknehmbar ist, und keinen, in dem die Leitung nicht sehen kann, was der Agent getan hat.',
        },
        {
          q: 'Wo bleibt der Mensch im Loop?',
          a: 'Der schriftliche Scope benennt jeden Freigabepunkt, bevor eine Zeile Code geschrieben wird: Beträge oberhalb eines Schwellenwerts, Schreibvorgänge auf bestimmte sensible Felder, Fälle mit niedriger Konfidenz, Geschäftspartner auf einer Watchlist. Menschen bleiben an den riskanten Momenten, nicht an jedem Moment. Das Ziel sind nicht null Menschen; das Ziel sind null Menschen an Arbeit, die Software hätte erledigen sollen.',
        },
        {
          q: 'Welche Service-Level-Vereinbarung gilt nach Launch?',
          a: '15-minütige Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit auf den von uns betriebenen Systemen, 48 Stunden Rückrollbarkeit jeder ausgelieferten Änderung mit vollem Audit-Trail, benannter On-Call-Ingenieur, wöchentliches Patch-Fenster. Konkrete Zahlen werden in jedem Mandatsvertrag schriftlich festgehalten, nicht auf einer Marketing-Seite.',
        },
        {
          q: 'Wie gehen Sie mit DSGVO, AV-Vertrag und EU AI Act um?',
          a: 'Vor Baubeginn wird ein AV-Vertrag unterzeichnet, der jedes System in der Pipeline abdeckt. EU-Region-Hosting ist Default; Sub-Prozessoren (Modell-Anbieter, Embedding-Anbieter, Vektor-Store) sind gelistet und werden quartalsweise überprüft. Jede KI-Automation wird gegen die Risikostufen des EU AI Act inventarisiert und mit der vom Gesetz geforderten Dokumentation ausgeliefert: Zweck, Eingaben, Ausgaben, menschliche Aufsicht, Monitoring und Incident-Verfahren.',
        },
        {
          q: 'Welche Prozesse eignen sich dafür?',
          a: 'Wiederkehrende mehrstufige Arbeit mit definiertem Anfang und Ende, aufgeschriebenen Regeln für die meisten Fälle, benannten Systems of Record und einer messbaren Ausnahmequote: Auftragsrouting, Rechnungsabgleich, Backoffice-Routing, Support-Ticket-Vortriage, Dateneingabe aus eingehenden Dokumenten, Stammdaten-Bereinigung, Lieferantenprüfung, SKU- und Katalogpflege. Lebt der Prozess im Kopf einer einzelnen Person und ist nie aufgeschrieben worden, beginnen wir damit, ihn aufzuschreiben.',
        },
        {
          q: 'Wem gehören Code, Prompts und Daten?',
          a: 'Ihnen, in allen drei Fällen. Repository, Prompt-Bibliothek, Infrastructure-as-Code und Daten gehören Ihnen ab Tag eins. Deploris betreibt das System vertraglich; nichts im Stack ist eine Deploris-Blackbox, und Sie können den Betrieb jederzeit intern übernehmen oder auf einen anderen Betreiber wechseln, ohne das System neu zu schreiben.',
        },
        {
          q: 'Können Sie mit unserem internen Entwicklungsteam arbeiten, statt es zu ersetzen?',
          a: 'Ja. In vielen Mandaten führt Deploris den Bau, und Ihr internes Team lernt den Stack mit, übernimmt mit der Zeit ausgewählte Agenten. Der schriftliche Scope benennt, welche Agenten Deploris verantwortet, welche das Kundenteam, und welche während des Mandats übergehen.',
        },
        {
          q: 'Wer ist Deploris, und warum sollten wir Ihnen unsere Operations anvertrauen?',
          a: 'Deploris ist ein in den USA registriertes Engineering-Unternehmen (Colorado LLC 20268259375) mit einem DACH-Delivery-Team, aufgebaut als die Mittelstandsantwort auf die Lücke zwischen Agenturen, die Software schreiben, und MSPs, die Infrastruktur betreiben. Von 40 benchmarkten Mittelstandsfirmen in USA und DACH sind wir das einzige Team, das beide Hälften unter einem Vertrag abdeckt. Die Person in Ihrer On-Call-Eskalation ist dieselbe Person, die den Agenten geschrieben hat, der sie gepaged hat.',
        },
      ],
      related: {
        title: 'Weiterführende Inhalte',
        items: [
          {
            label: 'Leistung: KI-Agenten & Automatisierung',
            href: '/services/development/ki-automatisierung',
            blurb: 'Zugrunde liegende Leistungsseite: Scope, Vorgehensweise, Outcomes und das vollständige Angebot zu KI-Agenten und Workflow-Automatisierung.',
          },
          {
            label: 'KI-Agenten vs. Workflow-Automatisierung',
            href: '/compare/ai-agents-vs-automation',
            blurb: 'Der Entscheidungsrahmen für Agenten, deterministische Automatisierung oder einen Mix, mit den konkreten Abwägungen für ein Mittelstand-Operations-Team.',
          },
          {
            label: 'RAG-Kostenrechner',
            href: '/tools/rag-cost-model',
            blurb: 'Modellieren Sie die laufenden Kosten einer Retrieval- und Generierungs-Workload, mit jeder Annahme offen auf der Seite.',
          },
          {
            label: 'KI-Chancen-Finder',
            href: '/ai-opportunity-finder',
            blurb: 'Noch unsicher, welcher Prozess die richtige erste Automatisierung ist? Starten Sie mit einer 10-Minuten-Scoping-Analyse.',
          },
        ],
      },
      cta: {
        primary: 'Scoping-Termin anfragen',
        secondary: 'Beispiel-Scope ansehen',
      },
    },
  },
};
