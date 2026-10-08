import type { Locale } from './locales';

export type ServiceLine = 'hardware' | 'development';

export type ServiceCopy = {
  title: string;
  h1: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  summary: string;
  whatItIs: string;
  whoItsFor: string;
  outcomes: string[];
  process: { step: string; body: string }[];
};

export type Service = {
  id: string;
  line: ServiceLine;
  primaryKeyword: Record<Locale, string>;
  copy: Record<Locale, ServiceCopy>;
};

// ============================================================================
// HARDWARE & INFRASTRUCTURE 8 services (Section 4A + Network Support)
// ============================================================================
export const hardwareServices: Service[] = [
  {
    id: 'infrastructure-support',
    line: 'hardware',
    primaryKeyword: {
      en: 'IT infrastructure support',
      de: 'IT Infrastruktur Support',
    },
    copy: {
      en: {
        title: 'Infrastructure Support & Maintenance',
        h1: 'IT Infrastructure Support that keeps you online.',
        slug: 'infrastructure-support',
        metaTitle: 'IT Infrastructure Support & Maintenance | Deploris',
        metaDescription:
          'Proactive monitoring, patching, capacity planning, and 24/7 response for servers, storage, and network. Predictable SLAs, on-site or remote.',
        summary:
          'Proactive monitoring, patching, capacity planning, and 24/7 response for the servers, storage, and network your business runs on.',
        whatItIs:
          'Ongoing operation of your core IT stack servers, storage, switching, firewalls, and virtualization under a written service-level agreement. We do the monitoring, the patching, the capacity work, and the after-hours calls so your team can focus on the business.',
        whoItsFor:
          'Mid-market companies with growing infrastructure and small internal IT teams that need senior operators without the cost of hiring them full-time.',
        outcomes: [
          '99.9%+ verified uptime for supported systems',
          '15-minute median first-response time on Priority-1 incidents',
          'Documented runbooks your team can operate from',
          'Quarterly capacity reviews so you spend on infrastructure that actually matters',
        ],
        process: [
          { step: 'Baseline audit', body: 'Two-week discovery covering inventory, health, security posture, and SLA gaps.' },
          { step: 'Cutover to managed', body: 'Monitoring, alerting, ticketing, and runbook migration completed under change control.' },
          { step: 'Steady-state operation', body: 'Weekly patching windows, monthly review, quarterly capacity plan, on-call rotation.' },
          { step: 'Continuous improvement', body: 'We propose (and, on approval, deliver) upgrades that shrink incident volume and cost.' },
        ],
      },
      de: {
        title: 'Infrastruktur-Support & Wartung',
        h1: 'IT-Infrastruktur-Support, der Sie online hält.',
        slug: 'infrastruktur-support',
        metaTitle: 'IT Infrastruktur Support & Wartung | Deploris',
        metaDescription:
          'Proaktives Monitoring, Patching, Kapazitätsplanung und 24/7-Reaktion für Server, Storage und Netzwerk. Planbare SLAs remote oder vor Ort.',
        summary:
          'Proaktives Monitoring, Patching, Kapazitätsplanung und 24/7-Reaktion für die Server, Storage-Systeme und Netzwerke, auf denen Ihr Unternehmen läuft.',
        whatItIs:
          'Kontinuierlicher Betrieb Ihrer Kern-IT Server, Storage, Switching, Firewalls und Virtualisierung unter einer schriftlichen SLA. Wir übernehmen Monitoring, Patching, Kapazitätsarbeit und den Rufbereitschaftsdienst, damit Ihr Team sich auf das Geschäft konzentrieren kann.',
        whoItsFor:
          'Mittelständische Unternehmen mit wachsender Infrastruktur und kleinen internen IT-Teams, die erfahrene Betriebstechniker benötigen, ohne diese fest anstellen zu müssen.',
        outcomes: [
          '99,9 %+ verifizierte Verfügbarkeit betreuter Systeme',
          '15 Minuten mediane Erstreaktion bei Priorität-1-Vorfällen',
          'Dokumentierte Runbooks, mit denen Ihr Team arbeiten kann',
          'Vierteljährliche Kapazitätsberichte gezielt investieren, nicht nach Gefühl',
        ],
        process: [
          { step: 'Baseline-Audit', body: 'Zweiwöchige Erhebung von Inventar, Zustand, Sicherheitslage und SLA-Lücken.' },
          { step: 'Übernahme in den Managed-Betrieb', body: 'Monitoring, Alerting, Ticketing und Runbook-Übergabe unter Change-Kontrolle.' },
          { step: 'Regelbetrieb', body: 'Wöchentliche Patchfenster, monatlicher Review, Quartalskapazitätsplan, Rufbereitschaft.' },
          { step: 'Kontinuierliche Verbesserung', body: 'Wir schlagen Upgrades vor und liefern sie nach Freigabe für weniger Vorfälle und geringere Kosten.' },
        ],
      },
    },
  },
  {
    id: 'network-support',
    line: 'hardware',
    primaryKeyword: {
      en: 'network support',
      de: 'Netzwerk Support',
    },
    copy: {
      en: {
        title: 'Network Support',
        h1: 'Network support that keeps traffic flowing.',
        slug: 'network-support',
        metaTitle: 'Network Support & Management | Deploris',
        metaDescription:
          'Managed LAN, WAN, and SD-WAN operation with proactive monitoring, firmware management, and firewall change control.',
        summary:
          'Managed operation of your LAN, WAN, SD-WAN, and firewalls with proactive monitoring and change control.',
        whatItIs:
          'End-to-end responsibility for your network layer routers, switches, firewalls, wireless controllers, and SD-WAN including monitoring, firmware discipline, and reviewed change control.',
        whoItsFor:
          'Businesses that have grown past what a single network admin can safely operate and need senior networking capacity without the headcount.',
        outcomes: [
          'Proactive alerting on link and device health before users report issues',
          'Firewall change tickets with pre-flight review, backout plan, and audit trail',
          'Quarterly firmware and CVE review with prioritized remediation',
          'Segmentation and zero-trust roadmap where it fits your business',
        ],
        process: [
          { step: 'Topology + risk audit', body: 'Documented topology, single points of failure, and CVE exposure across every device.' },
          { step: 'Baseline + monitoring', body: 'Standardized SNMP/NetFlow monitoring, alerting thresholds tuned to your traffic.' },
          { step: 'Change control cadence', body: 'Weekly change window, monthly review, quarterly firmware plan.' },
          { step: 'Incident response', body: 'On-call rotation with clear escalation and post-incident write-ups.' },
        ],
      },
      de: {
        title: 'Netzwerk-Support',
        h1: 'Netzwerk-Support, der den Verkehr fließen lässt.',
        slug: 'netzwerk-support',
        metaTitle: 'Netzwerk Support & Netzwerkbetreuung | Deploris',
        metaDescription:
          'Managed LAN, WAN und SD-WAN mit proaktivem Monitoring, Firmware-Management und Firewall-Change-Kontrolle.',
        summary:
          'Managed-Betrieb Ihres LAN, WAN, SD-WAN und Ihrer Firewalls mit proaktivem Monitoring und Change-Kontrolle.',
        whatItIs:
          'Vollständige Verantwortung für Ihre Netzwerkschicht Router, Switches, Firewalls, WLAN-Controller und SD-WAN inklusive Monitoring, Firmware-Disziplin und geprüfter Change-Kontrolle.',
        whoItsFor:
          'Unternehmen, die über das hinausgewachsen sind, was ein einzelner Netzwerkadministrator sicher betreiben kann, und die erfahrene Netzwerk-Kapazität ohne Personalaufbau benötigen.',
        outcomes: [
          'Proaktives Alerting zu Link- und Gerätestatus, bevor Nutzer sich melden',
          'Firewall-Change-Tickets mit Pre-Flight-Review, Rollback-Plan und Audit-Trail',
          'Vierteljährliche Firmware- und CVE-Bewertung mit priorisierter Behebung',
          'Segmentierungs- und Zero-Trust-Roadmap passend zu Ihrem Geschäft',
        ],
        process: [
          { step: 'Topologie- und Risiko-Audit', body: 'Dokumentierte Topologie, Single Points of Failure und CVE-Exposition je Gerät.' },
          { step: 'Baseline + Monitoring', body: 'Standardisiertes SNMP/NetFlow-Monitoring mit auf Ihren Traffic abgestimmten Alerts.' },
          { step: 'Change-Kontrolle', body: 'Wöchentliches Change-Fenster, monatlicher Review, vierteljährlicher Firmware-Plan.' },
          { step: 'Incident Response', body: 'Rufbereitschaft mit klarer Eskalation und Post-Incident-Berichten.' },
        ],
      },
    },
  },
  {
    id: 'rollout-migrations',
    line: 'hardware',
    primaryKeyword: { en: 'IT rollout and migration', de: 'Rollout und Migration' },
    copy: {
      en: {
        title: 'Rollout & Migrations',
        h1: 'Rollouts and migrations, delivered on schedule.',
        slug: 'rollout-migrations',
        metaTitle: 'IT Rollout & Migration Services | Deploris',
        metaDescription:
          'Site rollouts, hardware refresh, and platform migrations delivered under change control with reversible cutover plans.',
        summary:
          'Site rollouts, hardware refresh, and platform migrations delivered under change control with reversible cutover plans.',
        whatItIs:
          'Planned rollout of new endpoints, network gear, or platforms across one or many sites including staging, imaging, logistics, cutover, and post-cutover support.',
        whoItsFor:
          'Businesses opening or refreshing offices, standardizing on new hardware, or migrating platforms (Windows, Microsoft 365, VoIP, MDM).',
        outcomes: [
          'A written cutover plan with clear go/no-go gates',
          'Reversible cutover if anything fails, we roll back cleanly',
          'Predictable per-site delivery windows',
          'Post-rollout stabilization period with hypercare support',
        ],
        process: [
          { step: 'Discovery', body: 'Site survey, inventory, dependencies, user impact map.' },
          { step: 'Pilot', body: 'One site or ring to shake out issues before scale-out.' },
          { step: 'Scale-out', body: 'Repeatable per-site playbook, logistics, on-site + remote hands.' },
          { step: 'Hypercare', body: 'Dedicated support for the first 2–4 weeks post-cutover.' },
        ],
      },
      de: {
        title: 'Rollout & Migration',
        h1: 'Rollouts und Migrationen termingerecht geliefert.',
        slug: 'rollout-migration',
        metaTitle: 'IT-Rollout & Migration | Deploris',
        metaDescription:
          'Standortrollouts, Hardware-Refresh und Plattform-Migrationen unter Change-Kontrolle mit rückrollbaren Cutover-Plänen.',
        summary:
          'Standortrollouts, Hardware-Refresh und Plattform-Migrationen unter Change-Kontrolle mit rückrollbaren Cutover-Plänen.',
        whatItIs:
          'Geplante Ausrollung neuer Endgeräte, Netzwerktechnik oder Plattformen über einen oder viele Standorte inklusive Staging, Imaging, Logistik, Cutover und Post-Cutover-Support.',
        whoItsFor:
          'Unternehmen, die Standorte eröffnen oder erneuern, auf neue Hardware standardisieren oder Plattformen migrieren (Windows, Microsoft 365, VoIP, MDM).',
        outcomes: [
          'Ein schriftlicher Cutover-Plan mit klaren Go/No-Go-Gates',
          'Rückrollbarer Cutover bei Fehlern sauberes Rollback',
          'Planbare Lieferfenster pro Standort',
          'Stabilisierungsphase mit Hypercare nach dem Rollout',
        ],
        process: [
          { step: 'Erhebung', body: 'Standortaufnahme, Inventar, Abhängigkeiten, Nutzer-Impact-Map.' },
          { step: 'Pilot', body: 'Ein Standort oder Ring, um Probleme vor der Skalierung aufzudecken.' },
          { step: 'Skalierung', body: 'Wiederholbares Standort-Playbook, Logistik, Remote- und Vor-Ort-Kräfte.' },
          { step: 'Hypercare', body: 'Dedizierter Support in den ersten 2–4 Wochen nach dem Cutover.' },
        ],
      },
    },
  },
  {
    id: 'desktop-support',
    line: 'hardware',
    primaryKeyword: { en: 'desktop support services', de: 'Desktop Support Remote und Vor-Ort' },
    copy: {
      en: {
        title: 'Desktop Support (Remote / On-site)',
        h1: 'Desktop support that shows up remote or on-site.',
        slug: 'desktop-support',
        metaTitle: 'Remote & On-site Desktop Support | Deploris',
        metaDescription:
          'Tiered desktop support with ticketing, SLAs, and on-site dispatch. Windows, macOS, Microsoft 365, imaging, and identity.',
        summary:
          'Tiered desktop support with SLAs, ticketing, and on-site dispatch for Windows, macOS, Microsoft 365, and identity.',
        whatItIs:
          'Managed end-user support L1, L2, and L3 via ticketing, chat, or phone, with on-site dispatch for anything that can’t be fixed remotely.',
        whoItsFor:
          'Companies that want a single accountable partner for user support instead of juggling multiple providers.',
        outcomes: [
          'Published SLAs with reporting',
          'Weekly ticket-quality reviews',
          'Repeatable imaging and onboarding flows',
          'Reduced repeat tickets via root-cause fixes',
        ],
        process: [
          { step: 'Onboarding', body: 'Knowledge transfer, tooling, ticket taxonomy, escalation matrix.' },
          { step: 'Steady state', body: 'Tiered support with on-site dispatch as needed.' },
          { step: 'Reporting', body: 'Monthly report: volume, SLA hits, common issues, proposed fixes.' },
          { step: 'Continuous improvement', body: 'Kill top ticket categories with runbooks, self-service, or platform changes.' },
        ],
      },
      de: {
        title: 'Desktop-Support (Remote / Vor-Ort)',
        h1: 'Desktop-Support, der da ist remote oder vor Ort.',
        slug: 'desktop-support',
        metaTitle: 'Desktop Support Remote & Vor-Ort | Deploris',
        metaDescription:
          'Gestufter Desktop-Support mit Ticketing, SLAs und Vor-Ort-Einsatz. Windows, macOS, Microsoft 365, Imaging und Identität.',
        summary:
          'Gestufter Desktop-Support mit SLAs, Ticketing und Vor-Ort-Einsatz für Windows, macOS, Microsoft 365 und Identität.',
        whatItIs:
          'Managed End-User-Support L1, L2, L3 per Ticket, Chat oder Telefon, mit Vor-Ort-Einsatz für alles, was sich remote nicht lösen lässt.',
        whoItsFor:
          'Unternehmen, die einen verantwortlichen Partner für User-Support wollen anstatt mehrere Dienstleister zu koordinieren.',
        outcomes: [
          'Veröffentlichte SLAs mit Berichten',
          'Wöchentliche Ticket-Qualitätsreviews',
          'Wiederholbare Imaging- und Onboarding-Flows',
          'Weniger Wiederholtickets durch Root-Cause-Fixes',
        ],
        process: [
          { step: 'Onboarding', body: 'Wissenstransfer, Tooling, Ticket-Taxonomie, Eskalationsmatrix.' },
          { step: 'Regelbetrieb', body: 'Gestufter Support mit Vor-Ort-Einsatz nach Bedarf.' },
          { step: 'Reporting', body: 'Monatsbericht: Volumen, SLA-Erfüllung, häufige Themen, Vorschläge.' },
          { step: 'Kontinuierliche Verbesserung', body: 'Top-Ticket-Kategorien beseitigen: Runbook, Self-Service oder Plattformänderung.' },
        ],
      },
    },
  },
  {
    id: 'imac-projects',
    line: 'hardware',
    primaryKeyword: { en: 'IMAC services', de: 'IMAC Services' },
    copy: {
      en: {
        title: 'IMAC & Projects',
        h1: 'Installs, Moves, Adds, Changes cleanly executed.',
        slug: 'imac-projects',
        metaTitle: 'IMAC Services & Project Delivery | Deploris',
        metaDescription:
          'Installs, moves, adds, and changes for endpoints, peripherals, and network gear, with tracked assets and clean handover.',
        summary:
          'Predictable installs, moves, adds, and changes for endpoints, peripherals, and network gear, with tracked assets.',
        whatItIs:
          'The everyday hardware work that keeps offices moving desk moves, new-hire kits, printer swaps, meeting-room installs, decommissions delivered on a repeatable playbook.',
        whoItsFor:
          'Facilities and IT teams who want IMAC work off their plate without losing control of the asset register.',
        outcomes: [
          'Reliable per-request SLAs',
          'Every asset scanned in and out of your CMDB',
          'Consistent quality across sites',
          'Clean sign-off on completion',
        ],
        process: [
          { step: 'Request', body: 'Ticket with location, scope, timing, and asset numbers.' },
          { step: 'Schedule', body: 'Slot allocation matching your change window.' },
          { step: 'Deliver', body: 'On-site (or remote hands) execution with photos and asset updates.' },
          { step: 'Close', body: 'Signed handover, CMDB updated, ticket closed.' },
        ],
      },
      de: {
        title: 'IMAC & Projekte',
        h1: 'Installations, Moves, Adds, Changes sauber umgesetzt.',
        slug: 'imac-projekte',
        metaTitle: 'IMAC Services & Projektabwicklung | Deploris',
        metaDescription:
          'Installations, Moves, Adds und Changes für Endgeräte, Peripherie und Netzwerktechnik mit getrackten Assets und sauberer Übergabe.',
        summary:
          'Planbare Installations, Moves, Adds und Changes für Endgeräte, Peripherie und Netzwerktechnik mit getrackten Assets.',
        whatItIs:
          'Die tägliche Hardware-Arbeit, die Büros am Laufen hält Umzüge, Onboarding-Kits, Druckerwechsel, Meetingraum-Installationen, Außerbetriebnahmen nach wiederholbarem Playbook.',
        whoItsFor:
          'Facility- und IT-Teams, die IMAC-Arbeit abgeben wollen, ohne die Kontrolle über das Asset-Register zu verlieren.',
        outcomes: [
          'Zuverlässige SLAs pro Anfrage',
          'Jedes Asset wird in Ihrer CMDB ein- und ausgebucht',
          'Konsistente Qualität über Standorte hinweg',
          'Saubere Abnahme bei Abschluss',
        ],
        process: [
          { step: 'Anfrage', body: 'Ticket mit Standort, Umfang, Zeit und Asset-Nummern.' },
          { step: 'Planung', body: 'Slot passend zu Ihrem Change-Fenster.' },
          { step: 'Umsetzung', body: 'Vor Ort (oder Remote Hands) mit Fotos und CMDB-Aktualisierung.' },
          { step: 'Abschluss', body: 'Unterschriebene Übergabe, CMDB aktualisiert, Ticket geschlossen.' },
        ],
      },
    },
  },
  {
    id: 'hardware-break-fix',
    line: 'hardware',
    primaryKeyword: { en: 'hardware break-fix maintenance', de: 'Hardware Reparatur Break-Fix' },
    copy: {
      en: {
        title: 'Hardware Break-Fix / Maintenance',
        h1: 'Break-fix maintenance with real SLA teeth.',
        slug: 'hardware-break-fix',
        metaTitle: 'Hardware Break-Fix & Maintenance | Deploris',
        metaDescription:
          'Time-bound break-fix maintenance for servers, network gear, endpoints, and peripherals same-day or next-business-day.',
        summary:
          'Time-bound break-fix for servers, network gear, endpoints, and peripherals same-day or next-business-day.',
        whatItIs:
          'When something breaks, we’re contractually obligated to be there with parts, tools, and a technician inside the SLA window you signed.',
        whoItsFor:
          'Any business where hardware failure directly costs revenue or productivity.',
        outcomes: [
          'Same-business-day or 4-hour response tiers',
          'Managed spare pool for critical parts',
          'Root-cause reporting on repeat failures',
          'Warranty and RMA handled for you',
        ],
        process: [
          { step: 'Trigger', body: 'You (or our monitoring) opens a P1/P2/P3.' },
          { step: 'Dispatch', body: 'Technician + parts routed within SLA.' },
          { step: 'Repair', body: 'On-site fix, or swap-and-repair-off-site.' },
          { step: 'Report', body: 'Written incident report and follow-up actions.' },
        ],
      },
      de: {
        title: 'Hardware Break-Fix / Wartung',
        h1: 'Break-Fix mit echten SLA-Zähnen.',
        slug: 'hardware-reparatur-wartung',
        metaTitle: 'Hardware Reparatur & Break-Fix Wartung | Deploris',
        metaDescription:
          'Zeitgebundene Break-Fix-Wartung für Server, Netzwerktechnik, Endgeräte und Peripherie same-day oder next-business-day.',
        summary:
          'Zeitgebundene Break-Fix-Wartung für Server, Netzwerktechnik, Endgeräte und Peripherie same-day oder next-business-day.',
        whatItIs:
          'Wenn etwas ausfällt, sind wir vertraglich verpflichtet, mit Ersatzteilen, Werkzeug und Techniker innerhalb Ihres SLA-Fensters vor Ort zu sein.',
        whoItsFor:
          'Jedes Unternehmen, in dem Hardware-Ausfälle direkt Umsatz oder Produktivität kosten.',
        outcomes: [
          'Same-Business-Day- oder 4-Stunden-Reaktionsstufen',
          'Verwaltetes Ersatzteillager für kritische Komponenten',
          'Root-Cause-Berichte bei wiederholten Ausfällen',
          'Garantie- und RMA-Abwicklung übernehmen wir',
        ],
        process: [
          { step: 'Auslöser', body: 'Sie (oder unser Monitoring) eröffnen P1/P2/P3.' },
          { step: 'Dispatch', body: 'Techniker und Teile innerhalb der SLA disponiert.' },
          { step: 'Reparatur', body: 'Vor Ort oder Tausch mit Reparatur im Nachgang.' },
          { step: 'Bericht', body: 'Schriftlicher Vorfallsbericht und Folgemaßnahmen.' },
        ],
      },
    },
  },
  {
    id: 'wifi-surveys',
    line: 'hardware',
    primaryKeyword: { en: 'WiFi site survey', de: 'WLAN Ausleuchtung' },
    copy: {
      en: {
        title: 'WiFi Surveys',
        h1: 'WiFi surveys that actually predict real-world coverage.',
        slug: 'wifi-surveys',
        metaTitle: 'Predictive & On-site WiFi Surveys | Deploris',
        metaDescription:
          'Predictive and passive WiFi site surveys with heatmaps, AP placement plan, and validated post-install coverage.',
        summary:
          'Predictive and passive WiFi surveys with heatmaps, AP placement, and validated post-install coverage.',
        whatItIs:
          'Radio-plan design and validation pre-deployment prediction, on-site passive measurement, and post-install validation against your actual usage patterns.',
        whoItsFor:
          'Offices, warehouses, healthcare, and retail sites where WiFi is business-critical and guesswork isn’t acceptable.',
        outcomes: [
          'AP placement plan with predicted RSSI/SNR heatmaps',
          'Validated coverage against real device mix',
          'BOM sized to actual traffic, not vendor list price',
          'Roaming, channel plan, and interference report',
        ],
        process: [
          { step: 'Requirements', body: 'Device mix, applications, coverage SLAs, floor plans.' },
          { step: 'Predictive design', body: 'Ekahau/Hamina model with heatmaps.' },
          { step: 'On-site survey', body: 'Passive + active measurements, interference scan.' },
          { step: 'Validation', body: 'Post-install survey against SLAs, remediation plan if needed.' },
        ],
      },
      de: {
        title: 'WLAN-Ausleuchtung',
        h1: 'WLAN-Ausleuchtung, die reale Abdeckung wirklich vorhersagt.',
        slug: 'wlan-ausleuchtung',
        metaTitle: 'WLAN Ausleuchtung & WLAN Vermessung | Deploris',
        metaDescription:
          'Prädiktive und passive WLAN-Ausleuchtung mit Heatmaps, AP-Platzierung und validierter Abdeckung nach Installation.',
        summary:
          'Prädiktive und passive WLAN-Ausleuchtung mit Heatmaps, AP-Platzierung und validierter Abdeckung nach Installation.',
        whatItIs:
          'Funkplanung und Validierung prädiktive Vorabplanung, passive Vor-Ort-Messung und Nachvalidierung gegen Ihr tatsächliches Nutzungsverhalten.',
        whoItsFor:
          'Büros, Lager, Gesundheitswesen und Handel, in denen WLAN geschäftskritisch ist und Schätzungen nicht ausreichen.',
        outcomes: [
          'AP-Platzierungsplan mit vorhergesagten RSSI/SNR-Heatmaps',
          'Validierte Abdeckung mit realem Gerätemix',
          'Stückliste passend zum tatsächlichen Traffic',
          'Roaming-, Kanalplan- und Interferenzbericht',
        ],
        process: [
          { step: 'Anforderungen', body: 'Gerätemix, Anwendungen, Coverage-SLAs, Grundrisse.' },
          { step: 'Prädiktives Design', body: 'Ekahau/Hamina-Modell mit Heatmaps.' },
          { step: 'Vor-Ort-Vermessung', body: 'Passive + aktive Messungen, Interferenzscan.' },
          { step: 'Validierung', body: 'Nachvalidierung gegen SLAs, Nachbesserungsplan bei Bedarf.' },
        ],
      },
    },
  },
  {
    id: 'data-center-maintenance',
    line: 'hardware',
    primaryKeyword: { en: 'data center maintenance', de: 'Rechenzentrum Wartung' },
    copy: {
      en: {
        title: 'Data Center Maintenance & Support',
        h1: 'Data center support that treats the SLA as sacred.',
        slug: 'data-center-maintenance',
        metaTitle: 'Data Center Maintenance & 24/7 Support | Deploris',
        metaDescription:
          '24/7 data center operations, remote hands, structured cabling, and PDU/rack management under strict SLA.',
        summary:
          '24/7 operations, remote hands, structured cabling, and PDU/rack management under strict SLA.',
        whatItIs:
          'Hands, eyes, and process inside your data center installs, patching, decommissions, and 24/7 remote hands with strong change discipline and full audit.',
        whoItsFor:
          'Colo tenants and enterprise data-center operators who need reliable execution without maintaining 24/7 headcount.',
        outcomes: [
          '24/7 remote hands with published SLAs',
          'Cable and rack hygiene that survives audits',
          'Full audit trail on every change',
          'Vendor-neutral we manage your kit, not a resale of ours',
        ],
        process: [
          { step: 'Onboarding', body: 'Cage walk, contact tree, escalation, access process.' },
          { step: 'Steady state', body: '24/7 remote hands + weekly planned windows.' },
          { step: 'Change control', body: 'Every action ticketed, reviewed, logged.' },
          { step: 'Audit + reporting', body: 'Monthly report on activity, SLAs, and risk items.' },
        ],
      },
      de: {
        title: 'Rechenzentrum Wartung & Support',
        h1: 'Rechenzentrum-Support, der die SLA ernst nimmt.',
        slug: 'rechenzentrum-wartung',
        metaTitle: 'Rechenzentrum Wartung & 24/7 Support | Deploris',
        metaDescription:
          '24/7 Rechenzentrum-Betrieb, Remote Hands, strukturierte Verkabelung sowie PDU-/Rack-Management unter strikter SLA.',
        summary:
          '24/7 Betrieb, Remote Hands, strukturierte Verkabelung sowie PDU-/Rack-Management unter strikter SLA.',
        whatItIs:
          'Hände, Augen und Prozesse in Ihrem Rechenzentrum Installationen, Patching, Außerbetriebnahmen und 24/7 Remote Hands mit klarer Change-Disziplin und Audit.',
        whoItsFor:
          'Colo-Mieter und Enterprise-RZ-Betreiber, die zuverlässige Umsetzung ohne 24/7-eigene Belegschaft benötigen.',
        outcomes: [
          '24/7 Remote Hands mit veröffentlichten SLAs',
          'Kabel- und Rack-Hygiene, die Audits standhält',
          'Vollständiger Audit-Trail zu jeder Änderung',
          'Herstellerneutral wir betreiben Ihre Technik, nicht unseren Weiterverkauf',
        ],
        process: [
          { step: 'Onboarding', body: 'Cage-Rundgang, Kontaktbaum, Eskalation, Zugangsprozess.' },
          { step: 'Regelbetrieb', body: '24/7 Remote Hands + wöchentliche Planfenster.' },
          { step: 'Change-Kontrolle', body: 'Jede Aktion mit Ticket, Review, Log.' },
          { step: 'Audit + Reporting', body: 'Monatsbericht zu Aktivität, SLAs und Risiken.' },
        ],
      },
    },
  },
];

