# Security posture Deploris web

## Reporting a vulnerability
Email **muhammad.daud@deploris.com** with the subject `security:` and a
reproducible description. We aim to acknowledge within 2 business days and
publish a fix within 30 days for critical issues. See also `/.well-known/security.txt`.

## Trust boundaries and what defends them

| Boundary | Defenses |
| :---- | :---- |
| Any HTTP request | Strict CSP (nonce-friendly, `object-src 'none'`, `frame-ancestors 'none'`), HSTS preload, `X-Content-Type-Options: nosniff`, `Permissions-Policy` lockdown, COOP. |
| API route handlers | Zod validation on every body; per-IP rate limit (Upstash EU, in-memory fallback); hCaptcha; honeypot; server-side inbox constants. |
| Email envelope + body | Envelope fields sanitized (CR/LF stripped, length capped) inside `lib/mail.ts`; every untrusted field HTML-escaped before body interpolation. |
| Signed tokens (double opt-in) | HMAC-SHA256, constant-time compare (`crypto.timingSafeEqual`), TTL, rotated with the Resend key. |
| MDX loader | Strict slug regex (`^[a-z0-9-]+$`) + `path.relative` escape check keeping fs reads inside `content/`. |
| JSON-LD injection | All JSON-LD stringified via `safeJsonLd` which escapes `<`, `>`, `&` before being embedded in a `<script type="application/ld+json">` tag. |
| Client bundle | Only `NEXT_PUBLIC_*` values reach the browser. Secrets (`RESEND_API_KEY`, `HCAPTCHA_SECRET_KEY`, `XAI_API_KEY`, Upstash tokens) stay on the server. |
| Consent-gated analytics | Google Consent Mode v2 defaults to `denied`; loaders only mount inside `<ConsentGate>`. |
| Middleware | Host header sanity check to defuse host header injection; locale detection is off (SEO-safe, no auto-redirect). |

## Data flow

1. **Contact / quote / data-request form** client posts JSON → route validates
   with zod → rate limit → captcha verify → send via Resend to internal inbox
   *and* branded auto-reply to the prospect → notify Slack/Teams webhook (if
   configured) → return 200. All PII stays inside the request; nothing logged.
2. **Newsletter** same as above, plus HMAC-signed confirmation link. Subscription
   only registered when the user clicks the link.
3. **Chatbot** client posts JSON → route validates → rate limit → retrieves
   top-k passages from the local RAG index (over our own content only) →
   streams answer from xAI (or a labelled stub). No user PII enters the LLM
   unless the user typed it.
4. **CSP violations** browsers POST to `/api/csp-report`, which rate-limits,
   caps body at 8KB, and logs a compact record.

## Where data lives

- **Website** Vercel (Frankfurt region for functions and Edge).
- **Email delivery** Resend.
- **Rate limit + short-lived counters** Upstash Redis, EU region.
- **AI provider (optional)** xAI (Grok). Only retrieved passages and the current message are sent; no historical retention beyond xAI's standard API terms.
- **Analytics** Plausible EU (privacy-first, no PII), GA4 (with `anonymize_ip: true`), Microsoft Clarity all consent-gated.

## GDPR

- Article 6 legal bases documented in `/legal/privacy` per data category.
- Article 15/16/17/20/21 workflow via `/legal/data-request`.
- Article 28 AVV/DPA available on request via `/legal/dpa`.
- Consent (analytics, marketing) is opt-in via a granular banner, defaulting deny.

## Supply chain

- Dependencies pinned in `package.json` (caret-only for expected minor bumps).
- Dependabot config in `.github/dependabot.yml` opens weekly grouped PRs.
- `npm audit --audit-level=high` runs in CI.
