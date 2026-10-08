/* eslint-disable react/jsx-key */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Deploris tailored, efficient, reliable IT solutions.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
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
          <div style={{ fontSize: 42, fontWeight: 800, letterSpacing: -0.5 }}>
            DEPLO<span style={{ color: '#65d85a' }}>RIS</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 60, lineHeight: 1.1, fontWeight: 800, maxWidth: 900 }}>
            Reliable IT infrastructure and custom software one team, one accountability.
          </div>
          <div style={{ fontSize: 24, color: 'rgba(255,255,255,0.8)' }}>
            Hardware · Custom CRM · RAG · AI Agents · Bespoke Systems
          </div>
        </div>
        <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.6)' }}>deploris.com</div>
      </div>
    ),
    { ...size },
  );
}
