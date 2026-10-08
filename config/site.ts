/**
 * Central business facts for Deploris.
 * Edit once the header, footer, Impressum, structured data, sitemaps,
 * emails, and RAG index all read from here.
 *
 * ⚠️ Values marked REVIEW below match placeholders the user supplied but that
 * also match the old WordPress demo template confirm before shipping to
 * production. See CONTENT.md for the checklist.
 */

export const site = {
  name: 'Deploris',
  legalName: 'DEPLORIS LLC',
  jurisdiction: 'Florida Limited Liability Company',
  documentNumber: 'L24000491676',
  ein: '98-1823862',
  registeredAgent: {
    name: 'REGISTERED AGENTS INC',
    street: '7901 4th St N, Ste 300',
    locality: 'St. Petersburg',
    region: 'FL',
    postalCode: '33702',
    country: 'US',
  },
  managingMember: 'Mustansar Aleem',
  tagline: {
    en: 'Tailored, efficient, reliable IT solutions.',
    de: 'Maßgeschneiderte, effiziente und verlässliche IT-Lösungen.',
  },
  description: {
    en: 'Deploris delivers hardware and infrastructure services alongside custom CRM, RAG systems, AI agents, and bespoke software for growing businesses in the US and Germany.',
    de: 'Deploris liefert Hardware- und Infrastruktur-Support sowie individuelle CRM-Systeme, RAG-Systeme, KI-Agenten und Individualsoftware für wachsende Unternehmen in den USA und Deutschland.',
  },
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deploris.com',
  ogImage: '/og-default.png',
  contact: {
    email: 'muhammad.daud@deploris.com',
    phone: '+1 (321) 495-3200',
    phoneRaw: '+13214953200',
    address: {
      street: '7901 4th St N, Ste 12030',
      locality: 'St. Petersburg',
      region: 'FL',
      postalCode: '33702',
      country: 'US',
    },
    hours: {
      opens: '09:00',
      closes: '18:00',
      days: ['Mo', 'Tu', 'We', 'Th', 'Fr'],
    },
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/deploris',
    github: 'https://github.com/deploris',
    x: 'https://x.com/deploris',
  },
  serviceLines: {
    hardware: {
      en: 'Hardware & Infrastructure',
      de: 'Hardware & Infrastruktur',
    },
    development: {
      en: 'Software Development',
      de: 'Softwareentwicklung',
    },
  },
} as const;

export type SiteConfig = typeof site;
