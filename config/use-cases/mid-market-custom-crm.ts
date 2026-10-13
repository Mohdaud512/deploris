import type { UseCase } from './types';

/**
 * Use case: Mid-market revenue teams, custom CRM.
 * Underlying service: custom-crm (config/services.ts).
 * Primary search intent: "custom CRM for mid-market sales team",
 *   "replace Salesforce for mid-market", "bespoke CRM alternative to Salesforce".
 */
export const midMarketCustomCrm: UseCase = {
  id: 'mid-market-custom-crm',
  serviceId: 'custom-crm',
  primaryKeyword: {
    en: 'custom CRM for mid-market revenue teams',
    de: 'individuelles CRM für Mittelstand-Vertriebsteams',
  },
  secondaryKeywords: {
    en: [
      'bespoke CRM software',
      'Salesforce alternative mid-market',
      'HubSpot replacement enterprise',
      'custom pipeline management',
      'CRM build vs buy',
      'B2B sales operations software',
    ],
    de: [
      'maßgeschneidertes CRM',
      'Salesforce Alternative Mittelstand',
      'HubSpot Ersatz',
      'Pipeline Management Software',
      'CRM selbst entwickeln',
      'Vertriebsoperations Software',
    ],
  },
  lastReviewed: '2026-10-11',
  copy: {
    en: {
      slug: 'mid-market-custom-crm',
      metaTitle: 'Custom CRM for Mid-Market Revenue Teams',
      metaDescription:
        'Replace Salesforce or HubSpot license bloat with a custom CRM shaped to your pipeline stages, integrations, and reporting. Scoped in writing, built in 4 to 6 weeks, operated by Deploris under one SLA.',
      eyebrow: 'Use case · Revenue operations',
      h1: 'Custom CRM for mid-market revenue teams.',
      deck: 'A CRM shaped to your pipeline stages, your integrations, and your reporting, not to a vendor roadmap. Deploris writes it, ships it in 4 to 6 weeks, and runs the servers it lives on.',
      tldr: 'A custom CRM for a mid-market revenue team is purpose-built sales software, scoped around that team\'s actual pipeline, integrations, and reporting, that replaces license-bloated generic CRM at a fraction of the per-seat cost and under a single written SLA.',
      atAGlance: [
        { label: 'Who it is for', value: 'Revenue teams of 50 to 500 seats' },
        { label: 'First release', value: '4 to 6 weeks' },
        { label: 'Full replacement', value: '3 to 6 months' },
        { label: 'Hosting', value: 'EU-region (Frankfurt) or your own cloud' },
        { label: 'SLA', value: '15-min P1 median, 99.9%+ uptime' },
        { label: 'Delivered by', value: 'Bilingual team, DE + EN' },
      ],
      problem: {
        title: 'Why mid-market revenue teams outgrow generic CRM.',
        body:
          'Generic CRM was priced for the small team that bought it and the Fortune 500 that funds the roadmap. The 50 to 500 seat revenue team in the middle pays for both. You pay for features your reps do not use, pay again for the "enterprise" tier that unlocks the one thing you actually need, and pay a third time for integrations your pipeline cannot run without. Your sales ops lead spends more time working around the tool than inside it.',
        bullets: [
          'License spend climbs 20 to 30 percent year over year while utilization stays below 40 percent.',
          'The pipeline stages, forecast categories, and territory logic you actually use are shoehorned into fields the vendor did not design for them.',
          'Integrations to your billing system, your contract tool, or your warehouse are custom-built every release, usually by a third party.',
          'Every new report requires either a paid admin certification or a Zapier chain nobody owns.',
          'Your data lives in a US cloud under US jurisdiction, which stalls procurement conversations with German and EU customers.',
        ],
      },
      howItWorks: {
        title: 'How we build and run your custom CRM.',
        intro: 'Six stages, every one documented, no surprises in the statement of work.',
        steps: [
          {
            step: 'Discovery and written scope',
            body: 'A senior engineer sits with sales ops, revenue leadership, and your top two reps for two half-day sessions. You walk away with a written scope, a feature list, a wire-level data model, and a defensible price band, inside one business day of the second session.',
          },
          {
            step: 'Data model and integration map',
            body: 'We model your pipeline, accounts, opportunities, products, territories, and quotas in Postgres, with explicit integration contracts for every system that writes to or reads from the CRM. No field is added without a named owner.',
          },
          {
            step: 'Build in short increments',
            body: 'Two-week iterations against the written scope. You see working UI from week two. Every build ships to a staging environment on EU-region infrastructure with the same observability the production stack will have.',
          },
          {
            step: 'Migration and dual-run',
            body: 'We migrate historical pipeline from your existing CRM with lineage, run both systems in parallel for one quota period, and cut over only after sign-off from sales ops and finance.',
          },
          {
            step: 'Production launch under SLA',
            body: 'Deploris operates the system under a written service-level agreement: 15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target, 48-hour reversibility on any change, full audit trail.',
          },
          {
            step: 'Steady state and quarterly review',
            body: 'A named on-call engineer, weekly patching window, monthly metrics review, quarterly roadmap and capacity session with your revenue leadership. New features ship on the same two-week cadence.',
          },
        ],
      },
      checklist: {
        title: 'What to expect from any vendor doing this well.',
        intro: 'If a competing vendor cannot meet all ten, you are buying a prototype dressed as a product.',
        items: [
          'Senior engineers on the discovery call, not account executives.',
          'A written scope, feature list, and defensible price band inside one business day.',
          'An explicit data model you can read before any code is written.',
          'Named integration contracts for every upstream and downstream system.',
          'A working UI in staging within two weeks, not a slide deck.',
          'Historical pipeline migration with field-level lineage.',
          'EU-region hosting option with a signed data processing agreement.',
          'Dual-run through at least one full quota period before cutover.',
          'A written service-level agreement with specific response and uptime numbers.',
          'A named on-call engineer and a documented runbook, not a shared mailbox.',
        ],
      },
      scenario: {
        title: 'What this looks like in practice.',
        body:
          'A mid-market B2B logistics company with 180 revenue seats across Germany and the United States was paying 420,000 US dollars a year for Salesforce Enterprise licenses, plus a dedicated admin, plus a third-party vendor to maintain seven integrations. The sales operations lead told us utilization sat around 35 percent and the forecast still ran out of a spreadsheet. We scoped a replacement in a single week: a Postgres-backed CRM with their actual eight pipeline stages, two forecast categories, six integrations (billing, contract, routing, support, marketing automation, finance warehouse), territory logic for both US regions and the German Mittelstand DACH split, and a forecast module their revenue leader could trust. First working version shipped at week five. Full cutover happened at week fourteen. The CRM lives in the Frankfurt region, under a Deploris SLA, and the admin was redeployed to revenue enablement. We do not publish the company name because the engagement is active and the procurement team prefers it that way.',
      },
      pricingPosture: {
        title: 'What this costs is a scope question, not a seat question.',
        body:
          'Deploris does not sell per-seat licenses. We scope every engagement in writing: the shape of the team, the integrations in play, the migration load, the SLA you need, and the hosting posture. You get a defensible price band, a timeline, and the specific deliverables for each phase inside one business day of the second discovery session. Nothing is quoted on the phone, nothing is held back for a "second call", and no number appears on a page before we understand your pipeline.',
      },
      comparison: {
        title: 'Why Deploris, not the alternatives.',
        intro:
          'Three paths lead to a mid-market CRM: keep paying generic SaaS, build in-house, or hire a dev shop that will walk away at launch. Deploris is the fourth path, and the only one of the four that both builds the software and operates the infrastructure under one written contract.',
        rows: [
          {
            contender: 'Keep paying generic SaaS (Salesforce, HubSpot, Dynamics)',
            wins: 'Fastest to deploy; large ecosystem; well-known to procurement.',
            gaps: 'Licence spend climbs faster than usage; your pipeline logic bends to the vendor; no EU-region guarantee without the enterprise tier; integrations billed per connector.',
          },
          {
            contender: 'Build in-house with your own engineers',
            wins: 'Maximum fit; no vendor lock-in; data stays with you.',
            gaps: 'Pulls your senior engineers off product; typically takes 9 to 18 months to first production release; operating the stack 24/7 becomes a hiring problem, not a build problem.',
          },
          {
            contender: 'Hire a dev shop that builds and walks away',
            wins: 'Lower initial cost than in-house; faster than internal build.',
            gaps: 'Hand-off to a separate operations team at launch; two contracts, two SLAs, two on-call rotations; incidents bounce between the shop that wrote it and the MSP that runs it.',
          },
          {
            contender: 'Deploris, build and run under one SLA',
            wins: 'One team writes the CRM and operates the servers it ships on; written SLA from the first commit; EU-region hosting by default; bilingual DE + EN delivery; one invoice, one point of accountability.',
            gaps: 'Not a shrink-wrapped product; every engagement is scoped in writing and starts at mid-market scale (50 seats and up).',
          },
        ],
      },
      faq: [
        {
          q: 'How does a custom CRM compare to Salesforce or HubSpot for a mid-market team?',
          a: 'A custom CRM gives a mid-market revenue team exactly the pipeline stages, forecast categories, integrations, and reports it actually uses, with no license spend on features it does not. For teams in the 50 to 500 seat range the total cost of ownership typically crosses in favour of custom inside 24 months, with the custom path also removing the enterprise-tier upsell cycle and the US-only hosting constraint that stalls EU procurement.',
        },
        {
          q: 'How long does it take to go live?',
          a: 'A first working version lands on your staging environment inside 4 to 6 weeks. A full cutover from your existing CRM, including historical data migration and a one-quota-period dual-run, typically completes in 3 to 6 months. Larger multi-country rollouts extend the operate phase but not the build phase.',
        },
        {
          q: 'Where will my CRM data live?',
          a: 'By default in the Frankfurt (EU) region of a hyperscale cloud under a signed data processing agreement, with the option to run it in your own cloud account instead. We do not use US-only services anywhere in the pipeline when EU-region hosting is in scope.',
        },
        {
          q: 'What happens to our historical pipeline when we migrate?',
          a: 'We migrate it with field-level lineage from your source CRM, keep an exported snapshot of the source, and dual-run both systems for at least one quota period so sales ops and finance can reconcile before cutover. We never cut over without written sign-off from both teams.',
        },
        {
          q: 'Who owns the code and the data?',
          a: 'You do, in both cases. The source repository, the infrastructure-as-code, and the data are yours from day one. Deploris operates the system under contract; nothing in the stack is a Deploris black box, and you can take operations in-house or move to a different operator at any time without a rewrite.',
        },
        {
          q: 'What is the service-level agreement after launch?',
          a: '15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target on the systems we operate, 48-hour reversibility on any change with full audit trail, named on-call engineer, weekly patching window. Specific numbers are written into every engagement contract, not a marketing page.',
        },
        {
          q: 'Do you integrate with our existing finance, support, and marketing systems?',
          a: 'Yes. Every integration is scoped by name in the written statement of work: the source system, the fields in motion, the direction, the sync interval, and the owner. We typically ship with 4 to 8 integrations at first launch and add the rest in later increments.',
        },
        {
          q: 'How do you handle GDPR, DPA, and EU AI Act requirements?',
          a: 'A data processing agreement is signed before build begins and covers every system in the pipeline. EU-region hosting is the default; sub-processors are listed and reviewed quarterly. Any machine-learning features (forecast scoring, next-best-action, lead ranking) are inventoried against the EU AI Act risk tiers and ship with the documentation that act requires.',
        },
        {
          q: 'Can you work with our in-house engineering team instead of replacing them?',
          a: 'Yes. On many engagements Deploris leads the build and your in-house team learns the stack alongside the engineers, taking over selected modules over time. The written scope names which modules Deploris owns, which the client team owns, and which transition during the engagement.',
        },
        {
          q: 'What does a custom CRM cost compared to Salesforce or HubSpot licenses?',
          a: 'The useful comparison is total cost of ownership over 24 to 36 months, not sticker price. A Deploris engagement is scoped in writing: build cost, hosting cost, SLA cost, and planned feature work are quoted together. For teams paying six-figure annual license bills on generic SaaS, the crossover point is usually inside 24 months, with the custom path flat from year three onward.',
        },
        {
          q: 'What if our requirements change halfway through the build?',
          a: 'The engagement is built around two-week increments against a written scope, with every change going through a documented change-request process that updates the scope and the price band together. Reversibility is 48 hours on any shipped change. We do not ship surprises and we do not accept surprises.',
        },
        {
          q: 'Who is Deploris and why should we trust you to run our revenue system?',
          a: 'Deploris is a US-registered engineering firm (Colorado LLC 20268259375) with a DACH delivery team, built as the mid-market answer to the gap between dev shops that write software and MSPs that run infrastructure. Of 40 mid-market firms benchmarked across the US and DACH, we are the only team that covers both halves under one contract. The person on your on-call escalation is the same person who wrote the module that paged.',
        },
      ],
      related: {
        title: 'Related reading',
        items: [
          {
            label: 'Custom CRM Development service',
            href: '/services/development/custom-crm',
            blurb: 'Underlying capability page: scope, pricing tiers, process, and the full CRM development offer.',
          },
          {
            label: 'Custom CRM vs off-the-shelf',
            href: '/compare/custom-crm-vs-off-the-shelf',
            blurb: 'The decision framework for build-vs-buy, with the actual trade-offs for a mid-market revenue team.',
          },
          {
            label: 'CRM TCO calculator',
            href: '/tools/crm-tco',
            blurb: 'Model your 24-month total cost of ownership against generic SaaS, with every assumption on the page.',
          },
          {
            label: 'AI Opportunity Finder',
            href: '/ai-opportunity-finder',
            blurb: 'Not sure a custom CRM is the right next investment? Run a 10-minute scoping assessment first.',
          },
          {
            label: 'Blog: Build vs buy CRM, 24-month TCO model',
            href: '/blog/build-vs-buy-crm-24-month-tco-model',
            blurb: 'A line-by-line total cost of ownership comparison across generic SaaS licensing, in-house build, and a Deploris managed engagement.',
          },
          {
            label: 'Blog: Salesforce to Postgres migration checklist',
            href: '/blog/salesforce-to-postgres-crm-migration-checklist',
            blurb: 'The practitioner-grade checklist for migrating pipeline, forecasts, territory logic, and integrations without losing history.',
          },
        ],
      },
      cta: {
        primary: 'Book a scoping call',
        secondary: 'See a sample scope document',
      },
    },
    de: {
      slug: 'crm-mittelstand-vertrieb',
      metaTitle: 'Individuelles CRM für den Mittelstand',
      metaDescription:
        'Lizenzlast von Salesforce oder HubSpot gegen ein CRM tauschen, das zu Ihren Pipeline-Stufen, Integrationen und Reports passt. Schriftlich scoped, in 4 bis 6 Wochen gebaut, von Deploris unter einer SLA betrieben.',
      eyebrow: 'Anwendungsfall · Revenue Operations',
      h1: 'Individuelles CRM für Vertriebsteams im Mittelstand.',
      deck: 'Ein CRM, das zu Ihren Pipeline-Stufen, Integrationen und Reports passt. Nicht zu einer Vendor-Roadmap. Deploris schreibt es, bringt es in 4 bis 6 Wochen in Produktion und betreibt die Server, auf denen es läuft.',
      tldr: 'Ein individuelles CRM für ein Mittelstands-Vertriebsteam ist eine zweckgebaute Vertriebssoftware, die um die tatsächliche Pipeline, die realen Integrationen und das genutzte Reporting dieses Teams geschnitten ist, lizenzlastiges Standard-CRM zu einem Bruchteil der Lizenzkosten pro Sitz ablöst und unter einer schriftlichen SLA läuft.',
      atAGlance: [
        { label: 'Für wen', value: 'Vertriebsteams von 50 bis 500 Sitzen' },
        { label: 'Erstes Release', value: '4 bis 6 Wochen' },
        { label: 'Komplettablösung', value: '3 bis 6 Monate' },
        { label: 'Hosting', value: 'EU-Region (Frankfurt) oder Ihre eigene Cloud' },
        { label: 'SLA', value: '15 Min P1-Median, 99,9 %+ Verfügbarkeit' },
        { label: 'Geliefert von', value: 'Zweisprachig DE + EN' },
      ],
      problem: {
        title: 'Warum Mittelstand-Vertriebsteams aus Standard-CRM herauswachsen.',
        body:
          'Standard-CRM war für das kleine Team gepreist, das es gekauft hat, und für den Konzern, der die Roadmap finanziert. Das Vertriebsteam mit 50 bis 500 Sitzen in der Mitte zahlt für beide. Sie zahlen für Funktionen, die Ihre Vertriebsmitarbeiter nicht nutzen, zahlen erneut für die Enterprise-Stufe, die den einen Funktionsbaustein freischaltet, den Sie wirklich brauchen, und zahlen ein drittes Mal für Integrationen, ohne die Ihre Pipeline nicht läuft. Ihre Vertriebsoperations verbringt mehr Zeit mit Umwegen um das Tool als mit Arbeit darin.',
        bullets: [
          'Die Lizenzkosten steigen um 20 bis 30 Prozent pro Jahr, während die Nutzung unter 40 Prozent bleibt.',
          'Pipeline-Stufen, Forecast-Kategorien und Gebietslogik, die Sie tatsächlich verwenden, werden in Felder gepresst, für die der Anbieter sie nicht entworfen hat.',
          'Integrationen zu Abrechnung, Vertragssystem oder Lager werden bei jedem Release neu gebaut, meist von einem Dritten.',
          'Jeder neue Report erfordert entweder eine kostenpflichtige Admin-Zertifizierung oder eine Zapier-Kette, für die niemand verantwortlich ist.',
          'Ihre Daten liegen in einer US-Cloud unter US-Jurisdiktion. Das stoppt Beschaffungsgespräche mit deutschen und europäischen Kunden.',
        ],
      },
      howItWorks: {
        title: 'Wie wir Ihr individuelles CRM bauen und betreiben.',
        intro: 'Sechs Phasen, jede dokumentiert, keine Überraschungen in der Leistungsbeschreibung.',
        steps: [
          {
            step: 'Discovery und schriftlicher Scope',
            body: 'Ein Senior-Ingenieur arbeitet in zwei halbtägigen Terminen mit Ihrer Vertriebsoperations, Ihrer Vertriebsleitung und Ihren zwei besten Vertriebsmitarbeitern. Innerhalb eines Werktags nach dem zweiten Termin erhalten Sie einen schriftlichen Scope, eine Feature-Liste, ein Datenmodell und eine belastbare Preisspanne.',
          },
          {
            step: 'Datenmodell und Integrationskarte',
            body: 'Wir modellieren Pipeline, Accounts, Opportunities, Produkte, Gebiete und Quoten in Postgres, mit expliziten Integrationsverträgen für jedes System, das in das CRM schreibt oder daraus liest. Kein Feld wird ohne benannten Owner angelegt.',
          },
          {
            step: 'Bau in kurzen Inkrementen',
            body: 'Zweiwöchige Iterationen gegen den schriftlichen Scope. Ab Woche zwei sehen Sie funktionierende Oberflächen. Jeder Build landet in einer Staging-Umgebung auf EU-Region-Infrastruktur mit der gleichen Observability, die auch die Produktion haben wird.',
          },
          {
            step: 'Migration und Dual-Run',
            body: 'Wir migrieren historische Pipeline aus Ihrem bestehenden CRM mit Lineage, lassen beide Systeme eine volle Quotenperiode parallel laufen und schalten erst nach Freigabe durch Vertriebsoperations und Finance um.',
          },
          {
            step: 'Produktivbetrieb unter SLA',
            body: 'Deploris betreibt das System unter einer schriftlichen Service-Level-Vereinbarung: 15-minütige Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit, 48 Stunden Rückrollbarkeit jeder Änderung mit vollem Audit-Trail.',
          },
          {
            step: 'Steady-State und Quartalsreview',
            body: 'Ein benannter On-Call-Ingenieur, wöchentliches Patch-Fenster, monatliches Metrik-Review, quartalsweiser Roadmap- und Kapazitätstermin mit Ihrer Vertriebsleitung. Neue Features landen im gleichen zweiwöchigen Takt.',
          },
        ],
      },
      checklist: {
        title: 'Was Sie von jedem seriösen Anbieter erwarten sollten.',
        intro: 'Wenn ein konkurrierender Anbieter nicht alle zehn Punkte liefern kann, kaufen Sie einen Prototyp im Produkt-Gewand.',
        items: [
          'Senior-Ingenieure im Discovery-Termin, keine Vertriebsmitarbeiter.',
          'Schriftlicher Scope, Feature-Liste und belastbare Preisspanne innerhalb eines Werktags.',
          'Ein explizites Datenmodell, das Sie vor der ersten Code-Zeile lesen können.',
          'Benannte Integrationsverträge für jedes Up- und Downstream-System.',
          'Funktionierende Oberfläche in Staging innerhalb von zwei Wochen, nicht als Foliensatz.',
          'Migration historischer Pipeline mit Feld-Level-Lineage.',
          'EU-Region-Hosting-Option mit unterzeichnetem AV-Vertrag.',
          'Dual-Run über mindestens eine volle Quotenperiode vor dem Cutover.',
          'Schriftliche Service-Level-Vereinbarung mit konkreten Reaktions- und Verfügbarkeitszahlen.',
          'Benannter On-Call-Ingenieur und dokumentiertes Runbook, nicht ein Sammelpostfach.',
        ],
      },
      scenario: {
        title: 'Wie das in der Praxis aussieht.',
        body:
          'Ein mittelständisches B2B-Logistikunternehmen mit 180 Vertriebssitzen in Deutschland und den USA zahlte 420.000 US-Dollar pro Jahr für Salesforce-Enterprise-Lizenzen, dazu einen eigenen Admin und einen Drittanbieter für die Pflege von sieben Integrationen. Die Vertriebsoperations-Leitung berichtete uns, dass die Nutzung bei rund 35 Prozent lag und der Forecast weiterhin aus einem Tabellenblatt kam. Wir haben die Ablösung in einer Woche scoped: ein Postgres-basiertes CRM mit den tatsächlichen acht Pipeline-Stufen, zwei Forecast-Kategorien, sechs Integrationen (Abrechnung, Vertrag, Routing, Support, Marketing-Automation, Finance-Warehouse), Gebietslogik für beide US-Regionen und die DACH-Mittelstands-Aufteilung sowie ein Forecast-Modul, dem die Vertriebsleitung vertraut. Erste produktive Version in Woche fünf, voller Cutover in Woche vierzehn. Das CRM läuft in der Frankfurt-Region unter einer Deploris-SLA, und der Admin wurde in Enablement umgesetzt. Den Firmennamen veröffentlichen wir nicht, weil das Mandat aktiv ist und die Einkaufsabteilung das so bevorzugt.',
      },
      pricingPosture: {
        title: 'Was es kostet, ist eine Scope-Frage, keine Sitz-Frage.',
        body:
          'Deploris verkauft keine Lizenz pro Sitz. Wir scopen jedes Mandat schriftlich: Teamgröße, Integrationen, Migrationslast, benötigte SLA und Hosting-Posture. Innerhalb eines Werktags nach dem zweiten Discovery-Termin erhalten Sie eine belastbare Preisspanne, einen Zeitplan und die konkreten Lieferergebnisse jeder Phase. Nichts wird am Telefon zugesagt, nichts für einen "zweiten Termin" zurückgehalten, und auf keiner Seite steht eine Zahl, bevor wir Ihre Pipeline verstanden haben.',
      },
      comparison: {
        title: 'Warum Deploris, nicht die Alternativen.',
        intro:
          'Drei Wege führen zu einem Mittelstand-CRM: Standard-SaaS weiter zahlen, intern bauen oder eine Agentur beauftragen, die beim Launch verschwindet. Deploris ist der vierte Weg und der einzige, der die Software baut und die Infrastruktur unter einem schriftlichen Vertrag betreibt.',
        rows: [
          {
            contender: 'Standard-SaaS weiterzahlen (Salesforce, HubSpot, Dynamics)',
            wins: 'Am schnellsten einsetzbar, großes Ökosystem, dem Einkauf bekannt.',
            gaps: 'Lizenzkosten steigen schneller als die Nutzung, Pipeline-Logik passt sich dem Anbieter an, keine EU-Region-Garantie unterhalb der Enterprise-Stufe, Integrationen pro Konnektor abgerechnet.',
          },
          {
            contender: 'Intern mit eigenen Ingenieuren bauen',
            wins: 'Maximale Passgenauigkeit, kein Vendor-Lock-in, Daten bleiben im Haus.',
            gaps: 'Bindet Senior-Ingenieure, die am Produkt fehlen; typischerweise 9 bis 18 Monate bis zum ersten Produktiv-Release; der 24/7-Betrieb wird zum Einstellungs-, nicht zum Build-Problem.',
          },
          {
            contender: 'Agentur beauftragen, die baut und sich verabschiedet',
            wins: 'Niedrigere Anfangskosten als intern, schneller als interner Build.',
            gaps: 'Übergabe an ein separates Operations-Team zum Launch; zwei Verträge, zwei SLAs, zwei On-Call-Rotationen; Incidents springen zwischen der Agentur, die geschrieben hat, und dem MSP, der betreibt.',
          },
          {
            contender: 'Deploris: Bau und Betrieb unter einer SLA',
            wins: 'Ein Team schreibt das CRM und betreibt die Server; schriftliche SLA ab dem ersten Commit; EU-Region-Hosting per Default; zweisprachige DE+EN-Lieferung; eine Rechnung, ein Verantwortungspunkt.',
            gaps: 'Kein Shrink-wrap-Produkt; jedes Mandat wird schriftlich scoped und startet im Mittelstand-Segment (ab 50 Sitzen).',
          },
        ],
      },
      faq: [
        {
          q: 'Wie steht ein individuelles CRM gegenüber Salesforce oder HubSpot für ein Mittelstandsteam da?',
          a: 'Ein individuelles CRM gibt einem Mittelstand-Vertriebsteam genau die Pipeline-Stufen, Forecast-Kategorien, Integrationen und Reports, die es tatsächlich nutzt, ohne Lizenzkosten für Funktionen, die es nicht nutzt. Für Teams von 50 bis 500 Sitzen kreuzt die Gesamtkostenbetrachtung typischerweise innerhalb von 24 Monaten zugunsten der Individuallösung, zusätzlich entfallen der Enterprise-Stufen-Upsell-Zyklus und die US-only-Hosting-Einschränkung, die EU-Beschaffungen bremst.',
        },
        {
          q: 'Wie lange dauert es bis zum Produktivbetrieb?',
          a: 'Eine erste funktionierende Version landet innerhalb von 4 bis 6 Wochen in Ihrer Staging-Umgebung. Ein vollständiger Cutover aus dem bestehenden CRM, inklusive historischer Datenmigration und einer Dual-Run-Phase über eine Quotenperiode, dauert typischerweise 3 bis 6 Monate. Größere Multi-Country-Rollouts verlängern die Betriebsphase, nicht die Bauphase.',
        },
        {
          q: 'Wo liegen meine CRM-Daten?',
          a: 'Standardmäßig in der Region Frankfurt (EU) eines Hyperscale-Clouds unter unterzeichnetem AV-Vertrag, optional in Ihrem eigenen Cloud-Account. US-only-Dienste setzen wir in der Pipeline nicht ein, wenn EU-Region-Hosting im Scope ist.',
        },
        {
          q: 'Was passiert mit unserer historischen Pipeline bei der Migration?',
          a: 'Wir migrieren sie mit Feld-Level-Lineage aus Ihrem Quell-CRM, bewahren einen Export des Quellsystems auf und lassen beide Systeme mindestens eine Quotenperiode parallel laufen, damit Vertriebsoperations und Finance abgleichen können. Ein Cutover erfolgt niemals ohne schriftliche Freigabe beider Teams.',
        },
        {
          q: 'Wem gehören Code und Daten?',
          a: 'Ihnen, in beiden Fällen. Repository, Infrastructure-as-Code und Daten gehören Ihnen ab Tag eins. Deploris betreibt das System vertraglich; nichts im Stack ist eine Deploris-Blackbox, und Sie können den Betrieb jederzeit intern übernehmen oder auf einen anderen Betreiber wechseln, ohne das System neu zu schreiben.',
        },
        {
          q: 'Welche Service-Level-Vereinbarung gilt nach Launch?',
          a: '15-minütige Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit auf den von uns betriebenen Systemen, 48 Stunden Rückrollbarkeit jeder Änderung mit vollem Audit-Trail, benannter On-Call-Ingenieur, wöchentliches Patch-Fenster. Konkrete Zahlen werden in jedem Mandatsvertrag schriftlich festgehalten, nicht auf einer Marketing-Seite.',
        },
        {
          q: 'Integrieren Sie unsere bestehenden Finanz-, Support- und Marketing-Systeme?',
          a: 'Ja. Jede Integration wird in der Leistungsbeschreibung namentlich scoped: Quellsystem, bewegte Felder, Richtung, Sync-Intervall, Owner. Typischerweise liefern wir 4 bis 8 Integrationen zum ersten Launch und ergänzen den Rest in späteren Inkrementen.',
        },
        {
          q: 'Wie gehen Sie mit DSGVO, AV-Vertrag und EU AI Act um?',
          a: 'Vor Baubeginn wird ein AV-Vertrag unterzeichnet, der jedes System in der Pipeline abdeckt. EU-Region-Hosting ist Default; Sub-Prozessoren sind gelistet und werden quartalsweise überprüft. Machine-Learning-Features (Forecast-Scoring, Next-Best-Action, Lead-Ranking) werden gegen die Risikostufen des EU AI Act inventarisiert und mit der vom Gesetz geforderten Dokumentation ausgeliefert.',
        },
        {
          q: 'Können Sie mit unserem internen Entwicklungsteam arbeiten, statt es zu ersetzen?',
          a: 'Ja. In vielen Mandaten führt Deploris den Bau, und Ihr internes Team lernt den Stack mit, übernimmt mit der Zeit ausgewählte Module. Der schriftliche Scope benennt, welche Module Deploris verantwortet, welche das Kundenteam, und welche während des Mandats übergehen.',
        },
        {
          q: 'Was kostet ein individuelles CRM im Vergleich zu Salesforce- oder HubSpot-Lizenzen?',
          a: 'Der sinnvolle Vergleich ist die Gesamtkostenbetrachtung über 24 bis 36 Monate, nicht der Listenpreis. Ein Deploris-Mandat wird schriftlich scoped: Baukosten, Hosting-Kosten, SLA-Kosten und geplante Feature-Arbeit werden gemeinsam ausgewiesen. Für Teams, die sechsstellige jährliche Lizenzrechnungen für Standard-SaaS zahlen, liegt der Kreuzungspunkt typischerweise innerhalb von 24 Monaten; ab Jahr drei bleiben die Kosten flach.',
        },
        {
          q: 'Was passiert, wenn sich unsere Anforderungen mitten im Bau ändern?',
          a: 'Das Mandat ist um zweiwöchige Inkremente gegen einen schriftlichen Scope herum gebaut; jede Änderung läuft durch einen dokumentierten Change-Request-Prozess, der Scope und Preisspanne gemeinsam aktualisiert. Rückrollbarkeit beträgt 48 Stunden auf jede ausgelieferte Änderung. Wir liefern keine Überraschungen und akzeptieren keine.',
        },
        {
          q: 'Wer ist Deploris und warum sollten wir Ihnen unser Vertriebssystem anvertrauen?',
          a: 'Deploris ist ein in den USA registriertes Engineering-Unternehmen (Colorado LLC 20268259375) mit einem DACH-Delivery-Team, aufgebaut als die Mittelstandsantwort auf die Lücke zwischen Agenturen, die Software schreiben, und MSPs, die Infrastruktur betreiben. Von 40 benchmarkten Mittelstandsfirmen in USA und DACH sind wir das einzige Team, das beide Hälften unter einem Vertrag abdeckt. Die Person in Ihrer On-Call-Eskalation ist dieselbe Person, die das Modul geschrieben hat, das sie gepaged hat.',
        },
      ],
      related: {
        title: 'Weiterführende Inhalte',
        items: [
          {
            label: 'Leistung: Individuelle CRM-Entwicklung',
            href: '/services/development/crm-entwicklung',
            blurb: 'Zugrunde liegende Leistungsseite: Scope, Preisstufen, Vorgehensweise und das vollständige CRM-Entwicklungsangebot.',
          },
          {
            label: 'Individuelles CRM vs. Standardlösung',
            href: '/compare/custom-crm-vs-off-the-shelf',
            blurb: 'Der Entscheidungsrahmen für Build-vs-Buy mit den konkreten Abwägungen für ein Mittelstand-Vertriebsteam.',
          },
          {
            label: 'CRM-Gesamtkosten-Rechner',
            href: '/tools/crm-tco',
            blurb: 'Modellieren Sie Ihre 24-Monats-Gesamtkosten gegen Standard-SaaS, mit jeder Annahme offen auf der Seite.',
          },
          {
            label: 'KI-Chancen-Finder',
            href: '/ai-opportunity-finder',
            blurb: 'Noch unsicher, ob ein individuelles CRM die richtige nächste Investition ist? Starten Sie mit einer 10-Minuten-Scoping-Analyse.',
          },
          {
            label: 'Blog: CRM selbst bauen oder kaufen, 24-Monats-Modell',
            href: '/blog/build-vs-buy-crm-24-monate-gesamtkosten',
            blurb: 'Eine zeilenweise Gesamtkostenanalyse zwischen Standard-SaaS, Eigenbau und einem Deploris-Mandat über 24 Monate.',
          },
          {
            label: 'Blog: Salesforce zu Postgres, Migrations-Checkliste',
            href: '/blog/salesforce-zu-postgres-crm-migration-checkliste',
            blurb: 'Die praxiserprobte Checkliste, mit der Pipeline, Forecasts, Gebietslogik und Integrationen ohne Historienverlust migriert werden.',
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
