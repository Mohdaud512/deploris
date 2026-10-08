import type { Locale } from './locales';
import { hardwareServices, developmentServices } from './services';
import en from '../messages/en.json';
import de from '../messages/de.json';

export type NavItem = {
  key: string;
  href: string;
  label: string;
  children?: NavItem[];
};

const messages = { en, de } as const;

function navLabel(locale: Locale, key: string): string {
  // key is like "nav.home"; look up messages[locale].nav.home
  const parts = key.split('.');
  let cur: unknown = messages[locale];
  for (const p of parts) {
    if (!cur || typeof cur !== 'object') return key;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === 'string' ? cur : key;
}

/**
 * Build the primary nav with locale-correct slugs (translated, not duplicated)
 * and pre-resolved labels — the header renders `item.label` directly rather
 * than calling `t()`, which avoids next-intl's error listener firing for
 * dynamically composed keys like `svc.<id>`.
 */
export function buildNav(locale: Locale): NavItem[] {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const servicesRoot = `${prefix}/services`;
  const hardwareRoot = `${servicesRoot}/hardware`;
  const devRoot = `${servicesRoot}/development`;
  const nav = (k: string) => navLabel(locale, k);

  return [
    { key: 'nav.home', href: prefix || '/', label: nav('nav.home') },
    {
      key: 'nav.services',
      href: servicesRoot,
      label: nav('nav.services'),
      children: [
        {
          key: 'nav.hardware',
          href: hardwareRoot,
          label: nav('nav.hardware'),
          children: hardwareServices.map((s) => ({
            key: `svc.${s.id}`,
            href: `${hardwareRoot}/${s.copy[locale].slug}`,
            label: s.copy[locale].title,
          })),
        },
        {
          key: 'nav.development',
          href: devRoot,
          label: nav('nav.development'),
          children: developmentServices.map((s) => ({
            key: `svc.${s.id}`,
            href: `${devRoot}/${s.copy[locale].slug}`,
            label: s.copy[locale].title,
          })),
        },
      ],
    },
    { key: 'nav.industries', href: `${prefix}/industries`, label: nav('nav.industries') },
    { key: 'nav.projects', href: `${prefix}/projects`, label: nav('nav.projects') },
    { key: 'nav.blog', href: `${prefix}/blog`, label: nav('nav.blog') },
    { key: 'nav.faq', href: `${prefix}/faq`, label: nav('nav.faq') },
    { key: 'nav.glossary', href: `${prefix}/glossary`, label: nav('nav.glossary') },
    { key: 'nav.about', href: `${prefix}/about`, label: nav('nav.about') },
    { key: 'nav.contact', href: `${prefix}/contact`, label: nav('nav.contact') },
  ];
}
