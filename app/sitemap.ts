import type { MetadataRoute } from 'next';
import { publicEnv } from '@/lib/env';
import { locales, type Locale } from '@/config/locales';
import { allServices } from '@/config/services';
import { glossaryData } from '@/content/glossary';
import { projects } from '@/content/projects';
import { roles } from '@/content/careers';
import { cities, cityServiceIds } from '@/config/cities';
import { getAllBlogPosts } from '@/lib/mdx';

const staticPaths = [
  '',
  '/about',
  '/contact',
  '/quote',
  '/industries',
  '/projects',
  '/blog',
  '/faq',
  '/glossary',
  '/careers',
  '/services',
  '/services/hardware',
  '/services/development',
  '/legal/impressum',
  '/legal/privacy',
  '/legal/cookies',
  '/legal/terms',
  '/legal/dpa',
  // /legal/data-request intentionally excluded (noindex + robots-disallowed).
  '/compare/custom-crm-vs-off-the-shelf',
  '/compare/rag-vs-traditional-search',
  '/compare/ai-agents-vs-automation',
];

/**
 * Stable per-path `lastModified` values. Using `new Date()` here makes every
 * rebuild shift every URL's lastmod, which signals "everything changed" and
 * lowers crawl trust. These are canonical timestamps bumped only when the
 * underlying page content actually changes.
 */
const STATIC_LASTMOD: Record<string, string> = {
  '': '2026-10-09',
  '/about': '2026-10-01',
  '/contact': '2026-10-01',
  '/quote': '2026-10-01',
  '/industries': '2026-10-01',
  '/projects': '2026-06-10',
  '/blog': '2026-10-09',
  '/faq': '2026-10-09',
  '/glossary': '2026-07-01',
  '/careers': '2026-09-01',
  '/services': '2026-10-09',
  '/services/hardware': '2026-10-09',
  '/services/development': '2026-10-09',
  '/legal/impressum': '2026-10-08',
  '/legal/privacy': '2026-10-01',
  '/legal/cookies': '2026-10-01',
  '/legal/terms': '2026-10-08',
  '/legal/dpa': '2026-10-08',
  '/compare/custom-crm-vs-off-the-shelf': '2026-10-09',
  '/compare/rag-vs-traditional-search': '2026-10-09',
  '/compare/ai-agents-vs-automation': '2026-10-09',
};

const DEFAULT_LASTMOD = new Date('2026-10-01');

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.siteUrl.replace(/\/$/, '');
  const entries: MetadataRoute.Sitemap = [];

  function altLanguages(loc: string, perLocaleSlug?: Record<string, string>) {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      const slug = perLocaleSlug?.[l];
      const path = slug != null ? slug : loc;
      languages[l] = `${base}${l === 'en' ? '' : `/${l}`}${path}`;
    }
    languages['x-default'] = `${base}${(perLocaleSlug?.en ?? loc)}`;
    return languages;
  }

  function push(
    loc: string,
    priority = 0.5,
    changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly',
    lastmodKey?: string,
  ) {
    const langs = altLanguages(loc);
    const lmStr = STATIC_LASTMOD[lastmodKey ?? loc];
    const lastModified = lmStr ? new Date(lmStr) : DEFAULT_LASTMOD;
    for (const l of locales) {
      entries.push({
        url: `${base}${l === 'en' ? '' : `/${l}`}${loc}`,
        lastModified,
        changeFrequency,
        priority,
        alternates: { languages: langs },
      });
    }
  }

  for (const path of staticPaths) push(path, path === '' ? 1 : 0.7);

  // Service detail pages — per-locale slugs; emit both EN and DE URLs with
  // proper hreflang pairs so Google treats them as alternates of each other.
  for (const svc of allServices) {
    const perLocaleSlug: Record<string, string> = {};
    for (const l of locales) {
      const lang = l as Locale;
      const path = `/services/${svc.line}/${svc.copy[lang].slug}`;
      perLocaleSlug[l] = path;
    }
    const langs = altLanguages(perLocaleSlug.en!, perLocaleSlug);
    for (const l of locales) {
      const lang = l as Locale;
      entries.push({
        url: `${base}${lang === 'en' ? '' : `/${lang}`}${perLocaleSlug[l]}`,
        lastModified: new Date('2026-10-09'),
        changeFrequency: 'weekly',
        priority: 0.8,
        alternates: { languages: langs },
      });
    }
  }

  for (const g of glossaryData.en) {
    push(`/glossary/${g.slug}`, 0.5, 'monthly', '/glossary');
  }

  for (const p of projects) {
    const langs = altLanguages(`/projects/${p.slug}`);
    for (const l of locales) {
      entries.push({
        url: `${base}${l === 'en' ? '' : `/${l}`}/projects/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: langs },
      });
    }
  }

  for (const r of roles) {
    const langs = altLanguages(`/careers/${r.slug}`);
    for (const l of locales) {
      entries.push({
        url: `${base}${l === 'en' ? '' : `/${l}`}/careers/${r.slug}`,
        lastModified: new Date(r.datePosted),
        changeFrequency: 'weekly',
        priority: 0.5,
        alternates: { languages: langs },
      });
    }
  }

  for (const city of cities) {
    for (const id of cityServiceIds) {
      push(`/locations/${city.slug}-${id}`, 0.5, 'monthly', '/industries');
    }
  }

  for (const l of locales) {
    const lang = l as Locale;
    for (const post of getAllBlogPosts(lang)) {
      const langs: Record<string, string> = {};
      for (const other of locales) {
        langs[other] = `${base}${other === 'en' ? '' : `/${other}`}/blog/${post.slug}`;
      }
      langs['x-default'] = `${base}/blog/${post.slug}`;
      entries.push({
        url: `${base}${lang === 'en' ? '' : `/${lang}`}/blog/${post.slug}`,
        lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: { languages: langs },
      });
    }
  }

  // Blog tag pages intentionally excluded (noindex, thin, few posts).

  return entries;
}
