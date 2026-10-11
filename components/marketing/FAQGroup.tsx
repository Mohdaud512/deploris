export type FaqItem = { q: string; a: string };

/**
 * SSR-safe FAQ group. Uses native <details>/<summary> so every answer is
 * present in the server-rendered HTML (crawlers see it) and the open/close
 * state needs no React state. Previously the component was a 'use client'
 * accordion that conditionally rendered the answer div with
 * `{open && (…)}` — closed items had no answer text in the HTML, which
 * made every FAQ answer invisible to Google and the site's own FAQPage
 * schema untestable against the DOM. Flagged in the live-site SEO audit.
 */
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
    <section
      aria-labelledby={`${idPrefix}-heading`}
      className="border-t border-brand-900/10 py-8 first:border-t-0 dark:border-white/10"
    >
      <h2
        id={`${idPrefix}-heading`}
        className="font-display text-2xl font-semibold text-brand-900 dark:text-white"
      >
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
  return (
    <details
      id={id}
      className="group rounded-lg border border-brand-900/10 bg-white dark:border-white/10 dark:bg-white/5"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-left [&::-webkit-details-marker]:hidden">
        <span className="font-medium text-brand-900 dark:text-white">{q}</span>
        <span
          aria-hidden
          className="text-brand-700 transition-transform group-open:rotate-45 dark:text-accent-400"
        >
          +
        </span>
      </summary>
      <div className="px-4 pb-4 text-brand-900/85 dark:text-white/80">{a}</div>
    </details>
  );
}
