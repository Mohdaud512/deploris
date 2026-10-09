import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, definedTermSchema } from '@/lib/schema';
import { glossaryData } from '@/content/glossary';

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    glossaryData[locale as Locale].map((t) => ({ locale, term: t.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; term: string }>;
}) {
  const { locale, term } = await params;
  const found = glossaryData[locale].find((t) => t.slug === term);
  if (!found) return {};
  return buildMetadata({
    locale,
    path: `/glossary/${term}`,
    title: `${found.term} ${locale === 'de' ? 'Glossar' : 'Glossary'} | Deploris`,
    description: found.description,
    type: 'article',
  });
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ locale: Locale; term: string }>;
}) {
  const { locale, term } = await params;
  const found = glossaryData[locale].find((t) => t.slug === term);
  if (!found) notFound();
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="container py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-brand-900/80 dark:text-white/60">
        <Link href={`${prefix}/glossary`} className="hover:underline">
          {locale === 'de' ? 'Glossar' : 'Glossary'}
        </Link>{' '}
        / <span>{found.term}</span>
      </nav>
      <h1 className="mt-3 font-display text-3xl font-bold text-brand-900 md:text-4xl dark:text-white">
        {found.term}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-brand-900/85 dark:text-white/85">{found.description}</p>
      <div className="prose prose-brand mt-8 max-w-3xl dark:prose-invert">
        <p>{found.body}</p>
      </div>

      {found.related && found.related.length > 0 && (
        <aside className="mt-10 max-w-3xl rounded-2xl border border-brand-900/10 bg-brand-50 p-6 dark:border-white/10 dark:bg-white/5">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-700 dark:text-accent-400">
            {locale === 'de' ? 'Weiterführend' : 'Related'}
          </h2>
          <ul className="mt-3 space-y-2">
            {found.related.map((r) => (
              <li key={r.href}>
                <Link
                  href={`${prefix}${r.href}`}
                  className="text-brand-900 underline underline-offset-2 hover:text-brand-700 dark:text-white dark:hover:text-accent-400"
                >
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}

      <SchemaJsonLd
        data={[
          definedTermSchema({
            slug: found.slug,
            name: found.term,
            description: found.description,
            locale,
            sameAs: found.sameAs,
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Glossar' : 'Glossary', href: `${prefix}/glossary` },
            { name: found.term, href: `${prefix}/glossary/${term}` },
          ]),
        ]}
      />
    </section>
  );
}
