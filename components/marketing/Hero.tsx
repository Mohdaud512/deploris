import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { HeroAnimation } from './HeroAnimation';

export function Hero({
  eyebrow,
  title,
  body,
  primaryHref,
  secondaryHref,
}: {
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  secondaryHref: string;
}) {
  const t = useTranslations('home');
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at top right, #047857, transparent 60%), radial-gradient(ellipse at bottom left, rgba(101,216,90,0.22), transparent 50%)',
        }}
      />
      <div className="container relative grid gap-10 py-20 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
        <div>
          <p className="mb-4 inline-block rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white/80">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">{body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="rounded-full bg-white px-5 py-3 font-medium text-brand-900 shadow hover:bg-white/90"
            >
              {t('hero_cta_primary')}
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-full border border-white/30 px-5 py-3 font-medium text-white hover:bg-white/10"
            >
              {t('hero_cta_secondary')}
            </Link>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:justify-self-end">
          <HeroAnimation />
        </div>
      </div>
    </section>
  );
}
