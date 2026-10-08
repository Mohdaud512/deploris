export function ProcessSteps({ steps }: { steps: { step: string; body: string }[] }) {
  return (
    <section aria-label="How we work" className="container py-12">
      <ol className="grid gap-6 md:grid-cols-4">
        {steps.map((s, i) => (
          <li
            key={s.step}
            className="rounded-2xl border border-brand-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-900 text-sm font-bold text-white">
              {i + 1}
            </div>
            <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
              {s.step}
            </h3>
            <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
