'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = { label: string; value: number; suffix?: string; prefix?: string; decimals?: number };

export function StatCounterGrid({ stats }: { stats: Stat[] }) {
  return (
    <section aria-label="Key statistics" className="border-y border-brand-900/10 bg-brand-50 py-14 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="container grid gap-8 md:grid-cols-4">
        {stats.map((s) => (
          <StatItem key={s.label} stat={s} />
        ))}
      </div>
    </section>
  );
}

function StatItem({ stat }: { stat: Stat }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setValue(stat.value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            animate(stat.value, setValue, stat.decimals);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value, reduce]);

  const decimals = stat.decimals ?? 0;
  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl font-bold text-brand-900 dark:text-white">
        {stat.prefix}
        {value.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm text-brand-900/85 dark:text-white/70">{stat.label}</p>
    </div>
  );
}

function animate(target: number, set: (n: number) => void, decimals = 0) {
  const start = performance.now();
  const duration = 1400;
  const factor = 10 ** decimals;
  function tick(now: number) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    set(Math.round(target * eased * factor) / factor);
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setR(m.matches);
    const l = () => setR(m.matches);
    m.addEventListener('change', l);
    return () => m.removeEventListener('change', l);
  }, []);
  return r;
}
