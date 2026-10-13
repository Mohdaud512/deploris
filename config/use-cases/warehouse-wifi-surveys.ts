import type { UseCase } from './types';

/**
 * Use case: Warehouse, 3PL, retail, and manufacturing WiFi surveys for
 * barcode scanners, voice-pick headsets, forklift terminals, and VoIP.
 * Underlying service: wifi-surveys (config/services.ts).
 * Primary search intent: "warehouse WiFi survey for barcode scanners",
 *   "WLAN-Ausleuchtung Lager Pick-by-Voice", "Zebra scanner WiFi coverage".
 */
export const warehouseWifiSurveys: UseCase = {
  id: 'warehouse-wifi-surveys',
  serviceId: 'wifi-surveys',
  primaryKeyword: {
    en: 'warehouse WiFi surveys for barcode scanners and voice-pick',
    de: 'WLAN-Ausleuchtung Lager für Barcode-Scanner und Pick-by-Voice',
  },
  secondaryKeywords: {
    en: [
      'warehouse WiFi coverage',
      'barcode scanner WiFi survey',
      'voice-pick WLAN survey',
      'Zebra scanner coverage',
      'forklift terminal WiFi',
      '3PL distribution center WiFi',
      'Ekahau predictive survey',
      'Wi-Fi 6E warehouse',
    ],
    de: [
      'WLAN Lager Ausleuchtung',
      'Pick-by-Voice WLAN',
      'Barcode-Scanner WLAN',
      'Zebra-Scanner Abdeckung',
      'Staplerterminal WLAN',
      '3PL Logistikzentrum WLAN',
      'Ekahau Prädiktive Ausleuchtung',
      'Wi-Fi 6E Lager',
    ],
  },
  lastReviewed: '2026-10-11',
  copy: {
    en: {
      slug: 'warehouse-wifi-surveys',
      metaTitle: 'Warehouse WiFi Surveys for Scanners and Voice-Pick',
      metaDescription:
        'Predictive and on-site WiFi surveys for warehouses, 3PL distribution centers, retail stores, and manufacturing floors, tuned to the real device mix (Zebra, Honeywell, Vocollect) and operated under one Deploris SLA.',
      eyebrow: 'Use case · Warehouse & logistics',
      h1: 'Warehouse WiFi surveys for barcode scanners and voice-pick.',
      deck: 'Predictive, passive, and active surveys shaped around the real device mix on your floor (Zebra and Honeywell handhelds, Vocollect headsets, forklift terminals, VoIP phones), not around a vendor datasheet. Deploris plans it, measures it, remediates it, and operates it under one written SLA.',
      tldr: 'A warehouse WiFi survey for barcode scanners and voice-pick is an end-to-end radio-plan exercise, combining predictive modelling, on-site passive and active measurement under real picking load, remediation design, and post-cutover validation, that guarantees reliable 2.4, 5, and 6 GHz coverage for the exact handhelds, headsets, forklift terminals, and VoIP phones running on the floor.',
      atAGlance: [
        { label: 'Who it is for', value: 'Warehouses, 3PLs, retail, manufacturing (5,000 to 100,000 sqm)' },
        { label: 'Predictive design', value: '1 to 2 weeks' },
        { label: 'On-site survey', value: '1 to 5 days per site' },
        { label: 'Full remediation', value: '2 to 8 weeks' },
        { label: 'SLA on managed WiFi', value: '15-min P1 median, 99.9%+ uptime' },
        { label: 'Delivered by', value: 'Bilingual team, DE + EN' },
      ],
      problem: {
        title: 'Why "we just added more APs" stops working on a real warehouse floor.',
        body:
          'A warehouse radio environment is nothing like an office. Nine-metre racking filled with metal and liquid absorbs 5 GHz signal, forklift masts move the nulls around every two minutes, cold-storage condensation attacks consumer-grade APs, and the handhelds you actually use (Zebra TC53s, Honeywell CT45s, Datalogic Memor 20s, Vocollect A700s) each roam on different thresholds. The result is familiar: shift leads blame the WMS, the WMS vendor blames the network, and a well-meaning IT lead keeps bolting on more access points until the channel plan collapses and roaming gets worse, not better.',
        bullets: [
          'Scanners drop packets at the aisle ends, so pickers scan twice and SAP EWM logs the second scan as a duplicate.',
          'Voice-pick headsets lose the next instruction between aisles because 2.4 GHz is saturated with legacy devices and 5 GHz was not planned for roaming.',
          'Forklift terminals disconnect at ten-metre racking height even though the ground-level RSSI looks fine on a laptop.',
          'Cold-storage and freezer rooms were never surveyed, so APs mounted outside the door spray RF through a steel wall at six dB loss.',
          'The existing switches cannot deliver PoE+ to the AP density the vendor datasheet assumed, so half the new APs run at reduced radio power.',
        ],
      },
      howItWorks: {
        title: 'How we design, measure, and remediate warehouse WiFi.',
        intro: 'Six stages, every output documented, no "we added some APs" surprises.',
        steps: [
          {
            step: 'Predictive survey from your CAD or site plan',
            body: 'We import your floor plan, racking layout, cold-storage walls, and dock-door positions into Ekahau or Hamina, build a wall-material model that reflects what is actually on the floor, and generate predicted RSSI, SNR, data-rate, and roaming heatmaps against your actual device mix. You see a model before anyone walks the site.',
          },
          {
            step: 'On-site passive survey',
            body: 'A senior wireless engineer walks every aisle, dock door, mezzanine, cold-storage room, and office with a calibrated survey rig, measuring real RF, noise floor, co-channel interference, DFS radar hits, and existing AP coverage. We also map every rogue, every non-WiFi interferer (motor drives, microwave links, Bluetooth tag readers), and every PoE budget constraint on your current switch stack.',
          },
          {
            step: 'On-site active survey under real load',
            body: 'We run the measurement during a real picking shift with your actual handhelds and voice-pick headsets, not a laptop. That exposes the behaviour that matters: how a Zebra TC53 roams between APs with a forklift between it and the ceiling, whether a Vocollect headset holds its session through an aisle turn, and how VoIP MOS holds up when the dock doors open.',
          },
          {
            step: 'Remediation design and bill of materials',
            body: 'You get an AP placement plan with mounting detail, antenna selection (omni, patch, or directional per zone), channel and power plan across 2.4, 5, and 6 GHz with DFS strategy, a VLAN segmentation plan for scanners, voice, VoIP, and guest, and a sized bill of materials against your switch PoE budget. Vendor-neutral: Cisco, Aruba, Juniper Mist, Ruckus, Extreme, Meraki, or Ubiquiti, whichever actually fits.',
          },
          {
            step: 'Cutover and post-install validation',
            body: 'We supervise or execute the install, then run a post-install passive and active survey against the agreed SLAs: RSSI, SNR, data rate at the device, roaming time, VoIP MOS, and voice-pick session continuity. Any shortfall is remediated inside the engagement, not billed as a change order.',
          },
          {
            step: 'Managed WiFi handover under one SLA',
            body: 'If you want it operated after cutover, Deploris takes it under a written service-level agreement: 15-minute median first-response on priority-one incidents, 99.9 percent monthly uptime target, named on-call engineer, weekly patch window, 48-hour reversibility on configuration changes. One team wrote the plan, one team runs the network.',
          },
        ],
      },
      checklist: {
        title: 'What to expect from any vendor doing a warehouse survey well.',
        intro: 'If a competing vendor cannot meet all ten, you are buying a sales motion dressed as a survey.',
        items: [
          'A senior wireless engineer, not an account manager, on the first scoping call.',
          'A predictive model built from your actual floor plan and wall materials before anyone quotes a BOM.',
          'An on-site passive survey that covers every aisle, dock, cold-storage room, and mezzanine, not just the main floor.',
          'An active survey conducted during a real shift with your actual Zebra, Honeywell, Datalogic, or Vocollect devices.',
          'A written channel and power plan across 2.4, 5, and 6 GHz with an explicit DFS strategy.',
          'An AP placement plan with mounting detail and antenna selection per zone, not a uniform ceiling grid.',
          'A VLAN segmentation plan separating scanners, voice-pick, VoIP, cameras, and guest traffic.',
          'A sized bill of materials against your current switch PoE budget, flagging any switch upgrades needed.',
          'Vendor-neutral recommendations (Cisco, Aruba, Juniper Mist, Ruckus, Extreme, Meraki, or Ubiquiti), not a tied resale.',
          'A post-install validation survey against written SLAs, with any shortfall remediated inside the engagement.',
        ],
      },
      scenario: {
        title: 'What this looks like in practice.',
        body:
          'A regional 3PL running a 24,000 square-metre distribution center with 180 pickers across two shifts came to us after a six-month streak of missed cutoff times. Their internal IT lead had added fourteen access points to the original forty-two over eighteen months. The pattern was textbook: scanners timed out at the ends of long aisles, voice-pick headsets lost the next instruction on aisle turns, and forklift terminals disconnected whenever a stacker passed between the device and the ceiling. The WMS team (running Manhattan Active) kept getting duplicate-scan tickets; the network team kept adding APs. We ran a predictive model from their CAD plan, walked the site with an Ekahau rig during a Tuesday peak shift with their actual Zebra TC53 handhelds and Vocollect A700 headsets, and found three root causes: a saturated 2.4 GHz band from legacy label printers, a channel plan that had never been reviewed after the last expansion, and sixteen access points mounted above the racks instead of in the aisle centres, so the signal was fighting metal all the way down. The remediation plan removed eleven APs, moved twenty-two, and added patch antennas in six long aisles and two cold-storage rooms. The post-install survey met every SLA: median roam time under 50 ms, VoIP MOS above 4.2, zero voice-pick session drops over a four-hour validation shift. The firm is now on a Deploris managed WiFi contract under the same SLA that applies to the rest of their estate. The name is withheld because the engagement is active and the operations team prefers it that way.',
      },
      pricingPosture: {
        title: 'What this costs is a scope question, not a per-AP question.',
        body:
          'Deploris does not sell access points. We scope every engagement in writing: the size and shape of the site, the device mix, the cold-storage and mezzanine zones, the switch PoE budget, the SLA you need after cutover, and the hosting posture for any controller or cloud management plane. You get a defensible price band, a timeline, and the specific deliverables (predictive model, survey report, remediation design, BOM, post-install validation) within one business day of the second scoping session. Nothing is quoted on the phone, nothing is held back for a "second call", and no number appears on a page before we understand the physical site.',
      },
      comparison: {
        title: 'Why Deploris, not the alternatives.',
        intro:
          'Four paths lead to warehouse WiFi that actually holds up: keep adding APs, hire a local cable installer, take the free survey from your AP vendor, or hire an independent surveyor that also operates the network. Deploris is the fourth path and the only one of the four that both designs the radio plan and runs the network under one written contract.',
        rows: [
          {
            contender: 'Do nothing and keep adding access points',
            wins: 'Cheapest hardware spend in the short term; no survey fees; no vendor relationship to manage.',
            gaps: 'Channel plan collapses as density rises; roaming gets worse, not better; co-channel interference eats throughput; the WMS team still blames the network and nobody can prove otherwise.',
          },
          {
            contender: 'Hire a local cable installer or electrician',
            wins: 'Available locally; low day rate; handles mounting and cabling cleanly.',
            gaps: 'No calibrated survey rig, no device-mix testing, no roaming or VoIP measurement; AP placement follows ceiling grid, not RF physics; vendor BOM copied from a datasheet rather than sized to real load.',
          },
          {
            contender: 'Accept the free survey from an AP vendor (Cisco, Aruba, Ruckus, Extreme)',
            wins: 'No upfront survey cost; the quote comes with brand familiarity; procurement likes a known logo.',
            gaps: 'The survey is a sales tool, not an independent assessment; the BOM is tied to that vendor regardless of fit; no post-install validation obligation; the surveyor walks away at order sign-off and operations becomes someone else is problem.',
          },
          {
            contender: 'Deploris, independent survey + managed WiFi under one SLA',
            wins: 'Vendor-neutral BOM across Cisco, Aruba, Juniper Mist, Ruckus, Extreme, Meraki, and Ubiquiti; post-install validation obligation written into the engagement; optional managed WiFi handover under a 15-minute P1 median SLA; one invoice, one accountable team, bilingual DE + EN.',
            gaps: 'Not the cheapest line item on day one; every engagement is scoped in writing and starts at mid-market scale (5,000 square metres and up for a full survey).',
          },
        ],
      },
      faq: [
        {
          q: 'Which band should barcode scanners run on: 2.4, 5, or 6 GHz?',
          a: 'For mid-market warehouses in 2026 the answer is almost always 5 GHz as the primary with 6 GHz for new Wi-Fi 6E or Wi-Fi 7 handhelds, keeping 2.4 GHz only for legacy label printers and IoT. 2.4 GHz is too saturated and too prone to microwave and motor interference to carry picking traffic. The right split depends on your actual device roster: a fleet of older Zebra MC9300s may still need a 2.4 GHz plan, while a new Zebra TC53 or Honeywell CT45 fleet runs happily on 5 and 6 GHz.',
        },
        {
          q: 'Do DFS channels help or hurt in a warehouse?',
          a: 'They help capacity but hurt reliability if used naively. DFS channels (52 to 144 in most regions) unlock more non-overlapping 5 GHz capacity, but a radar hit forces an immediate channel change that can drop a voice-pick session. The right design uses DFS channels on fixed-location APs away from airports and weather radar, and keeps non-DFS channels on the APs covering voice-pick and VoIP zones. Every DFS decision in the survey is explicit, not left to the controller is auto algorithm.',
        },
        {
          q: 'How does racking density change AP placement?',
          a: 'Dramatically. Nine-metre racking filled with metal, cardboard, and liquid attenuates 5 GHz by 10 to 25 dB per rack, so an AP mounted above the racks sprays most of its energy sideways and almost nothing reaches the aisle floor. The right pattern in dense racking is aisle-centre mounting with downtilt or patch antennas pointed along the aisle, not a uniform ceiling grid. We model attenuation from your CAD and validate it on site, aisle by aisle.',
        },
        {
          q: 'What about cold storage and freezer rooms?',
          a: 'Cold-storage condensation kills consumer-grade APs in weeks and most mid-range enterprise APs within a year. The right AP for a freezer room has an operating range down to minus 30 Celsius, an IP-rated enclosure, and often a cable gland rather than a sealed-port variant. We also budget for condensation drip loops and placement that avoids the thermal shock of a defrost cycle. If the current AP in your freezer is the same model as the one in your office, it will fail.',
        },
        {
          q: 'What about PoE budget on our existing switches?',
          a: 'A Wi-Fi 6E or Wi-Fi 7 AP typically draws 25 to 35 W under full load, so a 48-port switch with a 740 W PoE budget cannot run forty-eight APs plus phones. The BOM we deliver flags every switch where the PoE budget is tight after the survey and includes the upgrade cost, if any, in the written estimate. We do not ship a design that assumes the switch will magically find more watts.',
        },
        {
          q: 'How do we get smooth roaming for voice-pick between aisles?',
          a: 'Voice-pick needs sub-50 ms roam time with no audio gap, which only comes from a correctly configured 802.11k, v, and r stack combined with cell overlap in the 15 to 20 percent range at minimum data rate. We tune minimum data rates to force client stickiness breakage, enable 802.11k and v so the AP tells the client where to go next, and 802.11r for fast transition where the devices support it. Vocollect A700 and A730 headsets, Zebra WT6300 wrist terminals, and Honeywell CT45 handhelds all behave differently; the design accounts for the slowest-roaming device on your floor.',
        },
        {
          q: 'Is Wi-Fi 6E or Wi-Fi 7 worth the refresh now?',
          a: 'For a greenfield warehouse, yes. For a brownfield site, it depends on how much of your handheld fleet actually supports 6 GHz. A survey that recommends Wi-Fi 7 without inventorying your scanner fleet is marketing, not engineering. We inventory every device SKU, map the ones that support 6 GHz, and only recommend the refresh when the fleet justifies it or the next three-year roadmap does.',
        },
        {
          q: 'Ekahau, iBwave, or Hamina: which tool do you use?',
          a: 'All three, depending on the site. Ekahau is our default for mid-size warehouses because the predictive engine and the active-survey rig are the most mature. iBwave shines on multi-floor manufacturing with heavy mezzanines and in-building DAS alongside WiFi. Hamina is strong when the design has to iterate quickly with multiple vendor options. The deliverable is the same regardless: calibrated model, documented wall materials, and a report your next vendor can read.',
        },
        {
          q: 'Which handhelds and headsets do you test against?',
          a: 'Zebra TC53, TC58, TC73, MC9400, WT6300, and the legacy MC9300 line; Honeywell CT45, CT47, CT60, and CK65; Datalogic Memor 20 and Skorpio X5; Vocollect A700 and A730 voice-pick headsets. We also test against Cisco 8821 and Spectralink VoIP handsets where in scope. If you run a device we have not touched before, we buy or borrow one for the survey; nothing goes into the report without a real device measurement.',
        },
        {
          q: 'How do we fix the nulls that forklift masts create?',
          a: 'Metal masts moving through the warehouse create temporary nulls at ten-metre height, exactly where the forklift terminal sits. The fix is a combination of cell density (so the terminal always has a second viable AP), antenna selection (patch antennas pointed down the aisle rather than omni from the ceiling), and in some sites a dedicated 5 GHz SSID for forklifts with a slightly higher minimum data rate so the terminal roams off a dying cell faster. We model this in the predictive phase and validate it on site with the forklift actually moving.',
        },
        {
          q: 'Should scanners live on the same VLAN as everything else?',
          a: 'No. The design we deliver puts scanners, voice-pick, VoIP, cameras, badge readers, and guest traffic on separate VLANs with specific QoS tagging, and the switch and firewall configuration is part of the deliverable. Mixing scanners and guest WiFi on one VLAN is how a single malware incident takes picking offline, and it is also how DHCP exhaustion crashes a shift. The segmentation is not optional in our designs.',
        },
        {
          q: 'What is actually in the survey report, and how long does the on-site survey take?',
          a: 'The report contains the predictive heatmaps (RSSI, SNR, data rate, roaming), the measured passive and active heatmaps, interference and rogue inventory, PoE budget assessment, AP placement plan with mounting detail, channel and power plan, VLAN and QoS plan, vendor-neutral BOM, and a validation protocol for post-install sign-off. On-site survey time is typically one day for sites up to 10,000 square metres, two to three days for 10,000 to 40,000 square metres, and four to five days for 40,000 to 100,000 square metres, including cold-storage, mezzanine, and yard where applicable.',
        },
      ],
      related: {
        title: 'Related reading',
        items: [
          {
            label: 'WiFi Surveys service',
            href: '/services/hardware/wifi-surveys',
            blurb: 'Underlying capability page: predictive and on-site survey process, deliverables, device coverage, and SLA.',
          },
          {
            label: 'Network Support',
            href: '/services/hardware/network-support',
            blurb: 'Managed network layer: routers, switches, firewalls, WiFi controllers, SD-WAN under one written SLA.',
          },
          {
            label: 'Infrastructure Support',
            href: '/services/hardware/infrastructure-support',
            blurb: '24/7 infrastructure operations with 15-minute P1 median response, 99.9%+ uptime, full audit trail.',
          },
          {
            label: 'Industries we serve',
            href: '/industries',
            blurb: 'How Deploris delivers for logistics, retail, manufacturing, and other mid-market sectors in the US and DACH.',
          },
          {
            label: 'Blog: Wi-Fi 6E vs Wi-Fi 7 for warehouses in 2026',
            href: '/blog/wifi-6e-vs-wifi-7-warehouse-2026',
            blurb: 'Honest buy-now comparison for warehouse refresh decisions: where Wi-Fi 7 justifies the premium, where 6E still wins.',
          },
          {
            label: 'Blog: Zebra and Honeywell scanner roaming, 802.11k/v/r setup',
            href: '/blog/zebra-honeywell-scanner-roaming-802-11-kvr',
            blurb: 'Deep-tech practitioner guide to fixing scanner roaming problems on mixed Zebra, Honeywell, and voice-pick fleets.',
          },
        ],
      },
      cta: {
        primary: 'Book a scoping call',
        secondary: 'See a sample survey report',
      },
    },
    de: {
      slug: 'lager-wlan-ausleuchtung',
      metaTitle: 'WLAN-Ausleuchtung Lager für Scanner & Pick-by-Voice',
      metaDescription:
        'Prädiktive und Vor-Ort-WLAN-Ausleuchtung für Lager, 3PL-Logistikzentren, Handel und Fertigung, abgestimmt auf den realen Gerätemix (Zebra, Honeywell, Vocollect) und unter einer Deploris-SLA betrieben.',
      eyebrow: 'Anwendungsfall · Lager & Logistik',
      h1: 'WLAN-Ausleuchtung Lager für Barcode-Scanner und Pick-by-Voice.',
      deck: 'Prädiktive, passive und aktive Ausleuchtung, geschnitten auf den realen Gerätemix in Ihrem Lager (Zebra- und Honeywell-Handhelds, Vocollect-Headsets, Staplerterminals, VoIP-Telefone), nicht auf ein Hersteller-Datenblatt. Deploris plant, misst, saniert und betreibt alles unter einer schriftlichen SLA.',
      tldr: 'Eine WLAN-Ausleuchtung Lager für Barcode-Scanner und Pick-by-Voice ist eine durchgängige Funkplanung, die prädiktive Modellierung, passive und aktive Vor-Ort-Messung unter realer Picking-Last, Sanierungsdesign und Nachvalidierung kombiniert, damit 2,4-, 5- und 6-GHz-Abdeckung für die konkret eingesetzten Handhelds, Headsets, Staplerterminals und VoIP-Telefone verlässlich funktioniert.',
      atAGlance: [
        { label: 'Für wen', value: 'Lager, 3PL, Handel, Fertigung (5.000 bis 100.000 qm)' },
        { label: 'Prädiktives Design', value: '1 bis 2 Wochen' },
        { label: 'Vor-Ort-Vermessung', value: '1 bis 5 Tage pro Standort' },
        { label: 'Volle Sanierung', value: '2 bis 8 Wochen' },
        { label: 'SLA Managed WiFi', value: '15 Min P1-Median, 99,9 %+ Verfügbarkeit' },
        { label: 'Geliefert von', value: 'Zweisprachig DE + EN' },
      ],
      problem: {
        title: 'Warum "wir haben einfach mehr APs eingebaut" im echten Lager scheitert.',
        body:
          'Ein Lager ist funktechnisch keine Büroetage. Neun Meter hohe Regale voller Metall und Flüssigkeit schlucken 5 GHz, Staplermasten verschieben Nullstellen im Zwei-Minuten-Takt, Kondensation in Kühlbereichen zerstört Consumer-APs, und die Handhelds, die Sie tatsächlich nutzen (Zebra TC53, Honeywell CT45, Datalogic Memor 20, Vocollect A700), roamen jeweils nach unterschiedlichen Schwellwerten. Das Ergebnis ist bekannt: Die Schichtleitung macht das WMS verantwortlich, der WMS-Anbieter das Netz, und eine engagierte IT schraubt immer weitere Access-Points nach, bis der Kanalplan kippt und das Roaming schlechter statt besser wird.',
        bullets: [
          'Scanner verlieren Pakete an den Gangenden, Picker scannen zweimal, SAP EWM protokolliert den zweiten Scan als Dublette.',
          'Pick-by-Voice-Headsets verlieren die nächste Anweisung beim Gangwechsel, weil 2,4 GHz mit Alt-Geräten übersättigt ist und 5 GHz nie fürs Roaming geplant wurde.',
          'Staplerterminals brechen auf zehn Meter Regalhöhe weg, obwohl der RSSI am Boden auf dem Laptop gut aussieht.',
          'Tiefkühl- und Kühlräume wurden nie ausgeleuchtet, APs sitzen vor der Tür und strahlen durch eine Stahlwand mit sechs dB Verlust.',
          'Die vorhandenen Switches liefern nicht den PoE-Haushalt, den das Hersteller-Datenblatt vorausgesetzt hat, die Hälfte der neuen APs läuft mit reduzierter Sendeleistung.',
        ],
      },
      howItWorks: {
        title: 'Wie wir Lager-WLAN planen, messen und sanieren.',
        intro: 'Sechs Phasen, jedes Ergebnis dokumentiert, keine "wir haben noch APs ergänzt"-Überraschungen.',
        steps: [
          {
            step: 'Prädiktive Ausleuchtung aus Ihrem CAD oder Grundriss',
            body: 'Wir importieren Grundriss, Regallayout, Kühlwände und Tortaschen in Ekahau oder Hamina, bauen ein Wandmaterial-Modell, das die reale Situation abbildet, und erzeugen prädiktive Heatmaps für RSSI, SNR, Datenrate und Roaming gegen Ihren tatsächlichen Gerätemix. Sie sehen ein Modell, bevor jemand den Standort betritt.',
          },
          {
            step: 'Passive Vor-Ort-Vermessung',
            body: 'Ein Senior-Wireless-Ingenieur begeht jeden Gang, jedes Dock, jede Mezzanine, jeden Kühlraum und jedes Büro mit einem kalibrierten Mess-Rig und erfasst reale HF, Noise-Floor, Co-Channel-Interferenz, DFS-Radartreffer und bestehende AP-Abdeckung. Wir inventarisieren jeden Rogue, jeden Nicht-WLAN-Störer (Motorumrichter, Richtfunk, Bluetooth-Tag-Reader) und jedes PoE-Limit Ihres aktuellen Switch-Stacks.',
          },
          {
            step: 'Aktive Vermessung unter realer Last',
            body: 'Wir messen während einer realen Picking-Schicht mit Ihren tatsächlichen Handhelds und Pick-by-Voice-Headsets, nicht mit einem Laptop. So zeigt sich das Verhalten, das zählt: wie ein Zebra TC53 zwischen APs roamt, wenn ein Stapler dazwischen steht, ob ein Vocollect-Headset die Session über eine Gangwende hält und wie VoIP-MOS reagiert, wenn die Tore aufgehen.',
          },
          {
            step: 'Sanierungsdesign und Stückliste',
            body: 'Sie erhalten einen AP-Platzierungsplan mit Montagedetail, Antennenauswahl (Omni, Patch oder gerichtet je Zone), Kanal- und Leistungsplan über 2,4, 5 und 6 GHz inklusive DFS-Strategie, einen VLAN-Segmentierungsplan für Scanner, Voice, VoIP und Gast sowie eine Stückliste, bemessen am PoE-Haushalt Ihrer Switches. Herstellerneutral: Cisco, Aruba, Juniper Mist, Ruckus, Extreme, Meraki oder Ubiquiti, je nachdem, was wirklich passt.',
          },
          {
            step: 'Cutover und Nachvalidierung',
            body: 'Wir überwachen oder führen die Installation durch und messen anschließend passiv und aktiv gegen die vereinbarten SLAs: RSSI, SNR, Datenrate am Gerät, Roam-Zeit, VoIP-MOS und Pick-by-Voice-Session-Kontinuität. Jede Lücke wird im Mandat behoben, nicht als Change-Request abgerechnet.',
          },
          {
            step: 'Managed-WiFi-Übernahme unter einer SLA',
            body: 'Wenn Sie es betreiben lassen möchten, übernimmt Deploris nach Cutover unter schriftlicher SLA: 15 Minuten Erstreaktion im Median bei Priorität 1, Ziel 99,9 Prozent monatliche Verfügbarkeit, benannter On-Call-Ingenieur, wöchentliches Patch-Fenster, 48 Stunden Rückrollbarkeit auf Konfigurationsänderungen. Ein Team hat geplant, ein Team betreibt.',
          },
        ],
      },
      checklist: {
        title: 'Was Sie von jedem seriösen Lager-Vermesser erwarten sollten.',
        intro: 'Wenn ein konkurrierender Anbieter nicht alle zehn Punkte liefern kann, kaufen Sie eine Vertriebsgeste, keine Ausleuchtung.',
        items: [
          'Ein Senior-Wireless-Ingenieur, kein Account-Manager, im ersten Scoping-Termin.',
          'Ein prädiktives Modell aus Ihrem konkreten Grundriss und Ihren Wandmaterialien, bevor eine Stückliste quotiert wird.',
          'Eine passive Vor-Ort-Vermessung über jeden Gang, jedes Dock, jeden Kühlraum und jede Mezzanine, nicht nur die Hauptfläche.',
          'Eine aktive Messung während einer realen Schicht mit Ihren tatsächlichen Zebra-, Honeywell-, Datalogic- oder Vocollect-Geräten.',
          'Ein schriftlicher Kanal- und Leistungsplan über 2,4, 5 und 6 GHz mit expliziter DFS-Strategie.',
          'Ein AP-Platzierungsplan mit Montagedetail und Antennenauswahl pro Zone, kein uniformes Deckenraster.',
          'Ein VLAN-Segmentierungsplan für Scanner, Pick-by-Voice, VoIP, Kameras und Gäste.',
          'Eine Stückliste, bemessen am aktuellen Switch-PoE-Haushalt, mit markierten Switch-Upgrades, falls nötig.',
          'Herstellerneutrale Empfehlungen (Cisco, Aruba, Juniper Mist, Ruckus, Extreme, Meraki, Ubiquiti), kein gebundener Weiterverkauf.',
          'Eine Nachvalidierungs-Messung gegen schriftliche SLAs, mit Behebung jeder Lücke im Mandat.',
        ],
      },
      scenario: {
        title: 'Wie das in der Praxis aussieht.',
        body:
          'Ein regionaler 3PL mit einem 24.000 Quadratmeter großen Verteilzentrum und 180 Pickern in zwei Schichten kam nach sechs Monaten verpasster Cutoff-Zeiten zu uns. Die interne IT hatte in achtzehn Monaten vierzehn Access-Points zu den ursprünglichen zweiundvierzig hinzugefügt. Das Muster war ein Lehrbuchfall: Scanner liefen an den Enden langer Gänge in Timeout, Pick-by-Voice-Headsets verloren an Gangwenden die nächste Anweisung, und Staplerterminals verloren die Verbindung, sobald ein zweiter Stapler zwischen Gerät und Decke stand. Das WMS-Team (Manhattan Active) bekam fortlaufend Tickets zu Dubletten-Scans; das Netz-Team ergänzte weiter APs. Wir modellierten den Standort prädiktiv aus dem CAD, begingen ihn mit einem Ekahau-Rig während einer Dienstag-Peak-Schicht und mit den tatsächlichen Zebra-TC53-Handhelds und Vocollect-A700-Headsets und fanden drei Ursachen: ein übersättigtes 2,4-GHz-Band durch Alt-Etikettendrucker, einen Kanalplan, der nach der letzten Erweiterung nie überprüft worden war, und sechzehn Access-Points über den Regalen statt in den Gangzentren, sodass das Signal den gesamten Weg nach unten gegen Metall kämpfte. Der Sanierungsplan baute elf APs aus, verschob zweiundzwanzig und ergänzte Patch-Antennen in sechs langen Gängen und zwei Kühlräumen. Die Nachvalidierung erfüllte jede SLA: mediane Roam-Zeit unter 50 ms, VoIP-MOS über 4,2, kein einziger Pick-by-Voice-Session-Abbruch in einer vierstündigen Validierungsschicht. Das Unternehmen ist jetzt in einem Deploris-Managed-WiFi-Vertrag unter derselben SLA, die für den Rest der Infrastruktur gilt. Den Namen veröffentlichen wir nicht, weil das Mandat aktiv ist und das Operations-Team das so bevorzugt.',
      },
      pricingPosture: {
        title: 'Was es kostet, ist eine Scope-Frage, keine Pro-AP-Frage.',
        body:
          'Deploris verkauft keine Access-Points. Wir scopen jedes Mandat schriftlich: Größe und Zuschnitt des Standorts, Gerätemix, Kühl- und Mezzanine-Zonen, PoE-Haushalt der Switches, benötigte SLA nach Cutover und Hosting-Posture für Controller oder Cloud-Management. Innerhalb eines Werktags nach dem zweiten Scoping-Termin erhalten Sie eine belastbare Preisspanne, einen Zeitplan und konkrete Lieferergebnisse (prädiktives Modell, Messbericht, Sanierungsdesign, Stückliste, Nachvalidierung). Nichts wird am Telefon zugesagt, nichts für einen "zweiten Termin" zurückgehalten, und auf keiner Seite steht eine Zahl, bevor wir den Standort physisch verstanden haben.',
      },
      comparison: {
        title: 'Warum Deploris, nicht die Alternativen.',
        intro:
          'Vier Wege führen zu Lager-WLAN, das wirklich hält: weitere APs einbauen, einen lokalen Kabel-Installateur beauftragen, die "kostenlose" Ausleuchtung vom AP-Hersteller nehmen oder einen unabhängigen Vermesser, der das Netz auch betreibt. Deploris ist der vierte Weg und der einzige, der die Funkplanung macht und das Netz unter einem schriftlichen Vertrag betreibt.',
        rows: [
          {
            contender: 'Nichts tun und weiter Access-Points nachrüsten',
            wins: 'Kurzfristig günstigste Hardware-Ausgabe, keine Vermessungsgebühren, keine Lieferantenbeziehung.',
            gaps: 'Kanalplan kippt mit steigender Dichte, Roaming wird schlechter, Co-Channel-Interferenz frisst Durchsatz, das WMS-Team macht weiter das Netz verantwortlich und niemand kann das Gegenteil belegen.',
          },
          {
            contender: 'Lokalen Kabel-Installateur oder Elektrobetrieb beauftragen',
            wins: 'Vor Ort verfügbar, niedriger Tagessatz, saubere Montage und Verkabelung.',
            gaps: 'Kein kalibriertes Mess-Rig, keine Tests mit realem Gerätemix, keine Roam- oder VoIP-Messung; AP-Platzierung folgt dem Deckenraster, nicht der HF-Physik; Hersteller-BOM vom Datenblatt kopiert, nicht auf reale Last ausgelegt.',
          },
          {
            contender: 'Kostenlose Ausleuchtung vom AP-Hersteller (Cisco, Aruba, Ruckus, Extreme)',
            wins: 'Keine Vorab-Vermessungskosten, bekanntes Logo für den Einkauf, Angebot mit vertrauter Marke.',
            gaps: 'Die Ausleuchtung ist Vertriebswerkzeug, keine unabhängige Beurteilung; die BOM ist an den Hersteller gebunden, unabhängig von der Eignung; keine Verpflichtung zur Nachvalidierung; der Vermesser verschwindet nach Auftragsunterschrift, der Betrieb wird jemand anderes Problem.',
          },
          {
            contender: 'Deploris, unabhängige Ausleuchtung + Managed WiFi unter einer SLA',
            wins: 'Herstellerneutrale Stückliste über Cisco, Aruba, Juniper Mist, Ruckus, Extreme, Meraki und Ubiquiti; Nachvalidierung vertraglich zugesichert; optionale Managed-WiFi-Übernahme unter 15-Minuten-P1-Median-SLA; eine Rechnung, ein verantwortliches Team, zweisprachig DE + EN.',
            gaps: 'Nicht die billigste Position am Tag eins; jedes Mandat wird schriftlich scoped und startet im Mittelstand-Segment (ab 5.000 Quadratmeter für eine volle Ausleuchtung).',
          },
        ],
      },
      faq: [
        {
          q: 'Auf welchem Band sollen Barcode-Scanner laufen: 2,4, 5 oder 6 GHz?',
          a: 'Für Mittelstands-Lager im Jahr 2026 lautet die Antwort fast immer: 5 GHz als Primärband, 6 GHz für neue Wi-Fi-6E- oder Wi-Fi-7-Handhelds, 2,4 GHz nur noch für alte Etikettendrucker und IoT. 2,4 GHz ist zu übersättigt und zu anfällig für Mikrowellen- und Motorstörungen, um Picking-Traffic zu tragen. Die richtige Aufteilung hängt vom konkreten Gerätebestand ab: Eine Flotte älterer Zebra MC9300 braucht womöglich weiterhin eine 2,4-GHz-Planung, eine neue Zebra-TC53- oder Honeywell-CT45-Flotte läuft komfortabel auf 5 und 6 GHz.',
        },
        {
          q: 'Helfen oder schaden DFS-Kanäle im Lager?',
          a: 'Sie helfen bei Kapazität, schaden bei Zuverlässigkeit, wenn man sie naiv nutzt. DFS-Kanäle (52 bis 144 in den meisten Regionen) öffnen zusätzliche nicht überlappende 5-GHz-Kapazität, aber ein Radartreffer zwingt zum sofortigen Kanalwechsel, der eine Pick-by-Voice-Session abreißen kann. Das richtige Design nutzt DFS-Kanäle auf fest platzierten APs weit entfernt von Flughäfen und Wetterradar und lässt Nicht-DFS-Kanäle für die APs über Voice- und VoIP-Zonen. Jede DFS-Entscheidung ist in der Ausleuchtung explizit, nicht dem Auto-Algorithmus überlassen.',
        },
        {
          q: 'Wie verändert hohe Regaldichte die AP-Platzierung?',
          a: 'Deutlich. Neun Meter hohe Regale voller Metall, Karton und Flüssigkeit dämpfen 5 GHz um 10 bis 25 dB pro Regal, deshalb strahlt ein AP über den Regalen den Großteil seiner Energie seitlich und fast nichts erreicht den Gangboden. Das richtige Muster bei dichter Regalnutzung ist Gangmitten-Montage mit Downtilt oder Patch-Antennen entlang des Gangs, kein uniformes Deckenraster. Wir modellieren die Dämpfung aus dem CAD und validieren sie Gang für Gang vor Ort.',
        },
        {
          q: 'Was ist mit Kühlbereichen und Tiefkühlräumen?',
          a: 'Kondensation in Kühlbereichen zerstört Consumer-APs innerhalb von Wochen und die meisten Mittelklasse-Enterprise-APs innerhalb eines Jahres. Der richtige AP für einen Tiefkühlraum hat einen Betriebsbereich bis minus 30 Grad Celsius, ein IP-geschütztes Gehäuse und oft eine Kabelverschraubung statt eines versiegelten Ports. Wir planen zusätzlich Tropfschleifen für Kondenswasser und platzieren den AP so, dass er nicht den Thermoschock eines Abtauzyklus abbekommt. Wenn der AP in Ihrem Tiefkühler dasselbe Modell ist wie der im Büro, fällt er aus.',
        },
        {
          q: 'Was ist mit dem PoE-Haushalt unserer bestehenden Switches?',
          a: 'Ein Wi-Fi-6E- oder Wi-Fi-7-AP zieht typischerweise 25 bis 35 W unter Volllast, ein 48-Port-Switch mit 740 W PoE-Haushalt kann also nicht achtundvierzig APs plus Telefone versorgen. Die ausgelieferte BOM markiert jeden Switch, bei dem der PoE-Haushalt knapp wird, und enthält etwaige Upgrade-Kosten im schriftlichen Angebot. Wir liefern kein Design, das annimmt, der Switch finde auf wundersame Weise mehr Watt.',
        },
        {
          q: 'Wie bekommen wir sauberes Roaming für Pick-by-Voice zwischen Gängen?',
          a: 'Pick-by-Voice braucht Roam-Zeiten unter 50 ms ohne Audio-Lücke. Das gelingt nur mit korrekt konfiguriertem 802.11k, v und r plus Zellüberlappung von mindestens 15 bis 20 Prozent bei Minimum-Datenrate. Wir setzen Minimum-Datenraten so, dass Client-Stickiness bricht, aktivieren 802.11k und v, damit der AP dem Client den nächsten Zielkandidaten mitteilt, und 802.11r für Fast Transition, soweit die Geräte es unterstützen. Vocollect A700 und A730, Zebra WT6300 und Honeywell CT45 verhalten sich unterschiedlich; das Design richtet sich nach dem langsamsten Roamer auf Ihrer Fläche.',
        },
        {
          q: 'Lohnt sich Wi-Fi 6E oder Wi-Fi 7 schon jetzt?',
          a: 'Für ein Greenfield-Lager ja. Für einen Bestandsstandort kommt es darauf an, wie viel Ihrer Handheld-Flotte 6 GHz überhaupt unterstützt. Eine Ausleuchtung, die Wi-Fi 7 empfiehlt, ohne die Scanner-Flotte zu inventarisieren, ist Marketing, kein Engineering. Wir inventarisieren jede SKU, kennzeichnen die 6-GHz-fähigen Geräte und empfehlen den Refresh nur, wenn die Flotte oder die Drei-Jahres-Roadmap es rechtfertigt.',
        },
        {
          q: 'Ekahau, iBwave oder Hamina: welches Werkzeug nutzen Sie?',
          a: 'Alle drei, je nach Standort. Ekahau ist unser Standard für mittelgroße Lager, weil die prädiktive Engine und das Aktiv-Mess-Rig am reifsten sind. iBwave punktet in mehrgeschossiger Fertigung mit viel Mezzanine und In-Building-DAS neben WLAN. Hamina ist stark, wenn das Design mit mehreren Hersteller-Optionen schnell iteriert werden muss. Das Ergebnis ist in allen Fällen gleich: kalibriertes Modell, dokumentierte Wandmaterialien und ein Bericht, den auch Ihr nächster Lieferant lesen kann.',
        },
        {
          q: 'Welche Handhelds und Headsets testen Sie?',
          a: 'Zebra TC53, TC58, TC73, MC9400, WT6300 und die alte MC9300-Reihe; Honeywell CT45, CT47, CT60 und CK65; Datalogic Memor 20 und Skorpio X5; Vocollect A700 und A730 Pick-by-Voice-Headsets. Wir messen zusätzlich gegen Cisco 8821 und Spectralink VoIP, soweit im Scope. Nutzen Sie ein Gerät, das wir noch nicht in der Hand hatten, kaufen oder leihen wir es für die Ausleuchtung; in den Bericht kommt nichts ohne reale Gerätemessung.',
        },
        {
          q: 'Wie fixen wir die Nullstellen durch Staplermasten?',
          a: 'Bewegte Metallmasten erzeugen auf zehn Meter Höhe temporäre Nullstellen, genau dort, wo das Staplerterminal sitzt. Die Lösung ist eine Kombination aus Zelldichte (das Terminal hat immer einen zweiten tragfähigen AP), Antennenauswahl (Patch-Antennen entlang des Gangs statt Omni von der Decke) und in manchen Standorten eine dedizierte 5-GHz-SSID für Stapler mit leicht höherer Minimum-Datenrate, damit das Terminal schneller aus einer sterbenden Zelle wechselt. Wir modellieren das prädiktiv und validieren es vor Ort mit einem fahrenden Stapler.',
        },
        {
          q: 'Sollen Scanner in dasselbe VLAN wie der Rest?',
          a: 'Nein. Das von uns gelieferte Design trennt Scanner, Pick-by-Voice, VoIP, Kameras, Zutrittsleser und Gast-Traffic in eigene VLANs mit konkretem QoS-Tagging; Switch- und Firewall-Konfiguration gehören zum Liefergegenstand. Scanner und Gast-WLAN im selben VLAN sind der Weg, auf dem ein einzelner Malware-Vorfall das Picking lahmlegt, und auch der Weg zu DHCP-Erschöpfung, die eine Schicht beendet. Die Segmentierung ist in unseren Designs nicht optional.',
        },
        {
          q: 'Was steht im Messbericht und wie lange dauert die Vor-Ort-Vermessung?',
          a: 'Der Bericht enthält prädiktive Heatmaps (RSSI, SNR, Datenrate, Roaming), die gemessenen passiven und aktiven Heatmaps, Interferenz- und Rogue-Inventar, PoE-Haushaltsbewertung, AP-Platzierungsplan mit Montagedetail, Kanal- und Leistungsplan, VLAN- und QoS-Plan, herstellerneutrale Stückliste und ein Validierungsprotokoll für die Abnahme nach Installation. Die Vor-Ort-Zeit beträgt typischerweise einen Tag für Standorte bis 10.000 Quadratmeter, zwei bis drei Tage für 10.000 bis 40.000 Quadratmeter und vier bis fünf Tage für 40.000 bis 100.000 Quadratmeter, inklusive Kühlbereich, Mezzanine und Hof, soweit relevant.',
        },
      ],
      related: {
        title: 'Weiterführende Inhalte',
        items: [
          {
            label: 'Leistung: WLAN-Ausleuchtung',
            href: '/services/hardware/wlan-ausleuchtung',
            blurb: 'Zugrunde liegende Leistungsseite: prädiktive und Vor-Ort-Ausleuchtung, Liefergegenstände, Gerätespektrum und SLA.',
          },
          {
            label: 'Netzwerk-Support',
            href: '/services/hardware/netzwerk-support',
            blurb: 'Managed Network: Router, Switches, Firewalls, WLAN-Controller und SD-WAN unter einer schriftlichen SLA.',
          },
          {
            label: 'Infrastruktur-Support',
            href: '/services/hardware/infrastruktur-support',
            blurb: '24/7 Infrastrukturbetrieb mit 15-minütiger P1-Erstreaktion im Median, 99,9 %+ Verfügbarkeit, vollständigem Audit-Trail.',
          },
          {
            label: 'Branchen, die wir bedienen',
            href: '/industries',
            blurb: 'Wie Deploris Logistik, Handel, Fertigung und weitere Mittelstandssektoren in den USA und DACH beliefert.',
          },
          {
            label: 'Blog: Wi-Fi 6E vs. Wi-Fi 7 fürs Lager 2026',
            href: '/blog/wifi-6e-vs-wifi-7-lager-2026',
            blurb: 'Ehrlicher Kaufvergleich für die Lager-WLAN-Erneuerung: wo Wi-Fi 7 den Aufpreis rechtfertigt, wo 6E weiter gewinnt.',
          },
          {
            label: 'Blog: Scanner-Roaming mit Zebra und Honeywell, 802.11k/v/r',
            href: '/blog/zebra-honeywell-scanner-roaming-802-11-kvr',
            blurb: 'Praxis-Leitfaden zur Behebung von Roaming-Problemen auf gemischten Zebra-, Honeywell- und Voice-Pick-Flotten.',
          },
        ],
      },
      cta: {
        primary: 'Scoping-Termin anfragen',
        secondary: 'Beispiel-Messbericht ansehen',
      },
    },
  },
};
