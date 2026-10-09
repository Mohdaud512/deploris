import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { roles } from '@/content/careers';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { collectionPageSchema, breadcrumbSchema } from '@/lib/schema';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/careers',
    title: locale === 'de' ? 'Karriere Senior-Rollen remote in US und Deutschland' : 'Careers senior remote roles in the US and Germany',
    description: locale === 'de'
      ? 'Offene Senior-Positionen bei Deploris Backend, Infrastructure, AI Solutions. Remote-first, zweisprachig US und DACH, mit Verantwortung ab Tag eins.'
      : 'Open senior engineering roles at Deploris backend, infrastructure, AI solutions. Remote-first, bilingual US and DACH, with real responsibility from day one.',
  });
}

export default async function CareersPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {locale === 'de' ? 'Karriere' : 'Careers'}
      </h1>
      <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
        {locale === 'de'
          ? 'Wir stellen selektiv ein Senior-Ingenieurinnen und Ingenieure, die Verantwortung wollen. Alle Rollen sind US-DE-remote-freundlich.'
          : "We hire selectively senior engineers who want responsibility. All roles are US/DE remote-friendly."}
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {roles.map((r) => (
          <Link
            key={r.slug}
            href={`${prefix}/careers/${r.slug}`}
            className="block rounded-2xl border border-brand-900/10 bg-white p-6 hover:border-brand-900/30 dark:border-white/10 dark:bg-white/5"
          >
            <h2 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
              {r.copy[locale].title}
            </h2>
            <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{r.copy[locale].summary}</p>
          </Link>
        ))}
      </div>
      <SchemaJsonLd
        data={[
          collectionPageSchema({
            locale,
            path: '/careers',
            title: locale === 'de' ? 'Karriere bei Deploris' : 'Careers at Deploris',
            description: locale === 'de'
              ? 'Offene Senior-Positionen bei Deploris US und Deutschland, remote-first.'
              : 'Open senior engineering roles at Deploris US and Germany, remote-first.',
            hasPart: roles.map((r) => ({
              name: r.copy[locale].title,
              url: `${prefix}/careers/${r.slug}`,
            })),
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Karriere' : 'Careers', href: `${prefix}/careers` },
          ]),
        ]}
      />
    </section>
  );
}
