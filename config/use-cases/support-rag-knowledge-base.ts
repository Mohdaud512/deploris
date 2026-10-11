import type { UseCase } from './types';

/**
 * Use case: Customer support teams, RAG knowledge base.
 * Underlying service: rag-systems (config/services.ts).
 * Primary search intent: "RAG knowledge base for customer support teams",
 *   "support chatbot grounded in product docs", "replace Confluence search".
 */
export const supportRagKnowledgeBase: UseCase = {
  id: 'support-rag-knowledge-base',
  serviceId: 'rag-systems',
  primaryKeyword: {
    en: 'RAG knowledge base for customer support teams',
    de: 'RAG-Wissensbasis für Kundensupport-Teams',
  },
  secondaryKeywords: {
    en: [
      'support RAG system',
      'grounded support chatbot',
      'retrieval augmented generation support',
      'Zendesk AI alternative',
      'Intercom AI alternative',
      'Confluence search replacement',
    ],
    de: [
      'RAG für Kundensupport',
      'KI-Support-Assistent mit Quellen',
      'Retrieval-Augmented-Generation Support',
      'Zendesk-KI Alternative',
      'Intercom-KI Alternative',
      'Confluence-Suche ersetzen',
    ],
  },
  lastReviewed: '2026-10-11',
  copy: {
    en: {
      slug: 'support-rag-knowledge-base',
      metaTitle: 'RAG Knowledge Base for Support Teams',
      metaDescription:
        'A retrieval-augmented knowledge base for customer support, grounded in your current docs, release notes, and ticket history, with citations per answer. Scoped in writing, operated by Deploris under one SLA.',
      eyebrow: 'Use case · Customer support',
      h1: 'RAG knowledge base for customer support teams.',
      deck: 'A retrieval-augmented generation system grounded in your current product docs, release notes, ticket history, and internal runbooks. Deploris builds it, ships it in 4 to 6 weeks, and runs the infrastructure it answers from.',
      tldr: 'A RAG knowledge base for a customer support team is a retrieval-augmented AI system, grounded in that team\'s current product docs, release notes, ticket history, and internal runbooks, that answers agent and customer questions with per-claim citations and refuses to guess when the source is missing, instead of hallucinating from a generic chatbot or returning stale wiki pages.',
      atAGlance: [
        { label: 'Who it is for', value: 'Support teams of 20 to 300 agents' },
        { label: 'First release', value: '4 to 6 weeks' },
        { label: 'Full rollout', value: '3 to 6 months' },
        { label: 'Hosting', value: 'EU-region (Frankfurt) or your own cloud' },
        { label: 'SLA', value: '15-min P1 median, 99.9%+ uptime' },
        { label: 'Delivered by', value: 'Bilingual team, DE + EN' },
      ],
      problem: {
        title: 'Why support teams outgrow generic chatbots and wiki search.',
        body:
          'Support leaders are told to pick between two broken options. The first is a generic AI chatbot bolted onto the help desk, trained on marketing copy and public docs, that confidently invents answers your product cannot deliver and your legal team cannot defend. The second is homegrown search across Confluence, SharePoint, and Notion, which returns the top ten pages for every query and asks the agent to read them. Neither grounds answers in the version of the product that shipped this week. Neither cites a source the agent can send to the customer. Neither respects the fact that an internal runbook should never show up in an answer to an end user. Your senior agents end up as the search engine for the whole team, your deflection stays flat, and the chatbot vendor charges per resolved conversation whether or not the resolution was correct.',
        bullets: [
          'The generic chatbot hallucinates product behavior that does not exist, and your legal team cannot audit which source produced which claim.',
          'Wiki search returns ten pages for every query and leaves the agent to read them while the customer waits.',
          'Release notes land weekly, but the index behind the chatbot was last refreshed when the vendor onboarded you.',
          'Access control is an afterthought: internal runbooks surface in answers to end users, or everything is locked down and nothing is useful.',
          'Your data sits in a US-hosted vendor cloud, which stalls procurement conversations with German and EU enterprise customers.',
        ],
      },
      howItWorks: {
        title: 'How we build and run your support RAG system.',
        intro: 'Six stages, every one documented, no surprises in the statement of work.',
        steps: [
          {
            step: 'Knowledge audit and written scope',
            body: 'A senior engineer sits with support leadership, your top two agents, and a product-docs owner for two half-day sessions. We inventory sources (product docs, release notes, Zendesk or Intercom ticket history, Confluence, SharePoint, Notion, internal runbooks), classify sensitivity, and ship a written scope, a corpus plan, and a defensible price band inside one business day of the second session.',
          },
          {
            step: 'Pipeline design and evaluation harness',
            body: 'We design the chunking strategy, embedding model (open-source where it meets quality bar, hosted where it does not), vector index (pgvector on Postgres or a dedicated store), and the orchestration layer that calls the LLM. Before any production answer is served, we write an evaluation harness against 150 to 300 real questions pulled from your ticket history, with graded gold answers.',
          },
          {
            step: 'Build with grounded refusals and citations',
            body: 'Two-week iterations against the written scope. The system refuses to answer when retrieved context does not support the claim, cites every factual sentence to its source, and respects the same access rules your identity provider already enforces. You see working UI from week two, in a staging environment on EU-region infrastructure.',
          },
          {
            step: 'Agent pilot and ticket-history dual-run',
            body: 'We roll the assistant out to a pilot group of agents first, inside the help desk they already use, with every suggestion logged and reviewed. We dual-run against the previous month of resolved tickets to measure deflection quality, citation accuracy, and refusal rate before any customer-facing rollout.',
          },
          {
            step: 'Production launch under SLA',
            body: 'Deploris operates the full stack under a written service-level agreement: 15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target, 48-hour reversibility on any change, full audit trail for every answer served and every source retrieved.',
          },
          {
            step: 'Steady state, index refresh, and quarterly review',
            body: 'A named on-call engineer, a documented refresh cadence that pulls new docs and release notes on your release rhythm, weekly evaluation runs on a growing question set, monthly metrics review, quarterly roadmap session with support leadership. Hallucination rate, citation precision, and refusal rate are tracked over time, not just at launch.',
          },
        ],
      },
      checklist: {
        title: 'What to expect from any vendor doing this well.',
        intro: 'If a competing vendor cannot meet all ten, you are buying a demo dressed as a product.',
        items: [
          'Senior engineers on the discovery call, not account executives.',
          'A written scope, corpus plan, and defensible price band inside one business day.',
          'An evaluation harness against real tickets, with graded gold answers, before any production rollout.',
          'Per-claim citations on every answer, linking back to the exact source chunk.',
          'An explicit refusal path when retrieved context does not support the claim.',
          'Access control that mirrors your identity provider, not a parallel permissions model.',
          'Documented refresh cadence tied to your release and docs rhythm, not a vendor schedule.',
          'EU-region hosting option with a signed data processing agreement.',
          'A written service-level agreement with specific response and uptime numbers.',
          'A named on-call engineer and a documented runbook, not a shared mailbox.',
        ],
      },
      scenario: {
        title: 'What this looks like in practice.',
        body:
          'A mid-market SaaS firm with a 60-person support team across Berlin and Austin was running Zendesk with a generic AI add-on and a Confluence space of 3,200 pages. The head of support told us the add-on resolved around 18 percent of inbound tickets but routinely cited features that had been deprecated two releases ago, and legal had flagged three answers in the past quarter as inventing behavior the product did not have. Agents stopped trusting the suggestions and the deflection flattened. We scoped a replacement in one week: an RAG system over current product docs, the last 24 months of release notes, the last 12 months of resolved tickets as a Q and A corpus, and the internal runbooks with role-based access so customer-facing answers never pull from internal-only pages. Pipeline runs on pgvector against Postgres in the Frankfurt region, embeddings refresh nightly, and the full evaluation harness runs weekly against 220 graded tickets. First working version shipped at week five, agent pilot at week eight, full rollout at week fourteen. At steady state the system refuses roughly 7 percent of queries rather than guess, cites every factual sentence, and the hallucination rate measured against the eval set stayed under 2 percent across the first two quarters. We do not publish the firm\'s name because the engagement is active and the procurement team prefers it that way.',
      },
      pricingPosture: {
        title: 'What this costs is a scope question, not a per-conversation question.',
        body:
          'Deploris does not sell per-resolved-conversation pricing or per-seat chatbot licenses. We scope every engagement in writing: the shape of the corpus, the number and sensitivity of sources, the integrations with your help desk and identity provider, the SLA you need, and the hosting posture. You get a defensible price band, a timeline, and the specific deliverables for each phase inside one business day of the second discovery session. Nothing is quoted on the phone, nothing is held back for a "second call", and no number appears on a page before we understand your corpus.',
      },
      comparison: {
        title: 'Why Deploris, not the alternatives.',
        intro:
          'Three paths lead to a support knowledge system that actually works: paint over a generic chatbot, keep patching homegrown search, or hire a dev shop that will walk away at launch. Deploris is the fourth path, and the only one of the four that both builds the retrieval pipeline and operates the infrastructure under one written contract.',
        rows: [
          {
            contender: 'Homegrown Confluence or SharePoint search',
            wins: 'Already in place; indexes content you already own; no new vendor relationship.',
            gaps: 'Returns ten pages per query with no answer synthesis; no citations, no refusals, no access control at the chunk level; index refresh and relevance tuning become an open-ended internal project.',
          },
          {
            contender: 'Generic AI chatbot platforms (Intercom AI, Zendesk AI, out-of-the-box add-ons)',
            wins: 'Fastest to switch on; sits inside the help desk your agents already use; vendor markets the deflection numbers.',
            gaps: 'Hallucinates when the retrieved context is thin or absent; no per-claim citations your legal team can audit; access control usually applied at the whole-document level, not per chunk; index refresh on the vendor\'s schedule; data typically US-hosted.',
          },
          {
            contender: 'Hire a dev shop that builds and walks away',
            wins: 'Lower initial cost than in-house; faster than building retrieval from scratch internally.',
            gaps: 'Hand-off to a separate operations team at launch; two contracts, two SLAs; the evaluation harness and refresh pipeline often never make it into production ownership; incidents bounce between the shop that wrote it and the MSP that runs it.',
          },
          {
            contender: 'Deploris, build and run under one SLA',
            wins: 'One team writes the retrieval pipeline and operates the servers it answers from; written SLA from the first commit; per-claim citations, refusals, and access control designed in, not retrofitted; EU-region hosting by default; one invoice, one point of accountability.',
            gaps: 'Not a shrink-wrapped product; every engagement is scoped in writing and starts at mid-market scale (20 agents and up).',
          },
        ],
      },
      faq: [
        {
          q: 'How does a custom RAG system compare to Zendesk AI or Intercom AI for a mid-market support team?',
          a: 'A custom RAG system grounds every answer in your current product docs, release notes, and ticket history, cites each factual claim to its source, and refuses to answer when the retrieved context does not support the claim. Generic help-desk AI add-ons optimize for deflection metrics and will often invent plausible-sounding answers when retrieval is thin. For teams of 20 to 300 agents the custom path typically costs less than per-resolved-conversation pricing by month 18, and removes the hallucination risk legal teams flag on the generic platforms.',
        },
        {
          q: 'How do you stop the system from hallucinating?',
          a: 'Three mechanisms work together. First, the prompt and orchestration layer explicitly instruct the LLM to answer only from retrieved context and to refuse otherwise. Second, every claim in the answer is linked to a source chunk, and answers without citations are suppressed. Third, a weekly evaluation harness scores the system on precision, recall, and refusal rate against 150 to 300 graded real tickets, so hallucination regressions are caught before they reach agents.',
        },
        {
          q: 'What happens when the system does not know the answer?',
          a: 'It refuses. The system is designed to say "I do not have a source for that" rather than invent, and to route the ticket to a human agent with the exact query logged. The refusal rate is a tracked metric, not a bug: a healthy production RAG for support typically refuses between 5 and 15 percent of queries, and that number is reviewed every month against your real traffic.',
        },
        {
          q: 'How do you handle access control so internal runbooks do not surface in answers to end users?',
          a: 'Access control is applied at the chunk level, not the document level, and mirrors your existing identity provider. Each chunk inherits the ACL of its source, and the retrieval step filters by the caller\'s identity before any context reaches the LLM. An agent-facing assistant and a customer-facing assistant draw from overlapping corpora with different permission boundaries, defined in writing before the first chunk is indexed.',
        },
        {
          q: 'Which embedding model and LLM do you use?',
          a: 'We choose per engagement, based on quality, latency, cost, and data residency. For EU-region engagements we prefer open-source embedding models self-hosted in Frankfurt or hosted models with clean EU data-processing terms. For the generation step we use the model that scores best on your evaluation set among the options allowed by your DPA, typically from Anthropic, OpenAI, Mistral, or an open-weights model self-hosted. The choice is written into the scope and reviewed quarterly.',
        },
        {
          q: 'How often is the index refreshed when our docs change?',
          a: 'The default refresh pipeline is nightly for product docs and release notes, with event-driven updates on major releases. Ticket-history corpora refresh weekly. The cadence is tied to your release and documentation rhythm, written into the operations runbook, and monitored so stale sources trigger alerts rather than silent drift.',
        },
        {
          q: 'What is the latency per answer?',
          a: 'End-to-end response time is typically between 1 and 4 seconds depending on retrieval depth and generation model. The retrieval step itself usually sits under 300 milliseconds. Latency targets are written into the SLA when the assistant is customer-facing, and the full timing breakdown (retrieval, generation, post-processing) is logged for every answer.',
        },
        {
          q: 'Where will the knowledge base and vector index live?',
          a: 'By default in the Frankfurt (EU) region of a hyperscale cloud under a signed data processing agreement, with the option to run it in your own cloud account instead. We do not use US-only services anywhere in the pipeline when EU-region hosting is in scope, and sub-processors are listed and reviewed quarterly.',
        },
        {
          q: 'How do you handle personally identifiable information in indexed ticket history?',
          a: 'Before any ticket enters the index it passes through a redaction stage that removes direct identifiers (names, emails, phone numbers, account IDs) and tags sensitive fields. Redaction policy is written into the scope, reviewed by your DPO, and tested as part of the evaluation harness. The raw ticket store remains untouched; redaction happens on the way into the retrieval pipeline.',
        },
        {
          q: 'How does this comply with the EU AI Act and GDPR?',
          a: 'A data processing agreement is signed before build begins and covers every system in the pipeline. The RAG system is inventoried against the EU AI Act risk tiers (typically limited-risk for internal support assistants, with transparency obligations) and ships with the documentation that act requires: purpose, training and retrieval data provenance, evaluation results, and a human-oversight path. EU-region hosting is the default.',
        },
        {
          q: 'How do you evaluate retrieval quality over time?',
          a: 'A graded evaluation set of 150 to 300 real tickets is built with your senior agents during the pilot, and grows every month. We run the full set weekly and report precision, recall, citation accuracy, refusal rate, and hallucination rate per source domain. Regressions are triaged on the same two-week cadence as feature work, and the eval set is versioned alongside the pipeline.',
        },
        {
          q: 'Who is Deploris and why should we trust you to run our support knowledge system?',
          a: 'Deploris is a US-registered engineering firm (Florida LLC L24000491676) with a DACH delivery team, built as the mid-market answer to the gap between dev shops that write software and MSPs that run infrastructure. Of 40 mid-market firms benchmarked across the US and DACH, we are the only team that covers both halves under one contract. The person on your on-call escalation is the same person who wrote the module that paged.',
        },
      ],
      related: {
        title: 'Related reading',
        items: [
          {
            label: 'RAG Systems service',
            href: '/services/development/rag-systems',
            blurb: 'Underlying capability page: scope, pricing posture, process, and the full RAG development offer.',
          },
          {
            label: 'RAG vs traditional search',
            href: '/compare/rag-vs-traditional-search',
            blurb: 'The decision framework for retrieval-augmented AI against keyword search and generic chatbots, with the actual trade-offs for a support team.',
          },
          {
            label: 'RAG cost model',
            href: '/tools/rag-cost-model',
            blurb: 'Model your retrieval, embedding, and generation costs against per-resolved-conversation pricing, with every assumption on the page.',
          },
          {
            label: 'AI Opportunity Finder',
            href: '/ai-opportunity-finder',
            blurb: 'Not sure a RAG system is the right next investment? Run a 10-minute scoping assessment first.',
          },
        ],
      },
      cta: {
        primary: 'Book a scoping call',
        secondary: 'See a sample scope document',
      },
    },
    de: {
      slug: 'support-rag-wissensbasis',
      metaTitle: 'RAG-Wissensbasis für Kundensupport',
      metaDescription:
        'Eine retrieval-gestützte Wissensbasis für den Kundensupport, verankert in aktueller Doku, Release-Notes und Ticket-Historie, mit Quellenverweis pro Antwort. Schriftlich scoped, von Deploris unter einer SLA betrieben.',
      eyebrow: 'Anwendungsfall · Kundensupport',
      h1: 'RAG-Wissensbasis für Kundensupport-Teams.',
      deck: 'Ein Retrieval-Augmented-Generation-System, verankert in Ihrer aktuellen Produktdokumentation, Ihren Release-Notes, Ihrer Ticket-Historie und Ihren internen Runbooks. Deploris baut es, bringt es in 4 bis 6 Wochen in Produktion und betreibt die Infrastruktur, aus der es antwortet.',
      tldr: 'Eine RAG-Wissensbasis für ein Kundensupport-Team ist ein retrieval-gestütztes KI-System, verankert in der aktuellen Produktdokumentation, den Release-Notes, der Ticket-Historie und den internen Runbooks dieses Teams, das Agenten- und Kundenfragen mit Quellenverweis pro Aussage beantwortet und bei fehlender Quelle die Antwort verweigert, anstatt wie ein generischer Chatbot zu halluzinieren oder veraltete Wiki-Seiten zurückzugeben.',
      atAGlance: [
        { label: 'Für wen', value: 'Supportteams von 20 bis 300 Agenten' },
        { label: 'Erstes Release', value: '4 bis 6 Wochen' },
        { label: 'Vollständiger Rollout', value: '3 bis 6 Monate' },
        { label: 'Hosting', value: 'EU-Region (Frankfurt) oder Ihre eigene Cloud' },
        { label: 'SLA', value: '15 Min P1-Median, 99,9 %+ Verfügbarkeit' },
        { label: 'Geliefert von', value: 'Zweisprachig DE + EN' },
      ],
      problem: {
        title: 'Warum Support-Teams aus generischen Chatbots und Wiki-Suche herauswachsen.',
        body:
          'Supportleitungen bekommen typischerweise zwei kaputte Optionen angeboten. Die erste ist ein generischer KI-Chatbot, der an das Helpdesk angeflanscht wird, auf Marketing-Texten und öffentlicher Doku trainiert ist und selbstbewusst Antworten erfindet, die Ihr Produkt nicht liefern kann und Ihre Rechtsabteilung nicht verteidigen will. Die zweite ist eine hausgemachte Suche quer über Confluence, SharePoint und Notion, die auf jede Anfrage zehn Seiten zurückgibt und dem Agenten die Lektüre überlässt. Keine der beiden verankert Antworten in der Produktversion, die diese Woche ausgeliefert wurde. Keine zitiert eine Quelle, die der Agent an den Kunden schicken kann. Keine respektiert, dass ein internes Runbook niemals in einer Antwort an einen Endkunden auftauchen darf. Ihre erfahrenen Agenten werden zur Suchmaschine für das ganze Team, die Deflection stagniert, und der Chatbot-Anbieter rechnet pro gelöster Konversation ab, egal ob die Lösung korrekt war.',
        bullets: [
          'Der generische Chatbot halluziniert Produktverhalten, das nicht existiert, und Ihre Rechtsabteilung kann nicht auditieren, welche Quelle welche Aussage erzeugt hat.',
          'Die Wiki-Suche gibt auf jede Anfrage zehn Seiten zurück und überlässt dem Agenten die Lektüre, während der Kunde wartet.',
          'Release-Notes erscheinen wöchentlich, aber der Index hinter dem Chatbot wurde zuletzt beim Onboarding des Anbieters aktualisiert.',
          'Zugriffskontrolle ist nachträglich dazugebaut: Entweder tauchen interne Runbooks in Endkunden-Antworten auf, oder alles ist gesperrt und nichts ist nützlich.',
          'Ihre Daten liegen in einer US-gehosteten Anbieter-Cloud. Das stoppt Beschaffungsgespräche mit deutschen und europäischen Enterprise-Kunden.',
        ],
      },
      howItWorks: {
        title: 'Wie wir Ihr Support-RAG-System bauen und betreiben.',
        intro: 'Sechs Phasen, jede dokumentiert, keine Überraschungen in der Leistungsbeschreibung.',
        steps: [
          {
            step: 'Wissens-Audit und schriftlicher Scope',
            body: 'Ein Senior-Ingenieur arbeitet in zwei halbtägigen Terminen mit Ihrer Supportleitung, Ihren zwei besten Agenten und einem Produktdoku-Owner. Wir inventarisieren Quellen (Produktdoku, Release-Notes, Zendesk- oder Intercom-Ticket-Historie, Confluence, SharePoint, Notion, interne Runbooks), klassifizieren Sensibilität und liefern innerhalb eines Werktags nach dem zweiten Termin schriftlichen Scope, Korpus-Plan und belastbare Preisspanne.',
          },
          {
            step: 'Pipeline-Design und Evaluations-Harness',
            body: 'Wir entwerfen die Chunking-Strategie, das Embedding-Modell (Open Source, wenn die Qualität reicht, sonst gehostet), den Vektor-Index (pgvector auf Postgres oder ein dedizierter Store) und die Orchestrierungsschicht, die das LLM aufruft. Bevor eine einzige produktive Antwort ausgeliefert wird, bauen wir ein Evaluations-Harness gegen 150 bis 300 reale Fragen aus Ihrer Ticket-Historie mit bewerteten Gold-Antworten.',
          },
          {
            step: 'Bau mit begründeten Verweigerungen und Zitaten',
            body: 'Zweiwöchige Iterationen gegen den schriftlichen Scope. Das System verweigert die Antwort, wenn der abgerufene Kontext die Aussage nicht stützt, zitiert jeden faktischen Satz zu seiner Quelle und respektiert dieselben Zugriffsregeln, die Ihr Identity-Provider ohnehin durchsetzt. Ab Woche zwei sehen Sie funktionierende Oberflächen in einer Staging-Umgebung auf EU-Region-Infrastruktur.',
          },
          {
            step: 'Agenten-Pilot und Ticket-Historie-Dual-Run',
            body: 'Wir rollen den Assistenten zuerst an eine Pilotgruppe von Agenten im bestehenden Helpdesk aus, mit vollständigem Log jeder Vorschlagsantwort. Wir fahren einen Dual-Run gegen den letzten Monat an gelösten Tickets, um Deflection-Qualität, Zitatpräzision und Verweigerungsrate zu messen, bevor etwas an Endkunden geht.',
          },
          {
            step: 'Produktivbetrieb unter SLA',
            body: 'Deploris betreibt den gesamten Stack unter einer schriftlichen Service-Level-Vereinbarung: 15-minütige Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit, 48 Stunden Rückrollbarkeit jeder Änderung, vollständiger Audit-Trail für jede ausgelieferte Antwort und jede abgerufene Quelle.',
          },
          {
            step: 'Steady-State, Index-Refresh und Quartalsreview',
            body: 'Ein benannter On-Call-Ingenieur, eine dokumentierte Refresh-Kadenz, die neue Doku und Release-Notes im Takt Ihres Release-Rhythmus einzieht, wöchentliche Evaluationsläufe auf einem wachsenden Fragenset, monatliches Metrik-Review, quartalsweiser Roadmap-Termin mit der Supportleitung. Halluzinationsrate, Zitatpräzision und Verweigerungsrate werden über die Zeit verfolgt, nicht nur zum Launch.',
          },
        ],
      },
      checklist: {
        title: 'Was Sie von jedem seriösen Anbieter erwarten sollten.',
        intro: 'Wenn ein konkurrierender Anbieter nicht alle zehn Punkte liefern kann, kaufen Sie eine Demo im Produkt-Gewand.',
        items: [
          'Senior-Ingenieure im Discovery-Termin, keine Vertriebsmitarbeiter.',
          'Schriftlicher Scope, Korpus-Plan und belastbare Preisspanne innerhalb eines Werktags.',
          'Ein Evaluations-Harness gegen echte Tickets mit bewerteten Gold-Antworten vor jedem Produktiv-Rollout.',
          'Zitat pro faktischer Aussage, verlinkt zum konkreten Quell-Chunk.',
          'Ein expliziter Verweigerungspfad, wenn der abgerufene Kontext die Aussage nicht stützt.',
          'Zugriffskontrolle, die Ihr Identity-Provider spiegelt, kein paralleles Berechtigungsmodell.',
          'Dokumentierte Refresh-Kadenz, verankert in Ihrem Release- und Doku-Takt, nicht im Anbieter-Terminkalender.',
          'EU-Region-Hosting-Option mit unterzeichnetem AV-Vertrag.',
          'Schriftliche Service-Level-Vereinbarung mit konkreten Reaktions- und Verfügbarkeitszahlen.',
          'Benannter On-Call-Ingenieur und dokumentiertes Runbook, nicht ein Sammelpostfach.',
        ],
      },
      scenario: {
        title: 'Wie das in der Praxis aussieht.',
        body:
          'Ein mittelständisches SaaS-Unternehmen mit einem 60-Personen-Supportteam in Berlin und Austin betrieb Zendesk mit einem generischen KI-Add-on und einem Confluence-Space mit 3.200 Seiten. Der Head of Support berichtete uns, das Add-on löse rund 18 Prozent der eingehenden Tickets, zitiere aber regelmäßig Funktionen, die zwei Releases zuvor entfernt wurden, und die Rechtsabteilung habe im vergangenen Quartal drei Antworten als Erfindung von nicht existierendem Produktverhalten markiert. Die Agenten verloren das Vertrauen in die Vorschläge, und die Deflection flachte ab. Wir haben die Ablösung in einer Woche scoped: ein RAG-System über aktuelle Produktdoku, die letzten 24 Monate Release-Notes, die letzten 12 Monate gelöster Tickets als Q-und-A-Korpus und die internen Runbooks mit rollenbasierter Zugriffskontrolle, damit kundenseitige Antworten niemals aus intern markierten Seiten gezogen werden. Die Pipeline läuft auf pgvector gegen Postgres in der Frankfurt-Region, Embeddings werden nächtlich aktualisiert, und das vollständige Evaluations-Harness läuft wöchentlich gegen 220 bewertete Tickets. Erste produktive Version in Woche fünf, Agenten-Pilot in Woche acht, voller Rollout in Woche vierzehn. Im Steady-State verweigert das System rund 7 Prozent der Anfragen, statt zu raten, zitiert jeden faktischen Satz, und die am Eval-Set gemessene Halluzinationsrate blieb über die ersten zwei Quartale unter 2 Prozent. Den Firmennamen veröffentlichen wir nicht, weil das Mandat aktiv ist und die Einkaufsabteilung das so bevorzugt.',
      },
      pricingPosture: {
        title: 'Was es kostet, ist eine Scope-Frage, keine Pro-Konversation-Frage.',
        body:
          'Deploris verkauft keine Preismodelle pro gelöster Konversation und keine Chatbot-Lizenz pro Sitz. Wir scopen jedes Mandat schriftlich: Form des Korpus, Zahl und Sensibilität der Quellen, Integrationen mit Helpdesk und Identity-Provider, benötigte SLA und Hosting-Posture. Innerhalb eines Werktags nach dem zweiten Discovery-Termin erhalten Sie eine belastbare Preisspanne, einen Zeitplan und die konkreten Lieferergebnisse jeder Phase. Nichts wird am Telefon zugesagt, nichts für einen "zweiten Termin" zurückgehalten, und auf keiner Seite steht eine Zahl, bevor wir Ihren Korpus verstanden haben.',
      },
      comparison: {
        title: 'Warum Deploris, nicht die Alternativen.',
        intro:
          'Drei Wege führen zu einem Support-Wissenssystem, das tatsächlich funktioniert: einen generischen Chatbot übermalen, hausgemachte Suche weiter flicken oder eine Agentur beauftragen, die beim Launch verschwindet. Deploris ist der vierte Weg und der einzige, der die Retrieval-Pipeline baut und die Infrastruktur unter einem schriftlichen Vertrag betreibt.',
        rows: [
          {
            contender: 'Hausgemachte Suche über Confluence oder SharePoint',
            wins: 'Bereits vorhanden; indexiert Inhalte, die Sie ohnehin besitzen; keine neue Anbieterbeziehung.',
            gaps: 'Liefert zehn Seiten pro Anfrage ohne Antwortsynthese; keine Zitate, keine Verweigerungen, keine Zugriffskontrolle auf Chunk-Ebene; Index-Refresh und Relevanz-Tuning werden zu einem offenen internen Projekt.',
          },
          {
            contender: 'Generische KI-Chatbot-Plattformen (Intercom AI, Zendesk AI, Out-of-the-Box-Add-ons)',
            wins: 'Am schnellsten einschaltbar; sitzt im bestehenden Helpdesk; der Anbieter wirbt mit Deflection-Zahlen.',
            gaps: 'Halluziniert, wenn der abgerufene Kontext dünn oder leer ist; keine Zitate pro Aussage, die Ihre Rechtsabteilung auditieren kann; Zugriffskontrolle meist auf Dokumentenebene, nicht pro Chunk; Index-Refresh nach Anbieter-Zeitplan; Daten typischerweise US-gehostet.',
          },
          {
            contender: 'Agentur beauftragen, die baut und sich verabschiedet',
            wins: 'Niedrigere Anfangskosten als intern; schneller als interner Build von Grund auf.',
            gaps: 'Übergabe an ein separates Operations-Team zum Launch; zwei Verträge, zwei SLAs; Evaluations-Harness und Refresh-Pipeline schaffen es oft nie in die produktive Verantwortung; Incidents springen zwischen der Agentur, die geschrieben hat, und dem MSP, der betreibt.',
          },
          {
            contender: 'Deploris: Bau und Betrieb unter einer SLA',
            wins: 'Ein Team schreibt die Retrieval-Pipeline und betreibt die Server, aus denen sie antwortet; schriftliche SLA ab dem ersten Commit; Zitate pro Aussage, Verweigerungen und Zugriffskontrolle von Anfang an eingebaut, nicht nachgerüstet; EU-Region-Hosting per Default; eine Rechnung, ein Verantwortungspunkt.',
            gaps: 'Kein Shrink-wrap-Produkt; jedes Mandat wird schriftlich scoped und startet im Mittelstand-Segment (ab 20 Agenten).',
          },
        ],
      },
      faq: [
        {
          q: 'Wie steht ein individuelles RAG-System gegenüber Zendesk AI oder Intercom AI für ein Mittelstands-Supportteam da?',
          a: 'Ein individuelles RAG-System verankert jede Antwort in Ihrer aktuellen Produktdokumentation, Ihren Release-Notes und Ihrer Ticket-Historie, zitiert jede faktische Aussage zu ihrer Quelle und verweigert die Antwort, wenn der abgerufene Kontext die Aussage nicht stützt. Generische Helpdesk-KI-Add-ons optimieren auf Deflection-Metriken und erfinden häufig plausibel klingende Antworten, wenn das Retrieval dünn ist. Für Teams von 20 bis 300 Agenten liegt der individuelle Pfad üblicherweise ab Monat 18 unter dem Pro-Konversation-Preismodell und beseitigt das Halluzinationsrisiko, das Rechtsabteilungen bei den generischen Plattformen markieren.',
        },
        {
          q: 'Wie verhindern Sie, dass das System halluziniert?',
          a: 'Drei Mechanismen greifen ineinander. Erstens weist der Prompt- und Orchestrierungs-Layer das LLM explizit an, nur aus dem abgerufenen Kontext zu antworten und sonst zu verweigern. Zweitens wird jede Aussage in der Antwort zu einem Quell-Chunk verlinkt, und Antworten ohne Zitate werden unterdrückt. Drittens misst ein wöchentliches Evaluations-Harness Precision, Recall und Verweigerungsrate gegen 150 bis 300 bewertete reale Tickets, sodass Halluzinationsregressionen vor den Agenten gefangen werden.',
        },
        {
          q: 'Was passiert, wenn das System die Antwort nicht kennt?',
          a: 'Es verweigert. Das System ist so entworfen, dass es "Dafür habe ich keine Quelle" sagt, statt zu erfinden, und das Ticket mit protokollierter Anfrage an einen menschlichen Agenten weiterleitet. Die Verweigerungsrate ist eine verfolgte Metrik, kein Fehler: Ein gesundes produktives Support-RAG verweigert typischerweise zwischen 5 und 15 Prozent der Anfragen, und diese Zahl wird monatlich gegen Ihr reales Traffic-Profil überprüft.',
        },
        {
          q: 'Wie behandeln Sie Zugriffskontrolle, damit interne Runbooks nicht in Endkunden-Antworten auftauchen?',
          a: 'Zugriffskontrolle wird auf Chunk-Ebene angewendet, nicht auf Dokumentenebene, und spiegelt Ihren bestehenden Identity-Provider. Jeder Chunk erbt die ACL seiner Quelle, und der Retrieval-Schritt filtert nach der Identität des Aufrufers, bevor Kontext das LLM erreicht. Ein agentenseitiger und ein kundenseitiger Assistent schöpfen aus überlappenden Korpora mit unterschiedlichen Berechtigungsgrenzen, schriftlich definiert, bevor der erste Chunk indexiert wird.',
        },
        {
          q: 'Welches Embedding-Modell und welches LLM setzen Sie ein?',
          a: 'Die Wahl erfolgt pro Mandat auf Basis von Qualität, Latenz, Kosten und Datenresidenz. Für EU-Region-Mandate bevorzugen wir Open-Source-Embedding-Modelle selbstgehostet in Frankfurt oder gehostete Modelle mit sauberen EU-AV-Bedingungen. Für den Generierungsschritt verwenden wir das Modell, das auf Ihrem Eval-Set am besten abschneidet unter den im AV-Vertrag erlaubten Optionen, typischerweise von Anthropic, OpenAI, Mistral oder ein selbstgehostetes Open-Weights-Modell. Die Wahl steht im Scope und wird quartalsweise überprüft.',
        },
        {
          q: 'Wie oft wird der Index aktualisiert, wenn sich unsere Doku ändert?',
          a: 'Die Default-Refresh-Pipeline läuft nächtlich für Produktdoku und Release-Notes, mit ereignisgesteuerten Updates bei Major-Releases. Ticket-Historie-Korpora aktualisieren sich wöchentlich. Die Kadenz ist an Ihren Release- und Doku-Takt gekoppelt, im Betriebs-Runbook festgehalten und so überwacht, dass veraltete Quellen Alerts auslösen, statt leise zu driften.',
        },
        {
          q: 'Wie hoch ist die Latenz pro Antwort?',
          a: 'Die Ende-zu-Ende-Antwortzeit liegt typischerweise zwischen 1 und 4 Sekunden, abhängig von Retrieval-Tiefe und Generierungsmodell. Der Retrieval-Schritt selbst liegt üblicherweise unter 300 Millisekunden. Latenzziele werden in die SLA geschrieben, wenn der Assistent kundenseitig ist, und die vollständige Timing-Aufschlüsselung (Retrieval, Generierung, Nachverarbeitung) wird für jede Antwort protokolliert.',
        },
        {
          q: 'Wo liegen die Wissensbasis und der Vektor-Index?',
          a: 'Standardmäßig in der Region Frankfurt (EU) eines Hyperscale-Clouds unter unterzeichnetem AV-Vertrag, optional in Ihrem eigenen Cloud-Account. US-only-Dienste setzen wir in der Pipeline nicht ein, wenn EU-Region-Hosting im Scope ist, und Sub-Prozessoren sind gelistet und werden quartalsweise überprüft.',
        },
        {
          q: 'Wie behandeln Sie personenbezogene Daten in indexierter Ticket-Historie?',
          a: 'Bevor ein Ticket in den Index gelangt, durchläuft es eine Redaktionsstufe, die direkte Kennungen (Namen, E-Mail-Adressen, Telefonnummern, Account-IDs) entfernt und sensible Felder markiert. Die Redaktions-Policy steht im Scope, wird von Ihrem Datenschutzbeauftragten geprüft und ist Teil des Evaluations-Harness. Der Rohspeicher der Tickets bleibt unberührt; die Redaktion geschieht auf dem Weg in die Retrieval-Pipeline.',
        },
        {
          q: 'Wie passt das zur DSGVO und zum EU AI Act?',
          a: 'Vor Baubeginn wird ein AV-Vertrag unterzeichnet, der jedes System in der Pipeline abdeckt. Das RAG-System wird gegen die Risikostufen des EU AI Act inventarisiert (typischerweise begrenztes Risiko für interne Support-Assistenten, mit Transparenzpflichten) und mit der vom Gesetz geforderten Dokumentation ausgeliefert: Zweck, Herkunft von Trainings- und Retrieval-Daten, Evaluationsergebnisse und ein menschlicher Aufsichtspfad. EU-Region-Hosting ist Default.',
        },
        {
          q: 'Wie evaluieren Sie die Retrieval-Qualität im Zeitverlauf?',
          a: 'Ein bewertetes Evaluationsset von 150 bis 300 realen Tickets entsteht während des Pilots gemeinsam mit Ihren Senior-Agenten und wächst monatlich. Wir fahren das volle Set wöchentlich und berichten Precision, Recall, Zitatgenauigkeit, Verweigerungsrate und Halluzinationsrate pro Quell-Domäne. Regressionen werden auf dem gleichen zweiwöchigen Takt wie Feature-Arbeit priorisiert, und das Eval-Set wird parallel zur Pipeline versioniert.',
        },
        {
          q: 'Wer ist Deploris und warum sollten wir Ihnen unser Support-Wissenssystem anvertrauen?',
          a: 'Deploris ist ein in den USA registriertes Engineering-Unternehmen (Florida LLC L24000491676) mit einem DACH-Delivery-Team, aufgebaut als die Mittelstandsantwort auf die Lücke zwischen Agenturen, die Software schreiben, und MSPs, die Infrastruktur betreiben. Von 40 benchmarkten Mittelstandsfirmen in USA und DACH sind wir das einzige Team, das beide Hälften unter einem Vertrag abdeckt. Die Person in Ihrer On-Call-Eskalation ist dieselbe Person, die das Modul geschrieben hat, das sie gepaged hat.',
        },
      ],
      related: {
        title: 'Weiterführende Inhalte',
        items: [
          {
            label: 'Leistung: RAG-Systeme',
            href: '/services/development/rag-systeme',
            blurb: 'Zugrunde liegende Leistungsseite: Scope, Preis-Posture, Vorgehen und das vollständige RAG-Entwicklungsangebot.',
          },
          {
            label: 'RAG vs. klassische Suche',
            href: '/compare/rag-vs-traditional-search',
            blurb: 'Der Entscheidungsrahmen für Retrieval-Augmented-KI gegen Stichwortsuche und generische Chatbots, mit den konkreten Abwägungen für ein Supportteam.',
          },
          {
            label: 'RAG-Kostenmodell',
            href: '/tools/rag-cost-model',
            blurb: 'Modellieren Sie Retrieval-, Embedding- und Generierungskosten gegen Pro-Konversation-Preismodelle, mit jeder Annahme offen auf der Seite.',
          },
          {
            label: 'KI-Chancen-Finder',
            href: '/ai-opportunity-finder',
            blurb: 'Noch unsicher, ob ein RAG-System die richtige nächste Investition ist? Starten Sie mit einer 10-Minuten-Scoping-Analyse.',
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
