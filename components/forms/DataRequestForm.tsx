'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Honeypot, SelectField, TextAreaField, TextField } from './FormField';
import { Captcha } from './Captcha';

export function DataRequestForm() {
  const locale = useLocale();
  const de = locale === 'de';
  const [captcha, setCaptcha] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [requestType, setRequestType] = useState<'access' | 'rectification' | 'erasure' | 'portability' | 'other'>('access');

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === 'sending') return;
    setState('sending');
    setError(null);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/data-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: String(fd.get('name') || ''),
          email: String(fd.get('email') || ''),
          requestType,
          details: String(fd.get('details') || ''),
          consent: fd.get('consent') === 'on',
          hp: String(fd.get('hp') || ''),
          captcha,
          locale,
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? 'Error');
        setState('error');
        return;
      }
      setState('sent');
    } catch {
      setError('Network error');
      setState('error');
    }
  }

  if (state === 'sent') {
    return (
      <p role="status" className="rounded-xl border border-brand-900/10 bg-brand-50 p-4 text-brand-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
        {de
          ? 'Vielen Dank. Wir bearbeiten Ihre Anfrage innerhalb der gesetzlichen Fristen und melden uns schriftlich.'
          : 'Thank you. We will handle your request within the statutory windows and respond in writing.'}
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="relative flex flex-col gap-4" noValidate>
      <Honeypot />
      <div className="grid gap-4 md:grid-cols-2">
        <TextField id="dr-name" name="name" label={de ? 'Vollständiger Name' : 'Full name'} required maxLength={120} autoComplete="name" />
        <TextField id="dr-email" name="email" type="email" label={de ? 'E-Mail' : 'Email'} required maxLength={320} autoComplete="email" />
      </div>
      <SelectField
        id="requestType"
        label={de ? 'Art der Anfrage' : 'Request type'}
        value={requestType}
        onChange={(v) => setRequestType(v as typeof requestType)}
        required
        options={[
          { value: 'access', label: de ? 'Auskunft (Art. 15)' : 'Access (Art. 15)' },
          { value: 'rectification', label: de ? 'Berichtigung (Art. 16)' : 'Rectification (Art. 16)' },
          { value: 'erasure', label: de ? 'Löschung (Art. 17)' : 'Erasure (Art. 17)' },
          { value: 'portability', label: de ? 'Datenübertragbarkeit (Art. 20)' : 'Portability (Art. 20)' },
          { value: 'other', label: de ? 'Anderes' : 'Other' },
        ]}
      />
      <TextAreaField
        id="dr-details"
        name="details"
        label={de ? 'Details zu Ihrer Anfrage' : 'Details of your request'}
        required
        minLength={10}
        maxLength={5000}
      />
      <label className="flex items-start gap-2 text-sm text-brand-900/85 dark:text-white/85">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>
          {de
            ? 'Ich bestätige, dass die Angaben zu meiner Person korrekt sind und der Kontaktaufnahme zu.'
            : 'I confirm the information above is accurate and consent to being contacted about this request.'}
        </span>
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
        className="self-start rounded-full bg-brand-900 px-5 py-3 font-medium text-white hover:bg-brand-800 disabled:opacity-50"
      >
        {state === 'sending' ? '…' : de ? 'Anfrage senden' : 'Send request'}
      </button>
    </form>
  );
}
