'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { Locale } from '@/config/locales';

/**
 * Deploris signature hero. Composition pattern: left-side editorial copy
 * (eyebrow, two-tone H1 with one serif italic emphasis, deck, CTAs, trust
 * note, credential chips) + right-side architectural stack diagram
 * (service row, foundation band, ops row) with a cycling highlight on the
 * three service cards.
 *
 * Motion:
 * - Elements fade+rise with stagger on mount
 * - Service cards rotate active-state every 4s (CRM → RAG → Agents → CRM)
 * - Everything collapses to static initial state under prefers-reduced-motion
 *   OR when the global Motion toggle is off (toggled via dataset on <html>)
 *
 * SSR: initial state renders the FULL content so crawlers and answer
 * engines see every word, every stat, every link.
 */

type Service = { label: string; sub: string };
type DiagramCopy = {
  title: string;
  services: [Service, Service, Service];
  foundation: { label: string; sub: string };
  ops: [Service, Service];
};

const TITLE_PARTS: Record<Locale, { lead: string; em: string }> = {
  en: {
    lead: 'Custom AI software and managed infrastructure,',
    em: 'scoped in writing.',
  },
  de: {
    lead: 'Individuelle KI-Software und betriebene Infrastruktur,',
    em: 'schriftlich abgestimmt.',
  },
};

const TRUST_NOTE: Record<Locale, string> = {
  en: 'Free 30-minute scoping call. We respond within one business day.',
  de: 'Kostenloses 30-Minuten-Scoping-Gespräch. Antwort innerhalb eines Werktags.',
};

const CREDENTIALS_LABEL: Record<Locale, string> = {
  en: 'Verified claims',
  de: 'Belegt',
};

const CREDENTIALS: Record<Locale, string[]> = {
  en: ['GDPR-compliant', 'EU-region hosting', 'DPA on request', 'Bilingual DE + EN'],
  de: ['DSGVO-konform', 'EU-Region-Hosting', 'AV-Vertrag auf Anfrage', 'Zweisprachig DE + EN'],
};

const DIAGRAM: Record<Locale, DiagramCopy> = {
  en: {
    title: 'Everything ships on infrastructure Deploris operates',
    services: [
      { label: 'Custom CRM', sub: 'Data model + RBAC' },
      { label: 'RAG pipeline', sub: 'Grounded, with citations' },
      { label: 'AI agents', sub: 'HITL + kill switch' },
    ],
    foundation: {
      label: 'Cloud or on-prem foundation',
      sub: 'Terraform-managed, EU-region (Frankfurt) or your own account',
    },
    ops: [
      { label: '24/7 monitoring', sub: '15-min P1 median' },
      { label: 'Named on-call', sub: 'Reaches a person' },
    ],
  },
  de: {
    title: 'Alles läuft auf Infrastruktur, die Deploris betreibt',
    services: [
      { label: 'Individuelles CRM', sub: 'Datenmodell + RBAC' },
      { label: 'RAG-Pipeline', sub: 'Belegt, mit Quellen' },
      { label: 'KI-Agenten', sub: 'HITL + Not-Aus' },
    ],
    foundation: {
      label: 'Cloud- oder On-Prem-Basis',
      sub: 'Terraform-verwaltet, EU-Region (Frankfurt) oder Ihr eigener Account',
    },
    ops: [
      { label: '24/7-Monitoring', sub: '15-Min P1-Median' },
      { label: 'Benannter On-Call', sub: 'Erreicht einen Menschen' },
    ],
  },
};

