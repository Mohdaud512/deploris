import { roles } from '@/content/careers';
import { renderOg } from '@/lib/og';
import type { Locale } from '@/config/locales';

export const runtime = 'edge';
export const alt = 'Deploris open role';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function CareerOG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const r = roles.find((x) => x.slug === slug);
  const title = r?.copy[locale].title ?? 'Deploris career';
  return renderOg({
    title,
    eyebrow: locale === 'de' ? 'Deploris · Karriere' : 'Deploris · Careers',
    footer: locale === 'de' ? 'Remote · US / Deutschland' : 'Remote · US / Germany',
  });
}
