'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Honeypot, SelectField, TextAreaField, TextField } from './FormField';
import { Captcha } from './Captcha';

export function ContactForm() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [captchaToken, setCaptchaToken] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [serviceLine, setServiceLine] = useState('unsure');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setErrorMsg(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get('name') || ''),
      email: String(fd.get('email') || ''),
      company: String(fd.get('company') || ''),
      phone: String(fd.get('phone') || ''),
      serviceLine,
      message: String(fd.get('message') || ''),
      consent: fd.get('consent') === 'on',
      hp: String(fd.get('hp') || ''),
      captcha: captchaToken,
      locale,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorMsg(data.error ?? t('error'));
        setState('error');
        return;
      }
      setState('sent');
      form.reset();
    } catch {
      setErrorMsg(t('error'));
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-900/10 bg-brand-50 p-6 text-brand-900 dark:border-white/10 dark:bg-white/5 dark:text-white"
      >
        <p className="text-lg font-semibold">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-4" noValidate>
      <Honeypot />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField id="name" name="name" label={t('field_name')} required autoComplete="name" maxLength={120} />
        <TextField id="email" name="email" type="email" label={t('field_email')} required autoComplete="email" maxLength={320} />
        <TextField id="company" name="company" label={t('field_company')} autoComplete="organization" maxLength={200} />
        <TextField id="phone" name="phone" label={t('field_phone')} autoComplete="tel" maxLength={200} />
      </div>
      <SelectField
        id="serviceLine"
        label={t('field_service_line')}
        value={serviceLine}
        onChange={setServiceLine}
        required
        options={[
          { value: 'hardware', label: t('options.hardware') },
          { value: 'development', label: t('options.development') },
          { value: 'both', label: t('options.both') },
          { value: 'unsure', label: t('options.unsure') },
        ]}
      />
      <TextAreaField id="message" name="message" label={t('field_message')} required minLength={10} maxLength={5000} />
      <label className="flex items-start gap-2 text-sm text-brand-900/85 dark:text-white/85">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{t('field_consent')}</span>
      </label>
      <Captcha onToken={setCaptchaToken} />
      {errorMsg && (
        <p role="alert" className="text-sm text-red-600">
          {errorMsg}
        </p>
      )}
      <button
        type="submit"
        disabled={state === 'sending'}
        className="self-start rounded-full bg-brand-900 px-5 py-3 font-medium text-white hover:bg-brand-800 disabled:opacity-50"
      >
        {state === 'sending' ? '…' : t('submit')}
      </button>
    </form>
  );
}
