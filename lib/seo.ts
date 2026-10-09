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

  return {
    metadataBase: new URL(publicEnv.siteUrl),
    title: {
      default: title,
      template: `%s | ${site.name}`,
    },
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
      images: [{ url: image ?? '/og-default.png', width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image ?? '/og-default.png'],
    },
  };
}
