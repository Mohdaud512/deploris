import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { getAllBlogPosts, getBlogPost } from '@/lib/mdx';
import { MdxRenderer } from '@/components/mdx/MdxRenderer';
import { AuthorByline } from '@/components/marketing/AuthorByline';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return locales.flatMap((l) => getAllBlogPosts(l as Locale).map((p) => ({ locale: l, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) return {};
  return buildMetadata({
    locale,
    path: `/blog/${slug}`,
    title: post.data.title,
    description: post.data.description,
    type: 'article',
  });
}

export default async function BlogPost({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale, slug);
  if (!post) notFound();
  setRequestLocale(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <article className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {post.data.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-brand-900/85 dark:text-white/85">{post.data.description}</p>
      <div className="mt-6">
        <AuthorByline
          author={post.data.author}
          date={post.data.date}
          updated={post.data.updated}
          locale={locale}
        />
      </div>
      <div className="mt-8">
        <MdxRenderer source={post.body} />
      </div>
      <SchemaJsonLd
        data={[
          articleSchema({
            title: post.data.title,
            description: post.data.description,
            slug,
            date: post.data.date,
            updated: post.data.updated,
            author: post.data.author,
            // All current posts are authored by the Deploris managing member;
            // the slug makes `author.url` resolve to the real Person page.
            authorSlug: post.data.author === 'Muhammad Daud' ? 'muhammad-daud' : undefined,
            locale,
            image: post.data.hero,
            keywords: post.data.tags,
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: 'Blog', href: `${prefix}/blog` },
            { name: post.data.title, href: `${prefix}/blog/${slug}` },
          ]),
        ]}
      />
    </article>
  );
}
