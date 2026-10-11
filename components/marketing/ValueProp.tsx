export function ValuePropGrid({
  items,
  heading,
  headingId,
}: {
  items: { title: string; body: string }[];
  /** Optional visible section heading. When provided, renders an H2 above
   *  the grid so the outline doesn't jump H1 → H3 (card titles are H3). */
  heading?: string;
  headingId?: string;
}) {
  const id = headingId ?? 'value-prop-heading';
  return (
    <section
      {...(heading
        ? { 'aria-labelledby': id }
        : { 'aria-label': 'Value propositions' })}
      className="container py-16"
    >
      {heading && (
        <h2
          id={id}
          className="mb-8 font-display text-xl font-bold text-brand-900 md:text-2xl dark:text-white"
        >
          {heading}
        </h2>
      )}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="rounded-2xl border border-brand-900/10 p-6 dark:border-white/10"
          >
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-xs font-bold text-white">
              ✓
            </div>
            <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
              {it.title}
            </h3>
            <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
