'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/config/locales';

/**
 * Transparent RAG monthly cost estimator. Deterministic math, no hidden
 * markup. All numbers are published assumptions a technical reader can
 * challenge — see the "how we calculate" block at the bottom.
 */
const MODEL_TIERS = {
  small: { label: { en: 'Small (Claude Haiku / GPT-4o-mini / open-source)', de: 'Klein (Claude Haiku / GPT-4o-mini / Open-Source)' }, perMQuery: 0.9 },
  mid: { label: { en: 'Mid-tier (Claude Sonnet / GPT-4o)', de: 'Mittelklasse (Claude Sonnet / GPT-4o)' }, perMQuery: 4.5 },
  frontier: { label: { en: 'Frontier (Claude Opus / GPT-4.1-pro)', de: 'Frontier (Claude Opus / GPT-4.1-pro)' }, perMQuery: 18 },
} as const;

type Tier = keyof typeof MODEL_TIERS;

export function RagCostModel({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const t = de
    ? {
        docsLabel: 'Dokumentkorpus (Seiten)',
        queriesLabel: 'Suchanfragen pro Monat',
        modelLabel: 'Antwort-Modell',
        euLabel: 'EU-Region-Hosting (Frankfurt)',
        resultLabel: 'Geschätzte monatliche Betriebskosten',
        rangeLabel: 'Band',
        breakdownLabel: 'Zusammensetzung',
        storage: 'Vektorstore + Objektspeicher',
        embedding: 'Embedding-Reindex (10 % monatlich)',
        inference: 'Modell-Inferenz',
        hosting: 'Hosting, Observability, Backup',
        premium: 'EU-Region-Aufschlag (+15 %)',
        methodTitle: 'Wie wir rechnen',
        methodBody: [
          'Vektorstore: 0,02 € pro 1.000 Seiten pro Monat (gehostet, replicated)',
          'Objektspeicher für Originaldokumente: 0,01 € pro 1.000 Seiten pro Monat',
          'Embedding-Reindex: 10 % des Korpus pro Monat × 0,0002 € pro 1.000 Tokens',
          'Modell-Inferenz: siehe Preis pro 1.000 Anfragen je Modell-Stufe oben',
          'Betriebsschicht (Dashboards, Logging, Backup, 24/7-Monitoring): 450 € pauschal',
          'EU-Region-Aufschlag: 15 % oben drauf (Frankfurt-Region, EU-SCCs, keine US-Anbieter in der Pipeline)',
        ],
        disclaimer: 'Preisannahmen Stand 2026-10. Volumen- und Enterprise-Konditionen verändern das Bild deutlich. Zahlen sind Richtwerte, kein Angebot.',
      }
    : {
        docsLabel: 'Document corpus (pages)',
        queriesLabel: 'Queries per month',
        modelLabel: 'Answer model',
        euLabel: 'EU-region hosting (Frankfurt)',
        resultLabel: 'Estimated monthly cost of ops',
        rangeLabel: 'Range',
        breakdownLabel: 'Breakdown',
        storage: 'Vector store + object storage',
        embedding: 'Embedding reindex (10% monthly)',
        inference: 'Model inference',
        hosting: 'Hosting, observability, backup',
        premium: 'EU-region premium (+15%)',
        methodTitle: 'How we calculate',
        methodBody: [
          'Vector store: €0.02 per 1,000 pages per month (hosted, replicated)',
          'Object storage for originals: €0.01 per 1,000 pages per month',
          'Embedding reindex: 10% of corpus per month × €0.0002 per 1,000 tokens',
          'Model inference: per-1,000-query price per tier shown above',
          'Operations layer (dashboards, logging, backup, 24/7 monitoring): €450 flat',
          'EU-region premium: +15% on top (Frankfurt region, EU SCCs, no US providers in the pipeline)',
        ],
        disclaimer: 'Price assumptions as of 2026-10. Volume and enterprise contracts change the picture materially. Figures are indicative, not a quote.',
      };

  const [docs, setDocs] = useState(50_000);
  const [queries, setQueries] = useState(10_000);
  const [tier, setTier] = useState<Tier>('mid');
  const [eu, setEu] = useState(true);

  const costs = useMemo(() => {
    const pagesK = docs / 1000;
    const storage = pagesK * 0.03; // vector + object combined per month
    const embedding = pagesK * 0.1 * 0.2 * 2; // 10% churn × 2000 tokens/page × €0.0002/1k tok
    const inference = (queries / 1000) * MODEL_TIERS[tier].perMQuery;
    const hosting = 450;
    const subtotal = storage + embedding + inference + hosting;
    const premium = eu ? subtotal * 0.15 : 0;
    const total = subtotal + premium;
    return { storage, embedding, inference, hosting, premium, total };
  }, [docs, queries, tier, eu]);

  const low = Math.max(0, costs.total * 0.8);
  const high = costs.total * 1.3;

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="min-w-0 space-y-6">
            <Field label={t.docsLabel} value={docs.toLocaleString(de ? 'de-DE' : 'en-US')}>
              <input
                type="range"
                min={1_000}
                max={1_000_000}
                step={1_000}
                value={docs}
                onChange={(e) => setDocs(Number(e.target.value))}
                className="w-full accent-accent-500"
              />
            </Field>
            <Field label={t.queriesLabel} value={queries.toLocaleString(de ? 'de-DE' : 'en-US')}>
              <input
                type="range"
                min={100}
                max={200_000}
                step={100}
                value={queries}
                onChange={(e) => setQueries(Number(e.target.value))}
                className="w-full accent-accent-500"
              />
            </Field>
            <div>
              <label className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
                {t.modelLabel}
              </label>
              <div className="mt-2 flex flex-col gap-2">
                {(Object.keys(MODEL_TIERS) as Tier[]).map((k) => (
                  <label
                    key={k}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                      tier === k
                        ? 'border-accent-500 bg-accent-500/10'
                        : 'border-brand-900/15 bg-white dark:border-white/15 dark:bg-white/5'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={k}
                      checked={tier === k}
                      onChange={() => setTier(k)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden
                      className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                        tier === k ? 'border-accent-500 bg-accent-500' : 'border-brand-900/30 dark:border-white/30'
                      }`}
                    >
                      {tier === k && <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-brand-950" />}
                    </span>
                    <span className="text-brand-900 dark:text-white">{MODEL_TIERS[k].label[de ? 'de' : 'en']}</span>
                  </label>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={eu}
                onChange={(e) => setEu(e.target.checked)}
                className="h-4 w-4 accent-accent-500"
              />
              <span className="text-sm text-brand-900 dark:text-white">{t.euLabel}</span>
            </label>
          </div>

          <aside className="rounded-2xl border border-accent-500/40 bg-accent-500/10 p-6 dark:border-accent-400/40 dark:bg-accent-400/10">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-accent-700 dark:text-accent-300">
              {t.resultLabel}
            </p>
            <p className="mt-2 font-display text-4xl font-bold text-brand-900 tabular-nums dark:text-white">
              € {Math.round(costs.total).toLocaleString(de ? 'de-DE' : 'en-US')}
            </p>
            <p className="mt-1 font-mono text-xs text-brand-900/70 tabular-nums dark:text-white/70">
              {t.rangeLabel}: € {Math.round(low).toLocaleString(de ? 'de-DE' : 'en-US')} – € {Math.round(high).toLocaleString(de ? 'de-DE' : 'en-US')} / mo
            </p>

            <dl className="mt-5 space-y-1.5 text-sm">
              <Row label={t.storage} value={costs.storage} de={de} />
              <Row label={t.embedding} value={costs.embedding} de={de} />
              <Row label={t.inference} value={costs.inference} de={de} />
              <Row label={t.hosting} value={costs.hosting} de={de} />
              {eu && <Row label={t.premium} value={costs.premium} de={de} />}
            </dl>
          </aside>
        </div>

        <section className="mt-10 rounded-xl border border-brand-900/10 bg-brand-50/70 p-6 dark:border-white/10 dark:bg-brand-950/60">
          <h2 className="font-display text-lg font-semibold text-brand-900 dark:text-white">{t.methodTitle}</h2>
          <ul className="mt-3 space-y-2 text-sm text-brand-900/80 dark:text-white/80">
            {t.methodBody.map((line) => (
              <li key={line} className="flex items-start gap-2">
                <span aria-hidden className="mt-2 inline-block h-1 w-5 flex-shrink-0 rounded-full bg-accent-500" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-brand-900/55 dark:text-white/50">{t.disclaimer}</p>
        </section>
      </div>
    </section>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
          {label}
        </span>
        <span className="font-mono text-sm text-brand-900 tabular-nums dark:text-white">{value}</span>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value, de }: { label: string; value: number; de: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-brand-900/85 dark:text-white/85">
      <dt className="min-w-0 truncate">{label}</dt>
      <dd className="font-mono text-xs tabular-nums text-brand-900 dark:text-white">
        € {Math.round(value).toLocaleString(de ? 'de-DE' : 'en-US')}
      </dd>
    </div>
  );
}
