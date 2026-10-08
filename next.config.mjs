import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const isProd = process.env.NODE_ENV === 'production';

// Nonce is generated per-request in middleware; here we only ship a strict
// baseline CSP for static routes / dev. The middleware-issued CSP overrides
// this response header on dynamic routes.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'", // Tailwind runtime + Framer motion attr styles
  `script-src 'self' 'unsafe-inline'${isProd ? '' : " 'unsafe-eval'"} https://plausible.io https://www.googletagmanager.com https://www.clarity.ms https://js.hcaptcha.com https://newassets.hcaptcha.com https://*.hcaptcha.com`,
  "connect-src 'self' https://plausible.io https://www.google-analytics.com https://region1.google-analytics.com https://*.clarity.ms https://api.x.ai https://hcaptcha.com https://*.hcaptcha.com",
  "frame-src 'self' https://calendly.com https://*.calendly.com https://newassets.hcaptcha.com https://*.hcaptcha.com https://hcaptcha.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "report-uri /api/csp-report",
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '**.deploris.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'clsx', 'tailwind-merge'],
    mdxRs: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0' },
        ],
      },
    ];
  },
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
