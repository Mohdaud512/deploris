import { NextRequest, NextResponse } from 'next/server';
import { dataRequestSchema } from '@/lib/validators';
import { verifyHcaptcha } from '@/lib/captcha';
import { checkRateLimit, clientIp } from '@/lib/rateLimit';
import { escapeHtml, sendMail } from '@/lib/mail';
import { serverEnv } from '@/lib/env';
import { notifyLead } from '@/lib/notify';

export const runtime = 'nodejs';
export const preferredRegion = ['fra1'];

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const rl = await checkRateLimit('data-request', ip);
  if (!rl.success) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }
  const parsed = dataRequestSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid form.' }, { status: 400 });
  const d = parsed.data;
  if (d.hp && d.hp.length > 0) return NextResponse.json({ ok: true });

  const captchaOk = await verifyHcaptcha(d.captcha, ip);
  if (!captchaOk) return NextResponse.json({ error: 'Captcha failed.' }, { status: 400 });

  const inbox = serverEnv.DATA_REQUEST_INBOX ?? serverEnv.CONTACT_INBOX;
  if (!inbox) return NextResponse.json({ error: 'Inbox not configured.' }, { status: 500 });

  await sendMail({
    to: inbox,
    replyTo: d.email,
    subject: `[Deploris] Data request (${d.requestType}) from ${d.name}`,
    html: `<h2>New data request ${escapeHtml(d.requestType)}</h2>
      <p><strong>Name:</strong> ${escapeHtml(d.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
      <p><strong>Locale:</strong> ${escapeHtml(d.locale)}</p>
      <hr /><p style="white-space:pre-wrap">${escapeHtml(d.details)}</p>`,
    text: `New data request ${d.requestType}\nName: ${d.name}\nEmail: ${d.email}\nLocale: ${d.locale}\n\n${d.details}`,
  });

  await sendMail({
    to: d.email,
    subject: 'We received your data request Deploris',
    html: `<p>Hi ${escapeHtml(d.name.split(' ')[0] ?? d.name)},</p><p>We've received your request (${escapeHtml(d.requestType)}). Under GDPR, we will respond in writing within the statutory window (typically one month, extendable by two if complex).</p><p> Deploris</p>`,
    text: `Hi ${d.name.split(' ')[0] ?? d.name},\n\nWe've received your request (${d.requestType}). Under GDPR, we will respond in writing within the statutory window (typically one month, extendable by two if complex).\n\n Deploris`,
  });

  await notifyLead({
    title: 'GDPR data request',
    fields: [
      { label: 'Name', value: d.name },
      { label: 'Email', value: d.email },
      { label: 'Type', value: d.requestType },
    ],
  });

  return NextResponse.json({ ok: true });
}
