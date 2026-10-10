'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/config/locales';

type Weight = 'critical' | 'important' | 'nice';
type Item = { id: string; q: { en: string; de: string }; category: 'security' | 'governance' | 'ops' | 'commercial' | 'compliance'; weight: Weight };

const ITEMS: Item[] = [
  { id: 'enc_rest', category: 'security', weight: 'critical', q: { en: 'Vendor encrypts customer data at rest with keys you can rotate (or BYOK/HSM available)', de: 'Daten werden mit rotierbaren Schlüsseln verschlüsselt gespeichert (BYOK/HSM verfügbar)' } },
  { id: 'enc_transit', category: 'security', weight: 'critical', q: { en: 'TLS 1.2+ enforced on every ingress and egress path', de: 'TLS 1.2+ auf allen Ein- und Ausgängen erzwungen' } },
  { id: 'sso', category: 'security', weight: 'important', q: { en: 'SAML/OIDC SSO available on the plan you can afford', de: 'SAML/OIDC-SSO auf einem Tarif verfügbar, den Sie sich leisten können' } },
  { id: 'audit', category: 'security', weight: 'important', q: { en: 'Admin audit log is complete, immutable, and exportable', de: 'Admin-Audit-Log vollständig, unveränderlich, exportierbar' } },
  { id: 'training', category: 'governance', weight: 'critical', q: { en: 'Customer data is explicitly excluded from model training, in writing', de: 'Kundendaten explizit und schriftlich vom Modelltraining ausgeschlossen' } },
  { id: 'retention', category: 'governance', weight: 'important', q: { en: 'Prompt/response retention controllable (zero-retention option exists)', de: 'Prompt-/Antwort-Aufbewahrung konfigurierbar (Zero-Retention-Option existiert)' } },
  { id: 'residency', category: 'governance', weight: 'important', q: { en: 'EU data residency available (Frankfurt or similar) under SCCs or new EU-US framework', de: 'EU-Datenresidenz (Frankfurt o. ä.) unter SCCs oder neuem EU-US-Rahmen verfügbar' } },
  { id: 'uptime', category: 'ops', weight: 'critical', q: { en: 'Public uptime history (not just a promised SLA target)', de: 'Öffentliche Uptime-Historie (nicht nur eine zugesagte SLA)' } },
  { id: 'incident', category: 'ops', weight: 'important', q: { en: 'Named incident-response contact, median response time disclosed', de: 'Namentlicher Incident-Response-Kontakt, mediane Reaktionszeit offengelegt' } },
  { id: 'export', category: 'ops', weight: 'critical', q: { en: 'Full data export in a documented format, included on every plan', de: 'Vollständiger Datenexport in dokumentiertem Format, in jedem Tarif enthalten' } },
  { id: 'pricing', category: 'commercial', weight: 'important', q: { en: 'Pricing is transparent or at least a defensible band is given before DocuSign', de: 'Preisgestaltung transparent oder zumindest belastbare Spanne vor DocuSign' } },
  { id: 'exit', category: 'commercial', weight: 'critical', q: { en: 'Exit clause: pro-rata refund + data return within 30 days of cancellation', de: 'Austrittsklausel: anteilige Rückerstattung + Datenrückgabe binnen 30 Tagen nach Kündigung' } },
  { id: 'soc2', category: 'compliance', weight: 'important', q: { en: 'SOC 2 Type II or ISO 27001 certificate (not "SOC 2 planned")', de: 'SOC 2 Type II oder ISO 27001 Zertifikat (nicht „SOC 2 geplant")' } },
  { id: 'dpa', category: 'compliance', weight: 'critical', q: { en: 'Standard DPA/AV-Vertrag available without renegotiation', de: 'Standard-AV-Vertrag ohne Nachverhandlung verfügbar' } },
  { id: 'ai_act', category: 'compliance', weight: 'nice', q: { en: 'Written stance on the EU AI Act and the risk tier they operate under', de: 'Schriftliche Position zum EU AI Act und zur Risikostufe des Betriebs' } },
];

const CATEGORIES = {
  security: { en: 'Security', de: 'Security' },
  governance: { en: 'Data governance', de: 'Datenhoheit' },
  ops: { en: 'Operational', de: 'Betrieb' },
  commercial: { en: 'Commercial', de: 'Vertragliches' },
  compliance: { en: 'Compliance', de: 'Compliance' },
} as const;

const WEIGHT_VALUE: Record<Weight, number> = { critical: 3, important: 2, nice: 1 };

