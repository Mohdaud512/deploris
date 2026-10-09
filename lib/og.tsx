/* eslint-disable react/jsx-key */
import { ImageResponse } from 'next/og';

/**
 * Shared Open Graph image generator for per-page route segments. Every page
 * type (blog, project, service, compare, career) gets its own
 * opengraph-image.tsx that imports `renderOg` and passes its own title +
 * eyebrow + optional footer. Keeps the visual language consistent across
 * all social preview cards without duplicating the JSX.
 *
 * Each route file must declare its own `runtime`, `size`, and `contentType`
 * as literal exports Next.js statically parses those at compile time and
 * rejects re-exported constants.
 */

export function renderOg(opts: {
  title: string;
  eyebrow?: string;
  footer?: string;
}): ImageResponse {
  const { title, eyebrow, footer } = opts;

  // Keep title at a sane length so the layout never spills off the card.
  const safeTitle = title.length > 110 ? title.slice(0, 107) + '…' : title;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'radial-gradient(ellipse at top right, #047857, #022c22 60%), radial-gradient(ellipse at bottom left, #065f46, #011915 60%)',
          color: 'white',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Header: logo mark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 8,
              background: '#65d85a',
              color: '#022c22',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <div style={{ display: 'flex', fontSize: 36, fontWeight: 800, letterSpacing: -0.5 }}>
            <span>DEPLO</span>
            <span style={{ color: '#65d85a' }}>RIS</span>
          </div>
        </div>

        {/* Body: eyebrow + title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 1040 }}>
          {eyebrow && (
            <div
              style={{
                fontSize: 20,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: '#65d85a',
              }}
            >
              {eyebrow}
            </div>
          )}
          <div
            style={{
              fontSize: safeTitle.length > 70 ? 52 : 64,
              lineHeight: 1.1,
              fontWeight: 800,
              letterSpacing: -0.5,
            }}
          >
            {safeTitle}
          </div>
        </div>

        {/* Footer: domain + optional secondary caption */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ fontSize: 22, color: 'rgba(255,255,255,0.65)' }}>deploris.com</div>
          {footer && (
            <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.65)' }}>{footer}</div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
