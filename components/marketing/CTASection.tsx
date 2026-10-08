import Link from 'next/link';

export function CTASection({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="container my-16">
      <div className="rounded-3xl bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 p-10 text-white shadow-lg md:p-14">
        <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-white/85">{body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={primaryHref}
            className="rounded-full bg-white px-5 py-3 font-medium text-brand-900 hover:bg-white/90"
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
