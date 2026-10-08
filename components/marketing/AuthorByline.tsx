import { formatDate } from '@/lib/formatters';
import type { Locale } from '@/config/locales';

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
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-brand-900/85 dark:text-white/70">
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-6 w-6 rounded-full bg-brand-900 text-center text-xs leading-6 text-white"
        >
          {author
            .split(' ')
            .map((p) => p[0])
            .slice(0, 2)
            .join('')}
        </span>
        <span>{author}</span>
      </span>
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
