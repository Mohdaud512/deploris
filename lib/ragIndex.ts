import { allServices } from '@/config/services';
import { site } from '@/config/site';
import type { Locale } from '@/config/locales';
import { faqData } from '@/content/faq';

/**
 * Tiny in-memory RAG index over Deploris's own content (services + FAQ).
 * Used by the /api/chat route to ground the assistant. This is intentionally
 * simple (BM25-ish keyword scoring, no embeddings) swap for a proper vector
 * store when we plug in the live Grok model.
 *
 * NOTE: All corpus content is server-authored. No user input touches this
 * index; the retrieval step only reads its own precomputed docs.
 */

export type RagDoc = {
  id: string;
  title: string;
  url: string;
  content: string;
  locale: Locale;
};

function docsFromServices(locale: Locale): RagDoc[] {
  return allServices.map((s) => {
    const c = s.copy[locale];
    const line = s.line === 'hardware' ? 'services/hardware' : 'services/development';
    const url = `${site.url}${locale === 'en' ? '' : `/${locale}`}/${line}/${c.slug}`;
    return {
      id: `service:${s.id}:${locale}`,
      title: c.title,
      url,
      content: [
        c.title,
        c.summary,
        c.whatItIs,
        c.whoItsFor,
        c.outcomes.join(' '),
        c.process.map((p) => `${p.step}: ${p.body}`).join(' '),
      ].join('\n\n'),
      locale,
    };
  });
}

function docsFromFaq(locale: Locale): RagDoc[] {
  return faqData[locale].map((g) =>
    g.items.map((it, i) => ({
      id: `faq:${g.slug}:${i}:${locale}`,
      title: it.q,
      url: `${site.url}${locale === 'en' ? '' : `/${locale}`}/faq#${g.slug}-${i}`,
      content: `${it.q}\n\n${it.a}`,
      locale,
    })),
  ).flat();
}

const cache = new Map<Locale, RagDoc[]>();
function docs(locale: Locale): RagDoc[] {
  const cached = cache.get(locale);
  if (cached) return cached;
  const built = [...docsFromServices(locale), ...docsFromFaq(locale)];
  cache.set(locale, built);
  return built;
}

const stop = new Set(
  'the a an and or of for to in on with is are was were be been being it this that these those we you your our their he she they i me my do does did have has had not no yes as at by from about into onto over under please can could would should will just also more most much many few some any all one two three how what why when where who whom which'.split(
    /\s+/,
  ),
);

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 2 && !stop.has(t));
}

/** Simple TF scoring good enough as a stub retriever grounded in our copy. */
export function ragSearch(query: string, locale: Locale, k = 4): RagDoc[] {
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];
  const scored = docs(locale).map((d) => {
    const dTokens = tokenize(d.content);
    if (dTokens.length === 0) return { d, score: 0 };
    const freq = new Map<string, number>();
    for (const t of dTokens) freq.set(t, (freq.get(t) ?? 0) + 1);
    let score = 0;
    for (const q of qTokens) {
      const f = freq.get(q);
      if (f) score += 1 + Math.log(f);
    }
    return { d, score };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).filter((s) => s.score > 0).map((s) => s.d);
}
