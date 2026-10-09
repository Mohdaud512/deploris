import type { Metadata } from 'next';
import { publicEnv } from './env';
import { locales, type Locale } from '@/config/locales';
import { site } from '@/config/site';

type BuildMetaInput = {
  locale: Locale;
  title: string;
  description: string;
  /** Path *without* locale prefix, e.g. "/services/hardware". */
  path: string;
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
  image,
  noIndex,
  type = 'website',
  rss,
}: BuildMetaInput): Metadata {
  const localizedPath = locale === 'en' ? path : `/${locale}${path}`;
  const canonical = `${publicEnv.siteUrl}${localizedPath}`;
  const languages: Record<string, string> = {};
  for (const l of locales) {
    languages[l] = `${publicEnv.siteUrl}${l === 'en' ? path : `/${l}${path}`}`;
  }
  languages['x-default'] = `${publicEnv.siteUrl}${path}`;

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
      // When no explicit image is passed, we let Next's file-conventions
      // auto-populate from the nearest opengraph-image.tsx — per-page
      // dynamic OGs win for routes that have one; everything else inherits
      // the root app/opengraph-image.tsx. Setting an explicit path here
      // would override that resolution.
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}
