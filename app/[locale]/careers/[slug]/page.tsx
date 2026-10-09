import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { buildMetadata } from '@/lib/seo';
import { roles } from '@/content/careers';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { breadcrumbSchema, jobPostingSchema } from '@/lib/schema';
import { site } from '@/config/site';

export function generateStaticParams() {
  return locales.flatMap((l) => roles.map((r) => ({ locale: l, slug: r.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const r = roles.find((x) => x.slug === slug);
  if (!r) return {};
  const c = r.copy[locale];
  return buildMetadata({
    locale,
    path: `/careers/${slug}`,
    title: locale === 'de' ? `${c.title} remote Senior-Rolle` : `${c.title} remote senior role`,
    description: c.summary,
  });
}

export default async function RolePage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const r = roles.find((x) => x.slug === slug);
  if (!r) notFound();
  setRequestLocale(locale);
  const c = r.copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <article className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">{c.title}</h1>
      <p className="mt-4 text-lg text-brand-900/85 dark:text-white/85">{c.summary}</p>
      <div className="prose prose-brand mt-8 max-w-3xl dark:prose-invert">
        <p>{c.body}</p>
        <p>
          {locale === 'de' ? 'Bewerbung an ' : 'Apply by emailing '}
          <a href={`mailto:${site.contact.email}?subject=Application: ${encodeURIComponent(c.title)}`}>
            {site.contact.email}
          </a>
          {locale === 'de' ? ' kurze Nachricht + CV oder GitHub genügt.' : ' a short note + CV or GitHub is enough.'}
        </p>
      </div>
      <SchemaJsonLd
        data={[
          jobPostingSchema({
            title: c.title,
            slug: r.slug,
            description: c.body,
            employmentType: r.employmentType,
            datePosted: r.datePosted,
            validThrough: r.validThrough,
            baseSalary: r.baseSalary,
            locale,
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Karriere' : 'Careers', href: `${prefix}/careers` },
            { name: c.title, href: `${prefix}/careers/${slug}` },
          ]),
        ]}
      />
    </article>
  );
}
