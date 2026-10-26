import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales, localePrefix } from './config/locales';

const intlMiddleware = createMiddleware({
  locales: [...locales],
  defaultLocale,
  localePrefix,
  localeDetection: false, // We suggest via a dismissible banner instead of auto-redirect (SEO-safe).
});

/**
 * Site-wide "under construction" lockdown.
 * Every public route is rewritten to /under-construction with a 503 status
 * (Service Unavailable, Retry-After 14 days) so Google/Bing pause rather
 * than drop the site's rankings. The owner can bypass by setting any value
 * on the `deploris-preview` cookie — set via DevTools or by visiting
 * `/preview-on?secret=<PREVIEW_SECRET env var>` once (not implemented yet;
 * current bypass is cookie-only, dev-controlled).
 *
 * Preserved endpoints (not intercepted):
 *   - /robots.txt + /sitemap.xml           crawl signals stay live
 *   - /legal/*                             § 5 TMG + privacy legal duty
 *   - /api/*                               form endpoints + webhooks
 *   - /opengraph-image, /favicon-*, /icon  branding assets
 *   - /under-construction itself           the holding page
 *   - Next.js internals (/_next, /_vercel) framework assets
 */
const BYPASS_PATHS = [
  '/under-construction',
  '/robots.txt',
  '/sitemap.xml',
  '/opengraph-image',
  '/favicon.ico',
];

const BYPASS_PREFIXES = [
  '/legal/',
  '/de/legal/',
  '/api/',
  '/_next/',
  '/_vercel/',
  '/favicon-',
  '/icon-',
  '/apple-touch-icon',
];

function shouldBypassHolding(pathname: string): boolean {
  if (BYPASS_PATHS.includes(pathname)) return true;
  return BYPASS_PREFIXES.some((p) => pathname.startsWith(p));
}

export default function middleware(request: NextRequest) {
  // Host-header injection defense (preserved from previous middleware).
  const host = request.headers.get('host') ?? '';
  if (host.length > 255 || /[\r\n]/.test(host)) {
    return new NextResponse('Bad Request', { status: 400 });
  }

  const { pathname } = request.nextUrl;
  const hasPreviewBypass = request.cookies.get('deploris-preview')?.value;

  if (!hasPreviewBypass && !shouldBypassHolding(pathname)) {
    // Rewrite (not redirect) so the URL in the browser stays intact and the
    // bypass cookie, once set, immediately reveals the real page at the
    // same URL. 503 + Retry-After tells crawlers "temporarily down, come
    // back in two weeks" — rankings are preserved short-term.
    const url = request.nextUrl.clone();
    url.pathname = '/under-construction';
    const response = NextResponse.rewrite(url, { status: 503 });
    response.headers.set('Retry-After', String(60 * 60 * 24 * 14));
    response.headers.set('X-Robots-Tag', 'noindex');
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  // Skip Next.js internals, static files, and API routes.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
