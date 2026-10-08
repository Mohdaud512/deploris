export function LogoStrip({ label, count = 6 }: { label: string; count?: number }) {
  return (
    <section aria-label={label} className="border-y border-brand-900/10 bg-white py-8 dark:border-white/10 dark:bg-transparent">
      <div className="container">
        <p className="text-center text-xs uppercase tracking-widest text-brand-900/60 dark:text-white/60">
          {label}
        </p>
        <div className="mt-4 grid grid-cols-2 items-center gap-6 sm:grid-cols-3 md:grid-cols-6">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              data-placeholder="client-logo"
              className="mx-auto h-8 w-24 rounded bg-gradient-to-r from-brand-100 to-brand-50 opacity-70 dark:from-white/10 dark:to-white/5"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
