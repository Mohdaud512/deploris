'use client';

import { useState } from 'react';

export type FaqItem = { q: string; a: string };

export function FAQGroup({
  title,
  items,
  idPrefix,
}: {
  title: string;
  items: FaqItem[];
  idPrefix: string;
}) {
  return (
    <section aria-labelledby={`${idPrefix}-heading`} className="border-t border-brand-900/10 py-8 first:border-t-0 dark:border-white/10">
      <h2 id={`${idPrefix}-heading`} className="font-display text-2xl font-semibold text-brand-900 dark:text-white">
        {title}
      </h2>
      <div className="mt-4 space-y-2">
        {items.map((it, i) => (
          <FAQItem key={i} id={`${idPrefix}-${i}`} q={it.q} a={it.a} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ id, q, a }: { id: string; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div id={id} className="rounded-lg border border-brand-900/10 bg-white dark:border-white/10 dark:bg-white/5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-body`}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left"
      >
        <span className="font-medium text-brand-900 dark:text-white">{q}</span>
        <span aria-hidden className="text-brand-700 dark:text-accent-400">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div id={`${id}-body`} className="px-4 pb-4 text-brand-900/85 dark:text-white/80">
          {a}
        </div>
      )}
    </div>
  );
}
