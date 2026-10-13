import type { UseCase } from './types';

/**
 * Use case: Colocation tenants and small on-prem operators who need 24/7
 * remote-hands and smart-hands coverage without staffing every cage.
 * Underlying service: data-center-maintenance (config/services.ts).
 * Primary search intent: "data center 24/7 remote hands for colo tenants",
 *   "smart hands Equinix Digital Realty Interxion", "colocation audit-trail remote hands".
 */
export const dataCenterRemoteHands: UseCase = {
  id: 'data-center-remote-hands',
  serviceId: 'data-center-maintenance',
  primaryKeyword: {
    en: 'data center 24/7 remote hands for colo tenants',
    de: 'Rechenzentrum 24/7 Remote Hands für Colo-Mieter',
  },
  secondaryKeywords: {
    en: [
      'colocation remote hands',
      'smart hands Equinix Digital Realty',
      'in-cage break-fix response',
      'cross-connect provisioning',
      'firmware BIOS change window',
      'colo audit trail remote hands',
    ],
    de: [
      'Colocation Remote Hands',
      'Smart Hands Equinix Digital Realty',
      'Vor-Ort-Break-Fix im Käfig',
      'Cross-Connect bereitstellen',
      'Firmware BIOS Wartungsfenster',
      'Colo Audit-Trail Remote Hands',
    ],
  },
  lastReviewed: '2026-10-11',
  copy: {
    en: {
      slug: 'data-center-remote-hands',
      metaTitle: '24/7 Remote Hands for Colocation Tenants',
      metaDescription:
        '24/7 remote-hands and smart-hands for colo tenants and on-prem data-center operators: in-cage work, change windows, parts logistics, firmware updates, audit-trail reporting, one SLA.',
      eyebrow: 'Use case · Data center operations',
      h1: 'Data center 24/7 remote hands for colo tenants.',
      deck: 'In-cage execution for colocation tenants and small on-prem operators who need change windows, break-fix response, firmware updates, and audit-trail reporting without running a round-the-clock team in every facility.',
      tldr: 'Data center 24/7 remote hands for colo tenants is a managed in-cage service that covers scheduled change windows, break-fix response, parts logistics, cable patching, firmware and BIOS updates, cross-connect provisioning, and full audit-trail change control across facilities such as Equinix, Digital Realty, Interxion, NTT and Iron Mountain in the EU and US, under one written service-level agreement.',
      atAGlance: [
        { label: 'Who it is for', value: 'Colo tenants and on-prem operators, 1 to 20 cages' },
        { label: 'Coverage', value: '24/7, EU and US facilities' },
        { label: 'First-response', value: '15-minute P1 median, 1-hour P2, next-business-day P3' },
        { label: 'Uptime target', value: '99.9%+ monthly on systems we operate' },
        { label: 'Change control', value: 'Ticketed, photo evidence, 48h reversible' },
        { label: 'Delivered by', value: 'Bilingual team, DE + EN' },
      ],
      problem: {
        title: 'Why colo tenants outgrow ad-hoc remote hands.',
        body:
          'A colocation footprint rarely stays small. One cage becomes four, one region becomes three, and the people who originally built the racks are now on another project. The colo provider sells remote hands as a ticketed service, but the engineer who shows up has never seen your layout, charges by the quarter hour, and has no view into your change calendar. Field-service contractors fix one thing well and leave; nobody owns the next 90 days.\n\nWhat breaks is not usually the hardware. It is the paper trail: audit evidence that a specific person touched a specific port at a specific time, that the change was approved, that the before and after photos exist, that the asset inventory still matches reality. Without that, a routine ISO or SOC audit at the parent company becomes a scramble, and a P1 outage becomes a finger-pointing exercise between the colo desk, the integrator, the NOC, and the vendor TAC.',
        bullets: [
          'Colo provider remote hands bills in 15-minute increments with no runbook memory and no change-ticket integration.',
          'Local field-service contractors cover one site well but cannot run a cross-region change window.',
          'Hiring 24/7 in-cage staff at every facility is impossible below roughly 30 racks per site.',
          'Audit evidence for in-cage work (who, when, what port, what photo) is scattered across emails and chat threads.',
          'Cross-connect orders, PDU swaps, and firmware updates stall when no single team owns the end-to-end runbook.',
        ],
      },
      howItWorks: {
        title: 'How we deliver remote hands under one SLA.',
        intro: 'Six stages, every one documented, every change ticketed and reversible for 48 hours.',
        steps: [
          {
            step: 'Facility access and badging',
            body: 'We enroll named engineers on your colo tenant account at each facility, with badge, biometric, or escort procedures aligned to the facility\'s own access policy (Equinix, Digital Realty, Interxion, NTT, Iron Mountain, Telehouse, Vantage, STACK). Access scope, approver list, and after-hours escort rules are written into the contract, not negotiated per ticket.',
          },
          {
            step: 'Inventory and asset tagging',
            body: 'A cage walk captures every rack, PDU, switch, server, patch panel, and cross-connect, with photos, serials, firmware levels, and port maps. The result lands in your DCIM of record (Nlyte, Sunbird, EcoStruxure IT, or a Deploris-hosted alternative) with a named owner per asset class.',
          },
          {
            step: 'Runbook capture',
            body: 'For every recurring task (PDU swap, BIOS update, cross-connect order, cable patch, hardware RMA) we write the runbook once, with named steps, decision points, rollback, and photo-evidence checkpoints. Nothing on your floor runs on tribal memory after week four.',
          },
          {
            step: 'Change-window scheduling',
            body: 'Scheduled changes land in a shared calendar with your NOC and vendor TAC, with approval, pre-check, go/no-go, and backout window written in. Emergency P1 work follows a separate on-call path with the same 15-minute median first-response.',
          },
          {
            step: 'In-cage execution with photo evidence',
            body: 'The on-site engineer executes the runbook, logs each step against the ticket, and captures before and after photos at the checkpoints the runbook defines. Every port touched, every cable moved, every firmware level written is in the ticket, timestamped, with the engineer named.',
          },
          {
            step: 'Audit-trail reporting',
            body: 'Monthly report per site: tickets closed, SLA attainment, change inventory, parts movement, access events, open risk items. Report format aligns with ISO 27001 and SOC 2 evidence requirements, so your parent-company audit can reuse it without extra work.',
          },
        ],
      },
      checklist: {
        title: 'What to expect from any remote-hands provider doing this well.',
        intro: 'If a competing provider cannot meet all ten, you are buying ticket volume, not operational discipline.',
        items: [
          'Named engineers enrolled on your colo tenant account, not day-pass visitors.',
          'A written access and escort procedure per facility, agreed with the colo provider in advance.',
          'A complete asset inventory in your DCIM of record (Nlyte, Sunbird, or EcoStruxure IT) with named owners.',
          'A runbook library for every recurring task, with rollback and photo checkpoints.',
          'Change calendar integrated with your NOC and vendor TAC, including backout windows.',
          'Photo evidence captured against every ticket, timestamped, retained for the audit retention window.',
          'Parts locker policy with serial-tracked spares and documented return-material-authorization handling.',
          'Cross-connect provisioning that owns the end-to-end order, from LOA to cable pull to port test.',
          'A written service-level agreement with specific first-response, uptime, and reversibility numbers.',
          'Monthly report aligned with ISO 27001 and SOC 2 evidence formats, not a free-text PDF.',
        ],
      },
      scenario: {
        title: 'What this looks like in practice.',
        body:
          'A fintech with two cages in Equinix FR5 and one cage in Equinix NY4 came to us after a near-miss during a quarter-end change window. The company name is withheld because the engagement is active. Their footprint was roughly 60 production servers across the two regions, with cross-connects to a card network, two cloud on-ramps, and a market-data provider. Remote hands had been handled ticket by ticket through the colo provider\'s own desk, with runbooks living in a wiki nobody read. During the near-miss, a BIOS update rolled out to the wrong rack because the ticket said rack 14 and the on-site engineer counted from the opposite end. There was no photo evidence of the pre-state, so recovering took the on-call team six hours. We onboarded in three weeks: enrolled four named engineers across both regions on the tenant account, walked both cages into Sunbird, wrote 23 runbooks against the top recurring tasks, and set up a change calendar shared with their NOC and the card network\'s vendor. Months two and three ran 41 scheduled changes and 7 P1 events, all with photo evidence against ticket, all closed inside SLA. The quarterly audit extract came out of the monthly reports with no reconciliation work. The internal network engineer who had been spending roughly a day a week fighting remote-hands tickets was redeployed to a planned 10-gig migration project.',
      },
      pricingPosture: {
        title: 'What this costs is a facility question, not a ticket question.',
        body:
          'Deploris does not sell remote hands by the quarter hour. We scope every engagement in writing: the facilities in scope, the cage count, the asset inventory, the recurring change volume, the SLA you need, and the DCIM target. You get a defensible price band, a timeline, and the specific deliverables for onboarding, steady-state, and quarterly review inside one business day of the second scoping session. Nothing is quoted on the phone, nothing is held back for a second call, and no number appears before we have walked (or video-walked) the cages.',
      },
      comparison: {
        title: 'Why Deploris, not the alternatives.',
        intro:
          'Four paths lead to a credible remote-hands posture for a colo footprint. Deploris is the one that owns the runbook, the change calendar, and the audit trail under a single SLA, with a software team on retainer when the hardware problem turns out to be a software problem.',
        rows: [
          {
            contender: 'Use the colo provider\'s own remote-hands desk',
            wins: 'Already badged into the facility, fastest to engage, pay-as-you-go.',
            gaps: 'No runbook memory, no DCIM integration, no change-calendar ownership, no photo-evidence standard, 15-minute billing increments inflate steady-state cost.',
          },
          {
            contender: 'Hire local field-service contractors per site',
            wins: 'Strong hands at each site, flexible pricing, often cheaper per hour.',
            gaps: 'No cross-region change windows, no shared ticket system, inconsistent audit evidence between sites, parts logistics and RMA handling fragmented.',
          },
          {
            contender: 'Build an internal 24/7 on-call rota',
            wins: 'Maximum knowledge retention, full control, matches your own change discipline.',
            gaps: 'Requires roughly 30+ racks per site to justify a 24/7 rotation; recruiting at Equinix-adjacent zip codes is slow; backfill for leave, sickness, and attrition is a continuous cost.',
          },
          {
            contender: 'Deploris managed remote hands under one SLA',
            wins: 'Named engineers per facility, DCIM-integrated inventory, runbook library, photo-evidence against every ticket, software team on retainer when a firmware issue turns into a code change, one invoice, one point of accountability, 15-minute P1 median.',
            gaps: 'Not a per-ticket service; every engagement starts with a scoped onboarding and a monthly steady-state posture, not pay-as-you-go.',
          },
        ],
      },
      faq: [
        {
          q: 'Which colocation facilities do you cover for remote hands?',
          a: 'We cover Equinix, Digital Realty, Interxion, NTT, Iron Mountain, Telehouse, Vantage, and STACK facilities in the EU and US, with named engineers enrolled on your tenant account per site. For a facility not on that list we onboard against the facility\'s own access and escort policy during the first week of the engagement, with the scope and access path written into the contract.',
        },
        {
          q: 'How does facility access and badging work?',
          a: 'Each named engineer is enrolled on your colo tenant account at the facility, with badge, biometric, or escort procedures following the facility\'s own policy. Access scope, approver list, after-hours escort rules, and visitor logging flow into the engagement contract, not into ticket-by-ticket negotiation. For facilities that require a government-issued ID check and a background screen we complete that during onboarding, not on the first incident call.',
        },
        {
          q: 'What is the ticketing cadence and who sees what?',
          a: 'Scheduled changes land in a shared change calendar with your NOC and relevant vendor TACs; emergency P1 work follows a separate on-call path with the same 15-minute median first-response. Every ticket carries the engineer name, the asset touched, the runbook step, the photo evidence, and the backout window. Your team sees the full ticket, the colo provider sees only what the facility access policy requires.',
        },
        {
          q: 'How is photo evidence of a change captured and retained?',
          a: 'The runbook defines the photo checkpoints (pre-state, mid-change, post-state) for every recurring task. The on-site engineer captures the photos against the ticket, timestamped, with the asset serial and port visible. Photos are retained for the audit retention window written into the contract (typically 12 or 24 months) and surfaced in the monthly report.',
        },
        {
          q: 'What is your parts logistics and locker policy?',
          a: 'We maintain a parts locker per site where the engagement volume justifies it, with serial-tracked spares inventoried in your DCIM. For out-of-locker parts we handle the RMA with the vendor directly (Dell, HPE, Lenovo, Supermicro, Cisco, Juniper, Arista, Schneider Electric, Vertiv, APC) and keep the parts-in-flight state in the ticket. No part leaves your cage without a return-material-authorization and no part enters without a receiving check.',
        },
        {
          q: 'How do cross-connect orders work?',
          a: 'We own the end-to-end order: LOA generation, submission to the carrier or facility, cable pull or patch, port test, and update of your DCIM and the facility\'s portal. Status lives in the ticket, not in a separate email thread. Typical EU facility turnaround is 2 to 10 business days depending on the carrier; US turnaround is similar with some facilities faster.',
        },
        {
          q: 'How do you handle PDU and UPS swaps?',
          a: 'PDU and UPS swaps run as scheduled changes with a written runbook: load profile check, failover validation (where redundant), rack-level power map, approver sign-off, backout plan. For single-cord devices the runbook requires a planned maintenance window; for dual-corded devices we run a one-leg-at-a-time pattern with electrical measurements captured against the ticket. Vertiv, Schneider Electric, and APC kit are in-scope by default.',
        },
        {
          q: 'How are firmware and BIOS update windows planned?',
          a: 'Firmware and BIOS updates are grouped into monthly or quarterly windows per asset class, with the pre-check (current version, known issues, vendor advisory), the update step, the post-check (health, performance, log review), and the rollback path written into the runbook. For critical paths we stagger across racks and across sites so no single update window puts the whole footprint on an unproven version.',
        },
        {
          q: 'How is hardware RMA handled?',
          a: 'We open the RMA with the vendor (Dell, HPE, Lenovo, Supermicro, Cisco, Juniper, Arista), track the return and replacement in the ticket, receive and test the replacement in the cage, and update the asset inventory with the new serial and firmware level. The failed part leaves the facility only after the vendor label is attached and the chain of custody is logged.',
        },
        {
          q: 'Which DCIM platforms do you integrate with?',
          a: 'We integrate with Nlyte, Sunbird dcTrack, and Schneider EcoStruxure IT as the primary targets, and we can work against a client-hosted alternative when that is already in place. Inventory, asset ownership, port maps, and change state live in the DCIM of record; the ticketing system references the DCIM, not a parallel spreadsheet.',
        },
        {
          q: 'How does your work align with ISO 27001 and SOC 2 at the parent company?',
          a: 'Deploris itself does not hold ISO 27001 or SOC 2 certification. We align our access controls, change-management records, photo evidence, and monthly reporting with the controls those frameworks require, so your parent-company auditor can reuse the artefacts we produce. The underlying facilities (Equinix, Digital Realty, Interxion, NTT) carry their own ISO 27001 and SOC 2 attestations, which we reference in the monthly report where it is relevant.',
        },
        {
          q: 'What happens at the end of an engagement if we move operations in-house or to another provider?',
          a: 'The DCIM record, the runbook library, the ticket history, the photo evidence, and the asset inventory are yours from day one. On exit we run a written knowledge-transfer window of two to six weeks, hand over the access enrolments at each facility, and keep the engagement open on a lower support tier during the transition if that helps. No part of the operation lives in a Deploris black box.',
        },
      ],
      related: {
        title: 'Related reading',
        items: [
          {
            label: 'Data Center Maintenance & Support service',
            href: '/services/hardware/data-center-maintenance',
            blurb: 'Underlying capability page: 24/7 operations, remote hands, structured cabling, PDU and rack management under written SLA.',
          },
          {
            label: 'Infrastructure Support service',
            href: '/services/hardware/infrastructure-support',
            blurb: 'Servers, storage, virtualization, and backup operated under the same SLA that covers your data-center floor.',
          },
          {
            label: 'Network Support service',
            href: '/services/hardware/network-support',
            blurb: 'Switching, routing, firewall, and WAN support that pairs with in-cage work for a single point of accountability.',
          },
          {
            label: 'Industries we serve',
            href: '/industries',
            blurb: 'How the remote-hands posture adapts to fintech, logistics, manufacturing, and other mid-market industries.',
          },
          {
            label: 'Blog: Equinix remote-hands pricing and ticketing',
            href: '/blog/equinix-remote-hands-pricing-ticketing',
            blurb: 'How colo remote-hands pricing actually works at Equinix and peers, and where tenants typically over-spend.',
          },
          {
            label: 'Blog: In-cage change windows without burning on-call',
            href: '/blog/in-cage-change-windows-scheduling',
            blurb: 'A scheduling playbook for in-cage work that respects your on-call rotation and keeps rollbacks cheap.',
          },
        ],
      },
      cta: {
        primary: 'Book a scoping call',
        secondary: 'See a sample runbook',
      },
    },
    de: {
      slug: 'rechenzentrum-remote-hands',
      metaTitle: '24/7 Remote Hands für Colo-Mieter',
      metaDescription:
        '24/7 Remote Hands und Smart Hands für Colo-Mieter und On-Prem-Betreiber: Vor-Ort-Arbeit, Change-Fenster, Teile-Logistik, Firmware-Updates, Audit-Trail, eine SLA.',
      eyebrow: 'Anwendungsfall · Rechenzentrumsbetrieb',
      h1: 'Rechenzentrum 24/7 Remote Hands für Colo-Mieter.',
      deck: 'Vor-Ort-Umsetzung im Käfig für Colocation-Mieter und kleine On-Prem-Betreiber, die Change-Fenster, Break-Fix-Reaktion, Firmware-Updates und auditfähige Berichte brauchen, ohne an jedem Standort rund um die Uhr eigenes Personal vorzuhalten.',
      tldr: 'Rechenzentrum 24/7 Remote Hands für Colo-Mieter ist ein verwalteter Vor-Ort-Service, der geplante Change-Fenster, Break-Fix-Reaktion, Teile-Logistik, Kabel-Patching, Firmware- und BIOS-Updates, Cross-Connect-Bereitstellung sowie einen vollständigen Audit-Trail über Standorte wie Equinix, Digital Realty, Interxion, NTT und Iron Mountain in der EU und den USA unter einer schriftlichen Service-Level-Vereinbarung abdeckt.',
      atAGlance: [
        { label: 'Für wen', value: 'Colo-Mieter und On-Prem-Betreiber, 1 bis 20 Käfige' },
        { label: 'Abdeckung', value: '24/7, Standorte in EU und USA' },
        { label: 'Erstreaktion', value: '15 Min P1-Median, 1 h P2, nächster Werktag P3' },
        { label: 'Verfügbarkeitsziel', value: '99,9 %+ monatlich auf betriebenen Systemen' },
        { label: 'Change-Kontrolle', value: 'Getickert, Foto-Evidenz, 48 h rückrollbar' },
        { label: 'Geliefert von', value: 'Zweisprachig DE + EN' },
      ],
      problem: {
        title: 'Warum Colo-Mieter aus Ad-hoc-Remote-Hands herauswachsen.',
        body:
          'Ein Colocation-Footprint bleibt selten klein. Aus einem Käfig werden vier, aus einer Region werden drei, und die Menschen, die die Racks ursprünglich gebaut haben, sind längst auf einem anderen Projekt. Der Colo-Anbieter verkauft Remote Hands als getickerten Service, aber der Techniker, der erscheint, kennt Ihr Layout nicht, rechnet im Viertelstunden-Takt ab und hat keinen Einblick in Ihren Change-Kalender. Lokale Field-Service-Dienstleister reparieren eine Sache gut und ziehen weiter; die nächsten 90 Tage verantwortet niemand.\n\nWas bricht, ist meist nicht die Hardware. Es ist der Nachweis: Audit-Evidenz, dass eine konkrete Person zu einem konkreten Zeitpunkt einen konkreten Port angefasst hat, dass die Änderung freigegeben war, dass Vorher- und Nachher-Fotos existieren, dass das Asset-Inventar der Realität entspricht. Ohne das wird ein routinemäßiges ISO- oder SOC-Audit beim Mutterkonzern zur Hektik, und ein P1-Vorfall zur Zuweisungsübung zwischen Colo-Desk, Integrator, NOC und Hersteller-TAC.',
        bullets: [
          'Remote Hands der Colo-Anbieter rechnet im 15-Minuten-Takt ab, ohne Runbook-Gedächtnis und ohne Anbindung an Change-Tickets.',
          'Lokale Field-Service-Dienstleister bedienen einen Standort gut, können aber kein regionenübergreifendes Change-Fenster fahren.',
          'Eigene 24/7-Vor-Ort-Belegschaft an jedem Standort ist unterhalb von rund 30 Racks pro Site nicht tragfähig.',
          'Audit-Evidenz für Käfigarbeiten (wer, wann, welcher Port, welches Foto) verteilt sich über Mails und Chats.',
          'Cross-Connect-Bestellungen, PDU-Tausch und Firmware-Updates stocken, wenn kein Team den Runbook durchgehend verantwortet.',
        ],
      },
      howItWorks: {
        title: 'Wie wir Remote Hands unter einer SLA liefern.',
        intro: 'Sechs Phasen, jede dokumentiert, jede Änderung getickert und 48 Stunden rückrollbar.',
        steps: [
          {
            step: 'Standortzugang und Badging',
            body: 'Wir enrollen benannte Ingenieure auf Ihrem Colo-Mieter-Konto an jedem Standort, mit Badge-, Biometrie- oder Escort-Verfahren gemäß der Zugangsrichtlinie des Standorts (Equinix, Digital Realty, Interxion, NTT, Iron Mountain, Telehouse, Vantage, STACK). Zugangsumfang, Freigeberliste und Nachtbegleitungsregeln stehen im Vertrag, nicht in jedem einzelnen Ticket.',
          },
          {
            step: 'Inventar und Asset-Tagging',
            body: 'Ein Käfig-Rundgang erfasst jedes Rack, PDU, Switch, Server, Patchpanel und Cross-Connect mit Fotos, Seriennummern, Firmware-Ständen und Port-Maps. Das Ergebnis landet im DCIM Ihrer Wahl (Nlyte, Sunbird, EcoStruxure IT oder eine Deploris-gehostete Alternative) mit benanntem Owner pro Asset-Klasse.',
          },
          {
            step: 'Runbook-Erfassung',
            body: 'Für jede wiederkehrende Aufgabe (PDU-Tausch, BIOS-Update, Cross-Connect-Bestellung, Kabel-Patch, Hardware-RMA) schreiben wir das Runbook einmal, mit benannten Schritten, Entscheidungspunkten, Rollback und Foto-Evidenz-Checkpoints. Ab Woche vier läuft auf Ihrer Fläche nichts mehr aus dem Gedächtnis.',
          },
          {
            step: 'Change-Fenster-Planung',
            body: 'Geplante Änderungen landen in einem geteilten Kalender mit Ihrem NOC und den Hersteller-TACs, inkl. Freigabe, Pre-Check, Go/No-Go und Rückfall-Fenster. P1-Notfälle laufen über einen separaten Rufbereitschaftspfad mit derselben medianen Erstreaktion von 15 Minuten.',
          },
          {
            step: 'Vor-Ort-Umsetzung mit Foto-Evidenz',
            body: 'Der Ingenieur vor Ort führt das Runbook aus, protokolliert jeden Schritt am Ticket und erfasst an den im Runbook definierten Checkpoints Vorher- und Nachher-Fotos. Jeder angefasste Port, jedes bewegte Kabel, jeder geschriebene Firmware-Stand steht im Ticket, mit Zeitstempel, mit Namen des Ingenieurs.',
          },
          {
            step: 'Audit-Trail-Reporting',
            body: 'Monatsbericht je Standort: geschlossene Tickets, SLA-Erreichung, Change-Inventar, Teilebewegungen, Zugangsereignisse, offene Risiken. Berichtsformat passt zu den Nachweisanforderungen von ISO 27001 und SOC 2, sodass das Audit des Mutterkonzerns die Artefakte ohne Zusatzarbeit wiederverwenden kann.',
          },
        ],
      },
      checklist: {
        title: 'Was Sie von jedem seriösen Remote-Hands-Anbieter erwarten sollten.',
        intro: 'Wenn ein konkurrierender Anbieter nicht alle zehn Punkte liefert, kaufen Sie Ticketvolumen, keine Betriebsdisziplin.',
        items: [
          'Benannte Ingenieure auf Ihrem Colo-Mieter-Konto, keine Tagespass-Besucher.',
          'Schriftliches Zugangs- und Begleitungsverfahren je Standort, vorab mit dem Colo-Anbieter abgestimmt.',
          'Vollständiges Asset-Inventar im DCIM Ihrer Wahl (Nlyte, Sunbird oder EcoStruxure IT) mit benannten Ownern.',
          'Runbook-Bibliothek für jede wiederkehrende Aufgabe, mit Rollback und Foto-Checkpoints.',
          'Change-Kalender integriert mit Ihrem NOC und den Hersteller-TACs, inklusive Rückfall-Fenster.',
          'Foto-Evidenz zu jedem Ticket, mit Zeitstempel, aufbewahrt im vereinbarten Audit-Zeitraum.',
          'Teile-Locker-Richtlinie mit serialisiert geführten Ersatzteilen und dokumentiertem RMA-Prozess.',
          'Cross-Connect-Bereitstellung mit End-to-End-Verantwortung von LOA über Kabelzug bis Port-Test.',
          'Schriftliche SLA mit konkreten Zahlen zu Erstreaktion, Verfügbarkeit und Rückrollbarkeit.',
          'Monatsbericht im Format der ISO-27001- und SOC-2-Nachweise, nicht ein freier PDF-Fließtext.',
        ],
      },
      scenario: {
        title: 'Wie das in der Praxis aussieht.',
        body:
          'Ein Fintech mit zwei Käfigen in Equinix FR5 und einem Käfig in Equinix NY4 kam nach einem Beinahe-Vorfall während eines Quartalsend-Change-Fensters zu uns. Den Firmennamen veröffentlichen wir nicht, weil das Mandat aktiv ist. Der Footprint umfasste rund 60 Produktionsserver über die zwei Regionen, mit Cross-Connects zu einem Kartennetz, zwei Cloud-Onramps und einem Marktdaten-Anbieter. Remote Hands lief Ticket für Ticket über den Desk des Colo-Anbieters, Runbooks lagen in einem Wiki, das niemand gelesen hat. Beim Beinahe-Vorfall rollte ein BIOS-Update auf das falsche Rack, weil im Ticket Rack 14 stand und der Ingenieur vor Ort vom gegenüberliegenden Ende zählte. Es gab keine Foto-Evidenz des Vorzustands, die Wiederherstellung durch das Bereitschaftsteam dauerte sechs Stunden. Wir haben in drei Wochen onboardet: vier benannte Ingenieure in beiden Regionen auf das Mieter-Konto enrollt, beide Käfige in Sunbird eingepflegt, 23 Runbooks für die wiederkehrenden Top-Aufgaben geschrieben und einen Change-Kalender mit dem NOC und dem Hersteller des Kartennetzes geteilt. Monate zwei und drei liefen 41 geplante Änderungen und 7 P1-Vorfälle, alle mit Foto-Evidenz am Ticket, alle innerhalb der SLA geschlossen. Der Quartals-Audit-Auszug entstand ohne Nacharbeit aus den Monatsberichten. Der interne Netzwerk-Ingenieur, der zuvor rund einen Tag pro Woche gegen Remote-Hands-Tickets gearbeitet hat, wurde auf ein geplantes 10-Gigabit-Migrationsprojekt umgesetzt.',
      },
      pricingPosture: {
        title: 'Was es kostet, ist eine Standortfrage, keine Ticketfrage.',
        body:
          'Deploris verkauft Remote Hands nicht im Viertelstunden-Takt. Wir scopen jedes Mandat schriftlich: Standorte, Käfigzahl, Asset-Inventar, Volumen wiederkehrender Änderungen, benötigte SLA und DCIM-Ziel. Innerhalb eines Werktags nach dem zweiten Scoping-Termin erhalten Sie eine belastbare Preisspanne, einen Zeitplan und die konkreten Lieferergebnisse für Onboarding, Regelbetrieb und Quartalsreview. Nichts wird am Telefon zugesagt, nichts für einen zweiten Termin zurückgehalten, und keine Zahl erscheint, bevor wir die Käfige begangen (oder per Video begangen) haben.',
      },
      comparison: {
        title: 'Warum Deploris, nicht die Alternativen.',
        intro:
          'Vier Wege führen zu einer belastbaren Remote-Hands-Aufstellung für einen Colo-Footprint. Deploris ist der Weg, der Runbook, Change-Kalender und Audit-Trail unter einer SLA verantwortet, mit einem Software-Team auf Abruf, wenn das Hardwareproblem sich als Softwareproblem entpuppt.',
        rows: [
          {
            contender: 'Remote-Hands-Desk des Colo-Anbieters nutzen',
            wins: 'Bereits am Standort gebadged, schnellste Beauftragung, nutzungsbasiert.',
            gaps: 'Kein Runbook-Gedächtnis, keine DCIM-Anbindung, keine Verantwortung für den Change-Kalender, kein Foto-Evidenz-Standard, 15-Minuten-Takt treibt die Dauerkosten.',
          },
          {
            contender: 'Lokale Field-Service-Dienstleister je Standort',
            wins: 'Starke Hände vor Ort, flexible Preise, oft günstiger pro Stunde.',
            gaps: 'Keine regionenübergreifenden Change-Fenster, kein gemeinsames Ticketsystem, uneinheitliche Audit-Evidenz zwischen Standorten, Teile-Logistik und RMA zerfasert.',
          },
          {
            contender: 'Eigene 24/7-Rufbereitschaft aufbauen',
            wins: 'Maximales Wissen im Haus, volle Kontrolle, passt zur eigenen Change-Disziplin.',
            gaps: 'Trägt sich erst ab rund 30 Racks pro Site; Recruiting in Equinix-nahen Postleitzahlen ist langsam; Vertretung für Urlaub, Krankheit und Fluktuation ist Dauerkosten.',
          },
          {
            contender: 'Deploris Managed Remote Hands unter einer SLA',
            wins: 'Benannte Ingenieure je Standort, DCIM-integriertes Inventar, Runbook-Bibliothek, Foto-Evidenz zu jedem Ticket, Software-Team auf Abruf, wenn ein Firmware-Problem zum Code-Change wird, eine Rechnung, ein Verantwortungspunkt, 15-minütiger P1-Median.',
            gaps: 'Kein Pro-Ticket-Service; jedes Mandat beginnt mit einem scoped Onboarding und einem monatlichen Steady-State, nicht nutzungsbasiert.',
          },
        ],
      },
      faq: [
        {
          q: 'Welche Colocation-Standorte decken Sie für Remote Hands ab?',
          a: 'Wir decken Standorte von Equinix, Digital Realty, Interxion, NTT, Iron Mountain, Telehouse, Vantage und STACK in der EU und den USA ab, mit benannten Ingenieuren pro Standort auf Ihrem Mieter-Konto. Für einen Standort außerhalb dieser Liste onboarden wir in der ersten Woche gegen die Zugangs- und Begleitungsrichtlinie der Einrichtung, mit Scope und Zugangspfad schriftlich im Vertrag.',
        },
        {
          q: 'Wie laufen Standortzugang und Badging ab?',
          a: 'Jeder benannte Ingenieur wird auf Ihrem Colo-Mieter-Konto am Standort enrollt, mit Badge-, Biometrie- oder Escort-Verfahren gemäß der Richtlinie der Einrichtung. Zugangsumfang, Freigeberliste, Nachtbegleitungsregeln und Besucherprotokollierung werden in den Mandatsvertrag aufgenommen, nicht ticketweise verhandelt. Standorte, die eine amtliche ID-Prüfung oder einen Hintergrund-Check verlangen, erledigen wir im Onboarding, nicht im ersten Vorfall.',
        },
        {
          q: 'Wie ist der Ticketing-Takt, und wer sieht was?',
          a: 'Geplante Änderungen landen in einem geteilten Change-Kalender mit Ihrem NOC und den zuständigen Hersteller-TACs; P1-Notfälle laufen über einen separaten Rufbereitschaftspfad mit derselben medianen Erstreaktion von 15 Minuten. Jedes Ticket trägt den Namen des Ingenieurs, das berührte Asset, den Runbook-Schritt, die Foto-Evidenz und das Rückfall-Fenster. Ihr Team sieht das vollständige Ticket, der Colo-Anbieter nur, was die Zugangsrichtlinie der Einrichtung verlangt.',
        },
        {
          q: 'Wie wird Foto-Evidenz einer Änderung erfasst und aufbewahrt?',
          a: 'Das Runbook definiert die Foto-Checkpoints (Vorzustand, Zwischenschritt, Nachzustand) für jede wiederkehrende Aufgabe. Der Ingenieur vor Ort erfasst die Fotos am Ticket, mit Zeitstempel und sichtbarer Asset-Seriennummer und Port-Nummer. Die Fotos werden für den vertraglich vereinbarten Audit-Zeitraum (typischerweise 12 oder 24 Monate) aufbewahrt und im Monatsbericht sichtbar gemacht.',
        },
        {
          q: 'Wie sieht Ihre Teile-Logistik und Locker-Richtlinie aus?',
          a: 'Wir führen pro Standort einen Teile-Locker, wenn das Volumen es rechtfertigt, mit serialisiert geführten Ersatzteilen im DCIM. Für Teile außerhalb des Lockers wickeln wir die RMA direkt mit dem Hersteller ab (Dell, HPE, Lenovo, Supermicro, Cisco, Juniper, Arista, Schneider Electric, Vertiv, APC) und halten den Teile-Status am Ticket. Kein Teil verlässt Ihren Käfig ohne RMA, und kein Teil kommt ohne Wareneingangsprüfung herein.',
        },
        {
          q: 'Wie läuft eine Cross-Connect-Bestellung?',
          a: 'Wir verantworten den vollständigen Vorgang: LOA-Erstellung, Einreichung bei Carrier oder Einrichtung, Kabelzug oder Patch, Port-Test, Aktualisierung Ihres DCIM und des Portals der Einrichtung. Der Status lebt am Ticket, nicht in einem separaten Mail-Thread. Typische Durchlaufzeit in EU-Einrichtungen 2 bis 10 Werktage je nach Carrier; in US-Einrichtungen ähnlich, teils schneller.',
        },
        {
          q: 'Wie laufen PDU- und USV-Tausch?',
          a: 'PDU- und USV-Tausch laufen als geplante Änderungen mit schriftlichem Runbook: Lastprofil-Check, Failover-Validierung (bei redundanter Auslegung), Rack-Powermap, Freigeber-Zeichnung, Rückfallplan. Bei einseitig versorgten Geräten verlangt das Runbook ein geplantes Wartungsfenster; bei zweikanalig versorgten Geräten fahren wir ein Leg-für-Leg-Muster mit elektrischen Messungen am Ticket. Technik von Vertiv, Schneider Electric und APC ist Default im Scope.',
        },
        {
          q: 'Wie werden Firmware- und BIOS-Update-Fenster geplant?',
          a: 'Firmware- und BIOS-Updates werden in monatlichen oder quartalsweisen Fenstern pro Asset-Klasse gebündelt, mit Pre-Check (aktuelle Version, bekannte Probleme, Hersteller-Advisory), Update-Schritt, Post-Check (Health, Performance, Log-Review) und Rollback-Pfad im Runbook. Auf kritischen Pfaden staffeln wir über Racks und Standorte, damit kein einziges Fenster den gesamten Footprint auf eine ungeprüfte Version bringt.',
        },
        {
          q: 'Wie läuft eine Hardware-RMA?',
          a: 'Wir öffnen die RMA beim Hersteller (Dell, HPE, Lenovo, Supermicro, Cisco, Juniper, Arista), verfolgen Rücksendung und Ersatz am Ticket, prüfen den Ersatz im Käfig und aktualisieren das Asset-Inventar mit neuer Seriennummer und Firmware-Stand. Das defekte Teil verlässt den Standort erst, wenn das Hersteller-Label angebracht und die Chain-of-Custody protokolliert ist.',
        },
        {
          q: 'Mit welchen DCIM-Plattformen integrieren Sie?',
          a: 'Wir integrieren primär mit Nlyte, Sunbird dcTrack und Schneider EcoStruxure IT und arbeiten gegen eine kundengehostete Alternative, wenn sie bereits im Einsatz ist. Inventar, Asset-Eigentum, Port-Maps und Change-Zustand leben im DCIM; das Ticketsystem referenziert das DCIM, keine Parallelliste.',
        },
        {
          q: 'Wie passt Ihre Arbeit zu ISO 27001 und SOC 2 beim Mutterkonzern?',
          a: 'Deploris selbst hält keine ISO-27001- oder SOC-2-Zertifizierung. Wir richten unsere Zugangskontrollen, Change-Management-Nachweise, Foto-Evidenz und Monatsberichte an den Kontrollen aus, die diese Rahmenwerke verlangen, sodass die Auditoren des Mutterkonzerns unsere Artefakte wiederverwenden können. Die zugrundeliegenden Einrichtungen (Equinix, Digital Realty, Interxion, NTT) tragen eigene ISO-27001- und SOC-2-Attestierungen, die wir im Monatsbericht referenzieren, wo es relevant ist.',
        },
        {
          q: 'Was passiert am Mandatsende, wenn wir intern übernehmen oder zu einem anderen Anbieter wechseln?',
          a: 'Der DCIM-Datensatz, die Runbook-Bibliothek, die Ticket-Historie, die Foto-Evidenz und das Asset-Inventar gehören Ihnen ab Tag eins. Zum Ausstieg fahren wir ein schriftliches Knowledge-Transfer-Fenster von zwei bis sechs Wochen, übergeben die Zugangs-Enrolments an jeder Einrichtung und halten das Mandat während des Übergangs auf einer niedrigeren Stufe offen, wenn das hilft. Keine Komponente des Betriebs liegt in einer Deploris-Blackbox.',
        },
      ],
      related: {
        title: 'Weiterführende Inhalte',
        items: [
          {
            label: 'Leistung: Rechenzentrum Wartung & Support',
            href: '/services/hardware/rechenzentrum-wartung',
            blurb: 'Zugrunde liegende Leistungsseite: 24/7-Betrieb, Remote Hands, strukturierte Verkabelung sowie PDU-/Rack-Management unter schriftlicher SLA.',
          },
          {
            label: 'Leistung: Infrastruktur-Support',
            href: '/services/hardware/infrastruktur-support',
            blurb: 'Server, Storage, Virtualisierung und Backup unter derselben SLA, die Ihre Rechenzentrumsfläche abdeckt.',
          },
          {
            label: 'Leistung: Netzwerk-Support',
            href: '/services/hardware/netzwerk-support',
            blurb: 'Switching, Routing, Firewall und WAN-Support kombiniert mit Vor-Ort-Arbeit zu einem Verantwortungspunkt.',
          },
          {
            label: 'Branchen, die wir bedienen',
            href: '/industries',
            blurb: 'Wie sich die Remote-Hands-Aufstellung an Fintech, Logistik, Fertigung und weitere Mittelstandsbranchen anpasst.',
          },
          {
            label: 'Blog: Equinix Remote Hands, Preise und Ticketing',
            href: '/blog/equinix-remote-hands-preise-ticketing',
            blurb: 'Wie die Remote-Hands-Preise bei Equinix und vergleichbaren Colos tatsächlich funktionieren und wo Mieter oft zu viel zahlen.',
          },
          {
            label: 'Blog: Cage-Wartungsfenster planen, ohne On-Call zu verbrennen',
            href: '/blog/cage-wartungsfenster-planung',
            blurb: 'Ein Planungsleitfaden für Arbeiten im Cage, der die On-Call-Rotation schont und Rollbacks günstig hält.',
          },
        ],
      },
      cta: {
        primary: 'Scoping-Termin anfragen',
        secondary: 'Beispiel-Runbook ansehen',
      },
    },
  },
};
