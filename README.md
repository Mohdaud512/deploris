# Deploris deploris.com

Bilingual (English default, German optional) marketing site for Deploris a Next.js 16 App Router build on Vercel.

- **Framework:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, next-intl.
- **Hosting:** Vercel. All serverless functions pinned to Frankfurt (`fra1`) for EU data residency.
- **Email:** Resend (transactional).
- **Spam:** hCaptcha + honeypot + IP rate-limit (Upstash Redis EU).
- **Analytics:** Plausible + Google Analytics 4 + Microsoft Clarity deny-by-default via Google Consent Mode v2.
- **AI Chatbot:** Grok-ready. Server-side `/api/chat` reads `XAI_API_KEY`; ships as a labelled stub until you paste the key.

## Getting started

```bash
git clone <this repo>
cd deplorisllc
npm ci
cp .env.example .env.local
# edit .env.local with real keys see .env.example for every variable
npm run dev
```

Open http://localhost:3000 (EN) and http://localhost:3000/de.

## Scripts

| script | what |
| :---- | :---- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the built app |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright E2E |
| `npm run test:a11y` | Playwright + axe-core |
| `npm run lhci` | Lighthouse CI (needs a running production build) |
| `npm run format` | Prettier |

## Deploying to Vercel

1. Import the repo in Vercel.
2. **Regions:** in Project Settings → Functions, set the region to `fra1` (Frankfurt). The `preferredRegion` export on every API route pins it, but a project-level default is a good belt-and-suspenders.
3. **Environment variables:** copy every value from `.env.example` into Vercel (Preview + Production separately for anything sensitive).
4. **Domain:** point `deploris.com` at Vercel; enable auto-TLS.
5. **DNS for email deliverability** (must be done before newsletters go live):
   - SPF: `TXT @ "v=spf1 include:resend.dev -all"`
   - DKIM: create the CNAME records Resend shows in its dashboard after you add the sending domain.
   - DMARC: `TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@deploris.com"`
6. **Search Console + Bing Webmaster:** verify by DNS or the meta tag Google gives you, then submit `https://deploris.com/sitemap.xml`.
7. **Grok:** paste your `XAI_API_KEY` into Vercel to switch the chatbot from stub → live.

## Project shape

```
app/[locale]/ → localized pages (EN default, DE at /de)
app/api/ → server routes: chat, contact, quote, newsletter, data-request, csp-report
components/ → layout, marketing, forms, chatbot, seo, analytics
config/ → single source of truth: site NAP, services, cities, nav, locales
content/ → MDX blog, glossary + FAQ + case-study + careers data files
lib/ → schema JSON-LD, seo, mail, captcha, rate limit, RAG index, mdx loader, validators, signed tokens
messages/ → next-intl catalogs (en.json, de.json)
public/ → llms.txt, llms-full.txt, security.txt, manifest, favicons
tests/ → Playwright E2E + axe a11y + vitest unit
```

## Content editing

- **Blog posts + glossary** MDX under `content/blog/` and `content/glossary/`.
  File name is `<slug>.<locale>.mdx`, frontmatter fields shown in existing files.
- **FAQ, projects, careers** plain TS files under `content/` so translators can send back a diff.
- **Business facts (NAP, phone, email, hours)** `config/site.ts`. Edit once.

## What still needs your input

See [`CONTENT.md`](./CONTENT.md) every placeholder, DNS record, and DE copy slot needing human review.

## Security posture

See [`SECURITY.md`](./SECURITY.md).
