import type { MetadataRoute } from 'next';
import { publicEnv } from '@/lib/env';
import { locales, type Locale } from '@/config/locales';
import { allServices } from '@/config/services';
import { glossaryData } from '@/content/glossary';
import { faqData as _faq } from '@/content/faq';
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
  '/services/hardware',
  '/services/development',
  '/legal/impressum',
  '/legal/privacy',
  '/legal/cookies',
  '/legal/terms',
  '/legal/dpa',
  '/legal/data-request',
  '/compare/custom-crm-vs-off-the-shelf',
  '/compare/rag-vs-traditional-search',
  '/compare/ai-agents-vs-automation',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = publicEnv.siteUrl.replace(/\/$/, '');
  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  function push(loc: string, priority = 0.5, changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] = 'weekly') {
    const alternates: Record<string, string> = {};
    for (const l of locales) alternates[l] = `${base}${l === 'en' ? '' : `/${l}`}${loc}`;
    alternates['x-default'] = `${base}${loc}`;
    // We push one entry per locale so search engines see per-locale URLs.
    for (const l of locales) {
      entries.push({
        url: `${base}${l === 'en' ? '' : `/${l}`}${loc}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: alternates },
      });
    }
  }

  for (const path of staticPaths) push(path, path === '' ? 1 : 0.7);

  for (const svc of allServices) {
    // Each service uses per-locale slug in its own URL; still list both.
    for (const l of locales) {
      const lang = l as Locale;
      const url = `${base}${lang === 'en' ? '' : `/${lang}`}/services/${svc.line === 'hardware' ? 'hardware' : 'development'}/${svc.copy[lang].slug}`;
      entries.push({ url, lastModified: now, changeFrequency: 'weekly', priority: 0.8 });
    }
  }

  for (const g of glossaryData.en) {
    push(`/glossary/${g.slug}`, 0.5, 'monthly');
  }

  for (const p of projects) push(`/projects/${p.slug}`, 0.6, 'monthly');
  for (const r of roles) push(`/careers/${r.slug}`, 0.5, 'weekly');

  for (const city of cities) {
    for (const id of cityServiceIds) {
      push(`/locations/${city.slug}-${id}`, 0.5, 'monthly');
    }
  }

  for (const l of locales) {
    const lang = l as Locale;
    for (const post of getAllBlogPosts(lang)) {
      entries.push({
        url: `${base}${lang === 'en' ? '' : `/${lang}`}/blog/${post.slug}`,
        lastModified: post.updated ? new Date(post.updated) : new Date(post.date),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
