'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { publicEnv } from '@/lib/env';

type Msg = { role: 'user' | 'assistant'; content: string };

/**
 * Floating AI chatbot RAG-grounded, Grok-ready (stub until XAI_API_KEY set).
 * Talks to /api/chat which:
 * - re-validates the payload
 * - rate-limits by IP
 * - reads XAI_API_KEY from the server env (never exposed to client)
 * - returns a streamed answer grounded in the local RAG index
 */
export function Chatbot() {
  const t = useTranslations('chatbot');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [showLead, setShowLead] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '' });
  const [leadSent, setLeadSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 999999, behavior: 'smooth' });
  }, [messages, busy]);

  useEffect(() => {
    if (messages.length === 0 && open) {
      setMessages([
        {
          role: 'assistant',
          content:
            locale === 'de'
              ? 'Hallo! Fragen Sie mich zu unseren Leistungen (CRM, RAG, KI-Agenten, IT-Support). Ich antworte anhand unserer eigenen Inhalte.'
              : "Hi! Ask me about our services (CRM, RAG, AI agents, IT support). I answer using our own content.",
        },
      ]);
    }
  }, [open, locale, messages.length]);

  async function send() {
    const text = input.trim();
    if (!text || busy) return;
    setInput('');
    setBusy(true);
    const nextMessages: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(nextMessages);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: nextMessages.slice(-8).map((m) => ({ role: m.role, content: m.content })),
          locale,
        }),
      });
      if (!res.ok || !res.body) {
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            content:
              locale === 'de'
                ? 'Entschuldigung der Dienst ist gerade nicht erreichbar. Bitte versuchen Sie es erneut oder kontaktieren Sie uns direkt.'
                : 'Sorry the service is unavailable right now. Please try again or contact us directly.',
          },
        ]);
        setBusy(false);
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = '';
      setMessages((m) => [...m, { role: 'assistant', content: '' }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = m.slice();
          copy[copy.length - 1] = { role: 'assistant', content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: 'assistant',
          content:
            locale === 'de'
              ? 'Netzwerkfehler. Bitte versuchen Sie es erneut.'
              : 'Network error. Please try again.',
        },
      ]);
    } finally {
      setBusy(false);
    }
  }

  async function sendLead() {
    if (!lead.name.trim() || !lead.email.trim()) return;
    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          message: '__lead_capture__',
          history: messages.slice(-8),
          lead,
          locale,
        }),
      });
      setLeadSent(true);
      setTimeout(() => setShowLead(false), 1500);
    } catch {
      /* silent */
    }
  }

  return (
    <>
      <button
        type="button"
        aria-label={t('open')}
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-900 text-white shadow-xl hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent-400"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden>
          <path d="M4 4h16a2 2 0 012 2v10a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-labelledby="chatbot-title"
          aria-modal="false"
          className="fixed bottom-4 right-4 z-50 flex h-[540px] w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-brand-900/10 bg-white shadow-2xl dark:border-white/10 dark:bg-surface-dark"
        >
          <header className="flex items-center justify-between bg-brand-900 px-4 py-3 text-white">
            <div>
              <h2 id="chatbot-title" className="text-sm font-semibold">
                {t('title')}
              </h2>
              <p className="text-xs text-white/70">{t('subtitle')}</p>
            </div>
            <button
              type="button"
              aria-label={t('close')}
              onClick={() => setOpen(false)}
              className="rounded p-1 hover:bg-white/10"
            >
              ✕
            </button>
          </header>

          {!publicEnv.hcaptchaSiteKey && (
            <p className="border-b border-brand-900/10 bg-accent-500/10 px-3 py-1.5 text-[11px] text-brand-900 dark:border-white/10 dark:text-white">
              {t('stub_notice')}
            </p>
          )}

          <div
            ref={scrollRef}
            aria-live="polite"
            aria-atomic="false"
            className="flex-1 space-y-3 overflow-y-auto p-3"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === 'user'
                    ? 'ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-brand-900 px-3 py-2 text-sm text-white'
                    : 'mr-auto max-w-[90%] rounded-2xl rounded-bl-sm bg-brand-50 px-3 py-2 text-sm text-brand-900 dark:bg-white/5 dark:text-white'
                }
              >
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="mr-auto rounded-2xl bg-brand-50 px-3 py-2 text-sm text-brand-900 dark:bg-white/5 dark:text-white">
                …
              </div>
            )}
          </div>

          <div className="border-t border-brand-900/10 p-3 dark:border-white/10">
            {showLead ? (
              leadSent ? (
                <p className="text-sm text-brand-900 dark:text-white">{t('lead_thanks')}</p>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-brand-900/80 dark:text-white/80">{t('lead_prompt')}</p>
                  <input
                    type="text"
                    placeholder={t('lead_name')}
                    value={lead.name}
                    onChange={(e) => setLead({ ...lead, name: e.target.value })}
                    maxLength={120}
                    className="rounded border border-brand-900/20 bg-white px-2 py-1 text-sm dark:border-white/20 dark:bg-white/5 dark:text-white"
                  />
                  <input
                    type="email"
                    placeholder={t('lead_email')}
                    value={lead.email}
                    onChange={(e) => setLead({ ...lead, email: e.target.value })}
                    maxLength={320}
                    className="rounded border border-brand-900/20 bg-white px-2 py-1 text-sm dark:border-white/20 dark:bg-white/5 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={sendLead}
                    className="self-start rounded bg-brand-900 px-3 py-1.5 text-sm text-white hover:bg-brand-800"
                  >
                    {t('lead_submit')}
                  </button>
                </div>
              )
            ) : (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder={t('placeholder')}
                    maxLength={2000}
                    className="flex-1 rounded-full border border-brand-900/20 bg-white px-3 py-2 text-sm dark:border-white/20 dark:bg-white/5 dark:text-white"
                    aria-label={t('placeholder')}
                  />
                  <button
                    type="button"
                    onClick={send}
                    disabled={busy || !input.trim()}
                    className="rounded-full bg-brand-900 px-3 py-2 text-sm text-white hover:bg-brand-800 disabled:opacity-50"
                  >
                    {t('send')}
                  </button>
                </div>
                <div className="flex justify-between text-[11px]">
                  <button type="button" onClick={() => setShowLead(true)} className="text-brand-700 hover:underline dark:text-accent-400">
                    {t('escalate')}
                  </button>
                  {publicEnv.calendlyUrl && (
                    <a
                      href={publicEnv.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-700 hover:underline dark:text-accent-400"
                    >
                      {t('book_call')}
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
