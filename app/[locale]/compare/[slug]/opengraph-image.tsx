import { renderOg } from '@/lib/og';
import type { Locale } from '@/config/locales';

export const runtime = 'edge';
export const alt = 'Deploris comparison';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Lightweight local copy of the compare titles so this OG route doesn't
// have to import the full compare page module (which pulls server-only
// code like `next-intl/server` that can't run on the edge).
const COMPARE_TITLES: Record<string, { en: string; de: string }> = {
  'custom-crm-vs-off-the-shelf': {
    en: 'Custom CRM vs. off-the-shelf CRM',
    de: 'Individuelles CRM vs. Standard-CRM',
  },
  'rag-vs-traditional-search': {
    en: 'RAG vs. traditional search',
    de: 'RAG vs. klassische Suche',
  },
  'ai-agents-vs-automation': {
    en: 'AI agents vs. traditional automation',
    de: 'KI-Agenten vs. klassische Automatisierung',
  },
};

export default async function CompareOG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const entry = COMPARE_TITLES[slug];
  const title = entry?.[locale] ?? 'Deploris comparison';
  return renderOg({
    title,
    eyebrow: locale === 'de' ? 'Deploris · Vergleich' : 'Deploris · Compare',
    footer: locale === 'de' ? 'Schriftliches Fazit in einem Werktag' : 'Written assessment in one business day',
  });
}