export function AiVendorRisk({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const [answers, setAnswers] = useState<Record<string, boolean>>({});

  const totals = useMemo(() => {
    const total = ITEMS.reduce((s, it) => s + WEIGHT_VALUE[it.weight], 0);
    const earned = ITEMS.reduce((s, it) => s + (answers[it.id] ? WEIGHT_VALUE[it.weight] : 0), 0);
    const criticalFails = ITEMS.filter((it) => it.weight === 'critical' && !answers[it.id]).length;
    const pct = Math.round((earned / total) * 100);
    let band: 'low' | 'medium' | 'high';
    if (criticalFails >= 2 || pct < 55) band = 'high';
    else if (criticalFails >= 1 || pct < 80) band = 'medium';
    else band = 'low';
    return { pct, criticalFails, band };
  }, [answers]);

  const bandCopy = de
    ? { low: 'Geringes Risiko', medium: 'Mittleres Risiko', high: 'Hohes Risiko' }
    : { low: 'Low risk', medium: 'Medium risk', high: 'High risk' };
  const bandClass = {
    low: 'text-emerald-600 dark:text-emerald-400',
    medium: 'text-amber-600 dark:text-amber-400',
    high: 'text-rose-600 dark:text-rose-400',
  }[totals.band];

  const t = de
    ? {
        scoreLabel: 'Risiko-Score',
        criticalLabel: 'Kritische Lücken',
        resetLabel: 'Alle zurücksetzen',
        allLabel: 'Alle als „ja" markieren',
        noneLabel: 'Alle als „nein" markieren',
        headQ: 'Frage',
        headCat: 'Kategorie',
        headWeight: 'Gewichtung',
        headA: 'Erfüllt?',
        weightLabel: { critical: 'kritisch', important: 'wichtig', nice: 'nice-to-have' },
      }
    : {
        scoreLabel: 'Risk score',
        criticalLabel: 'Critical gaps',
        resetLabel: 'Reset all',
        allLabel: 'Mark all "yes"',
        noneLabel: 'Mark all "no"',
        headQ: 'Question',
        headCat: 'Category',
        headWeight: 'Weight',
        headA: 'Met?',
        weightLabel: { critical: 'critical', important: 'important', nice: 'nice-to-have' },
      };

  function toggle(id: string) {
    setAnswers((a) => ({ ...a, [id]: !a[id] }));
  }

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <aside className="sticky top-24 z-10 rounded-2xl border border-accent-500/40 bg-accent-500/10 p-5 shadow-sm dark:border-accent-400/40 dark:bg-accent-400/10">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-brand-900/60 dark:text-white/60">{t.scoreLabel}</p>
              <p className="mt-1 font-display text-3xl font-bold text-brand-900 tabular-nums dark:text-white">{totals.pct}%</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-brand-900/60 dark:text-white/60">{t.criticalLabel}</p>
              <p className="mt-1 font-display text-3xl font-bold text-brand-900 tabular-nums dark:text-white">{totals.criticalFails}</p>
            </div>
            <div>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-brand-900/60 dark:text-white/60">Band</p>
              <p className={`mt-1 font-display text-xl font-bold ${bandClass}`}>{bandCopy[totals.band]}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <button type="button" onClick={() => setAnswers({})} className="rounded-full border border-brand-900/20 bg-white px-3 py-1 font-medium hover:bg-brand-50 dark:border-white/20 dark:bg-brand-950 dark:text-white dark:hover:bg-white/10">
              {t.resetLabel}
            </button>
            <button type="button" onClick={() => setAnswers(Object.fromEntries(ITEMS.map((i) => [i.id, true])))} className="rounded-full border border-brand-900/20 bg-white px-3 py-1 font-medium hover:bg-brand-50 dark:border-white/20 dark:bg-brand-950 dark:text-white dark:hover:bg-white/10">
              {t.allLabel}
            </button>
            <button type="button" onClick={() => setAnswers(Object.fromEntries(ITEMS.map((i) => [i.id, false])))} className="rounded-full border border-brand-900/20 bg-white px-3 py-1 font-medium hover:bg-brand-50 dark:border-white/20 dark:bg-brand-950 dark:text-white dark:hover:bg-white/10">
              {t.noneLabel}
            </button>
          </div>
        </aside>

        <ul className="mt-10 divide-y divide-brand-900/10 dark:divide-white/10">
          {ITEMS.map((it) => {
            const met = answers[it.id];
            const isCritical = it.weight === 'critical';
            return (
              <li key={it.id} className="flex items-start justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="text-brand-900 dark:text-white">{it.q[de ? 'de' : 'en']}</p>
                  <p className="mt-1 flex flex-wrap items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-brand-900/55 dark:text-white/55">
                    <span>{CATEGORIES[it.category][de ? 'de' : 'en']}</span>
                    <span className="opacity-60">·</span>
                    <span className={isCritical ? 'text-rose-600 dark:text-rose-400' : ''}>{t.weightLabel[it.weight]}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(it.id)}
                  aria-pressed={met ?? false}
                  className={`flex-shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
                    met === true
                      ? 'border-emerald-500 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300'
                      : met === false
                      ? 'border-rose-500 bg-rose-500/15 text-rose-700 dark:text-rose-300'
                      : 'border-brand-900/20 bg-white text-brand-900/70 hover:border-accent-500 dark:border-white/20 dark:bg-brand-950 dark:text-white/70'
                  }`}
                >
                  {met === true ? (de ? '✓ ja' : '✓ yes') : met === false ? (de ? '✕ nein' : '✕ no') : (de ? 'offen' : 'open')}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs text-brand-900/55 dark:text-white/50">
          {de
            ? 'Lokal in Ihrem Browser bewertet. Keine Antwort wird gespeichert oder übermittelt.'
            : 'Scored locally in your browser. No answers are stored or transmitted.'}
        </p>
      </div>
    </section>
  );
}
