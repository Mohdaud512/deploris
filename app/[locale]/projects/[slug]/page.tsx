import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import type { Locale } from '@/config/locales';
import { locales } from '@/config/locales';
import { projects } from '@/content/projects';
import { buildMetadata } from '@/lib/seo';
import { SchemaJsonLd } from '@/components/seo/SchemaJsonLd';
import { caseStudySchema, breadcrumbSchema } from '@/lib/schema';

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  const c = p.copy[locale];
  return buildMetadata({ locale, path: `/projects/${slug}`, title: c.title, description: c.summary, type: 'article' });
}

export default async function ProjectDetail({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  setRequestLocale(locale);
  const c = p.copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <article className="container py-14">
      <p className="text-xs uppercase tracking-widest text-brand-700 dark:text-accent-400">
        {p.line === 'hardware' ? 'Hardware' : locale === 'de' ? 'Entwicklung' : 'Development'}
      </p>
      <h1 className="mt-2 max-w-3xl font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {c.title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-brand-900/85 dark:text-white/85">{c.summary}</p>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {c.metrics.map((m) => (
          <div key={m.label} className="rounded-2xl border border-brand-900/10 bg-white p-6 text-center dark:border-white/10 dark:bg-white/5">
            <p className="font-display text-3xl font-bold text-brand-900 dark:text-white">{m.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-brand-900/80 dark:text-white/60">{m.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">{locale === 'de' ? 'Herausforderung' : 'Challenge'}</h2>
          <p className="mt-3 text-brand-900/85 dark:text-white/85">{c.challenge}</p>
        </div>
        <div>
          <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">{locale === 'de' ? 'Lösung' : 'Solution'}</h2>
          <p className="mt-3 text-brand-900/85 dark:text-white/85">{c.solution}</p>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-xl font-semibold text-brand-900 dark:text-white">Stack</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {c.stack.map((s) => (
            <li key={s} className="rounded-full bg-brand-50 px-3 py-1 text-xs text-brand-900 dark:bg-white/10 dark:text-white">
              {s}
            </li>
          ))}
        </ul>
      </section>

      <SchemaJsonLd
        data={[
          caseStudySchema({
            title: c.title,
            description: c.summary,
            slug,
            date: p.date,
            locale,
            about: p.about,
          }),
          breadcrumbSchema([
            { name: 'Home', href: prefix || '/' },
            { name: locale === 'de' ? 'Referenzen' : 'Case studies', href: `${prefix}/projects` },
            { name: c.title, href: `${prefix}/projects/${slug}` },
          ]),
        ]}
      />
    </article>
  );
}
