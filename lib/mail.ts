import { Resend } from 'resend';
import { serverEnv } from './env';

/**
 * Server-only mail sender. Never import from a client component.
 *
 * SECURITY:
 * - No user-controlled values in From / Reply-To those come from server env
 * (defuses email-header injection).
 * - Subject and body are strings we build server-side after zod validation.
 * - All PII stays inside the process; no logging of raw email bodies.
 */

let resend: Resend | null = null;
function client(): Resend {
  if (!resend) {
    if (!serverEnv.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set cannot send email.');
    }
    resend = new Resend(serverEnv.RESEND_API_KEY);
  }
  return resend;
}

/** Strip CR/LF from anything used in an envelope field to prevent header injection. */
function envelopeSafe(v: string): string {
  return v.replace(/[\r\n]/g, ' ').slice(0, 320);
}

export type SendMailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendMail(input: SendMailInput): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const to = Array.isArray(input.to) ? input.to.map(envelopeSafe) : envelopeSafe(input.to);
    const { error } = await client().emails.send({
      from: serverEnv.RESEND_FROM, // trusted server constant
      to,
      subject: envelopeSafe(input.subject),
      html: input.html,
      text: input.text,
      replyTo: input.replyTo ? envelopeSafe(input.replyTo) : undefined,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown' };
  }
}

/** Escape untrusted text for interpolation inside an HTML mail body. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
