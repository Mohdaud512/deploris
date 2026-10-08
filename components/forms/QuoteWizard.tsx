'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Honeypot, SelectField, TextAreaField, TextField } from './FormField';
import { Captcha } from './Captcha';

type FormState = {
  serviceLine: 'hardware' | 'development' | 'both';
  scope: string;
  timeline: string;
  budget: '<25k' | '25-100k' | '100-250k' | '250k+' | 'unsure';
  name: string;
  email: string;
  company: string;
  phone: string;
  consent: boolean;
  hp: string;
};

export function QuoteWizard() {
  const t = useTranslations('quote');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const [step, setStep] = useState(1);
  const [captcha, setCaptcha] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    serviceLine: 'development',
    scope: '',
    timeline: '',
    budget: 'unsure',
    name: '',
    email: '',
    company: '',
    phone: '',
    consent: false,
    hp: '',
  });

  function set<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setError(null);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, locale, captcha }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? tCommon('error_generic'));
        setState('error');
        return;
      }
      setState('sent');
    } catch {
      setError(tCommon('error_generic'));
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-900/10 bg-brand-50 p-6 text-brand-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <p className="text-lg font-semibold">{tCommon('success_generic')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative flex flex-col gap-6" noValidate>
      <Honeypot />

      <div>
        <p className="text-xs uppercase tracking-wide text-brand-900/60 dark:text-white/60">
          {t('progress', { current: step, total: 3 })}
        </p>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-brand-100 dark:bg-white/10">
          <div
            className="bg-brand-900 transition-all"
            style={{ width: `${(step / 3) * 100}%` }}
            aria-hidden
          />
        </div>
      </div>

      {step === 1 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="font-display text-xl font-semibold text-brand-900 dark:text-white">
            {t('step1')}
          </legend>
          <SelectField
            id="serviceLine"
            label={t('step1')}
            value={form.serviceLine}
            onChange={(v) => set('serviceLine', v as FormState['serviceLine'])}
            options={[
              { value: 'hardware', label: 'Hardware & Infrastructure' },
              { value: 'development', label: 'Software Development' },
              { value: 'both', label: 'Both' },
            ]}
            required
          />
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="font-display text-xl font-semibold text-brand-900 dark:text-white">
            {t('step2')}
          </legend>
          <TextAreaField
            id="scope"
            label={locale === 'de' ? 'Beschreiben Sie Umfang und Ziele' : 'Describe scope and goals'}
            value={form.scope}
            onChange={(e) => set('scope', e.target.value)}
            required
            minLength={10}
            maxLength={5000}
          />
          <TextField
            id="timeline"
            label={locale === 'de' ? 'Wunschzeitrahmen' : 'Desired timeline'}
            value={form.timeline}
            onChange={(e) => set('timeline', e.target.value)}
            required
            maxLength={200}
          />
          <SelectField
            id="budget"
            label={locale === 'de' ? 'Budgetrahmen (USD)' : 'Budget band (USD)'}
            value={form.budget}
            onChange={(v) => set('budget', v as FormState['budget'])}
            options={[
              { value: '<25k', label: '< $25k' },
              { value: '25-100k', label: '$25–100k' },
              { value: '100-250k', label: '$100–250k' },
              { value: '250k+', label: '$250k+' },
              { value: 'unsure', label: locale === 'de' ? 'Noch unklar' : 'Not sure yet' },
            ]}
            required
          />
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="flex flex-col gap-4">
          <legend className="font-display text-xl font-semibold text-brand-900 dark:text-white">
            {t('step3')}
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              id="name"
              label={locale === 'de' ? 'Vollständiger Name' : 'Full name'}
              value={form.name}
              onChange={(e) => set('name', e.target.value)}
              required
              autoComplete="name"
              maxLength={120}
            />
            <TextField
              id="email"
              type="email"
              label={locale === 'de' ? 'Geschäftliche E-Mail' : 'Business email'}
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              required
              autoComplete="email"
              maxLength={320}
            />
            <TextField
              id="company"
              label={locale === 'de' ? 'Unternehmen' : 'Company'}
              value={form.company}
              onChange={(e) => set('company', e.target.value)}
              required
              autoComplete="organization"
              maxLength={200}
            />
            <TextField
              id="phone"
              label={locale === 'de' ? 'Telefon (optional)' : 'Phone (optional)'}
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              maxLength={200}
            />
          </div>
          <label className="flex items-start gap-2 text-sm text-brand-900/85 dark:text-white/85">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
              required
              className="mt-1"
            />
            <span>
              {locale === 'de'
                ? 'Ich habe die Datenschutzerklärung gelesen und stimme der Kontaktaufnahme zu.'
                : 'I have read the privacy notice and consent to Deploris contacting me.'}
            </span>
          </label>
          <Captcha onToken={setCaptcha} />
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
        </fieldset>
      )}

      <div className="flex flex-wrap gap-3">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-full border border-brand-900/20 px-5 py-3 text-brand-900 dark:border-white/20 dark:text-white"
          >
            {t('back')}
          </button>
        )}
        {step < 3 && (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            className="rounded-full bg-brand-900 px-5 py-3 font-medium text-white hover:bg-brand-800"
          >
            {t('next')}
          </button>
        )}
        {step === 3 && (
          <button
            type="submit"
            disabled={state === 'sending' || !form.consent}
            className="rounded-full bg-brand-900 px-5 py-3 font-medium text-white hover:bg-brand-800 disabled:opacity-50"
          >
            {state === 'sending' ? '…' : t('submit')}
          </button>
        )}
      </div>
    </form>
  );
}
