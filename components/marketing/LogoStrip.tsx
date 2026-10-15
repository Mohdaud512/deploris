import Image from 'next/image';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Named trusted-partner strip.
 *
 * Each entry renders an `<img>` loaded from /public/partners/{slug}.svg if
 * present, or falls back to a clean wordmark of the company name in
 * Deploris's own type. This lets the strip ship immediately with legible
 * text and upgrade to the official logo file the moment it's dropped in,
 * without touching this component.
 *
 * IMPORTANT: Only list partners for whom you have a signed logo-use
 * agreement or an active partner-program badge entitlement. The site owner
 * attested this when adding the current roster (2026-10-15).
 */
export type Partner = {
  /** URL-safe id, also the SVG filename at /public/partners/{slug}.svg */
  slug: string;
  /** Display name used as the <img> alt text AND as the text fallback. */
  name: string;
};

const PARTNERS_DIR = path.join(process.cwd(), 'public', 'partners');

/** Server-side filesystem probe so SSR renders the image or the text
 *  fallback deterministically, without a client-side onError flicker. */
function hasLogoFile(slug: string): boolean {
  // Guard: a slug outside the safe charset could escape the partners
  // directory via path traversal if ever sourced from untrusted input.
  // Partners today are build-time constants, but the guard is cheap.
  if (!/^[a-z0-9-]+$/.test(slug)) return false;
  try {
    return fs.existsSync(path.join(PARTNERS_DIR, `${slug}.svg`));
  } catch {
    return false;
  }
}

export function LogoStrip({ label, partners }: { label: string; partners: Partner[] }) {
  return (
    <section
      aria-label={label}
      className="border-y border-brand-900/10 bg-white py-8 dark:border-white/10 dark:bg-transparent"
    >
      <div className="container">
        <p className="text-center text-xs uppercase tracking-widest text-brand-900/80 dark:text-white/60">
          {label}
        </p>
        <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {partners.map((p) => (
            <li key={p.slug} className="flex items-center justify-center">
              {hasLogoFile(p.slug) ? (
                <Image
                  src={`/partners/${p.slug}.svg`}
                  alt={p.name}
                  width={120}
                  height={32}
                  className="h-7 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 dark:brightness-0 dark:invert"
                />
              ) : (
                <span
                  className="font-display text-sm font-semibold tracking-tight text-brand-900/70 dark:text-white/70"
                  title={`${p.name} (official logo file not yet dropped at /public/partners/${p.slug}.svg)`}
                >
                  {p.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
