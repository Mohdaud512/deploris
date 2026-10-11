import type { MetadataRoute } from 'next';
import { publicEnv } from '@/lib/env';

export default function robots(): MetadataRoute.Robots {
  const base = publicEnv.siteUrl.replace(/\/$/, '');
  return {
    rules: [
      // Allow all standard search + explicit AI crawlers.
      { userAgent: '*', allow: '/', disallow: ['/api/', '/legal/data-request/'] },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
    ],
    sitemap: `${base}/sitemap.xml`,
    // `host` was a Yandex-only hint ignored by Google and Bing; dropped.
  };
}
