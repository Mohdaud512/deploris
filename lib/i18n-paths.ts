import type { Locale } from '@/config/locales';
import { allServices } from '@/config/services';
import { glossaryData } from '@/content/glossary';

/**
 * Translate a locale-stripped path from one locale to another, preserving
 * localised slugs. Used by the header locale switcher and anywhere else we
 * need to flip a URL across locales without 404-ing on routes whose slug
 * differs between EN and DE (service details, glossary terms, service
 * segment labels like "services" vs "leistungen" when those exist).
 *
 * Returns a path WITHOUT a locale prefix. Callers add the `/de` prefix
 * themselves when the target locale is DE.
 *
 * If no translation is known for a path, returns the input unchanged so
 * the switcher degrades to the previous naive behaviour (which still works
 * for every route whose slug is identical in both locales).
 */
export function translateLocaleStrippedPath(
  path: string,
  from: Locale,
  to: Locale,
): string {
  if (from === to) return path;
  if (!path || path === '/') return path;

  // Normalise once: strip trailing slash, ensure leading slash.
  const clean = ('/' + path.replace(/^\/+/, '').replace(/\/+$/, '')) || '/';

  // --- Service details: /services/{line}/{slug} ---
  const svcMatch = clean.match(/^\/services\/(hardware|development)\/([^/]+)(.*)$/);
  if (svcMatch) {
    const [, line, slug, tail] = svcMatch;
    const svc = allServices.find((s) => s.copy[from].slug === slug);
    if (svc) {
      const toSlug = svc.copy[to].slug;
      return `/services/${line}/${toSlug}${tail}`;
    }
  }

  // --- Glossary terms: /glossary/{slug} ---
  const glossaryMatch = clean.match(/^\/glossary\/([^/]+)(.*)$/);
  if (glossaryMatch) {
    const [, slug, tail] = glossaryMatch;
    const idx = glossaryData[from].findIndex((t) => t.slug === slug);
    if (idx >= 0 && glossaryData[to][idx]) {
      return `/glossary/${glossaryData[to][idx].slug}${tail}`;
    }
  }

  return clean;
}