export function ScopedHero({
  locale,
  eyebrow,
  body,
  primaryHref,
  secondaryHref,
}: {
  locale: Locale;
  eyebrow: string;
  body: string;
  primaryHref: string;
  secondaryHref: string;
}) {
  const t = useTranslations('home');
  const reduce = useReducedMotion();
  const title = TITLE_PARTS[locale];
  const credentials = CREDENTIALS[locale];
  const diagram = DIAGRAM[locale];

  // Active service rotation (0..2). Pauses if motion is reduced.
  const [activeService, setActiveService] = useState(2); // start on AI agents, same as the mock
  useEffect(() => {
    if (reduce) return;
    const i = setInterval(() => setActiveService((n) => (n + 1) % 3), 4200);
    return () => clearInterval(i);
  }, [reduce]);

  // Motion primitives
  const fadeUp = reduce ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } };
  const containerStagger: Variants = reduce
    ? {}
    : {
        animate: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
      };
  const childFade: Variants = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
      };

  return (
    <section
      aria-labelledby="hero-h1"
      className="relative overflow-hidden bg-[#fafbfc] text-brand-900 dark:bg-brand-950 dark:text-white"
    >
      {/* Subtle brand-green diagonal accent. Light mode gets a soft wedge in
          the top-right; dark mode gets a diffused glow. Decorative only. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 100% 0%, color-mix(in oklab, var(--color-accent-500) 10%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 100% 0%, color-mix(in oklab, var(--color-accent-500) 18%, transparent) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 0% 100%, color-mix(in oklab, var(--color-accent-500) 10%, transparent) 0%, transparent 60%)',
        }}
      />

      <div className="container relative grid gap-12 py-16 md:py-24 lg:grid-cols-[1.08fr_1fr] lg:gap-14 lg:py-28">
        {/* LEFT: editorial copy */}
        <motion.div
          variants={containerStagger}
          initial="initial"
          animate="animate"
          className="min-w-0"
        >
          <motion.p
            variants={childFade}
            className="font-mono text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-accent-700 dark:text-accent-400"
          >
            {eyebrow}
          </motion.p>

          <motion.h1
            variants={childFade}
            id="hero-h1"
            className="mt-5 max-w-4xl text-balance font-display text-[clamp(2.2rem,5.2vw,3.75rem)] font-bold leading-[1.04] tracking-[-0.022em]"
          >
            {title.lead}{' '}
            <span
              className="italic text-accent-700 dark:text-accent-400"
              style={{
                fontFamily: 'var(--font-serif-display)',
                fontWeight: 500,
                fontVariationSettings: '"opsz" 144',
              }}
            >
              {title.em}
            </span>
          </motion.h1>

          <motion.p
            variants={childFade}
            className="mt-6 max-w-xl text-lg leading-relaxed text-brand-900/80 dark:text-white/80"
          >
            {body}
          </motion.p>

          <motion.div variants={childFade} className="mt-8 flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="group relative overflow-hidden rounded-full bg-brand-900 px-6 py-3 font-semibold text-white shadow-lg shadow-brand-900/10 transition hover:bg-brand-800 dark:bg-accent-500 dark:text-brand-950 dark:hover:bg-accent-400"
            >
              <span className="relative">{t('hero_cta_primary')} →</span>
            </Link>
            <Link
              href={secondaryHref}
              className="rounded-full border-2 border-brand-900/20 px-6 py-3 font-semibold text-brand-900 transition hover:border-brand-900 hover:bg-brand-900/5 dark:border-white/20 dark:text-white dark:hover:border-white dark:hover:bg-white/5"
            >
              {t('hero_cta_secondary')}
            </Link>
          </motion.div>

          <motion.p
            variants={childFade}
            className="mt-5 text-sm text-brand-900/60 dark:text-white/60"
          >
            {TRUST_NOTE[locale]}
          </motion.p>

          <motion.div
            variants={childFade}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-900/50 dark:text-white/50">
              {CREDENTIALS_LABEL[locale]}
            </span>
            {credentials.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1.5 rounded-full border border-brand-900/15 bg-white px-3 py-1 text-[0.78rem] text-brand-900 dark:border-white/15 dark:bg-white/5 dark:text-white"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 14 14"
                  className="h-3 w-3 flex-shrink-0 text-accent-600 dark:text-accent-400"
                >
                  <path
                    d="M2.5 7l2.5 2.5L11 3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {c}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: architectural stack diagram */}
        <motion.aside
          aria-label={diagram.title}
          variants={containerStagger}
          initial="initial"
          animate="animate"
          className="relative lg:justify-self-end"
        >
          <div className="rounded-2xl border border-brand-900/10 bg-white p-5 shadow-xl shadow-brand-900/5 dark:border-white/10 dark:bg-white/[0.04] md:p-6">
            <motion.p
              variants={childFade}
              className="mb-5 text-center text-xs text-brand-900/60 dark:text-white/55"
            >
              {diagram.title}
            </motion.p>

            {/* Service row — one of three is active, rotates every 4.2s */}
            <motion.div variants={childFade} className="grid grid-cols-3 gap-2">
              {diagram.services.map((s, i) => {
                const active = i === activeService;
                return (
                  <motion.div
                    key={s.label}
                    animate={
                      reduce
                        ? {}
                        : {
                            backgroundColor: active
                              ? 'var(--color-accent-600)'
                              : 'var(--color-accent-50)',
                            color: active ? '#ffffff' : 'var(--color-brand-900)',
                            borderColor: active
                              ? 'var(--color-accent-600)'
                              : 'color-mix(in oklab, var(--color-accent-500) 25%, transparent)',
                          }
                    }
                    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                    className={`rounded-xl border p-3 text-center ${
                      active
                        ? 'border-accent-600 bg-accent-600 text-white dark:border-accent-500 dark:bg-accent-500 dark:text-brand-950'
                        : 'border-accent-500/25 bg-accent-50 text-brand-900 dark:border-accent-400/30 dark:bg-accent-400/10 dark:text-white'
                    }`}
                  >
                    <div className="text-[0.82rem] font-bold leading-tight">{s.label}</div>
                    <div
                      className={`mt-1 text-[0.68rem] leading-tight ${
                        active
                          ? 'text-white/85 dark:text-brand-950/80'
                          : 'text-brand-900/60 dark:text-white/60'
                      }`}
                    >
                      {s.sub}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={childFade} className="flex justify-center py-2">
              <ArrowDown />
            </motion.div>

            {/* Foundation band */}
            <motion.div
              variants={childFade}
              className="rounded-xl border border-accent-500/25 bg-accent-50 p-4 dark:border-accent-400/30 dark:bg-accent-400/10"
            >
              <div className="text-sm font-bold text-brand-900 dark:text-white">
                {diagram.foundation.label}
              </div>
              <div className="mt-1 text-[0.74rem] text-brand-900/65 dark:text-white/65">
                {diagram.foundation.sub}
              </div>
            </motion.div>

            <motion.div variants={childFade} className="flex justify-center py-2">
              <ArrowDown />
            </motion.div>

            {/* Ops row */}
            <motion.div variants={childFade} className="grid grid-cols-2 gap-2">
              {diagram.ops.map((o) => (
                <div
                  key={o.label}
                  className="rounded-xl border border-accent-500/25 bg-accent-50 p-3 text-center dark:border-accent-400/30 dark:bg-accent-400/10"
                >
                  <div className="text-[0.82rem] font-bold leading-tight text-brand-900 dark:text-white">
                    {o.label}
                  </div>
                  <div className="mt-1 text-[0.68rem] text-brand-900/60 dark:text-white/60">
                    {o.sub}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

function ArrowDown() {
  return (
    <svg
      aria-hidden
      width="14"
      height="18"
      viewBox="0 0 14 18"
      fill="none"
      className="text-accent-600/60 dark:text-accent-400/60"
    >
      <path
        d="M7 1v14M2 10l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
