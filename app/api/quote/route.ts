import { NextRequest, NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validators';
import { verifyHcaptcha } from '@/lib/captcha';
import { checkRateLimit, clientIp } from '@/lib/rateLimit';
import { escapeHtml, sendMail } from '@/lib/mail';
import { serverEnv } from '@/lib/env';
import { notifyLead } from '@/lib/notify';

export const runtime = 'nodejs';
export const preferredRegion = ['fra1'];

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const rl = await checkRateLimit('quote', ip);
  if (!rl.success) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }
  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid form.' }, { status: 400 });
  const d = parsed.data;

  if (d.hp && d.hp.length > 0) return NextResponse.json({ ok: true });

  const captchaOk = await verifyHcaptcha(d.captcha, ip);
  if (!captchaOk) return NextResponse.json({ error: 'Captcha failed.' }, { status: 400 });

  const inbox = serverEnv.QUOTE_INBOX ?? serverEnv.CONTACT_INBOX;
  if (!inbox) return NextResponse.json({ error: 'Inbox not configured.' }, { status: 500 });

  const rows = [
    ['Name', d.name],
    ['Email', d.email],
    ['Company', d.company],
    ['Phone', d.phone ?? '—'],
    ['Service line', d.serviceLine],
    ['Budget', d.budget],
    ['Timeline', d.timeline],
    ['Locale', d.locale],
  ]
    .map(([k, v]) => `<tr><td><strong>${escapeHtml(String(k))}</strong></td><td>${escapeHtml(String(v))}</td></tr>`)
    .join('');

  await sendMail({
    to: inbox,
    replyTo: d.email,
    subject: `[Deploris] New quote request from ${d.name}`,
    html: `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0b2340">
      <h2>New quote request</h2>
      <table>${rows}</table>
      <hr /><p style="white-space:pre-wrap">${escapeHtml(d.scope)}</p>
    </body></html>`,
    text: `New quote request\n\n${rows.replace(/<[^>]+>/g, ' ')}\n\n${d.scope}`,
  });

  await sendMail({
    to: d.email,
    subject: 'We received your quote request Deploris',
    html: `<p>Hi ${escapeHtml(d.name.split(' ')[0] ?? d.name)},</p><p>Thanks for the details. Within one business day you'll receive a written scope, timeline, and price band.</p><p> Deploris</p>`,
    text: `Hi ${d.name.split(' ')[0] ?? d.name},\n\nThanks for the details. Within one business day you'll receive a written scope, timeline, and price band.\n\n Deploris`,
  });

  await notifyLead({
    title: 'New quote request',
    fields: [
      { label: 'Name', value: d.name },
      { label: 'Email', value: d.email },
      { label: 'Company', value: d.company },
      { label: 'Service line', value: d.serviceLine },
      { label: 'Budget', value: d.budget },
      { label: 'Timeline', value: d.timeline },
    ],
  });

  return NextResponse.json({ ok: true });
}
