import Link from 'next/link';
import { formatDate } from '@/lib/formatters';
import type { Locale } from '@/config/locales';
import { authors } from '@/content/authors';

export function AuthorByline({
  author,
  date,
  updated,
  readingMinutes,
  locale,
}: {
  author: string;
  date: string;
  updated?: string;
  readingMinutes?: number;
  locale: Locale;
}) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  // If the author string matches a known Person profile, render a link to
  // their /about/<slug> page so the on-page byline matches the schema's
  // author.url. Falls back to a plain text label for unknown authors.
  const profile = authors.find((a) => a.name === author);
  const initials = author
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  const avatar = (
    <span
      aria-hidden
      className="inline-block h-6 w-6 rounded-full bg-brand-900 text-center text-xs leading-6 text-white"
    >
      {initials}
    </span>
  );

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-900/85 dark:text-white/70">
      {profile ? (
        <Link
          href={`${prefix}/about/${profile.slug}`}
          className="flex items-center gap-2 text-brand-900 hover:underline dark:text-white"
          rel="author"
        >
          {avatar}
          <span>{author}</span>
        </Link>
      ) : (
        <span className="flex items-center gap-2">
          {avatar}
          <span>{author}</span>
        </span>
      )}
      <span>{formatDate(date, locale)}</span>
      {updated && updated !== date && (
        <span>
          {locale === 'de' ? 'Aktualisiert' : 'Updated'} {formatDate(updated, locale)}
        </span>
      )}
      {typeof readingMinutes === 'number' && (
        <span>
          {readingMinutes} {locale === 'de' ? 'Min. Lesezeit' : 'min read'}
        </span>
      )}
    </div>
  );
}
