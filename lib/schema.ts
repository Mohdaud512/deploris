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

// Topics Deploris claims expertise in. Surfaced on Organization.knowsAbout so
// AI engines can bind the entity to its areas of competence.
const KNOWS_ABOUT = [
  'Customer Relationship Management',
  'Retrieval-Augmented Generation',
  'AI agents',
  'Workflow automation',
  'IT infrastructure support',
  'Managed IT services',
  'Network support',
  'SD-WAN',
  'WiFi survey',
  'Data center maintenance',
  'Hardware break-fix',
  'IT rollout and migration',
  'Desktop support',
  'IMAC services',
  'Custom software development',
];

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/logo.png`,
      width: 512,
      height: 512,
    },
    image: `${site.url}/logo.png`,
    description: site.description[locale],
    foundingDate: '2024',
    numberOfEmployees: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 10 },
    knowsAbout: KNOWS_ABOUT,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address.street,
      addressLocality: site.contact.address.locality,
      addressRegion: site.contact.address.region,
      postalCode: site.contact.address.postalCode,
      addressCountry: site.contact.address.country,
    },
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

/**
 * Service-area business schema. Deploris has one US registered address but
 * serves the US AND Germany remotely, so `ProfessionalService` is a better
 * fit than `LocalBusiness` (which implies a storefront).
 */
export function localBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${site.url}#business`,
    name: site.name,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    image: `${site.url}/logo.png`,
    logo: `${site.url}/logo.png`,
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
    '@id': `${site.url}#website`,
    name: site.name,
    url: base,
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
    publisher: { '@id': `${site.url}#organization` },
  };
}

/**
 * Per-service pricing bands exposed as `offers`. Each service that has public
 * pricing (currently all development services) also surfaces that pricing in
 * its Service schema so Google can show it in service rich results.
 */
export type ServicePricingTier = { name: string; min?: number; max?: number; recurring?: boolean; description: string };

export function serviceSchema(
  id: string,
  locale: Locale,
  opts: { pricingTiers?: ServicePricingTier[] } = {},
) {
  const svc = allServices.find((s) => s.id === id);
  if (!svc) return null;
  const c = svc.copy[locale];
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${site.url}${locale === 'en' ? '' : `/${locale}`}/services/${svc.line}/${c.slug}#service`,
    name: c.title,
    serviceType: c.title,
    description: c.summary,
    provider: {
      '@id': `${site.url}#organization`,
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Germany' },
    ],
    availableLanguage: ['English', 'German'],
    category: svc.line === 'hardware' ? 'IT Infrastructure Services' : 'Custom Software Development',
    inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
  };
  if (opts.pricingTiers && opts.pricingTiers.length > 0) {
    base.offers = opts.pricingTiers.map((t) => ({
      '@type': 'Offer',
      name: t.name,
      description: t.description,
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': t.recurring ? 'UnitPriceSpecification' : 'PriceSpecification',
        priceCurrency: 'USD',
        ...(t.min != null ? { minPrice: t.min } : {}),
        ...(t.max != null ? { maxPrice: t.max } : {}),
        ...(t.recurring ? { unitText: 'MONTH' } : {}),
      },
      availability: 'https://schema.org/InStock',
      areaServed: ['US', 'DE'],
    }));
  }
  return base;
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => {
      const isLast = i === items.length - 1;
      const abs = it.href.startsWith('http') ? it.href : `${site.url}${it.href}`;
      const node: Record<string, unknown> = {
        '@type': 'ListItem',
        position: i + 1,
        name: it.name,
      };
      // Google prefers no `item` on the last breadcrumb (it's the current page).
      if (!isLast) node.item = abs;
      return node;
    }),
  };
}

