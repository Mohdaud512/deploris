import { serverEnv } from './env';

/**
 * Post a lead notification to Slack or Teams. The webhook URL is a server
 * secret. The payload only includes text we've already validated + sanitized.
 */
export async function notifyLead(payload: {
  title: string;
  fields: { label: string; value: string }[];
}): Promise<void> {
  const url = serverEnv.LEAD_NOTIFICATION_WEBHOOK_URL;
  if (!url) return;

  const text = [
    `*${payload.title}*`,
    ...payload.fields.map((f) => `• *${f.label}:* ${f.value}`),
  ].join('\n');

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ text }),
      // Never wait forever on an outbound webhook.
      signal: AbortSignal.timeout(5000),
      cache: 'no-store',
    });
  } catch {
    // Best-effort never fail a form submission because Slack is down.
  }
}
