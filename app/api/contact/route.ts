import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validators';
import { verifyHcaptcha } from '@/lib/captcha';
import { checkRateLimit, clientIp } from '@/lib/rateLimit';
import { escapeHtml, sendMail } from '@/lib/mail';
import { serverEnv } from '@/lib/env';
import { notifyLead } from '@/lib/notify';

export const runtime = 'nodejs';
export const preferredRegion = ['fra1'];

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const rl = await checkRateLimit('contact', ip);
  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const path = issue.path[0];
      if (typeof path === 'string' && !fields[path]) fields[path] = issue.message;
    }
    return NextResponse.json({ error: 'Invalid form.', fields }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot triggered silently accept so bots think they succeeded.
  if (data.hp && data.hp.length > 0) return NextResponse.json({ ok: true });

  const captchaOk = await verifyHcaptcha(data.captcha, ip);
  if (!captchaOk) {
    return NextResponse.json({ error: 'Captcha failed.' }, { status: 400 });
  }

  const inbox = serverEnv.CONTACT_INBOX;
  if (!inbox) {
    return NextResponse.json({ error: 'Inbox not configured.' }, { status: 500 });
  }

  const teamHtml = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0b2340">
    <h2>New contact Deploris</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company ?? '—')}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone ?? '—')}</p>
    <p><strong>Service line:</strong> ${escapeHtml(data.serviceLine)}</p>
    <p><strong>Locale:</strong> ${escapeHtml(data.locale)}</p>
    <hr />
    <p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>
  </body></html>`;
  const teamText = [
    `New contact Deploris`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company ?? '—'}`,
    `Phone: ${data.phone ?? '—'}`,
    `Service line: ${data.serviceLine}`,
    `Locale: ${data.locale}`,
    ``,
    data.message,
  ].join('\n');

  await sendMail({
    to: inbox,
    subject: `[Deploris] New contact from ${data.name}`,
    html: teamHtml,
    text: teamText,
    replyTo: data.email,
  });

  // Prospect auto-reply (branded confirmation).
  const proHtml = `<!doctype html><html><body style="font-family:system-ui,sans-serif;color:#0b2340">
    <h2>Thanks we've received your message.</h2>
    <p>Hi ${escapeHtml(data.name.split(' ')[0] ?? data.name)},</p>
    <p>A member of the Deploris team will reply within one business day.</p>
    <p style="color:#555"> Deploris</p>
  </body></html>`;
  await sendMail({
    to: data.email,
    subject: 'We received your message Deploris',
    html: proHtml,
    text: `Hi ${data.name.split(' ')[0] ?? data.name},\n\nA member of the Deploris team will reply within one business day.\n\n Deploris`,
  });

  await notifyLead({
    title: 'New contact',
    fields: [
      { label: 'Name', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Company', value: data.company ?? '—' },
      { label: 'Service line', value: data.serviceLine },
    ],
  });

  return NextResponse.json({ ok: true });
}