// ============================================================================
// DEVELOPMENT 4 services
// ============================================================================
export const developmentServices: Service[] = [
  {
    id: 'custom-crm',
    line: 'development',
    primaryKeyword: { en: 'custom CRM development', de: 'CRM Entwicklung' },
    copy: {
      en: {
        title: 'Custom CRM Development',
        h1: 'Custom CRMs built around how you actually sell.',
        slug: 'custom-crm',
        metaTitle: 'Custom CRM Development | Deploris',
        metaDescription:
          'Custom CRM systems designed around your sales process not the other way around. Integrations, migrations, and audit-friendly access control.',
        summary:
          'Custom CRM systems designed around your sales process, integrated with your stack, and built for the way your teams actually work.',
        whatItIs:
          'A bespoke customer relationship management system data model, workflows, dashboards, integrations, and access control built to fit your business instead of forcing you to fit off-the-shelf software.',
        whoItsFor:
          'Teams whose process doesn’t fit HubSpot / Salesforce / Pipedrive without heavy configuration, or whose licensing has crept past what a custom build would cost to run.',
        outcomes: [
          'A system your reps actually use because it matches their workflow',
          'Clean integrations with billing, marketing, and support',
          'Role-based access control that satisfies compliance and audit',
          'Predictable running cost no per-seat surprises',
        ],
        process: [
          { step: 'Discovery', body: 'Interviews, current-tool audit, data-model draft.' },
          { step: 'Prototype', body: 'Two-week interactive prototype of the top three workflows.' },
          { step: 'Build', body: 'Incremental sprints, live for internal users from week 4.' },
          { step: 'Rollout + iterate', body: 'Migration, training, then a quarterly change cadence.' },
        ],
      },
      de: {
        title: 'CRM Entwicklung',
        h1: 'Individuelle CRM-Systeme rund um Ihren tatsächlichen Vertriebsprozess.',
        slug: 'crm-entwicklung',
        metaTitle: 'CRM Entwicklung & individuelle CRM Lösungen | Deploris',
        metaDescription:
          'Maßgeschneiderte CRM-Systeme rund um Ihren Vertriebsprozess nicht umgekehrt. Integrationen, Migrationen und auditfähige Zugriffskontrolle.',
        summary:
          'Maßgeschneiderte CRM-Systeme rund um Ihren Vertriebsprozess, integriert in Ihren Stack und für die Realität Ihrer Teams gebaut.',
        whatItIs:
          'Ein individuelles Customer-Relationship-Management-System Datenmodell, Workflows, Dashboards, Integrationen und Zugriffskontrolle auf Ihr Geschäft zugeschnitten, statt Ihr Geschäft an Standardsoftware anzupassen.',
        whoItsFor:
          'Teams, deren Prozess nicht ohne aufwendige Konfiguration in HubSpot / Salesforce / Pipedrive passt, oder deren Lizenzkosten die Kosten einer eigenen Lösung überschritten haben.',
        outcomes: [
          'Ein System, das Ihre Vertriebsmitarbeiter wirklich nutzen',
          'Saubere Integrationen mit Rechnungswesen, Marketing und Support',
          'Rollenbasierte Zugriffskontrolle auditfähig',
          'Planbare Betriebskosten keine Überraschungen pro Nutzerlizenz',
        ],
        process: [
          { step: 'Erhebung', body: 'Interviews, Toolaudit, Datenmodell-Entwurf.' },
          { step: 'Prototyp', body: 'Zweiwöchiger interaktiver Prototyp der drei wichtigsten Workflows.' },
          { step: 'Umsetzung', body: 'Inkrementelle Sprints, ab Woche 4 im internen Einsatz.' },
          { step: 'Rollout + Iteration', body: 'Migration, Schulung, dann vierteljährliche Änderungskadenz.' },
        ],
      },
    },
  },
  {
    id: 'rag-systems',
    line: 'development',
    primaryKeyword: { en: 'RAG system development', de: 'RAG System Entwicklung' },
    copy: {
      en: {
        title: 'RAG Systems',
        h1: 'Retrieval-augmented AI grounded in your own knowledge.',
        slug: 'rag-systems',
        metaTitle: 'RAG System Development | Deploris',
        metaDescription:
          'RAG systems that ground LLM answers in your own documents with access control, source citations, and evaluation you can trust.',
        summary:
          'Retrieval-augmented generation systems that ground LLM answers in your own documents, with access control, citations, and evaluation.',
        whatItIs:
          'A production RAG pipeline over your knowledge chunking, embedding, vector search, prompt orchestration, retrieval evaluation, and access-controlled answers with source citations.',
        whoItsFor:
          'Companies whose employees or customers keep asking the same knowledge-heavy questions, and who need answers that reflect the current state of documented truth.',
        outcomes: [
          'Answers grounded in your latest documents (no hallucinated facts)',
          'Every answer cited to a source your team can verify',
          'Access control that respects your existing permissions',
          'Measured retrieval quality precision, recall, and answer accuracy tracked over time',
        ],
        process: [
          { step: 'Knowledge audit', body: 'What sources, how big, how sensitive, how often they change.' },
          { step: 'Prototype', body: 'End-to-end RAG on a scoped corpus, evaluated against real questions.' },
          { step: 'Productionization', body: 'Access control, monitoring, cost controls, retraining cadence.' },
          { step: 'Continuous eval', body: 'Weekly eval on a growing question set precision, recall, hallucination rate.' },
        ],
      },
      de: {
        title: 'RAG-Systeme',
        h1: 'Retrieval-Augmented KI geerdet in Ihrem eigenen Wissen.',
        slug: 'rag-systeme',
        metaTitle: 'RAG System Entwicklung | Deploris',
        metaDescription:
          'RAG-Systeme, die LLM-Antworten in Ihren Dokumenten verankern mit Zugriffskontrolle, Quellenzitaten und belastbarer Evaluation.',
        summary:
          'Retrieval-Augmented-Generation-Systeme, die LLM-Antworten in Ihren Dokumenten verankern mit Zugriffskontrolle, Zitaten und Evaluation.',
        whatItIs:
          'Eine produktive RAG-Pipeline über Ihr Wissen Chunking, Embedding, Vektorsuche, Prompt-Orchestrierung, Retrieval-Evaluation und zugriffskontrollierte Antworten mit Quellenverweisen.',
        whoItsFor:
          'Unternehmen, deren Mitarbeitende oder Kunden immer wieder dieselben wissensintensiven Fragen stellen und die Antworten auf dem aktuellen Stand der Dokumentation benötigen.',
        outcomes: [
          'Antworten aus Ihren aktuellsten Dokumenten keine halluzinierten Fakten',
          'Jede Antwort mit Quellenzitat, das Ihr Team prüfen kann',
          'Zugriffskontrolle, die Ihre bestehenden Berechtigungen respektiert',
          'Gemessene Retrieval-Qualität Precision, Recall, Antwortgenauigkeit im Zeitverlauf',
        ],
        process: [
          { step: 'Wissens-Audit', body: 'Welche Quellen, wie groß, wie sensibel, wie oft ändern sie sich.' },
          { step: 'Prototyp', body: 'End-to-End-RAG auf einem eingegrenzten Korpus, evaluiert an realen Fragen.' },
          { step: 'Produktivierung', body: 'Zugriffskontrolle, Monitoring, Kosten, Retraining-Kadenz.' },
          { step: 'Kontinuierliche Evaluation', body: 'Wöchentliche Bewertung auf wachsendem Fragenset Precision, Recall, Halluzinationsrate.' },
        ],
      },
    },
  },
  {
    id: 'ai-agents-automation',
    line: 'development',
    primaryKeyword: { en: 'AI automation', de: 'KI Automatisierung' },
    copy: {
      en: {
        title: 'AI Agents & Automation',
        h1: 'AI agents that finish real work not demos.',
        slug: 'ai-agents-automation',
        metaTitle: 'AI Agents & Workflow Automation | Deploris',
        metaDescription:
          'AI agents and workflow automation that finish real work end-to-end with human-in-the-loop, audit trails, and measurable time savings.',
        summary:
          'AI agents and workflow automation that finish real work end-to-end, with human-in-the-loop, audit trails, and measurable time savings.',
        whatItIs:
          'Task-specific AI agents plus deterministic automation orchestrated together with tool access, retries, human review points, and full logging so a real business process runs from start to finish without a person babysitting each step.',
        whoItsFor:
          'Ops, revenue, and support teams drowning in repetitive multi-step work that a well-scoped agent can take off their plate.',
        outcomes: [
          'A named process runs unattended within SLA',
          'Every step logged and reviewable',
          'Human review at the risky moments not everywhere',
          'Measured hours saved and error rate reduction',
        ],
        process: [
          { step: 'Process discovery', body: 'Map the current process, count minutes and failure modes.' },
          { step: 'Design + guardrails', body: 'Agent scope, tool access, human-in-the-loop points, kill switch.' },
          { step: 'Build + shadow', body: 'Agent runs alongside the human for two weeks to calibrate.' },
          { step: 'Cut over + measure', body: 'Take the human out of the loop where safe, keep measuring.' },
        ],
      },
      de: {
        title: 'KI-Agenten & Automatisierung',
        h1: 'KI-Agenten, die echte Arbeit abschließen keine Demos.',
        slug: 'ki-automatisierung',
        metaTitle: 'KI Automatisierung & KI Agenten | Deploris',
        metaDescription:
          'KI-Agenten und Workflow-Automatisierung, die echte Arbeit end-to-end erledigen mit Human-in-the-Loop, Audit-Trails und messbaren Zeitersparnissen.',
        summary:
          'KI-Agenten und Workflow-Automatisierung, die echte Arbeit end-to-end erledigen mit Human-in-the-Loop, Audit-Trails und messbaren Ersparnissen.',
        whatItIs:
          'Aufgabenspezifische KI-Agenten und deterministische Automatisierung orchestriert mit Tool-Zugriff, Retries, Freigabepunkten und vollem Logging damit ein realer Geschäftsprozess von A bis Z läuft, ohne dass jemand jeden Schritt begleitet.',
        whoItsFor:
          'Ops-, Revenue- und Support-Teams, die in wiederholender, mehrstufiger Arbeit ertrinken, die ein sauber definierter Agent übernehmen kann.',
        outcomes: [
          'Ein benannter Prozess läuft unbeaufsichtigt innerhalb der SLA',
          'Jeder Schritt geloggt und prüfbar',
          'Menschliche Freigabe an kritischen Punkten nicht überall',
          'Gemessene Zeitersparnis und Fehlerreduktion',
        ],
        process: [
          { step: 'Prozess-Erhebung', body: 'Ist-Prozess mappen, Minuten und Fehlerbilder zählen.' },
          { step: 'Design + Guardrails', body: 'Agent-Scope, Tool-Zugriff, Freigabepunkte, Notaus.' },
          { step: 'Build + Shadow', body: 'Agent läuft zwei Wochen parallel zum Menschen zur Kalibrierung.' },
          { step: 'Übergabe + Messung', body: 'Menschen dort herausnehmen, wo sicher weiter messen.' },
        ],
      },
    },
  },
  {
    id: 'custom-systems',
    line: 'development',
    primaryKeyword: { en: 'custom software development', de: 'Individualsoftware Entwicklung' },
    copy: {
      en: {
        title: 'Custom Systems & Integrations',
        h1: 'Custom software and integrations, engineered to last.',
        slug: 'custom-systems',
        metaTitle: 'Custom Software Development & Integrations | Deploris',
        metaDescription:
          'Custom software, APIs, and integrations production-grade, security-reviewed, and documented for your team to operate long after we ship.',
        summary:
          'Custom software, APIs, and integrations production-grade, security-reviewed, and documented for your team to operate.',
        whatItIs:
          'Bespoke systems built to a written scope internal tools, integrations, APIs, portals, and platforms engineered with a security-first mindset and handed over with real documentation and tests.',
        whoItsFor:
          'Businesses that have hit the limits of no-code, off-the-shelf, or agency-built prototypes and need a system that will still be maintainable in three years.',
        outcomes: [
          'Working software that passes production security review',
          'Handover with tests, docs, and a runbook no vendor lock-in',
          'Clear license and IP position for your business',
          'Optional ongoing support with published SLA',
        ],
        process: [
          { step: 'Scope', body: 'Written scope with acceptance criteria and price band.' },
          { step: 'Design', body: 'Architecture, data model, security review sign-off.' },
          { step: 'Build', body: 'Two-week sprints with a live demo each end.' },
          { step: 'Handover', body: 'Docs, tests, runbook, optional support agreement.' },
        ],
      },
      de: {
        title: 'Individualsoftware & Integrationen',
        h1: 'Individualsoftware und Integrationen gebaut, um zu halten.',
        slug: 'individualsoftware',
        metaTitle: 'Individualsoftware Entwicklung & Integrationen | Deploris',
        metaDescription:
          'Individualsoftware, APIs und Integrationen produktionsreif, sicherheitsgeprüft und dokumentiert, damit Ihr Team langfristig damit arbeiten kann.',
        summary:
          'Individualsoftware, APIs und Integrationen produktionsreif, sicherheitsgeprüft und dokumentiert.',
        whatItIs:
          'Maßgeschneiderte Systeme nach schriftlichem Scope interne Tools, Integrationen, APIs, Portale und Plattformen security-first entwickelt und mit echter Dokumentation und Tests übergeben.',
        whoItsFor:
          'Unternehmen, die an die Grenzen von No-Code, Standardsoftware oder Agentur-Prototypen gestoßen sind und ein System benötigen, das auch in drei Jahren noch wartbar ist.',
        outcomes: [
          'Software, die eine produktive Sicherheitsprüfung besteht',
          'Übergabe mit Tests, Docs und Runbook kein Vendor-Lock-in',
          'Klare Lizenz- und IP-Position für Ihr Unternehmen',
          'Optionaler laufender Support mit veröffentlichter SLA',
        ],
        process: [
          { step: 'Scope', body: 'Schriftlicher Scope mit Abnahmekriterien und Preisspanne.' },
          { step: 'Design', body: 'Architektur, Datenmodell, Sicherheits-Review.' },
          { step: 'Umsetzung', body: 'Zweiwöchige Sprints mit Live-Demo am Ende.' },
          { step: 'Übergabe', body: 'Docs, Tests, Runbook, optionaler Support-Vertrag.' },
        ],
      },
    },
  },
];

export const allServices: Service[] = [...hardwareServices, ...developmentServices];

export function findService(id: string): Service | undefined {
  return allServices.find((s) => s.id === id);
}

export function findServiceBySlug(locale: Locale, slug: string): Service | undefined {
  return allServices.find((s) => s.copy[locale].slug === slug);
}
