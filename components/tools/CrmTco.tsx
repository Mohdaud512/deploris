'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/config/locales';

/**
 * 3-year CRM TCO comparator. Deterministic math using published list prices
 * (year-end 2025 snapshot) + Deploris build-and-maintain assumptions. All
 * figures are indicative — enterprise discounts routinely move SaaS pricing
 * 30–60% at the top of this range, which is called out in the methodology.
 */
const PLATFORMS = {
  hubspot: {
    name: 'HubSpot Sales Hub Enterprise',
    seatMonthly: 150, // $/user/month enterprise seat (2025 list)
    onboardingFlat: 3500, // typical one-off
    adminFTE: 0.1, // internal admin FTE ratio
  },
  salesforce: {
    name: 'Salesforce Sales Cloud Enterprise',
    seatMonthly: 165,
    onboardingFlat: 8000,
    adminFTE: 0.15,
  },
  pipedrive: {
    name: 'Pipedrive Power',
    seatMonthly: 65,
    onboardingFlat: 1500,
    adminFTE: 0.07,
  },
} as const;

type PlatformKey = keyof typeof PLATFORMS;

export function CrmTco({ locale }: { locale: Locale }) {
  const de = locale === 'de';
  const t = de
    ? {
        usersLabel: 'Vertriebs-Sitze',
        platformLabel: 'Standard-CRM-Vergleich',
        integrationsLabel: 'Spezielle Integrationen (geschätzt)',
        adminLabel: 'Fully-loaded FTE-Kosten pro Jahr',
        resultLabel: '3-Jahres-TCO',
        samePerspective: '— über drei Jahre, alles enthalten',
        saasLabel: 'Standard-SaaS (gewählt)',
        customLabel: 'Deploris individuelles CRM',
        diffLabel: 'Differenz',
        breakdown: 'Zusammensetzung',
        s_license: 'Lizenz (Jahr 1–3)',
        s_onboard: 'Setup & Onboarding',
        s_admin: 'Internes Admin-Overhead',
        s_integrations: 'Spezielle Integrationen',
        c_build: 'Erst-Build',
        c_integrations: 'Integrationen inklusive',
        c_maintenance: 'Retainer / Wartung (Jahr 2–3)',
        c_admin: 'Internes Admin reduziert',
        methodTitle: 'Wie wir rechnen',
        methodBody: [
          'Lizenzpreise sind Listenpreise 2025 pro Nutzer pro Monat; Enterprise-Rabatte verschieben das Bild oft um 30–60 %.',
          'Internes Admin-Overhead: Sitze × Admin-FTE-Faktor × Jahresbrutto (Default 90.000 €).',
          'Standard-Setup: einmalige Onboarding-Pauschale je Plattform.',
          'Deploris-Build: 85.000 € typische erste Produktionsversion in 4–6 Wochen, inkl. drei Standardintegrationen.',
          'Deploris-Retainer: 2.000 € pro Monat ab Monat 7 (Managed-Ops, Feature-Pakete separat).',
          'Deploris-Admin-Overhead: 40 % geringer als Standard (keine Konfigurations-Vollzeitstelle nötig).',
        ],
        disclaimer: 'Richtwerte. Verhandelte Preise, Shadow-IT-Spend und Opportunity-Cost nicht enthalten. Kein Angebot.',
      }
    : {
        usersLabel: 'Revenue team seats',
        platformLabel: 'Off-the-shelf comparator',
        integrationsLabel: 'Custom integrations (estimated)',
        adminLabel: 'Fully-loaded FTE cost per year',
        resultLabel: '3-year TCO',
        samePerspective: '— all-in, over three years',
        saasLabel: 'Off-the-shelf (selected)',
        customLabel: 'Deploris custom CRM',
        diffLabel: 'Delta',
        breakdown: 'Breakdown',
        s_license: 'Licence (yr 1–3)',
        s_onboard: 'Setup & onboarding',
        s_admin: 'Internal admin overhead',
        s_integrations: 'Custom integrations',
        c_build: 'Initial build',
        c_integrations: 'Integrations included',
        c_maintenance: 'Retainer / maintenance (yr 2–3)',
        c_admin: 'Internal admin reduced',
        methodTitle: 'How we calculate',
        methodBody: [
          'Licence prices are 2025 list, per seat per month; enterprise discounts routinely move this 30–60%.',
          'Internal admin overhead: seats × admin-FTE ratio × loaded salary (default €90,000).',
          'Standard setup: one-off platform onboarding flat.',
          'Deploris build: €85,000 typical first-production release in 4–6 weeks, three standard integrations included.',
          'Deploris retainer: €2,000/month from month 7 (managed ops; feature packs scoped separately).',
          'Deploris admin overhead: 40% lower (no full-time CRM admin needed).',
        ],
        disclaimer: 'Indicative. Negotiated prices, shadow IT spend, and opportunity cost not included. Not a quote.',
      };

  const [users, setUsers] = useState(60);
  const [platform, setPlatform] = useState<PlatformKey>('hubspot');
  const [integrations, setIntegrations] = useState(25000);
  const [fte, setFte] = useState(90000);

  const nf = (n: number) => `€ ${Math.round(n).toLocaleString(de ? 'de-DE' : 'en-US')}`;

  const totals = useMemo(() => {
    const p = PLATFORMS[platform];
    const sLicense = users * p.seatMonthly * 12 * 3; // 3 years
    const sOnboard = p.onboardingFlat;
    const sAdmin = users * p.adminFTE * fte * 3;
    const sIntegrations = integrations;
    const sTotal = sLicense + sOnboard + sAdmin + sIntegrations;

    const cBuild = 85000;
    const cIntegrations = 0;
    const cMaintenance = 2000 * 12 * 2 + 2000 * 6; // yr 2 + 3 + half of yr 1
    const cAdmin = users * p.adminFTE * fte * 3 * 0.6; // 40% less admin
    const cTotal = cBuild + cIntegrations + cMaintenance + cAdmin;

    return {
      saas: { license: sLicense, onboard: sOnboard, admin: sAdmin, integrations: sIntegrations, total: sTotal },
      custom: { build: cBuild, integrations: cIntegrations, maintenance: cMaintenance, admin: cAdmin, total: cTotal },
      diff: sTotal - cTotal,
    };
  }, [users, platform, integrations, fte]);

  const customWins = totals.custom.total < totals.saas.total;

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-6">
            <Field label={t.usersLabel} value={String(users)}>
              <input type="range" min={5} max={500} step={5} value={users} onChange={(e) => setUsers(Number(e.target.value))} className="w-full accent-accent-500" />
            </Field>
            <div>
              <label className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">{t.platformLabel}</label>
              <div className="mt-2 flex flex-col gap-2">
                {(Object.keys(PLATFORMS) as PlatformKey[]).map((k) => (
                  <label
                    key={k}
                    className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2 text-sm ${
                      platform === k
                        ? 'border-accent-500 bg-accent-500/10'
                        : 'border-brand-900/15 bg-white dark:border-white/15 dark:bg-white/5'
                    }`}
                  >
                    <input type="radio" name="plat" checked={platform === k} onChange={() => setPlatform(k)} className="sr-only" />
                    <span aria-hidden className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border ${platform === k ? 'border-accent-500 bg-accent-500' : 'border-brand-900/30 dark:border-white/30'}`}>
                      {platform === k && <span className="h-1.5 w-1.5 rounded-full bg-white dark:bg-brand-950" />}
                    </span>
                    <span className="text-brand-900 dark:text-white">{PLATFORMS[k].name}</span>
                  </label>
                ))}
              </div>
            </div>
            <Field label={t.integrationsLabel} value={nf(integrations)}>
              <input type="range" min={0} max={200000} step={2500} value={integrations} onChange={(e) => setIntegrations(Number(e.target.value))} className="w-full accent-accent-500" />
            </Field>
            <Field label={t.adminLabel} value={nf(fte)}>
              <input type="range" min={40000} max={200000} step={5000} value={fte} onChange={(e) => setFte(Number(e.target.value))} className="w-full accent-accent-500" />
            </Field>
          </div>

          <aside className="min-w-0 space-y-5">
            <div className="rounded-2xl border border-brand-900/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">
                {t.resultLabel} <span className="normal-case tracking-normal">{t.samePerspective}</span>
              </p>

              <div className="mt-5 space-y-5">
                <TotalRow label={t.saasLabel} value={totals.saas.total} nf={nf} highlighted={!customWins} />
                <TotalRow label={t.customLabel} value={totals.custom.total} nf={nf} highlighted={customWins} />
                <div className="flex items-baseline justify-between border-t border-brand-900/10 pt-4 dark:border-white/10">
                  <span className="font-mono text-xs uppercase tracking-[0.1em] text-brand-900/60 dark:text-white/60">{t.diffLabel}</span>
                  <span className={`whitespace-nowrap font-display text-lg font-bold tabular-nums md:text-xl ${customWins ? 'text-accent-700 dark:text-accent-300' : 'text-brand-900/70 dark:text-white/70'}`}>
                    {customWins ? '−' : '+'} {nf(Math.abs(totals.diff))}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-brand-900/10 bg-brand-50/60 p-5 text-sm dark:border-white/10 dark:bg-brand-950/60">
              <h3 className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-brand-900/60 dark:text-white/60">{t.breakdown}</h3>
              <dl className="mt-3 grid gap-x-5 gap-y-1 md:grid-cols-2">
                <Row label={t.s_license} value={totals.saas.license} nf={nf} />
                <Row label={t.c_build} value={totals.custom.build} nf={nf} />
                <Row label={t.s_onboard} value={totals.saas.onboard} nf={nf} />
                <Row label={t.c_maintenance} value={totals.custom.maintenance} nf={nf} />
                <Row label={t.s_admin} value={totals.saas.admin} nf={nf} />
                <Row label={t.c_admin} value={totals.custom.admin} nf={nf} />
                <Row label={t.s_integrations} value={totals.saas.integrations} nf={nf} />
                <Row label={t.c_integrations} value={totals.custom.integrations} nf={nf} />
              </dl>
            </div>
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
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-brand-900/60 dark:text-white/60">{label}</span>
        <span className="font-mono text-sm text-brand-900 tabular-nums dark:text-white">{value}</span>
      </div>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function Row({ label, value, nf }: { label: string; value: number; nf: (n: number) => string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 text-brand-900/85 dark:text-white/85">
      <dt className="min-w-0 truncate text-xs">{label}</dt>
      <dd className="whitespace-nowrap font-mono text-xs tabular-nums text-brand-900 dark:text-white">{nf(value)}</dd>
    </div>
  );
}

function TotalRow({ label, value, nf, highlighted }: { label: string; value: number; nf: (n: number) => string; highlighted: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className={`text-sm font-medium ${highlighted ? 'text-accent-700 dark:text-accent-300' : 'text-brand-900/70 dark:text-white/70'}`}>{label}</span>
      <span className={`whitespace-nowrap font-display tabular-nums ${highlighted ? 'text-2xl font-bold text-brand-900 md:text-3xl dark:text-white' : 'text-xl font-semibold text-brand-900/70 md:text-2xl dark:text-white/70'}`}>
        {nf(value)}
      </span>
    </div>
  );
}