export function faqSchema(items: { q: string; a: string }[], opts: { pageUrl?: string } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it, i) => ({
      '@type': 'Question',
      '@id': opts.pageUrl ? `${opts.pageUrl}#faq-${i + 1}` : undefined,
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** Named human (or org) author for article attribution. */
export function personSchema(opts: {
  name: string;
  slug?: string;
  jobTitle?: string;
  description?: string;
  sameAs?: string[];
  image?: string;
  /** Topics this person has publicly-verifiable expertise in. Fed to AI
   *  overview citations and the Person entity graph. */
  knowsAbout?: string[];
}) {
  const url = opts.slug ? `${site.url}/about/${opts.slug}` : `${site.url}/about`;
  const sameAs = opts.sameAs?.filter(Boolean);
  const image = opts.image
    ? (opts.image.startsWith('http') ? opts.image : `${site.url}${opts.image}`)
    : undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${url}#person`,
    name: opts.name,
    url,
    jobTitle: opts.jobTitle,
    description: opts.description,
    worksFor: { '@id': `${site.url}#organization` },
    ...(sameAs && sameAs.length ? { sameAs } : {}),
    ...(image ? { image } : {}),
    ...(opts.knowsAbout?.length ? { knowsAbout: opts.knowsAbout } : {}),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  date: string;
  updated?: string;
  author: string;
  authorSlug?: string;
  locale: Locale;
  image?: string;
  keywords?: string[];
}) {
  const url = `${site.url}${post.locale === 'en' ? '' : `/${post.locale}`}/blog/${post.slug}`;
  const img = post.image
    ? (post.image.startsWith('http') ? post.image : `${site.url}${post.image}`)
    : `${site.url}/og-default.png`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    url,
    headline: post.title,
    description: post.description,
    image: [img],
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: post.authorSlug ? `${site.url}/about/${post.authorSlug}` : `${site.url}/about`,
    },
    publisher: { '@id': `${site.url}#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: post.title },
    inLanguage: post.locale === 'de' ? 'de-DE' : 'en-US',
    ...(post.keywords?.length ? { keywords: post.keywords.join(', ') } : {}),
    isPartOf: { '@id': `${site.url}#website` },
  };
}

/**
 * Case-study / client-engagement article. Uses `Article` (not BlogPosting)
 * since these aren't dated posts; carries `about` for the service it covers.
 */
export function caseStudySchema(cs: {
  title: string;
  description: string;
  slug: string;
  date: string;
  locale: Locale;
  image?: string;
  about?: string;
}) {
  const url = `${site.url}${cs.locale === 'en' ? '' : `/${cs.locale}`}/projects/${cs.slug}`;
  const img = cs.image
    ? (cs.image.startsWith('http') ? cs.image : `${site.url}${cs.image}`)
    : `${site.url}/og-default.png`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    url,
    headline: cs.title,
    description: cs.description,
    image: [img],
    datePublished: cs.date,
    dateModified: cs.date,
    author: { '@id': `${site.url}#organization`, '@type': 'Organization', name: site.name },
    publisher: { '@id': `${site.url}#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: cs.title },
    inLanguage: cs.locale === 'de' ? 'de-DE' : 'en-US',
    about: cs.about,
    genre: 'case study',
    isPartOf: { '@id': `${site.url}#website` },
  };
}

export function definedTermSchema(term: {
  slug: string;
  name: string;
  description: string;
  locale: Locale;
  sameAs?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': `${site.url}${term.locale === 'en' ? '' : `/${term.locale}`}/glossary/${term.slug}`,
    name: term.name,
    description: term.description,
    inDefinedTermSet: `${site.url}${term.locale === 'en' ? '' : `/${term.locale}`}/glossary`,
    inLanguage: term.locale === 'de' ? 'de-DE' : 'en-US',
    ...(term.sameAs?.length ? { sameAs: term.sameAs } : {}),
  };
}

export function jobPostingSchema(job: {
  title: string;
  slug: string;
  description: string;
  employmentType: string;
  datePosted: string;
  validThrough?: string;
  baseSalary?: { currency: string; min: number; max: number; unit: 'YEAR' | 'MONTH' | 'HOUR' };
  locale: Locale;
}) {
  const url = `${site.url}${job.locale === 'en' ? '' : `/${job.locale}`}/careers/${job.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    '@id': `${url}#job`,
    title: job.title,
    description: job.description,
    datePosted: job.datePosted,
    validThrough: job.validThrough ?? defaultValidThrough(job.datePosted),
    employmentType: job.employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      sameAs: site.url,
      logo: `${site.url}/logo.png`,
    },
    jobLocationType: 'TELECOMMUTE',
    applicantLocationRequirements: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Germany' },
    ],
    directApply: true,
    url,
    ...(job.baseSalary
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: job.baseSalary.currency,
            value: {
              '@type': 'QuantitativeValue',
              minValue: job.baseSalary.min,
              maxValue: job.baseSalary.max,
              unitText: job.baseSalary.unit,
            },
          },
        }
      : {}),
  };
}

