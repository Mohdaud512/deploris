import type { Locale } from '../locales';

/**
 * Pillar use-case landing-page content, bilingual (EN + DE).
 *
 * A UseCase sits one layer above a Service: it describes a buyer-intent
 * problem ("mid-market revenue team wants a custom CRM"), where the Service
 * is the capability we deliver ("Custom CRM development"). Each use case
 * links down to the Service that fulfills it, so the two layers reinforce
 * each other for both humans and LLMs.
 *
 * Shape is tuned for SEO + AEO + GEO:
 *   - `tldr`      → one extractable sentence LLMs can quote
 *   - `atAGlance` → fact tiles LLMs scan for who / timeline / SLA / region
 *   - `howItWorks.steps` → HowTo JSON-LD, GEO-friendly numbered answer
 *   - `faq`       → FAQPage JSON-LD + direct Q&A pairs
 *   - `comparison`→ structured table LLMs can reproduce
 *   - everything renders in SSR so crawlers and Perplexity/Gemini see it.
 */
export type UseCaseFact = { label: string; value: string };

export type UseCaseStep = { step: string; body: string };

export type UseCaseComparisonRow = {
  contender: string;
  wins: string;
  gaps: string;
};

export type UseCaseFaq = { q: string; a: string };

export type UseCaseCopy = {
  /** Localized URL slug (used in /use-cases/{slug}). */
  slug: string;
  /** ≤60 chars, used for <title>. */
  metaTitle: string;
  /** 140 to 160 chars, used for meta description. */
  metaDescription: string;

  // Hero
  eyebrow: string;
  h1: string;
  /** 1 to 2 sentence sub-headline directly answering "what is this". */
  deck: string;
  /** 1-sentence AEO definition. Lives directly under H1 and is the string
   *  LLM answer engines will most often quote. Must stand alone. */
  tldr: string;

  // At-a-glance fact tiles (6 items). Shown in a grid, mirrored in JSON-LD.
  atAGlance: UseCaseFact[];

  // Problem statement
  problem: {
    title: string;
    body: string;
    bullets: string[];
  };

  // How we deliver (HowTo JSON-LD source)
  howItWorks: {
    title: string;
    intro: string;
    steps: UseCaseStep[];
  };

  // Buyer checklist (what any vendor doing this well should offer)
  checklist: {
    title: string;
    intro: string;
    items: string[];
  };

  // Example scenario (anonymized, no fabricated client names or logos)
  scenario: {
    title: string;
    body: string;
  };

  // Pricing posture (no numbers; scope-first framing)
  pricingPosture: {
    title: string;
    body: string;
  };

  // Comparison table vs alternatives (DIY, dev-shop, MSP, generic SaaS)
  comparison: {
    title: string;
    intro: string;
    rows: UseCaseComparisonRow[];
  };

  // FAQ (FAQPage JSON-LD source)
  faq: UseCaseFaq[];

  // Related reading
  related: {
    title: string;
    items: { label: string; href: string; blurb: string }[];
  };

  // CTAs
  cta: {
    primary: string;
    secondary: string;
  };
};

export type UseCase = {
  /** Internal stable id. */
  id: string;
  /** Which Service in config/services.ts fulfills this use case. The use-case
   *  page links to the service detail page, and the service hub cross-links
   *  back to the use case. */
  serviceId: string;
  /** Primary search keyword per locale. Drives title + h1 + first paragraph. */
  primaryKeyword: Record<Locale, string>;
  /** Secondary keywords sprinkled through body + FAQ for topical breadth. */
  secondaryKeywords: Record<Locale, string[]>;
  /** When this content was last reviewed. Powers dateModified in JSON-LD. */
  lastReviewed: string;
  copy: Record<Locale, UseCaseCopy>;
};
