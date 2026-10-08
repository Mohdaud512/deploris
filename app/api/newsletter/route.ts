import { NextRequest, NextResponse } from 'next/server';
import { newsletterConfirmSchema, newsletterSchema } from '@/lib/validators';
import { verifyHcaptcha } from '@/lib/captcha';
import { checkRateLimit, clientIp } from '@/lib/rateLimit';
import { escapeHtml, sendMail } from '@/lib/mail';
import { serverEnv } from '@/lib/env';
import { publicEnv } from '@/lib/env';
import { signToken, verifyToken } from '@/lib/signedToken';
import { notifyLead } from '@/lib/notify';

export const runtime = 'nodejs';
export const preferredRegion = ['fra1'];

/**
 * Double opt-in:
 * POST { email, consent, hp, captcha, locale } -> send confirmation link
 * GET ?token=<signed> -> confirm subscription
 */

export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const rl = await checkRateLimit('newsletter', ip);
  if (!rl.success) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid body.' }, { status: 400 });
  }
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid form.' }, { status: 400 });
  const d = parsed.data;
  if (d.hp && d.hp.length > 0) return NextResponse.json({ ok: true });

  const captchaOk = await verifyHcaptcha(d.captcha, ip);
  if (!captchaOk) return NextResponse.json({ error: 'Captcha failed.' }, { status: 400 });

  const token = signToken({ purpose: 'newsletter', email: d.email, locale: d.locale });
  const confirmUrl = `${publicEnv.siteUrl}/api/newsletter?token=${encodeURIComponent(token)}`;

  const de = d.locale === 'de';
  await sendMail({
    to: d.email,
    subject: de ? 'Bitte bestätigen Sie Ihr Abonnement Deploris' : 'Please confirm your subscription Deploris',
    html: `<p>${de ? 'Bitte bestätigen Sie Ihr Abonnement.' : 'Please confirm your subscription.'}</p>
      <p><a href="${escapeHtml(confirmUrl)}">${de ? 'Abonnement bestätigen' : 'Confirm subscription'}</a></p>
      <p style="color:#555">${de ? 'Wenn Sie dies nicht angefragt haben, ignorieren Sie diese Nachricht.' : 'If you did not request this, please ignore this message.'}</p>`,
    text: `${de ? 'Bitte bestätigen Sie Ihr Abonnement:' : 'Please confirm your subscription:'}\n${confirmUrl}\n`,
  });

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const parsed = newsletterConfirmSchema.safeParse({ token });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid token.' }, { status: 400 });
  }
  const payload = verifyToken<{ purpose: string; email: string; locale: 'en' | 'de'; exp: number }>(
    parsed.data.token,
  );
  if (!payload || payload.purpose !== 'newsletter') {
    return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
  }

  const inbox = serverEnv.NEWSLETTER_INBOX ?? serverEnv.CONTACT_INBOX;
  if (inbox) {
    await sendMail({
      to: inbox,
      subject: '[Deploris] Newsletter subscription confirmed',
      html: `<p>Confirmed: <strong>${escapeHtml(payload.email)}</strong> (${escapeHtml(payload.locale)})</p>`,
      text: `Confirmed: ${payload.email} (${payload.locale})`,
    });
  }
  await notifyLead({
    title: 'Newsletter confirmed',
    fields: [
      { label: 'Email', value: payload.email },
      { label: 'Locale', value: payload.locale },
    ],
  });

  const dest = `${publicEnv.siteUrl}${payload.locale === 'en' ? '' : `/${payload.locale}`}?newsletter=confirmed`;
  return NextResponse.redirect(dest, 302);
}
