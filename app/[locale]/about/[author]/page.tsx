import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, personSchema } from '@/lib/schema';
import { authors, findAuthor } from '@/content/authors';
import { getAllBlogPosts } from '@/lib/mdx';
import { site } from '@/config/site';

export function generateStaticParams() {
  return locales.flatMap((locale) => authors.map((a) => ({ locale, author: a.slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; author: string }>;
}) {
  const { locale, author } = await params;
  const a = findAuthor(author);
  if (!a) return {};
  const c = a.copy[locale];
  return buildMetadata({
    locale,
    path: `/about/${author}`,
    title: `${a.name} ${c.jobTitle}`,
    description: c.headline,
    type: 'article',
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: Locale; author: string }>;
}) {
  const { locale, author } = await params;
  const a = findAuthor(author);
  if (!a) notFound();
  setRequestLocale(locale);
  const c = a.copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const de = locale === 'de';

  // Posts attributed to this author (match on name string in frontmatter).
  const authoredPosts = getAllBlogPosts(locale).filter((p) => p.author === a.name);

  return (
    <section className="container py-14">
      <nav aria-label="Breadcrumb" className="text-xs text-brand-900/80 dark:text-white/60">
        <Link href={`${prefix}/about`} className="hover:underline">
          {de ? 'Über uns' : 'About'}
        </Link>{' '}
        / <span>{a.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <aside>
          {/* Monogram avatar — initials in a brand circle, no external image
              needed. If a real headshot lands later, swap this block. */}
          <div
            aria-hidden
            className="flex h-32 w-32 items-center justify-center rounded-full bg-brand-900 text-5xl font-semibold text-white dark:bg-accent-500 dark:text-brand-950"
          >
            {a.name
              .split(' ')
              .map((p) => p[0])
              .join('')
              .slice(0, 2)}
          </div>
          <h1 className="mt-6 font-display text-3xl font-bold text-brand-900 dark:text-white">
            {a.name}
          </h1>
          <p className="mt-2 text-sm font-medium text-brand-700 dark:text-accent-400">
            {c.jobTitle}
          </p>
          {a.social.linkedin && (
            <p className="mt-4">
              <a
                href={a.social.linkedin}
                className="text-sm text-brand-900 underline underline-offset-2 hover:text-brand-700 dark:text-white dark:hover:text-accent-400"
                rel="me noopener"
                target="_blank"
              >
                LinkedIn →
              </a>
            </p>
          )}
        </aside>

        <div>
          <p className="text-lg font-medium text-brand-900 dark:text-white">{c.headline}</p>
          <p className="mt-4 text-brand-900/85 dark:text-white/85">{c.bio}</p>

          <h2 className="mt-10 font-display text-xl font-semibold text-brand-900 dark:text-white">
            {de ? 'Themenschwerpunkte' : 'Topics covered'}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.expertise.map((topic) => (
              <li
                key={topic}
                className="rounded-full border border-brand-900/10 bg-brand-50 px-3 py-1 text-xs text-brand-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
              >
                {topic}
              </li>
            ))}
          </ul>

          {authoredPosts.length > 0 && (
            <>
              <h2 className="mt-10 font-display text-xl font-semibold text-brand-900 dark:text-white">
                {de ? 'Beiträge von ' + a.name : 'Posts by ' + a.name}
              </h2>
              <ul className="mt-4 space-y-3">
                {authoredPosts.map((p) => (
                  <li key={p.slug} className="border-b border-brand-900/10 pb-3 dark:border-white/10">
                    <Link
                      href={`${prefix}/blog/${p.slug}`}
                      className="text-brand-900 underline underline-offset-2 hover:text-brand-700 dark:text-white dark:hover:text-accent-400"
                    >
                      {p.title}
                    </Link>
                    <p className="mt-1 text-sm text-brand-900/85 dark:text-white/85">
                      {p.description}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      <SchemaJsonLd
        data={[
          personSchema({
            name: a.name,
            slug: a.slug,
            jobTitle: c.jobTitle,
            description: c.headline,
            sameAs: Object.values(a.social).filter(Boolean),
            // Served by Next.js file-conventions; falls back to the default
            // OG card when a per-author image doesn't exist. Google uses it
            // for Person entity enrichment and AI-overview citation chips.
            image: `/about/${a.slug}/opengraph-image`,
            knowsAbout: c.expertise,
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: de ? 'Über uns' : 'About', href: `${prefix}/about` },
            { name: a.name, href: `${prefix}/about/${a.slug}` },
          ]),
        ]}
      />
    </section>
  );
}
