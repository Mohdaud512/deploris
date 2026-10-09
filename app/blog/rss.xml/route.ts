import { publicEnv } from '@/lib/env';
import { getAllBlogPosts } from '@/lib/mdx';
import { site } from '@/config/site';

/**
 * RSS 2.0 feed for the Deploris blog. Served at /blog/rss.xml and declared
 * from the blog listing via <link rel="alternate" type="application/rss+xml">.
 *
 * AI answer engines (Perplexity, Google AI Overviews, ChatGPT Search) use
 * RSS as a fresh-content discovery signal in addition to sitemaps. English
 * is the canonical feed language; German posts remain discoverable via the
 * sitemap and hreflang alternates on each post.
 */

export const dynamic = 'force-static';
export const revalidate = 3600;

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const base = publicEnv.siteUrl.replace(/\/$/, '');
  const posts = getAllBlogPosts('en').sort((a, b) => (a.date < b.date ? 1 : -1));
  const lastBuildDate = posts[0]
    ? new Date(posts[0].updated ?? posts[0].date).toUTCString()
    : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const url = `${base}/blog/${p.slug}`;
      const pubDate = new Date(p.date).toUTCString();
      const categories = (p.tags ?? []).map((t) => `    <category>${xmlEscape(t)}</category>`).join('\n');
      return `  <item>
    <title>${xmlEscape(p.title)}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${xmlEscape(p.description)}</description>
    <author>hello@deploris.com (${xmlEscape(p.author)})</author>
${categories}
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${xmlEscape(site.name)} Blog</title>
    <link>${base}/blog</link>
    <atom:link href="${base}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${xmlEscape(site.description.en)}</description>
    <language>en-US</language>
    <copyright>${new Date().getFullYear()} ${xmlEscape(site.legalName)}</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <generator>Deploris / Next.js</generator>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
