import type { UseCase } from './types';

/**
 * Use case: Mid-market firms moving from an incumbent break-fix or junior-MSP
 * arrangement to a mid-market-grade managed-IT contract.
 * Underlying service: infrastructure-support (config/services.ts).
 * Primary search intent: "MSP handoff to managed IT for mid-market",
 *   "replace break-fix MSP", "switch managed service provider mid-market".
 */
export const mspHandoffManagedIt: UseCase = {
  id: 'msp-handoff-managed-it',
  serviceId: 'infrastructure-support',
  primaryKeyword: {
    en: 'MSP handoff to managed IT for mid-market',
    de: 'MSP-Übergabe zu Managed IT für den Mittelstand',
  },
  secondaryKeywords: {
    en: [
      'switch managed service provider',
      'replace break-fix MSP',
      'managed IT for mid-market',
      'MSP transition plan',
      'co-managed IT handover',
      'mid-market IT outsourcing',
    ],
    de: [
      'Managed Service Provider wechseln',
      'Break-Fix MSP ablösen',
      'Managed IT für den Mittelstand',
      'MSP Übergabeplan',
      'Co-Managed IT Übergabe',
      'IT-Outsourcing Mittelstand',
    ],
  },
  lastReviewed: '2026-10-11',
  copy: {
    en: {
      slug: 'msp-handoff-managed-it',
      metaTitle: 'MSP Handoff to Managed IT for Mid-Market',
      metaDescription:
        'Move from a reactive break-fix MSP to mid-market-grade managed IT under a written SLA. Documented transition, parallel coverage, 24/7 on-call, Frankfurt-region hosting.',
      eyebrow: 'Use case · IT operations',
      h1: 'MSP handoff to managed IT for the mid-market.',
      deck: 'A documented transition from a reactive break-fix MSP, or a junior managed provider that has outgrown your estate, to a mid-market-grade managed-IT contract with written SLAs, 24/7 on-call, and no coverage gaps during cutover.',
      tldr: 'An MSP handoff to managed IT for a mid-market firm is a documented, parallel-cover transition from an incumbent break-fix or junior-MSP arrangement to a senior managed-IT contract with written response and uptime SLAs, 24/7 on-call, quarterly capacity reviews, and a dated runbook of every system changing hands.',
      atAGlance: [
        { label: 'Who it is for', value: 'Mid-market firms, 200 to 2,000 seats' },
        { label: 'Transition window', value: '6 to 12 weeks, documented' },
        { label: 'Parallel coverage', value: 'Minimum 30 days, overlap on P1' },
        { label: 'Hosting', value: 'EU-region (Frankfurt) default' },
        { label: 'SLA', value: '15-min P1 median, 99.9%+ uptime' },
        { label: 'Delivered by', value: 'Bilingual team, DE + EN, DACH on the ground' },
      ],
      problem: {
        title: 'Why mid-market firms outgrow their first MSP.',
        body:
          'The MSP that fit a 60-seat office does not scale to a 600-seat, two-country operation. The arrangement that started as "call when something breaks" turns into a liability the first time payroll goes down over a weekend and the on-call engineer is at a wedding. The provider that answered quickly at 80 seats routes you through a ticket queue at 400, and the engineer who wrote your firewall rules three years ago has left. You are now paying for a reactive service that neither prevents incidents nor meets procurement\'s questions about SLAs, sub-processors, and EU data residency.\n\nThe harder problem is the handover itself. Incumbent MSPs rarely volunteer documentation. The administrator passwords live on a laptop you do not own, the backup target is in a tenant you cannot see, and the only person who understands the VPN config bills by the hour. Switching without a plan loses a week of productivity. Switching with a plan is a project in its own right, and it is the project nobody on your team has time to run.\n\nA proper handoff is a managed engagement, not an email thread. It needs an inventory, a runbook, parallel coverage during cutover, and a signed SLA that starts the day the new provider owns the pager.',
        bullets: [
          'Response is reactive: tickets open after users notice, not before monitoring does.',
          'No named on-call engineer: every incident is handled by a different person who does not know your estate.',
          'No written SLA: "best effort" is the contract clause, and procurement cannot defend it.',
          'No DACH presence or no US presence: your other geography is on 12-hour delay.',
          'Documentation lives in the incumbent\'s head: credentials, firewall rules, backup targets, and the one script that holds payroll together.',
        ],
      },
      howItWorks: {
        title: 'How we take over your estate without a coverage gap.',
        intro: 'Six stages across 6 to 12 weeks, every one documented, every handover dated and signed.',
        steps: [
          {
            step: 'Incumbent audit and inventory',
            body: 'A senior engineer walks the estate (physical sites, cloud tenants, SaaS admin consoles, identity provider, backup targets, network edge) and produces a written inventory inside two weeks. Every asset gets an owner, a current state, and a flag for anything the incumbent has not disclosed.',
          },
          {
            step: 'Runbook capture, with or without incumbent cooperation',
            body: 'We extract and rebuild runbooks for every production system: firewall rules, VPN config, DNS, DHCP, Active Directory and Entra, Microsoft 365 or Google Workspace, backup and restore, monitoring. If the incumbent cooperates, we take the handover; if they do not, we rediscover from the live estate and document from scratch. Either way you leave with a readable runbook you own.',
          },
          {
            step: 'Parallel coverage and shadow on-call',
            body: 'For a minimum of 30 days, Deploris runs shadow on-call alongside the incumbent. We take the alerts, triage, and resolve or escalate; the incumbent remains contractually responsible for incidents during this window. Your users notice nothing. Your incident log doubles, and so does your audit trail.',
          },
          {
            step: 'SLA cutover and credential rotation',
            body: 'On a scheduled change window, SLA responsibility moves to Deploris. Every credential the incumbent held is rotated: admin accounts, service accounts, API keys, VPN pre-shared keys, break-glass access. Nothing is left in the former provider\'s possession, and every rotation is logged against the inventory.',
          },
          {
            step: 'Steady state under written SLA',
            body: 'Deploris operates the estate under a written service-level agreement: 15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target on the systems we operate, 48-hour reversibility on any change, named on-call engineer, weekly patching window, full audit trail.',
          },
          {
            step: 'Quarterly capacity and risk review',
            body: 'Every quarter your leadership sits with the named account engineer to walk the metrics, the capacity trajectory, and the risk register. Changes to the SLA, the runbook, or the sub-processor list happen on the record, with 48-hour reversibility and a dated change log.',
          },
        ],
      },
      checklist: {
        title: 'What to expect from any vendor doing an MSP handoff well.',
        intro: 'If a competing vendor cannot meet all ten, you are buying another reactive MSP in better clothing.',
        items: [
          'Senior engineers on the discovery call, not sales staff.',
          'A written inventory of every asset within two weeks, including anything the incumbent has not disclosed.',
          'A runbook rebuild path for the case where the incumbent refuses to hand over documentation.',
          'A minimum 30-day parallel coverage window where the incumbent remains contractually on the hook.',
          'A dated, logged credential rotation of every account the incumbent ever held.',
          'A written service-level agreement with specific first-response and uptime numbers, not "best effort".',
          'A named on-call engineer, not a ticket queue, and a documented escalation path.',
          'EU-region hosting option with a signed data processing agreement and a sub-processor list.',
          'A quarterly capacity and risk review on the calendar before you sign.',
          '48-hour reversibility on any change the new provider makes, with a full audit trail.',
        ],
      },
      scenario: {
        title: 'What this looks like in practice.',
        body:
          'A 320-seat industrial-manufacturing company with a headquarters in Baden-Württemberg and a plant in the US Midwest had been served by the same local MSP for nine years. The arrangement worked at 80 seats. At 320, with ISO 27001 on the roadmap and a US procurement team asking pointed questions about response times, it did not. The CIO described it as "they answer when I call, but I have to call". There was no monitoring, no documented runbook, no SLA, and the plant in the US had no coverage after 15:00 local because the incumbent closed at 18:00 Central European Time. We ran the audit in two weeks: 11 physical servers, 4 network sites, 1 Microsoft 365 tenant, 3 line-of-business apps, 1 backup target, and 2 credential vaults the incumbent had never shared. Runbook capture took another three weeks, half of which was spent reconstructing firewall rules from the live config because the incumbent would not export them. Parallel coverage ran for 42 days. SLA cutover happened on a Saturday change window. Every credential the incumbent held was rotated the same weekend. The estate now runs under a Deploris managed-IT contract with EU-region hosting for the services we provision, 24/7 coverage across both geographies, and a quarterly review on the CIO\'s calendar. The company name is withheld because the engagement is active and the procurement team prefers it that way.',
      },
      pricingPosture: {
        title: 'What this costs is a scope question, not a per-seat question.',
        body:
          'Deploris does not price managed IT by seat count alone. We scope every engagement in writing: the shape of the estate, the number of sites and tenants, the integrations in play, the SLA you need, the parallel coverage window, and the hosting posture. You get a defensible price band, a timeline, and the specific deliverables for each phase inside one business day of the second discovery session. Nothing is quoted on the phone, nothing is held back for a "second call", and no number appears on a page before we understand your estate.',
      },
      comparison: {
        title: 'Why Deploris, not the alternatives.',
        intro:
          'Four paths lead out of a reactive MSP: keep the incumbent and hope they grow up, swap them for a lower-cost provider on the same model, build an internal IT ops team, or hire a provider that both runs the infrastructure and already builds the custom software on top. Deploris is the fourth path.',
        rows: [
          {
            contender: 'Keep the incumbent MSP',
            wins: 'No transition risk; relationships intact; procurement already approved them.',
            gaps: 'The ceiling that got you looking is still the ceiling; no written SLA appears because the incumbent cannot defend one; the same engineer who could not scale to 300 seats will not scale to 500.',
          },
          {
            contender: 'Hire a lower-cost MSP on the same break-fix model',
            wins: 'Lower sticker price; faster to sign; local presence familiar to procurement.',
            gaps: 'The model is the problem, not the vendor; reactive support stays reactive; you will run this transition again inside 24 months, and the next incumbent will be no more cooperative than the current one.',
          },
          {
            contender: 'Build an internal IT ops team',
            wins: 'Maximum control; institutional knowledge stays in-house; no vendor dependency.',
            gaps: '24/7 coverage needs at least four hires across two geographies; typically 9 to 18 months to full capability; the hiring market for senior infrastructure engineers in DACH and the US is thin and expensive.',
          },
          {
            contender: 'Deploris managed IT under one SLA, with the software team already on retainer',
            wins: 'One team runs the infrastructure and writes the custom software that depends on it; written SLA from cutover day; EU-region hosting by default; bilingual DE + EN delivery; one invoice, one point of accountability.',
            gaps: 'Not a low-touch commodity MSP; every engagement is scoped in writing and starts at mid-market scale (200 seats and up).',
          },
        ],
      },
      faq: [
        {
          q: 'How do we handle contract overlap with our incumbent MSP?',
          a: 'We plan the handoff around your existing contract\'s notice window. The parallel coverage phase (minimum 30 days) usually runs inside the final notice period of the incumbent, so you are not double-paying for primary responsibility. SLA cutover happens on a scheduled change window, and the incumbent is formally released on a dated handover document.',
        },
        {
          q: 'Who holds our data during the transition?',
          a: 'You do, throughout. Nothing moves to Deploris infrastructure without a signed data processing agreement and your written approval. Where we provision new services (monitoring, ticketing, backup targets) they default to the EU-region (Frankfurt) of a hyperscale cloud. Credentials the incumbent held are rotated at cutover; nothing is left in their possession.',
        },
        {
          q: 'What if the incumbent will not cooperate on the runbook handover?',
          a: 'This is common and we plan for it. If the incumbent refuses to export firewall rules, DNS zones, backup configs, or monitoring, we rediscover from the live estate: we export configs ourselves, read vendor consoles, read the identity provider, and rebuild the runbook from what we can observe. The timeline extends by one to three weeks, and we document which items were handed over versus rediscovered.',
        },
        {
          q: 'How does parallel coverage actually work?',
          a: 'For a minimum of 30 days, Deploris runs shadow on-call alongside the incumbent. We take the alerts from a mirrored monitoring stack, triage, resolve what we can, and escalate what still belongs to them. The incumbent remains contractually responsible for incidents during this window. Your users and your audit trail see no gap; your incident log sees both providers side by side, which is useful evidence at cutover.',
        },
        {
          q: 'Is there an SLA warm-up period or does the written SLA apply from day one?',
          a: 'The written SLA applies the day Deploris owns the pager, which is the SLA cutover date in the plan. During parallel coverage the incumbent\'s contractual SLA still governs. We do not use "ramp-up" or "warm-up" clauses that let the new provider off the hook for the first quarter.',
        },
        {
          q: 'Do you have a DACH presence, or will we always be routed to the US?',
          a: 'Our delivery team is in DACH, operates in CET, and provides on-site capability in Germany, Austria, and Switzerland. The legal entity is a Colorado LLC (Deploris LLC), which means US procurement teams get a US-counterparty contract and your DACH operation gets a native-language, same-timezone team. 24/7 coverage spans both geographies without a 12-hour handoff gap.',
        },
        {
          q: 'Where does our data live when Deploris operates services?',
          a: 'By default in the Frankfurt (EU) region of a hyperscale cloud under a signed data processing agreement. US-only services are not used in the pipeline when EU-region hosting is in scope. For regulated workloads or customer contracts that require it, we can also run services in your own cloud account rather than ours.',
        },
        {
          q: 'How is the data processing agreement structured?',
          a: 'A GDPR-compliant data processing agreement is signed before any production system moves under Deploris operation. It names every sub-processor, lists every system that handles personal data, specifies the EU-region hosting posture, and is reviewed quarterly. The sub-processor list is part of the contract, not a surprise appendix.',
        },
        {
          q: 'How are end users communicated with during cutover?',
          a: 'We write the comms with your internal team and send them in your name, not ours. The user-visible changes are minimal: a new support email, a new ticket portal, a new phone number for after-hours. The cutover itself happens on a change window chosen with your team, not announced by us.',
        },
        {
          q: 'What is your posture on hardware refresh during the handoff?',
          a: 'We do not force a hardware refresh at cutover. The audit flags any device that is end-of-life, out of warranty, or genuinely unsafe to keep, and we propose a refresh plan with timelines and a defensible price band. Nothing is replaced in the first 90 days without your written approval; the goal of the handoff is a clean handover, not a procurement cycle.',
        },
        {
          q: 'What does your procurement workflow look like for ongoing purchases?',
          a: 'For hardware, software licensing, and third-party services we buy on your behalf, every purchase goes through a documented change request with a quote, a defensible rationale, and your sign-off. Invoices are itemised and reconcile to the change log. We do not resell at opaque margins; our markup, where it exists, is on the quote before you approve it.',
        },
        {
          q: 'Who is Deploris and why should we trust you with our infrastructure?',
          a: 'Deploris is a US-registered engineering firm (Colorado LLC 20268259375) with a DACH delivery team, built as the mid-market answer to the gap between dev shops that write software and MSPs that run infrastructure. Of 40 mid-market firms benchmarked across the US and DACH, we are the only team that covers both halves under one contract. The person on your on-call escalation is the same person who wrote the runbook they are reading from.',
        },
      ],
      related: {
        title: 'Related reading',
        items: [
          {
            label: 'Infrastructure Support & Maintenance service',
            href: '/services/hardware/infrastructure-support',
            blurb: 'Underlying capability page: monitoring, patching, capacity planning, and the full managed-IT offer.',
          },
          {
            label: 'Hardware Break-Fix & Maintenance service',
            href: '/services/hardware/hardware-break-fix',
            blurb: 'If break-fix is the right fit at your scale, see the time-bound SLA tiers and the managed spare pool.',
          },
          {
            label: 'Data Center Maintenance & Support service',
            href: '/services/hardware/data-center-maintenance',
            blurb: '24/7 operations, remote hands, structured cabling, and PDU and rack management under written SLA.',
          },
          {
            label: 'Industries we serve',
            href: '/industries',
            blurb: 'How the mid-market managed-IT model lands in manufacturing, logistics, financial services, and professional services.',
          },
          {
            label: 'Blog: MSP transition without downtime, 30-day runbook',
            href: '/blog/msp-transition-without-downtime-30-day-runbook',
            blurb: 'A day-by-day plan for moving from an incumbent MSP to a mid-market managed-IT partner without a service gap.',
          },
          {
            label: 'Blog: Managed-IT SLA negotiation essentials',
            href: '/blog/managed-it-sla-negotiation-contract-essentials',
            blurb: 'What to actually put in the contract: priority definitions, credit mechanisms, exclusions, and escalation paths.',
          },
        ],
      },
      cta: {
        primary: 'Book a transition call',
        secondary: 'See a sample handover runbook',
      },
    },
    de: {
      slug: 'msp-uebergabe-managed-it',
      metaTitle: 'MSP-Übergabe zu Managed IT für den Mittelstand',
      metaDescription:
        'Vom reaktiven Break-Fix-MSP zu mittelstandsfähigem Managed IT unter schriftlicher SLA. Dokumentierter Übergang, Parallelbetrieb, 24/7-Rufbereitschaft, Hosting in Frankfurt.',
      eyebrow: 'Anwendungsfall · IT-Betrieb',
      h1: 'MSP-Übergabe zu Managed IT für den Mittelstand.',
      deck: 'Ein dokumentierter Übergang vom reaktiven Break-Fix-MSP, oder einem Junior-Managed-Provider, der aus Ihrem Umfeld herausgewachsen ist, hin zu einem mittelstandsfähigen Managed-IT-Vertrag mit schriftlichen SLAs, 24/7-Rufbereitschaft und ohne Deckungslücke beim Cutover.',
      tldr: 'Eine MSP-Übergabe zu Managed IT für ein Mittelstandsunternehmen ist ein dokumentierter Übergang mit Parallelbetrieb von einer Break-Fix- oder Junior-MSP-Vereinbarung hin zu einem Managed-IT-Vertrag auf Senior-Niveau mit schriftlichen Reaktions- und Verfügbarkeits-SLAs, 24/7-Rufbereitschaft, quartalsweisen Kapazitätsreviews und einem datierten Runbook jedes übergehenden Systems.',
      atAGlance: [
        { label: 'Für wen', value: 'Mittelstand, 200 bis 2.000 Arbeitsplätze' },
        { label: 'Übergabefenster', value: '6 bis 12 Wochen, dokumentiert' },
        { label: 'Parallelbetrieb', value: 'Mindestens 30 Tage, Überlappung bei P1' },
        { label: 'Hosting', value: 'EU-Region (Frankfurt) als Default' },
        { label: 'SLA', value: '15 Min P1-Median, 99,9 %+ Verfügbarkeit' },
        { label: 'Geliefert von', value: 'Zweisprachig DE + EN, DACH vor Ort' },
      ],
      problem: {
        title: 'Warum Mittelstandsfirmen aus ihrem ersten MSP herauswachsen.',
        body:
          'Der MSP, der zum 60-Mitarbeiter-Büro gepasst hat, skaliert nicht auf 600 Mitarbeiter in zwei Ländern. Das Modell, das als "ruft uns an, wenn etwas kaputt ist" begann, wird zum Haftungsrisiko, sobald die Lohnbuchhaltung am Wochenende ausfällt und der Rufbereitschafts-Techniker auf einer Hochzeit sitzt. Der Anbieter, der bei 80 Arbeitsplätzen schnell geantwortet hat, routet Sie bei 400 durch eine Ticket-Warteschlange, und der Ingenieur, der vor drei Jahren Ihre Firewall-Regeln geschrieben hat, hat gekündigt. Sie bezahlen jetzt für einen reaktiven Dienst, der weder Vorfälle verhindert noch die Fragen des Einkaufs zu SLAs, Sub-Prozessoren und EU-Datenresidenz beantwortet.\n\nDas härtere Problem ist die Übergabe selbst. Alt-MSPs geben Dokumentation selten freiwillig heraus. Die Administrator-Passwörter liegen auf einem Laptop, der Ihnen nicht gehört, das Backup-Target steckt in einem Tenant, in den Sie nicht hineinsehen, und der einzige Mensch, der die VPN-Konfiguration versteht, rechnet nach Stunden ab. Ein Wechsel ohne Plan kostet eine Woche Produktivität. Ein Wechsel mit Plan ist selbst ein Projekt, und es ist das Projekt, das in Ihrem Team niemand Zeit hat zu führen.\n\nEine saubere Übergabe ist ein Managed-Mandat, kein E-Mail-Verlauf. Sie braucht ein Inventar, ein Runbook, Parallelbetrieb während des Cutovers und eine unterzeichnete SLA, die an dem Tag beginnt, an dem der neue Anbieter den Pager hält.',
        bullets: [
          'Reaktion ist reaktiv: Tickets werden geöffnet, nachdem Nutzer etwas merken, nicht bevor das Monitoring reagiert.',
          'Kein benannter On-Call-Ingenieur: jeder Vorfall wird von einer anderen Person bearbeitet, die Ihr Umfeld nicht kennt.',
          'Keine schriftliche SLA: "nach bestem Bemühen" ist die Vertragsklausel, und der Einkauf kann das nicht verteidigen.',
          'Keine DACH-Präsenz oder keine US-Präsenz: Ihre andere Geografie liegt 12 Stunden hinterher.',
          'Dokumentation steckt im Kopf des Alt-Anbieters: Zugangsdaten, Firewall-Regeln, Backup-Targets und das eine Skript, das die Lohnbuchhaltung zusammenhält.',
        ],
      },
      howItWorks: {
        title: 'Wie wir Ihr Umfeld ohne Deckungslücke übernehmen.',
        intro: 'Sechs Phasen über 6 bis 12 Wochen, jede dokumentiert, jede Übergabe datiert und unterzeichnet.',
        steps: [
          {
            step: 'Alt-Anbieter-Audit und Inventar',
            body: 'Ein Senior-Ingenieur geht das Umfeld durch (physische Standorte, Cloud-Tenants, SaaS-Admin-Konsolen, Identity-Provider, Backup-Targets, Netzwerk-Edge) und liefert innerhalb von zwei Wochen ein schriftliches Inventar. Jedes Asset bekommt einen Owner, einen Ist-Zustand und eine Markierung für alles, was der Alt-Anbieter nicht offengelegt hat.',
          },
          {
            step: 'Runbook-Erfassung, mit oder ohne Mitwirkung des Alt-Anbieters',
            body: 'Wir erfassen und bauen Runbooks für jedes Produktivsystem neu auf: Firewall-Regeln, VPN-Konfiguration, DNS, DHCP, Active Directory und Entra, Microsoft 365 oder Google Workspace, Backup und Restore, Monitoring. Kooperiert der Alt-Anbieter, nehmen wir die Übergabe entgegen; verweigert er sie, rekonstruieren wir aus dem Live-Umfeld und dokumentieren von Grund auf. In jedem Fall bleiben Sie mit einem lesbaren Runbook zurück, das Ihnen gehört.',
          },
          {
            step: 'Parallelbetrieb und Schatten-Rufbereitschaft',
            body: 'Für mindestens 30 Tage läuft Deploris in Schatten-Rufbereitschaft neben dem Alt-Anbieter. Wir übernehmen die Alerts, triagieren und lösen oder eskalieren; der Alt-Anbieter bleibt in diesem Fenster vertraglich verantwortlich. Ihre Nutzer merken nichts. Ihr Incident-Log verdoppelt sich, und mit ihm Ihr Audit-Trail.',
          },
          {
            step: 'SLA-Cutover und Rotation sämtlicher Zugangsdaten',
            body: 'In einem geplanten Change-Fenster geht die SLA-Verantwortung an Deploris über. Jede Zugangsinformation, die der Alt-Anbieter hatte, wird rotiert: Admin-Konten, Service-Konten, API-Keys, VPN-Pre-Shared-Keys, Break-Glass-Zugänge. Nichts verbleibt im Besitz des Vorgängers, und jede Rotation wird gegen das Inventar protokolliert.',
          },
          {
            step: 'Regelbetrieb unter schriftlicher SLA',
            body: 'Deploris betreibt das Umfeld unter einer schriftlichen Service-Level-Vereinbarung: 15-minütige Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit auf den von uns betriebenen Systemen, 48 Stunden Rückrollbarkeit jeder Änderung, benannter On-Call-Ingenieur, wöchentliches Patch-Fenster, voller Audit-Trail.',
          },
          {
            step: 'Quartalsweiser Kapazitäts- und Risikoreview',
            body: 'Jedes Quartal sitzt Ihre Leitung mit dem benannten Account-Ingenieur zusammen und geht Metriken, Kapazitätsentwicklung und Risikoregister durch. Änderungen an SLA, Runbook oder Sub-Prozessor-Liste erfolgen protokolliert, mit 48 Stunden Rückrollbarkeit und einem datierten Change-Log.',
          },
        ],
      },
      checklist: {
        title: 'Was Sie von jedem seriösen Anbieter bei einer MSP-Übergabe erwarten sollten.',
        intro: 'Wenn ein konkurrierender Anbieter nicht alle zehn Punkte liefert, kaufen Sie den nächsten reaktiven MSP in besseren Kleidern.',
        items: [
          'Senior-Ingenieure im Discovery-Termin, keine Vertriebsmitarbeiter.',
          'Ein schriftliches Inventar jedes Assets innerhalb von zwei Wochen, inklusive allem, was der Alt-Anbieter nicht offengelegt hat.',
          'Ein Rekonstruktionspfad für Runbooks für den Fall, dass der Alt-Anbieter die Dokumentation verweigert.',
          'Ein mindestens 30-tägiges Parallelbetriebsfenster, in dem der Alt-Anbieter vertraglich in der Pflicht bleibt.',
          'Eine datierte, protokollierte Rotation jeder Zugangsinformation, die der Alt-Anbieter je hatte.',
          'Eine schriftliche Service-Level-Vereinbarung mit konkreten Erstreaktions- und Verfügbarkeitszahlen, nicht "nach bestem Bemühen".',
          'Ein benannter On-Call-Ingenieur, keine Ticket-Warteschlange, und ein dokumentierter Eskalationspfad.',
          'EU-Region-Hosting-Option mit unterzeichnetem AV-Vertrag und einer Sub-Prozessor-Liste.',
          'Ein quartalsweiser Kapazitäts- und Risikoreview, der schon vor Unterschrift im Kalender steht.',
          '48 Stunden Rückrollbarkeit auf jede Änderung des neuen Anbieters, mit vollem Audit-Trail.',
        ],
      },
      scenario: {
        title: 'Wie das in der Praxis aussieht.',
        body:
          'Ein 320-Mitarbeiter starkes Industriezulieferer-Unternehmen mit Hauptsitz in Baden-Württemberg und einem Werk im US-Midwest wurde seit neun Jahren vom selben lokalen MSP betreut. Das Modell funktionierte bei 80 Arbeitsplätzen. Bei 320, mit ISO 27001 auf der Roadmap und einem US-Einkaufsteam, das präzise Fragen zu Reaktionszeiten stellte, funktionierte es nicht mehr. Der CIO formulierte es so: "Sie antworten, wenn ich anrufe, aber ich muss anrufen". Es gab kein Monitoring, kein dokumentiertes Runbook, keine SLA, und das US-Werk hatte nach 15:00 Ortszeit keine Deckung, weil der Alt-Anbieter um 18:00 Uhr MEZ schloss. Wir fuhren das Audit in zwei Wochen: 11 physische Server, 4 Netzwerkstandorte, 1 Microsoft-365-Tenant, 3 Fachanwendungen, 1 Backup-Target und 2 Credential-Vaults, die der Alt-Anbieter nie geteilt hatte. Die Runbook-Erfassung brauchte weitere drei Wochen, davon die Hälfte für die Rekonstruktion der Firewall-Regeln aus der Live-Konfiguration, weil der Alt-Anbieter sie nicht exportieren wollte. Der Parallelbetrieb lief 42 Tage. Der SLA-Cutover erfolgte in einem Change-Fenster am Samstag. Jede Zugangsinformation des Alt-Anbieters wurde am selben Wochenende rotiert. Das Umfeld läuft heute unter einem Deploris-Managed-IT-Vertrag mit EU-Region-Hosting für die von uns bereitgestellten Dienste, 24/7-Deckung über beide Geografien und einem quartalsweisen Review im Kalender des CIO. Den Firmennamen veröffentlichen wir nicht, weil das Mandat aktiv ist und die Einkaufsabteilung das so bevorzugt.',
      },
      pricingPosture: {
        title: 'Was es kostet, ist eine Scope-Frage, keine reine Arbeitsplatz-Frage.',
        body:
          'Deploris bepreist Managed IT nicht nur nach Arbeitsplatz. Wir scopen jedes Mandat schriftlich: Zuschnitt des Umfelds, Anzahl der Standorte und Tenants, Integrationen, benötigte SLA, Länge des Parallelbetriebs und Hosting-Posture. Innerhalb eines Werktags nach dem zweiten Discovery-Termin erhalten Sie eine belastbare Preisspanne, einen Zeitplan und die konkreten Lieferergebnisse jeder Phase. Nichts wird am Telefon zugesagt, nichts für einen "zweiten Termin" zurückgehalten, und auf keiner Seite steht eine Zahl, bevor wir Ihr Umfeld verstanden haben.',
      },
      comparison: {
        title: 'Warum Deploris, nicht die Alternativen.',
        intro:
          'Vier Wege führen aus einem reaktiven MSP heraus: den Alt-Anbieter behalten und hoffen, dass er mitwächst, ihn gegen einen günstigeren Anbieter im selben Modell tauschen, ein eigenes IT-Ops-Team aufbauen, oder einen Anbieter beauftragen, der die Infrastruktur betreibt und zugleich die Individualsoftware darauf baut. Deploris ist der vierte Weg.',
        rows: [
          {
            contender: 'Alt-MSP behalten',
            wins: 'Kein Übergangsrisiko, Beziehungen intakt, Einkauf hat ihn bereits freigegeben.',
            gaps: 'Die Decke, die Sie zum Suchen gebracht hat, bleibt die Decke; eine schriftliche SLA kommt nicht, weil der Alt-Anbieter sie nicht verteidigen kann; derselbe Techniker, der nicht auf 300 Arbeitsplätze skaliert hat, skaliert auch nicht auf 500.',
          },
          {
            contender: 'Einen günstigeren MSP im selben Break-Fix-Modell beauftragen',
            wins: 'Niedrigerer Listenpreis, schneller unterschrieben, lokale Präsenz dem Einkauf vertraut.',
            gaps: 'Das Modell ist das Problem, nicht der Anbieter; reaktiver Support bleibt reaktiv; Sie fahren diesen Übergang innerhalb von 24 Monaten erneut, und der nächste Alt-Anbieter wird nicht kooperativer sein als der aktuelle.',
          },
          {
            contender: 'Internes IT-Ops-Team aufbauen',
            wins: 'Maximale Kontrolle, Wissen bleibt im Haus, keine Vendor-Abhängigkeit.',
            gaps: '24/7-Deckung erfordert mindestens vier Einstellungen über zwei Geografien; typischerweise 9 bis 18 Monate bis zur vollen Betriebsfähigkeit; der Arbeitsmarkt für Senior-Infrastruktur-Ingenieure in DACH und den USA ist dünn und teuer.',
          },
          {
            contender: 'Deploris Managed IT unter einer SLA, mit dem Software-Team schon an Bord',
            wins: 'Ein Team betreibt die Infrastruktur und schreibt die darauf aufsetzende Individualsoftware; schriftliche SLA ab Cutover-Tag; EU-Region-Hosting per Default; zweisprachige DE+EN-Lieferung; eine Rechnung, ein Verantwortungspunkt.',
            gaps: 'Kein Low-Touch-Commodity-MSP; jedes Mandat wird schriftlich scoped und startet im Mittelstand-Segment (ab 200 Arbeitsplätzen).',
          },
        ],
      },
      faq: [
        {
          q: 'Wie handhaben wir die Vertragsüberschneidung mit unserem Alt-MSP?',
          a: 'Wir planen die Übergabe entlang des Kündigungsfensters Ihres bestehenden Vertrags. Die Parallelbetriebsphase (mindestens 30 Tage) läuft meist innerhalb der letzten Kündigungsfrist des Alt-Anbieters, sodass Sie nicht doppelt für die Hauptverantwortung zahlen. Der SLA-Cutover erfolgt in einem geplanten Change-Fenster, und der Alt-Anbieter wird in einem datierten Übergabedokument formell entlastet.',
        },
        {
          q: 'Wer hält unsere Daten während des Übergangs?',
          a: 'Sie, durchgängig. Nichts wandert ohne unterzeichneten AV-Vertrag und Ihre schriftliche Freigabe auf Deploris-Infrastruktur. Wo wir neue Dienste bereitstellen (Monitoring, Ticketing, Backup-Targets), laufen diese standardmäßig in der EU-Region (Frankfurt) eines Hyperscale-Clouds. Zugangsdaten, die der Alt-Anbieter hatte, werden beim Cutover rotiert; nichts bleibt in seinem Besitz.',
        },
        {
          q: 'Was passiert, wenn der Alt-Anbieter bei der Runbook-Übergabe nicht mitwirkt?',
          a: 'Das ist häufig und wir planen dafür. Verweigert der Alt-Anbieter den Export von Firewall-Regeln, DNS-Zonen, Backup-Konfigurationen oder Monitoring, rekonstruieren wir aus dem Live-Umfeld: Wir exportieren Konfigurationen selbst, lesen Vendor-Konsolen, lesen den Identity-Provider und bauen das Runbook aus dem auf, was wir beobachten können. Der Zeitplan verlängert sich um ein bis drei Wochen, und wir dokumentieren, welche Punkte übergeben und welche rekonstruiert wurden.',
        },
        {
          q: 'Wie funktioniert der Parallelbetrieb konkret?',
          a: 'Für mindestens 30 Tage läuft Deploris in Schatten-Rufbereitschaft neben dem Alt-Anbieter. Wir übernehmen Alerts aus einem gespiegelten Monitoring-Stack, triagieren, lösen, was wir lösen können, und eskalieren, was noch zum Alt-Anbieter gehört. Der Alt-Anbieter bleibt in diesem Fenster vertraglich verantwortlich. Ihre Nutzer und Ihr Audit-Trail sehen keine Lücke; Ihr Incident-Log zeigt beide Anbieter nebeneinander, und das ist beim Cutover eine nützliche Faktenbasis.',
        },
        {
          q: 'Gibt es eine SLA-Einlaufphase oder gilt die schriftliche SLA ab Tag eins?',
          a: 'Die schriftliche SLA gilt an dem Tag, an dem Deploris den Pager hält, also am SLA-Cutover-Datum im Plan. Während des Parallelbetriebs gilt weiterhin die SLA des Alt-Anbieters. Wir nutzen keine Ramp-up- oder Warm-up-Klauseln, die den neuen Anbieter das erste Quartal aus der Pflicht nehmen.',
        },
        {
          q: 'Haben Sie DACH-Präsenz, oder werden wir immer in die USA geroutet?',
          a: 'Unser Delivery-Team sitzt in DACH, arbeitet in MEZ und ist in Deutschland, Österreich und der Schweiz vor Ort einsetzbar. Die Rechtseinheit ist eine Colorado LLC (Deploris LLC), das heißt US-Einkaufsteams bekommen einen US-Vertragspartner, und Ihr DACH-Betrieb bekommt ein muttersprachliches Team in derselben Zeitzone. 24/7-Deckung spannt beide Geografien, ohne 12-Stunden-Lücke bei der Übergabe.',
        },
        {
          q: 'Wo liegen unsere Daten, wenn Deploris Dienste betreibt?',
          a: 'Standardmäßig in der Region Frankfurt (EU) eines Hyperscale-Clouds unter unterzeichnetem AV-Vertrag. US-only-Dienste setzen wir in der Pipeline nicht ein, wenn EU-Region-Hosting im Scope ist. Für regulierte Workloads oder Kundenverträge, die es verlangen, können wir Dienste auch in Ihrem eigenen Cloud-Account betreiben statt in unserem.',
        },
        {
          q: 'Wie ist der AV-Vertrag aufgebaut?',
          a: 'Ein DSGVO-konformer AV-Vertrag wird unterzeichnet, bevor ein Produktivsystem in den Deploris-Betrieb übergeht. Er benennt jeden Sub-Prozessor, listet jedes System, das personenbezogene Daten verarbeitet, legt die EU-Region-Hosting-Posture fest und wird quartalsweise überprüft. Die Sub-Prozessor-Liste ist Vertragsbestandteil, nicht ein überraschender Anhang.',
        },
        {
          q: 'Wie werden Endnutzer während des Cutovers informiert?',
          a: 'Wir formulieren die Kommunikation mit Ihrem internen Team und versenden sie in Ihrem Namen, nicht in unserem. Die nutzerseitigen Änderungen sind minimal: eine neue Support-E-Mail-Adresse, ein neues Ticket-Portal, eine neue Telefonnummer für den Rufbereitschaftsdienst. Der Cutover selbst erfolgt in einem Change-Fenster, das mit Ihrem Team abgestimmt ist und nicht von uns angekündigt wird.',
        },
        {
          q: 'Wie halten Sie es mit Hardware-Refresh während der Übergabe?',
          a: 'Wir erzwingen keinen Hardware-Refresh beim Cutover. Das Audit markiert jedes Gerät, das end-of-life, aus der Garantie oder tatsächlich unsicher ist, und wir legen einen Refresh-Plan mit Zeitachsen und einer belastbaren Preisspanne vor. In den ersten 90 Tagen wird ohne Ihre schriftliche Freigabe nichts ersetzt; Ziel der Übergabe ist eine saubere Übernahme, keine Beschaffungswelle.',
        },
        {
          q: 'Wie läuft Ihr Beschaffungsprozess für laufende Käufe?',
          a: 'Für Hardware, Software-Lizenzen und Drittanbieter-Dienste, die wir für Sie beschaffen, geht jede Beschaffung durch einen dokumentierten Change-Request mit Angebot, belastbarer Begründung und Ihrer Freigabe. Rechnungen sind einzelausgewiesen und lassen sich gegen das Change-Log abgleichen. Wir handeln nicht mit undurchsichtigen Margen weiter; unser Aufschlag, wo er existiert, steht im Angebot, bevor Sie freigeben.',
        },
        {
          q: 'Wer ist Deploris und warum sollten wir Ihnen unsere Infrastruktur anvertrauen?',
          a: 'Deploris ist ein in den USA registriertes Engineering-Unternehmen (Colorado LLC 20268259375) mit einem DACH-Delivery-Team, aufgebaut als die Mittelstandsantwort auf die Lücke zwischen Agenturen, die Software schreiben, und MSPs, die Infrastruktur betreiben. Von 40 benchmarkten Mittelstandsfirmen in USA und DACH sind wir das einzige Team, das beide Hälften unter einem Vertrag abdeckt. Die Person in Ihrer On-Call-Eskalation ist dieselbe Person, die das Runbook geschrieben hat, aus dem sie liest.',
        },
      ],
      related: {
        title: 'Weiterführende Inhalte',
        items: [
          {
            label: 'Leistung: Infrastruktur-Support & Wartung',
            href: '/services/hardware/infrastruktur-support',
            blurb: 'Zugrunde liegende Leistungsseite: Monitoring, Patching, Kapazitätsplanung und das vollständige Managed-IT-Angebot.',
          },
          {
            label: 'Leistung: Hardware Reparatur & Break-Fix',
            href: '/services/hardware/hardware-reparatur-wartung',
            blurb: 'Falls Break-Fix in Ihrer Größenordnung die passende Form ist: die zeitgebundenen SLA-Stufen und der verwaltete Ersatzteilpool.',
          },
          {
            label: 'Leistung: Rechenzentrums-Wartung & Support',
            href: '/services/hardware/rechenzentrum-wartung',
            blurb: '24/7-Betrieb, Remote Hands, strukturierte Verkabelung sowie PDU- und Rack-Management unter schriftlicher SLA.',
          },
          {
            label: 'Branchen, die wir bedienen',
            href: '/industries',
            blurb: 'Wie das Mittelstands-Managed-IT-Modell in Fertigung, Logistik, Financial Services und Professional Services landet.',
          },
          {
            label: 'Blog: MSP-Wechsel ohne Ausfall, 30-Tage-Runbook',
            href: '/blog/msp-transition-without-downtime-30-day-runbook',
            blurb: 'Ein Tag-für-Tag-Plan für den Wechsel vom alten MSP zu einem Mittelstand-Managed-IT-Partner, ohne Ausfallfenster.',
          },
          {
            label: 'Blog: Managed-IT-SLA aushandeln, Vertragsinhalte',
            href: '/blog/managed-it-sla-negotiation-contract-essentials',
            blurb: 'Was wirklich in den Vertrag gehört: Prioritätsdefinitionen, Gutschrift-Mechaniken, Ausschlüsse, Eskalationswege.',
          },
        ],
      },
      cta: {
        primary: 'Übergabetermin anfragen',
        secondary: 'Beispiel-Runbook ansehen',
      },
    },
  },
};
