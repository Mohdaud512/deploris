import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, clientIp } from '@/lib/rateLimit';

export const runtime = 'nodejs';

/**
 * CSP violation reporting endpoint. Browsers POST when the configured
 * Content-Security-Policy is violated. We rate-limit (there can be many),
 * cap the body size, and log a compact record. Nothing is echoed back.
 */
export async function POST(req: NextRequest) {
  const ip = clientIp(req.headers);
  const rl = await checkRateLimit('csp', ip);
  if (!rl.success) return new NextResponse(null, { status: 204 });

  const raw = await req.text().catch(() => '');
  if (raw.length > 8192) return new NextResponse(null, { status: 413 });

  try {
    const parsed = JSON.parse(raw) as unknown;
    // eslint-disable-next-line no-console
    console.warn('[csp-report]', JSON.stringify(parsed).slice(0, 2000));
  } catch {
    // eslint-disable-next-line no-console
    console.warn('[csp-report:raw]', raw.slice(0, 2000));
  }

  return new NextResponse(null, { status: 204 });
}
