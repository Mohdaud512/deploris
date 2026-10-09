import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { BlogCard } from '@/components/marketing/BlogCard';
import { getAllBlogPosts } from '@/lib/mdx';

const SAFE_TAG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function generateStaticParams() {
  const params: { locale: string; tag: string }[] = [];
  for (const l of locales) {
    const tags = new Set<string>();
    for (const p of getAllBlogPosts(l as Locale)) {
      (p.tags ?? []).forEach((t) => tags.add(t));
    }
    for (const tag of tags) params.push({ locale: l, tag });
  }
  return params;
}

function tagLabel(tag: string): string {
  return tag
    .split('-')
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(' ');
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; tag: string }> }) {
  const { locale, tag } = await params;
  if (!SAFE_TAG.test(tag)) return {};
  const label = tagLabel(tag);
  return buildMetadata({
    locale,
    path: `/blog/tag/${tag}`,
    title:
      locale === 'de'
        ? `Thema: ${label} | Deploris Blog`
        : `Topic: ${label} | Deploris Blog`,
    description:
      locale === 'de'
        ? `Alle Blog-Beiträge im Themenfeld ${label}.`
        : `All posts tagged ${label}.`,
    // Tag pages have few posts and are near-duplicates of each other;
    // noindex until there are 5+ posts per tag so Google doesn't classify
    // them as thin content.
    noIndex: true,
  });
}

export default async function BlogTagPage({ params }: { params: Promise<{ locale: Locale; tag: string }> }) {
  const { locale, tag } = await params;
  if (!SAFE_TAG.test(tag)) notFound();
  setRequestLocale(locale);
  const posts = getAllBlogPosts(locale).filter((p) => (p.tags ?? []).includes(tag));
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="container py-14">
      <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
        {locale === 'de' ? 'Themen' : 'Tag'}
      </p>
      <h1 className="mt-2 font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">#{tag}</h1>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <BlogCard
            key={p.slug}
            href={`${prefix}/blog/${p.slug}`}
            title={p.title}
            description={p.description}
            date={p.date}
            author={p.author}
            tags={p.tags}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
}
