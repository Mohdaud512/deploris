import Link from 'next/link';

export function ServiceCard({
  title,
  summary,
  href,
  keyword,
  cta,
}: {
  title: string;
  summary: string;
  href: string;
  keyword?: string;
  cta: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-brand-900/10 bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-900/30 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div>
        <h3 className="font-display text-xl font-semibold text-brand-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{summary}</p>
        {keyword && (
          <p className="mt-3 inline-block rounded bg-brand-50 px-2 py-0.5 text-[11px] uppercase tracking-wide text-brand-700 dark:bg-white/10 dark:text-white/70">
            {keyword}
          </p>
        )}
      </div>
      <span className="mt-6 inline-flex text-sm font-medium text-brand-700 group-hover:underline dark:text-accent-400">
        {cta} →
      </span>
    </Link>
  );
}
