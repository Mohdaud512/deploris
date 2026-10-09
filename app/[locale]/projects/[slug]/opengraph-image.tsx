import { projects } from '@/content/projects';
import { renderOg } from '@/lib/og';
import type { Locale } from '@/config/locales';

export const runtime = 'edge';
export const alt = 'Deploris case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ProjectOG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const title = p?.copy[locale].title ?? 'Deploris case study';
  return renderOg({
    title,
    eyebrow: locale === 'de' ? 'Deploris · Referenz' : 'Deploris · Case study',
    footer: p?.copy[locale].result,
  });
}
