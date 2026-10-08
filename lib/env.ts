import { z } from 'zod';

/**
 * Server-only environment schema. Never import this from a client component * the RESEND / XAI / HCAPTCHA secrets must never cross the server-client boundary.
 *
 * `parse` here is intentionally lazy: for local dev the .env may be incomplete,
 * so we log a warning and only hard-fail in production for secrets that are
 * actually needed by an active code path (checked at call site).
 */
const serverSchema = z.object({
  RESEND_API_KEY: z.string().optional(),
  RESEND_FROM: z.string().default('Deploris <noreply@deploris.com>'),
  CONTACT_INBOX: z.string().email().optional(),
  QUOTE_INBOX: z.string().email().optional(),
  NEWSLETTER_INBOX: z.string().email().optional(),
  DATA_REQUEST_INBOX: z.string().email().optional(),
  LEAD_NOTIFICATION_WEBHOOK_URL: z.string().url().optional(),
  HCAPTCHA_SECRET_KEY: z.string().optional(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  XAI_API_KEY: z.string().optional(),
  XAI_MODEL: z.string().default('grok-2-latest'),
});

export const serverEnv = serverSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_FROM: process.env.RESEND_FROM,
  CONTACT_INBOX: process.env.CONTACT_INBOX,
  QUOTE_INBOX: process.env.QUOTE_INBOX,
  NEWSLETTER_INBOX: process.env.NEWSLETTER_INBOX,
  DATA_REQUEST_INBOX: process.env.DATA_REQUEST_INBOX,
  LEAD_NOTIFICATION_WEBHOOK_URL: process.env.LEAD_NOTIFICATION_WEBHOOK_URL,
  HCAPTCHA_SECRET_KEY: process.env.HCAPTCHA_SECRET_KEY,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
  XAI_API_KEY: process.env.XAI_API_KEY,
  XAI_MODEL: process.env.XAI_MODEL,
});

/** Only `NEXT_PUBLIC_*` values are safe to import from client code. */
export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://deploris.com',
  defaultLocale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE ?? 'en',
  hcaptchaSiteKey: process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY ?? '',
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? 'deploris.com',
  ga4Id: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ?? '',
  clarityId: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID ?? '',
  usercentricsId: process.env.NEXT_PUBLIC_USERCENTRICS_ID ?? '',
  cookiebotId: process.env.NEXT_PUBLIC_COOKIEBOT_ID ?? '',
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? '',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
};

export function assertServerSecret<K extends keyof typeof serverEnv>(key: K): string {
  const value = serverEnv[key];
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(
      `Missing required server env: ${String(key)}. Set it in .env.local (dev) or Vercel project settings (prod).`,
    );
  }
  return value;
}
