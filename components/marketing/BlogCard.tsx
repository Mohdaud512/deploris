import Link from 'next/link';
import { formatDate } from '@/lib/formatters';
import type { Locale } from '@/config/locales';

export function BlogCard({
  href,
  title,
  description,
  date,
  author,
  tags,
  locale,
}: {
  href: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags?: string[];
  locale: Locale;
}) {
  return (
    <article className="rounded-2xl border border-brand-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <Link href={href}>
        <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{description}</p>
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-brand-900/85 dark:text-white/70">
        <span>
          {formatDate(date, locale)} · {author}
        </span>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((t) => (
              <span key={t} className="rounded-full bg-brand-50 px-2 py-0.5 dark:bg-white/10">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
