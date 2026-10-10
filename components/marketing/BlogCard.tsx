import Link from 'next/link';
import { formatDate } from '@/lib/formatters';
import type { Locale } from '@/config/locales';
import { authors } from '@/content/authors';

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
  const profile = authors.find((a) => a.name === author);
  const initials = author
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  const prefix = locale === 'en' ? '' : `/${locale}`;

  return (
    <article className="flex flex-col rounded-2xl border border-brand-900/10 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5">
      <Link href={href} className="flex-1">
        <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{description}</p>
      </Link>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-brand-900/5 pt-3 text-xs text-brand-900/85 dark:border-white/5 dark:text-white/70">
        <div className="flex items-center gap-2">
          {profile ? (
            <Link
              href={`${prefix}/about/${profile.slug}`}
              className="group flex items-center gap-2 hover:text-brand-900 dark:hover:text-white"
              rel="author"
              aria-label={author}
            >
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-900 text-[0.65rem] font-semibold text-white dark:bg-white dark:text-brand-900"
              >
                {initials}
              </span>
              <span className="font-medium">{author}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-2">
              <span
                aria-hidden
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-900/80 text-[0.65rem] font-semibold text-white"
              >
                {initials}
              </span>
              <span>{author}</span>
            </span>
          )}
          <span aria-hidden className="opacity-50">·</span>
          <time dateTime={date}>{formatDate(date, locale)}</time>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 2).map((t) => (
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
