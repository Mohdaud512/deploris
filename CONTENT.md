# CONTENT.md everything you need to fill in before shipping

Every placeholder in the codebase is marked either with `data-placeholder="…"`
in the JSX or a `REVIEW_…` comment in a config file. This document lists them
by category with the file to edit.

Legend:
- ⚠️ **Blocks launch** do not go live without this
- 🔶 Should fix before external announcement
- 🟢 Can wait a few weeks -

## 1. Business identity (`config/site.ts`): CONFIRMED

✅ Real Florida LLC details are now in `config/site.ts`:
- Legal name: DEPLORIS LLC
- Jurisdiction: Florida Limited Liability Company
- Document Number: L24000491676
- EIN: 98-1823862
- Managing member: Mustansar Aleem
- Principal address: 7901 4th St N, Ste 12030, St. Petersburg, FL 33702
- Phone: +1 (321) 495-3200
- Email: muhammad.daud@deploris.com

🔶 `contact.hours` currently Mon–Fri 09:00–18:00 America/New_York. If your team runs on US Eastern (Florida) hours, update the timezone to `America/New_York` in `i18n.ts`; otherwise adjust `config/site.ts`.

🔶 `social.linkedin` / `github` / `x` currently guess-URLs. Replace with the real profiles or remove the entries.

## 2. Legal Impressum (`app/[locale]/legal/impressum/page.tsx`): WIRED

✅ Real values now render on the Impressum page (managing member, jurisdiction, document number, EIN, editorially responsible).

## 3. Legal Terms & DPA

- 🔶 `app/[locale]/legal/terms/page.tsx` `data-placeholder="terms"` insert your reviewed AGB / Terms text.
- 🔶 `app/[locale]/legal/dpa/page.tsx` `data-placeholder="dpa-template"` link/attach the reviewed AVV/DPA PDF.

## 4. Testimonials, logos, case studies, team

- 🟢 `components/marketing/TestimonialCarousel.tsx` calls in `app/[locale]/page.tsx` currently pass **"Placeholder Contact"** and generic quotes. Replace with real client quotes + attribution once approved.
- 🟢 `components/marketing/LogoStrip.tsx` renders blank rectangles marked `data-placeholder="client-logo"`. Drop real SVG/PNG logos into `public/logos/` and update the component to render them.
- 🟢 `content/projects.ts` three anonymized case studies. Replace with approved versions.
- 🟢 Team bios the About page currently doesn't render team cards. When ready, add a `content/team.ts` and a Team section to `app/[locale]/about/page.tsx`.

## 5. Environment variables (Vercel)

Every var below must be set in Vercel (Preview + Production) before matching feature works.

### Blocking:
- ⚠️ `RESEND_API_KEY` email won't send without this.
- ⚠️ `CONTACT_INBOX`, `QUOTE_INBOX`, `NEWSLETTER_INBOX`, `DATA_REQUEST_INBOX` where forms deliver. Can all be the same address.
- ⚠️ `HCAPTCHA_SECRET_KEY` + `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` spam protection on all forms.

### Strongly recommended:
- 🔶 `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN` production rate limiting. In-memory fallback is single-instance only.
- 🔶 `LEAD_NOTIFICATION_WEBHOOK_URL` Slack/Teams webhook so a real human hears about leads immediately.

### Optional but wired:
- 🟢 `XAI_API_KEY` flips the chatbot from stub → live.
- 🟢 `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` loads Plausible after consent.
- 🟢 `NEXT_PUBLIC_GA4_MEASUREMENT_ID` GA4 after consent.
- 🟢 `NEXT_PUBLIC_CLARITY_PROJECT_ID` Microsoft Clarity heatmaps after consent.
- 🟢 `NEXT_PUBLIC_CALENDLY_URL` enables "Book a call" link in chatbot.
- 🟢 `NEXT_PUBLIC_WHATSAPP_NUMBER` optional sticky WhatsApp button.

## 6. DNS records at your DNS provider

⚠️ **Email deliverability** required before you turn on the newsletter and important for form auto-replies.

| Record type | Host | Value |
| :---- | :---- | :---- |
| TXT (SPF) | `@` | `v=spf1 include:resend.dev -all` |
| CNAME (DKIM)| Resend-provided | Take the exact CNAME rows Resend gives you after you verify the sending domain. |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@deploris.com; adkim=s; aspf=s` |

🔶 **Search Console + Bing Webmaster** once DNS points at Vercel:
1. Add `https://deploris.com` in [Google Search Console](https://search.google.com/search-console). Verify via DNS TXT (preferred) or the meta tag it shows.
2. Add the same in [Bing Webmaster Tools](https://www.bing.com/webmasters).
3. Submit `https://deploris.com/sitemap.xml` in both.

## 7. Google Business Profile

🔶 If you'll operate a physical US office, create/claim the Google Business Profile
with the exact NAP (Name / Address / Phone) that matches `config/site.ts` and the
Impressum. NAP consistency is a real ranking factor for local SEO.

## 8. German copy needs native review

All DE strings ship as a first pass. Recommended review before shipping:

- 🔶 `messages/de.json` the entire catalog.
- 🔶 `config/services.ts` the `.de` block of every service `copy`.
- 🔶 `content/faq.ts` the DE FAQ array.
- 🔶 `content/glossary.ts` the DE entries.
- 🔶 `content/blog/*.de.mdx` currently only two DE blog posts exist (CRM + RAG). Translate the remaining EN posts (`ai-agents-in-real-operations`, `wifi-survey-guide`, `data-center-maintenance-checklist`) they gracefully fall back to nothing until you do.

Use the primary keywords from `deploris-german-keywords.md` as the H1 / `<title>` / slug for each translated page.

## 9. Brand / visual

- 🟢 `public/logo.png`, `public/apple-touch-icon.png`, `public/favicon.ico`, `public/icon-192.png`, `public/icon-512.png` I haven't created these yet. Export from the provided PDF logo at the standard sizes and drop them into `public/`.
- 🟢 `public/og-default.png` a static OG fallback for pages that don't use the dynamic `@vercel/og` route. Optional; the dynamic route is the default.
- 🟢 `tailwind.config.ts` → `theme.extend.colors.brand` and `.accent` I estimated a deep-navy palette. Adjust to the exact hex from the logo file when you have it.

## 10. Case-study images and OG covers

- 🟢 Each `content/projects.ts` entry could have a hero image. Add a `hero` field in the type and file paths, then render in the project detail page.
- 🟢 Blog posts have an optional `hero` frontmatter field but aren't rendered yet. Add if you want header images.

## 11. What is intentionally missing (per your instructions)

- `/careers` opt-in was YES three placeholder roles are live.
- The German URL segment translations (`/de/leistungen/*` instead of `/de/services/*`) are **not** applied. Both locales share the English URL segment on disk (`/services/hardware/*`) with a translated *terminal slug* (e.g. `/de/services/development/crm-entwicklung`). If you want fully translated URL segments, add `next.config.mjs` rewrites I've left that as a follow-up since it needs your OK first. -

Once you've filled the ⚠️ rows above and set the Vercel env vars, you're clear to
deploy to production. The 🔶 and 🟢 rows can land in subsequent releases.
