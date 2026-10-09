import { findServiceBySlug } from '@/config/services';
import { renderOg } from '@/lib/og';
import type { Locale } from '@/config/locales';

export const runtime = 'edge';
export const alt = 'Deploris development service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function DevServiceOG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = findServiceBySlug(locale, slug);
  const title = svc?.copy[locale].h1 ?? 'Deploris custom software';
  return renderOg({
    title,
    eyebrow: locale === 'de' ? 'Deploris · Softwareentwicklung' : 'Deploris · Software Development',
    footer: locale === 'de' ? 'Scope in einem Werktag' : 'Written scope in one business day',
  });
}
