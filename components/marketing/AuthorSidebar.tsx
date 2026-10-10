import Link from 'next/link';
import type { Locale } from '@/config/locales';
import { authors } from '@/content/authors';

/**
 * Sidebar card for blog post pages. If the post's author matches a known
 * Person profile, render a trust-building card with name, title, and short
 * bio — linked to the full author page (which carries the Person schema).
 *
 * Shown as an aside beside the post body on desktop, and above the body on
 * mobile. Returns null for unknown authors so posts without a profile render
 * cleanly.
 */
export function AuthorSidebar({ author, locale }: { author: string; locale: Locale }) {
  const profile = authors.find((a) => a.name === author);
  if (!profile) return null;
  const c = profile.copy[locale];
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const initials = profile.name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');

  return (
    <aside className="rounded-2xl border border-brand-900/10 bg-brand-50/60 p-5 dark:border-white/10 dark:bg-white/5">
      <p className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-accent-600 dark:text-accent-400">
        {locale === 'de' ? 'Autor' : 'Author'}
      </p>
      <Link
        href={`${prefix}/about/${profile.slug}`}
        className="mt-3 flex items-center gap-3 text-brand-900 hover:underline dark:text-white"
        rel="author"
      >
        <span
          aria-hidden
          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-brand-900 text-sm font-semibold text-white dark:bg-white dark:text-brand-900"
        >
          {initials}
        </span>
        <span className="min-w-0">
          <span className="block font-display font-semibold leading-tight">{profile.name}</span>
          <span className="block text-xs text-brand-900/70 dark:text-white/60">{c.jobTitle}</span>
        </span>
      </Link>
      <p className="mt-4 text-sm leading-relaxed text-brand-900/80 dark:text-white/75">
        {c.headline}
      </p>
      {profile.social.linkedin && (
        <a
          href={profile.social.linkedin}
          rel="noopener"
          target="_blank"
          className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-[0.08em] text-accent-700 hover:underline dark:text-accent-300"
        >
          LinkedIn →
        </a>
      )}
    </aside>
  );
}
