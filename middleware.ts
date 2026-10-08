import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales, localePrefix } from './config/locales';

const intlMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix,
  localeDetection: false, // We suggest via a dismissible banner instead of auto-redirect (SEO-safe).
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Per-request nonce for a stricter CSP could be injected here later. For now
  // the baseline CSP lives in next.config.mjs headers().
  // Reject obviously malformed hosts to defuse host-header injection.
  const host = request.headers.get('host') ?? '';
  if (host.length > 255 || /[\r\n]/.test(host)) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  return response;
}

export const config = {
  // Skip Next.js internals, static files, and API routes.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
