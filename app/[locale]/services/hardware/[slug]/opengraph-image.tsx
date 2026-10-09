import { findServiceBySlug } from '@/config/services';
import { renderOg } from '@/lib/og';
import type { Locale } from '@/config/locales';

export const runtime = 'edge';
export const alt = 'Deploris hardware service';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function HardwareServiceOG({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const svc = findServiceBySlug(locale, slug);
  const title = svc?.copy[locale].h1 ?? 'Deploris hardware service';
  return renderOg({
    title,
    eyebrow: locale === 'de' ? 'Deploris · Hardware & Infrastruktur' : 'Deploris · Hardware & Infrastructure',
    footer: locale === 'de' ? 'Unter schriftlicher SLA' : 'Under a written SLA',
  });
}
