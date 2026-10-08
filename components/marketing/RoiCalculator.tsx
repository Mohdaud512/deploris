'use client';

import { useMemo, useState } from 'react';
import { formatCurrency, formatNumber } from '@/lib/formatters';
import type { Locale } from '@/config/locales';

/**
 * Client-side ROI / savings calculator for the dev-services buyer.
 * All maths runs in the browser; no data leaves the page.
 */
export function RoiCalculator({ locale }: { locale: Locale }) {
  const [people, setPeople] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(6);
  const [rate, setRate] = useState(75);
  const [pctAutomatable, setPctAutomatable] = useState(60);

  const de = locale === 'de';

  const results = useMemo(() => {
    const weeklyHoursSaved = people * hoursPerWeek * (pctAutomatable / 100);
    const yearlyHoursSaved = Math.round(weeklyHoursSaved * 46); // ~46 working weeks
    const yearlyDollarsSaved = Math.round(yearlyHoursSaved * rate);
    return { weeklyHoursSaved: Math.round(weeklyHoursSaved), yearlyHoursSaved, yearlyDollarsSaved };
  }, [people, hoursPerWeek, rate, pctAutomatable]);

  return (
    <section aria-labelledby="roi-title" className="container my-16">
      <div className="rounded-3xl border border-brand-900/10 bg-white p-6 shadow-sm md:p-10 dark:border-white/10 dark:bg-white/5">
        <h2 id="roi-title" className="font-display text-2xl font-bold text-brand-900 md:text-3xl dark:text-white">
          {de ? 'ROI-Rechner: Automatisierung' : 'ROI calculator: automation'}
        </h2>
        <p className="mt-2 max-w-2xl text-brand-900/80 dark:text-white/80">
          {de
            ? 'Schätzen Sie die jährliche Zeit- und Kostenersparnis, wenn ein Teil Ihrer wiederkehrenden Arbeit von einem CRM, RAG-System oder KI-Agenten übernommen wird.'
            : 'Estimate the annual time and cost savings if some of your recurring work is picked up by a CRM, RAG system, or AI agent.'}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <NumberInput
            label={de ? 'Personen im Team' : 'People on the team'}
            min={1}
            max={500}
            value={people}
            onChange={setPeople}
          />
          <NumberInput
            label={de ? 'Wiederkehrende Std. / Person / Woche' : 'Recurring hrs / person / week'}
            min={1}
            max={40}
            value={hoursPerWeek}
            onChange={setHoursPerWeek}
          />
          <NumberInput
            label={de ? 'Vollkosten € / Std.' : 'Fully loaded rate / hr'}
            min={20}
            max={300}
            value={rate}
            onChange={setRate}
          />
          <RangeInput
            label={de ? 'Anteil automatisierbar' : 'Share automatable'}
            min={0}
            max={100}
            value={pctAutomatable}
            onChange={setPctAutomatable}
            suffix="%"
          />
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl bg-brand-50 p-6 md:grid-cols-3 dark:bg-white/5">
          <ResultCell label={de ? 'Std. gespart / Woche' : 'Hours saved / week'} value={formatNumber(results.weeklyHoursSaved, locale)} />
          <ResultCell label={de ? 'Std. gespart / Jahr' : 'Hours saved / year'} value={formatNumber(results.yearlyHoursSaved, locale)} />
          <ResultCell label={de ? 'Ersparnis / Jahr' : 'Savings / year'} value={formatCurrency(results.yearlyDollarsSaved, locale)} highlight />
        </div>

        <p className="mt-4 text-xs text-brand-900/80 dark:text-white/60">
          {de
            ? 'Grobe Näherung. Reale Ergebnisse hängen von Datenqualität, Prozessreife und Nutzeraufnahme ab.'
            : 'Rough approximation. Actual results depend on data quality, process maturity, and user adoption.'}
        </p>
      </div>
    </section>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-brand-900 dark:text-white">{label}</span>
      <input
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          if (!Number.isFinite(n)) return;
          onChange(Math.min(max, Math.max(min, n)));
        }}
        className="mt-1 w-full rounded-lg border border-brand-900/20 bg-white px-3 py-2 text-brand-900 dark:border-white/20 dark:bg-white/5 dark:text-white"
      />
    </label>
  );
}

function RangeInput({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-brand-900 dark:text-white">
        {label} {value}
        {suffix}
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-brand-900"
      />
    </label>
  );
}

function ResultCell({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-brand-900/85 dark:text-white/70">{label}</p>
      <p
        className={
          highlight
            ? 'mt-1 font-display text-3xl font-bold text-brand-900 dark:text-white'
            : 'mt-1 font-display text-2xl font-semibold text-brand-900 dark:text-white'
        }
      >
        {value}
      </p>
    </div>
  );
}
