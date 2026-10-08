import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { BlogCard } from '@/components/marketing/BlogCard';
import { getAllBlogPosts } from '@/lib/mdx';
import { NewsletterOptIn } from '@/components/forms/NewsletterOptIn';

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return buildMetadata({
    locale,
    path: '/blog',
    title:
      locale === 'de'
        ? 'Blog Praxis-Wissen zu CRM, RAG, KI und IT-Betrieb | Deploris'
        : 'Blog Practical writing on CRM, RAG, AI, and IT operations | Deploris',
    description:
      locale === 'de'
        ? 'Erkenntnisse aus echten Projekten CRM-Entwicklung, RAG-Systeme, KI-Automatisierung und IT-Infrastruktur.'
        : 'Lessons from real engagements custom CRM, RAG systems, AI automation, and IT infrastructure.',
  });
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const posts = getAllBlogPosts(locale);
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {locale === 'de' ? 'Blog' : 'Blog'}
      </h1>
      <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
        {locale === 'de'
          ? 'Praxiswissen aus echten Projekten kein Content-Marketing-Filler.'
          : 'Field notes from real engagements no content-marketing filler.'}
      </p>
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
        {posts.length === 0 && (
          <p className="text-brand-900/85 dark:text-white/70">
            {locale === 'de' ? 'Bald verfügbar.' : 'Coming soon.'}
          </p>
        )}
      </div>

      <div className="mt-16 rounded-3xl border border-brand-900/10 bg-white p-8 dark:border-white/10 dark:bg-white/5">
        <NewsletterOptIn />
      </div>
    </section>
  );
}
