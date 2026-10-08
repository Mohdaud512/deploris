import { site } from '@/config/site';
import type { Locale } from '@/config/locales';
import { allServices } from '@/config/services';

/**
 * JSON-LD builders. All outputs are serialized via JSON.stringify in a
 * <script type="application/ld+json"> tag using an object literal never
 * dangerouslySetInnerHTML with untrusted input. The values here all come from
 * our own config, but we still stringify with a JSON-safe path to defuse any
 * accidental </script> injection.
 */

export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/logo.png`,
    description: site.description[locale],
    sameAs: [site.social.linkedin, site.social.github, site.social.x],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: site.contact.phone,
        contactType: 'sales',
        email: site.contact.email,
        availableLanguage: ['English', 'German'],
        areaServed: ['US', 'DE'],
      },
    ],
  };
}

export function localBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}#business`,
    name: site.name,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: `${site.url}/og-default.png`,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Germany' },
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: site.contact.hours.days,
      opens: site.contact.hours.opens,
      closes: site.contact.hours.closes,
    },
    inLanguage: [locale === 'de' ? 'de-DE' : 'en-US'],
  };
}

export function websiteSchema(locale: Locale) {
  const base = locale === 'en' ? site.url : `${site.url}/${locale}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: base,
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${base}/blog?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function serviceSchema(id: string, locale: Locale) {
  const svc = allServices.find((s) => s.id === id);
  if (!svc) return null;
  const c = svc.copy[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: c.title,
    serviceType: c.title,
    description: c.summary,
    provider: { '@type': 'Organization', name: site.name, url: site.url },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Germany' },
    ],
  };
}

export function breadcrumbSchema(
  items: { name: string; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.href.startsWith('http') ? it.href : `${site.url}${it.href}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  locale: Locale;
}) {
  const url = `${site.url}${post.locale === 'en' ? '' : `/${post.locale}`}/blog/${post.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: `${site.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: post.locale === 'de' ? 'de-DE' : 'en-US',
  };
}

export function definedTermSchema(term: {
  slug: string;
  name: string;
  description: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${site.url}${term.locale === 'en' ? '' : `/${term.locale}`}/glossary/${term.slug}`,
    name: term.name,
    description: term.description,
    inDefinedTermSet: `${site.url}${term.locale === 'en' ? '' : `/${term.locale}`}/glossary`,
    inLanguage: term.locale === 'de' ? 'de-DE' : 'en-US',
  };
}

export function jobPostingSchema(job: {
  title: string;
  slug: string;
  description: string;
  employmentType: string;
  datePosted: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: site.name,
      sameAs: site.url,
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Germany' },
    ],
    directApply: true,
    url: `${site.url}${job.locale === 'en' ? '' : `/${job.locale}`}/careers/${job.slug}`,
  };
}
