import Link from 'next/link';

export type CaseStudy = {
  slug: string;
  title: string;
  line: 'hardware' | 'development';
  summary: string;
  result: string;
  tags?: string[];
};

export function CaseStudyCard({ study, href }: { study: CaseStudy; href: string }) {
  const lineLabel = study.line === 'hardware' ? 'Hardware' : 'Development';
  return (
    <Link
      href={href}
      className="group flex h-full flex-col justify-between rounded-2xl border border-brand-900/10 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div>
        <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-brand-700 dark:text-accent-400">
          <span
            className={
              study.line === 'hardware'
                ? 'inline-block h-2 w-2 rounded-full bg-brand-700'
                : 'inline-block h-2 w-2 rounded-full bg-accent-500'
            }
            aria-hidden
          />
          {lineLabel}
        </div>
        <h3 className="font-display text-xl font-semibold text-brand-900 dark:text-white">{study.title}</h3>
        <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{study.summary}</p>
      </div>
      <div className="mt-6 rounded-lg bg-brand-50 p-3 text-sm dark:bg-white/5">
        <span className="font-medium text-brand-900 dark:text-white">Result:</span>{' '}
        <span className="text-brand-900/80 dark:text-white/80">{study.result}</span>
      </div>
    </Link>
  );
}