function defaultValidThrough(datePosted: string): string {
  const d = new Date(datePosted);
  d.setDate(d.getDate() + 180);
  return d.toISOString().slice(0, 10);
}

/** About-this-site page. Binds the page to the Organization entity. */
export function aboutPageSchema(opts: { locale: Locale; title: string; description: string }) {
  const url = `${site.url}${opts.locale === 'en' ? '' : `/${opts.locale}`}/about`;
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${url}#aboutpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.locale === 'de' ? 'de-DE' : 'en-US',
    mainEntity: { '@id': `${site.url}#organization` },
    isPartOf: { '@id': `${site.url}#website` },
  };
}

/** Contact page. Binds the page to Organization's contact points. */
export function contactPageSchema(opts: { locale: Locale; title: string; description: string }) {
  const url = `${site.url}${opts.locale === 'en' ? '' : `/${opts.locale}`}/contact`;
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${url}#contactpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.locale === 'de' ? 'de-DE' : 'en-US',
    mainEntity: { '@id': `${site.url}#organization` },
    isPartOf: { '@id': `${site.url}#website` },
  };
}

/** Collection pages (blog index, projects index, glossary, careers, …). */
export function collectionPageSchema(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  hasPart?: { name: string; url: string }[];
}) {
  const url = `${site.url}${opts.locale === 'en' ? '' : `/${opts.locale}`}${opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#collectionpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.locale === 'de' ? 'de-DE' : 'en-US',
    isPartOf: { '@id': `${site.url}#website` },
    ...(opts.hasPart?.length
      ? {
          hasPart: opts.hasPart.map((p) => ({
            '@type': 'WebPage',
            name: p.name,
            url: p.url.startsWith('http') ? p.url : `${site.url}${p.url}`,
          })),
        }
      : {}),
  };
}

/** TechArticle for compare/explainer pages that benefit from technical treatment. */
export function techArticleSchema(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  date?: string;
  proficiencyLevel?: 'Beginner' | 'Expert';
  about?: string;
  /** Named human author for E-E-A-T. When omitted falls back to the
   *  managing-member Person entity; previously fell back to the
   *  Organization which the live-site audit flagged as weak for
   *  TechArticle. */
  author?: { name: string; slug: string };
}) {
  const url = `${site.url}${opts.locale === 'en' ? '' : `/${opts.locale}`}${opts.path}`;
  const author = opts.author ?? { name: site.managingMember, slug: 'muhammad-daud' };
  const authorUrl = `${site.url}/about/${author.slug}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${url}#article`,
    url,
    headline: opts.title,
    description: opts.description,
    image: [`${site.url}/og-default.png`],
    datePublished: opts.date ?? '2025-02-01',
    dateModified: opts.date ?? '2025-02-01',
    author: {
      '@type': 'Person',
      '@id': `${authorUrl}#person`,
      name: author.name,
      url: authorUrl,
    },
    publisher: { '@id': `${site.url}#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${url}#webpage`, url, name: opts.title },
    inLanguage: opts.locale === 'de' ? 'de-DE' : 'en-US',
    proficiencyLevel: opts.proficiencyLevel ?? 'Beginner',
    about: opts.about,
    isPartOf: { '@id': `${site.url}#website` },
  };
}

/** HowTo for the process-steps section on service detail pages. */
export function howToSchema(opts: {
  locale: Locale;
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: opts.name,
    description: opts.description,
    inLanguage: opts.locale === 'de' ? 'de-DE' : 'en-US',
    step: opts.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/** WebPage with speakable spec cheap AEO win for blog + compare pages. */
export function webPageWithSpeakable(opts: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  cssSelectors?: string[];
}) {
  const url = `${site.url}${opts.locale === 'en' ? '' : `/${opts.locale}`}${opts.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: opts.title,
    description: opts.description,
    inLanguage: opts.locale === 'de' ? 'de-DE' : 'en-US',
    isPartOf: { '@id': `${site.url}#website` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: opts.cssSelectors ?? ['h1', 'article p:first-of-type', 'main > section:first-of-type p:first-of-type'],
    },
  };
}
