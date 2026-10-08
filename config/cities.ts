import type { Locale } from './locales';

/**
 * Programmatic city × service landing pages.
 *
 * ⚠️ IMPORTANT CONFIRM BEFORE PUBLISHING:
 * Deploris is currently registered as a US-only physical entity per Section 12
 * of the brief, so DE city pages ship as "remote-service" landings (no fake
 * local address, no fake local phone). They still capture local intent, but
 * copy makes the remote/hybrid nature explicit and Schema uses `areaServed: DE`.
 *
 * Only expand this list to cities Deploris genuinely serves thin/duplicate
 * content across dozens of dead pages is worse than a small honest set.
 */

export type City = {
  slug: string;
  name: string;
  country: 'DE' | 'US';
  copy: Record<Locale, {
    intro: string;
    localAngle: string;
  }>;
};

export const cities: City[] = [
  {
    slug: 'berlin',
    name: 'Berlin',
    country: 'DE',
    copy: {
      en: {
        intro: 'Berlin-based startups and mittelstand teams work with Deploris for remote-first CRM development, RAG systems, and AI automation with clear German-language documentation.',
        localAngle: 'We serve Berlin clients deutschlandweit remotely, with on-site visits available on request.',
      },
      de: {
        intro: 'Berliner Startups und Mittelständler arbeiten mit Deploris an individuellen CRM-Systemen, RAG-Systemen und KI-Automatisierung remote-first, mit deutschsprachiger Dokumentation.',
        localAngle: 'Wir betreuen Berliner Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
  {
    slug: 'muenchen',
    name: 'München',
    country: 'DE',
    copy: {
      en: {
        intro: 'Munich-based industrials and financial services teams engage Deploris for AI automation, custom CRM, and RAG systems with a security-first delivery model.',
        localAngle: 'We serve Munich clients Germany-wide remotely, with on-site visits on request.',
      },
      de: {
        intro: 'Münchner Industrieunternehmen und Finanzdienstleister engagieren Deploris für KI-Automatisierung, individuelle CRM-Systeme und RAG-Systeme Security-First als Standard.',
        localAngle: 'Wir betreuen Münchner Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    country: 'DE',
    copy: {
      en: {
        intro: 'Hamburg logistics, media, and B2B services teams pick Deploris for custom software and RAG systems that respect German data-protection norms.',
        localAngle: 'We serve Hamburg clients Germany-wide remotely, with on-site visits on request.',
      },
      de: {
        intro: 'Hamburger Logistiker, Medienhäuser und B2B-Dienstleister wählen Deploris für Individualsoftware und RAG-Systeme, die deutsche Datenschutznormen respektieren.',
        localAngle: 'Wir betreuen Hamburger Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt',
    country: 'DE',
    copy: {
      en: {
        intro: 'Frankfurt financial-services and DAX-adjacent teams work with Deploris on compliant custom systems, RAG, and AI automation EU-region processing by default.',
        localAngle: 'We serve Frankfurt clients Germany-wide remotely, with on-site visits on request.',
      },
      de: {
        intro: 'Frankfurter Finanzdienstleister und DAX-nahe Teams arbeiten mit Deploris an konformer Individualsoftware, RAG-Systemen und KI-Automatisierung standardmäßig mit EU-Datenverarbeitung.',
        localAngle: 'Wir betreuen Frankfurter Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
  {
    slug: 'koeln',
    name: 'Köln',
    country: 'DE',
    copy: {
      en: {
        intro: 'Cologne media, insurance, and mid-market teams pick Deploris for CRM and AI automation with German-language delivery and clear handover.',
        localAngle: 'We serve Cologne clients Germany-wide remotely, with on-site visits on request.',
      },
      de: {
        intro: 'Kölner Medien-, Versicherungs- und Mittelstandsteams wählen Deploris für CRM und KI-Automatisierung mit deutschsprachiger Umsetzung und klarer Übergabe.',
        localAngle: 'Wir betreuen Kölner Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    country: 'DE',
    copy: {
      en: {
        intro: 'Stuttgart engineering, automotive-supplier, and industrial-software teams work with Deploris on RAG systems, custom software, and AI automation.',
        localAngle: 'We serve Stuttgart clients Germany-wide remotely, with on-site visits on request.',
      },
      de: {
        intro: 'Stuttgarter Ingenieur-, Automotive-Zulieferer- und Industriesoftware-Teams arbeiten mit Deploris an RAG-Systemen, Individualsoftware und KI-Automatisierung.',
        localAngle: 'Wir betreuen Stuttgarter Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    country: 'DE',
    copy: {
      en: {
        intro: 'Düsseldorf professional-services and manufacturing teams engage Deploris for individual CRM, RAG systems, and AI automation with German-B2B delivery discipline.',
        localAngle: 'We serve Düsseldorf clients Germany-wide remotely, with on-site visits on request.',
      },
      de: {
        intro: 'Düsseldorfer Dienstleister und Industriebetriebe engagieren Deploris für individuelle CRM-Systeme, RAG-Systeme und KI-Automatisierung mit B2B-Disziplin.',
        localAngle: 'Wir betreuen Düsseldorfer Kunden deutschlandweit remote, Vor-Ort-Einsätze nach Absprache.',
      },
    },
  },
];

/**
 * Which service IDs get a programmatic city page. Keep this tight to avoid
 * thin/duplicate content expand only for services with a strong local intent.
 */
export const cityServiceIds = [
  'custom-crm',
  'rag-systems',
  'ai-agents-automation',
  'custom-systems',
  'infrastructure-support',
];
