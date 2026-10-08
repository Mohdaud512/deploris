import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { cities, cityServiceIds } from '@/config/cities';
import { findService } from '@/config/services';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, serviceSchema } from '@/lib/schema';
import { CTASection } from '@/components/marketing/CTASection';

/**
 * Programmatic pages: /locations/[cityslug]-[serviceid]
 * e.g. /de/locations/berlin-custom-crm
 *
 * We only generate combinations Deploris actually serves. Empty result if the
 * pair is not on the whitelist no thin/duplicate content risk.
 */

const SLUG = /^([a-z0-9-]+)-((?:custom-crm|rag-systems|ai-agents-automation|custom-systems|infrastructure-support))$/;

function parse(slug: string) {
  const match = slug.match(SLUG);
  if (!match) return null;
  const [, citySlug, serviceId] = match;
  const city = cities.find((c) => c.slug === citySlug);
  const service = serviceId ? findService(serviceId) : undefined;
  if (!city || !service || !cityServiceIds.includes(service.id)) return null;
  return { city, service };
}

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const l of locales) {
    for (const city of cities) {
      for (const id of cityServiceIds) {
        params.push({ locale: l, slug: `${city.slug}-${id}` });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const parsed = parse(slug);
  if (!parsed) return {};
  const { city, service } = parsed;
  const svcTitle = service.copy[locale].title;
  return buildMetadata({
    locale,
    path: `/locations/${slug}`,
    title: `${svcTitle} ${city.name} | Deploris`,
    description: `${svcTitle} for ${city.name} clients served ${city.country === 'DE' ? 'Germany-wide' : 'US-wide'} remotely with on-site visits on request.`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const parsed = parse(slug);
  if (!parsed) notFound();
  setRequestLocale(locale);
  const { city, service } = parsed;
  const c = service.copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const de = locale === 'de';

  return (
    <>
      <section className="container py-14">
        <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
          {de ? 'Standort' : 'Location'} · {city.name}
        </p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
          {c.title} {city.name}
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">
          {city.copy[locale].intro}
        </p>
        <p className="mt-4 max-w-3xl text-brand-900/85 dark:text-white/70">
          {city.copy[locale].localAngle}
        </p>
      </section>

      <section className="container pb-8">
        <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
          {de ? 'Was Sie bekommen' : 'What you get'}
        </h2>
        <p className="mt-3 max-w-3xl text-brand-900/85 dark:text-white/85">{c.whatItIs}</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {c.outcomes.map((o) => (
            <li key={o} className="rounded-xl border border-brand-900/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-4">
          <Link
            href={`${prefix}/services/${service.line === 'hardware' ? 'hardware' : 'development'}/${c.slug}`}
            className="text-brand-700 underline dark:text-accent-400"
          >
            {de ? 'Details zur Leistung ansehen' : 'See full service details'} →
          </Link>
        </p>
      </section>

      <CTASection
        title={de ? `Beratung für ${city.name}` : `Consultation for ${city.name}`}
        body={de ? 'Schriftliches Angebot innerhalb eines Werktags.' : 'Written scope within one business day.'}
        primaryHref={`${prefix}/quote`}
        primaryLabel={de ? 'Angebot anfordern' : 'Get a quote'}
      />

      <SchemaJsonLd
        data={[
          serviceSchema(service.id, locale)!,
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: city.name, href: `${prefix}/locations/${slug}` },
          ]),
        ]}
      />
    </>
  );
}
