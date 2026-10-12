/**
 * Central business facts for Deploris.
 * Edit once the header, footer, Impressum, structured data, sitemaps,
 * emails, and RAG index all read from here.
 *
 * Entity: Deploris LLC, a Colorado Limited Liability Company.
 * Colorado Secretary of State entity ID 20268259375, formed 2026-10-12.
 *
 * EIN is deliberately omitted until the IRS issues one. The site does not
 * quote a tax ID until the SS-4 is back.
 *
 * No public phone number is listed. Email is the primary contact channel.
 */

export const site = {
  name: 'Deploris',
  legalName: 'Deploris LLC',
  jurisdiction: 'Colorado Limited Liability Company',
  documentNumber: '20268259375',
  // ein: intentionally omitted until the IRS SS-4 issues an EIN for the CO
  //      entity. When it lands, add it here and the Impressum will carry it
  //      automatically.
  registeredAgent: {
    name: 'Registered Agents Inc',
    street: '1500 N Grant St, Ste R',
    locality: 'Denver',
    region: 'CO',
    postalCode: '80203',
    country: 'US',
  },
  managingMember: 'Muhammad Daud',
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
    // Role mailbox (not a personal address) so GDPR controller + Impressum
    // contact resolves to the team, not an individual. Ensure this alias is
    // configured in the mail provider before launch.
    email: 'hello@deploris.com',
    address: {
      street: '1500 N Grant St #7314',
      locality: 'Denver',
      region: 'CO',
      postalCode: '80203',
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
    // github dropped: https://github.com/deploris returns 404 (verified
    // 2026-10-11). Google treats sameAs stubs as a spam signal. Restore
    // once a real GitHub org exists.
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
