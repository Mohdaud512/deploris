'use client';

import { useState, useMemo } from 'react';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { projects } from '@/content/projects';
import type { Locale } from '@/config/locales';
import { CaseStudyCard } from '@/components/marketing/CaseStudyCard';

export default function ProjectsPage() {
  const locale = useLocale() as Locale;
  const [filter, setFilter] = useState<'all' | 'hardware' | 'development'>('all');
  const prefix = locale === 'en' ? '' : `/${locale}`;

  const shown = useMemo(
    () => projects.filter((p) => filter === 'all' || p.line === filter),
    [filter],
  );

  return (
    <section className="container py-14">
      <h1 className="font-display text-4xl font-bold text-brand-900 md:text-5xl dark:text-white">
        {locale === 'de' ? 'Referenzen' : 'Case studies'}
      </h1>
      <p className="mt-3 max-w-2xl text-brand-900/85 dark:text-white/85">
        {locale === 'de'
          ? 'Ausgewählte Kundenprojekte anonymisierte Platzhalter, bis freigegebene Fassungen vorliegen.'
          : 'Selected client engagements anonymized placeholders until approved versions are ready.'}
      </p>

      <div role="tablist" aria-label="Filter" className="mt-8 inline-flex gap-1 rounded-full border border-brand-900/10 p-1 dark:border-white/10">
        {(
          [
            { k: 'all', l: locale === 'de' ? 'Alle' : 'All' },
            { k: 'hardware', l: 'Hardware' },
            { k: 'development', l: locale === 'de' ? 'Entwicklung' : 'Development' },
          ] as const
        ).map((f) => (
          <button
            key={f.k}
            type="button"
            role="tab"
            aria-selected={filter === f.k}
            onClick={() => setFilter(f.k)}
            className={
              filter === f.k
                ? 'rounded-full bg-brand-900 px-3 py-1 text-sm text-white'
                : 'rounded-full px-3 py-1 text-sm text-brand-900/70 dark:text-white/70'
            }
          >
            {f.l}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => {
          const c = p.copy[locale];
          return (
            <CaseStudyCard
              key={p.slug}
              study={{ slug: p.slug, title: c.title, line: p.line, summary: c.summary, result: c.result }}
              href={`${prefix}/projects/${p.slug}`}
            />
          );
        })}
      </div>
    </section>
  );
}
