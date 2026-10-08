export function PricingBand({
  tiers,
}: {
  tiers: { name: string; range: string; scope: string }[];
}) {
  return (
    <section aria-label="Pricing bands" className="container py-12">
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className="rounded-2xl border border-brand-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/5"
          >
            <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">
              {tier.name}
            </h3>
            <p className="mt-2 font-display text-2xl font-bold text-brand-900 dark:text-white">
              {tier.range}
            </p>
            <p className="mt-2 text-sm text-brand-900/80 dark:text-white/80">{tier.scope}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-center text-xs text-brand-900/60 dark:text-white/60">
        Bands, not quotes every engagement is priced in writing after discovery.
      </p>
    </section>
  );
}
