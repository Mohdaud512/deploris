'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Honeypot, TextField } from './FormField';
import { Captcha } from './Captcha';

export function NewsletterOptIn() {
  const t = useTranslations('newsletter');
  const locale = useLocale();
  const [captcha, setCaptcha] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'confirm' | 'error' | 'already'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: String(fd.get('email') || ''),
          consent: fd.get('consent') === 'on',
          hp: String(fd.get('hp') || ''),
          captcha,
          locale,
        }),
      });
      if (res.status === 409) {
        setState('already');
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Error');
        setState('error');
        return;
      }
      setState('confirm');
    } catch {
      setError('Network error');
      setState('error');
    }
  }

  if (state === 'confirm') {
    return (
      <p role="status" className="rounded-xl border border-brand-900/10 bg-brand-50 p-4 text-sm text-brand-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
        {t('double_opt_in')}
      </p>
    );
  }
  if (state === 'already') {
    return (
      <p role="status" className="rounded-xl border border-brand-900/10 bg-brand-50 p-4 text-sm text-brand-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
        {t('already')}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="relative flex flex-col gap-3" noValidate>
      <Honeypot />
      <div>
        <h3 className="font-display text-lg font-semibold text-brand-900 dark:text-white">{t('title')}</h3>
        <p className="text-sm text-brand-900/80 dark:text-white/80">{t('body')}</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <TextField id="nl-email" name="email" type="email" label={t('field_email')} required autoComplete="email" maxLength={320} />
      </div>
      <label className="flex items-start gap-2 text-xs text-brand-900/80 dark:text-white/80">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{t('consent')}</span>
      </label>
      <Captcha onToken={setCaptcha} />
      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="self-start rounded-full bg-brand-900 px-4 py-2 text-sm font-medium text-white hover:bg-brand-800 disabled:opacity-50"
      >
        {state === 'sending' ? '…' : t('submit')}
      </button>
    </form>
  );
}
