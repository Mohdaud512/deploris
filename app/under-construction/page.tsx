import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Deploris — under construction',
  description:
    'The Deploris website is being redesigned. For anything urgent, email hello@deploris.com and an engineer will reply within one business day.',
  robots: { index: false, follow: false },
};

/**
 * Full-page holding screen rendered by middleware for every public route
 * while the redesign is in flight. Legal pages, robots.txt, sitemap.xml,
 * and /api/* stay reachable so the Impressum obligation (§ 5 TMG) is not
 * breached and crawlers can still read the sitemap for when the site
 * returns.
 *
 * The owner can bypass this holding by setting the `deploris-preview=1`
 * cookie (any value) in their browser — DevTools → Application → Cookies.
 * No secret token needed; the bypass is per-browser and doesn't affect
 * public visitors.
 */
export default function UnderConstructionPage() {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background:
            'radial-gradient(ellipse at top right, rgba(124, 58, 237, 0.25) 0%, transparent 55%), radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.15) 0%, transparent 50%), #0a0a1f',
          color: '#f5f3ff',
          fontFamily:
            '"Inter", system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          lineHeight: 1.55,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <main style={{ maxWidth: 640, width: '100%' }}>
          <p
            style={{
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#a78bfa',
              margin: 0,
            }}
          >
            Deploris · under construction
          </p>

          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              margin: '1.25rem 0 0',
              fontWeight: 700,
            }}
          >
            We&apos;re rebuilding the site.
          </h1>

          <p style={{ fontSize: '1.08rem', color: 'rgba(245, 243, 255, 0.8)', margin: '1.25rem 0 0' }}>
            Deploris is a custom-AI-software and managed-infrastructure firm serving mid-market
            companies in the US and DACH. The marketing site is in the middle of a redesign and
            will be back shortly.
          </p>

          <p style={{ fontSize: '1.08rem', color: 'rgba(245, 243, 255, 0.8)', margin: '1rem 0 0' }}>
            For anything urgent — scoping a new engagement, a pending delivery, a procurement
            question — email us directly and an engineer will reply within one business day.
          </p>

          <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <a
              href="mailto:hello@deploris.com"
              style={{
                background: '#8b5cf6',
                color: '#0a0a1f',
                padding: '0.85rem 1.5rem',
                borderRadius: '999px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.95rem',
              }}
            >
              hello@deploris.com →
            </a>
            <a
              href="/legal/impressum"
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid rgba(245, 243, 255, 0.25)',
                color: 'rgba(245, 243, 255, 0.9)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}
            >
              Imprint
            </a>
            <a
              href="/legal/privacy"
              style={{
                padding: '0.85rem 1.25rem',
                borderRadius: '999px',
                border: '1px solid rgba(245, 243, 255, 0.25)',
                color: 'rgba(245, 243, 255, 0.9)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}
            >
              Privacy
            </a>
          </div>

          <p
            style={{
              marginTop: '2.5rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(245, 243, 255, 0.1)',
              fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
              fontSize: '0.74rem',
              letterSpacing: '0.08em',
              color: 'rgba(245, 243, 255, 0.55)',
              margin: '2.5rem 0 0',
            }}
          >
            Deploris LLC · Colorado · hello@deploris.com
          </p>
        </main>
      </body>
    </html>
  );
}
