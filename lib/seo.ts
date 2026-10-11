import type { Metadata } from 'next';
import { publicEnv } from './env';
import { locales, type Locale } from '@/config/locales';
import { site } from '@/config/site';

type BuildMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Path *without* locale prefix, e.g. "/services/hardware". For pages whose
   *  slug differs between locales (service details, glossary terms, etc.),
   *  this should be the slug for the CURRENT locale; use `pathByLocale` to
   *  tell the helper the other locales' slugs. */
  path: string;
  /** Per-locale paths for pages where the slug is localised. When provided,
   *  canonical uses the current locale's entry, hreflang alternates use each
   *  locale's entry, and x-default uses the EN entry. Without this,
   *  alternates mirror the current path and 404 on translated-slug pages. */
  pathByLocale?: Partial<Record<Locale, string>>;
  image?: string;
  noIndex?: boolean;
  type?: 'website' | 'article';
  /** Absolute RSS URL to declare via <link rel="alternate" type="application/rss+xml">. */
  rss?: string;
};

/** Build canonical + hreflang + OG/Twitter for a page. */
export function buildMetadata({
  locale,
  title,
  description,
  path,
  pathByLocale,
  image,
  noIndex,
  type = 'website',
  rss,
}: BuildMetaInput): Metadata {
  // Normalize paths: the home page passes '/' which should be the empty string
  // in URLs (so DE home resolves to /de, not /de/). Any other path keeps its
  // leading slash and drops a trailing slash for consistency.
  const normalize = (p: string): string => {
    if (!p || p === '/') return '';
    return p.replace(/\/+$/, '');
  };
  const pathFor = (l: Locale): string => normalize(pathByLocale?.[l] ?? path);
  const pathWithLocale = (l: Locale): string => (l === 'en' ? pathFor(l) : `/${l}${pathFor(l)}`);

  const localizedPath = pathWithLocale(locale);
  const canonical = `${publicEnv.siteUrl}${localizedPath}` || publicEnv.siteUrl;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${publicEnv.siteUrl}${pathWithLocale(l)}` || publicEnv.siteUrl;
  }
  // x-default resolves to the EN URL (consistent with sitemap behaviour).
  languages['x-default'] = `${publicEnv.siteUrl}${pathFor('en')}` || publicEnv.siteUrl;

  // Append " | Deploris" if not already present. We don't use title.template
  // here because every page composes its own full metadata via this helper
  // (no nested routes rely on the template firing on a child), and that
  // double-booked risk of "Foo | Deploris | Deploris" was flagged in the
  // SEO audit. Belt-and-suspenders: strip repeated suffix defensively.
  const trimmed = title.replace(/\s*\|\s*Deploris\s*$/i, '').trim();
  const brandedTitle = `${trimmed} | ${site.name}`;

  return {
    metadataBase: new URL(publicEnv.siteUrl),
    title: brandedTitle,
    description,
    alternates: {
      canonical,
      languages,
      ...(rss ? { types: { 'application/rss+xml': rss } } : {}),
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type,
      // Explicit og:image on every page. When a page doesn't pass its own,
      // fall back to the site-wide `app/opengraph-image.tsx` route. Previously
      // this was left to Next's file-conventions to auto-fill, but returning
      // an openGraph object without `images` prevented inheritance on 13
      // commercial pages (home EN/DE, hubs, tools, finder, demos, about,
      // quote) — flagged in the live-site SEO audit as missing og:image.
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: title }]
        : [{ url: `${publicEnv.siteUrl}/opengraph-image`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [`${publicEnv.siteUrl}/opengraph-image`],
    },
  };
}
