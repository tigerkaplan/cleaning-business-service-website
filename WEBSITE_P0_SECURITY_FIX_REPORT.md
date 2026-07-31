# WEBSITE_P0_SECURITY_FIX_REPORT.md

## Status

Website P0 security/code fixes have been applied to the active code folder.

## Fixed

- Removed direct browser Supabase insert from `QuoteForm.tsx`.
- Added server-side route: `app/api/quote-request/route.ts`.
- Added server-only Supabase client using `SUPABASE_SERVICE_ROLE_KEY`.
- Forced website lead status to `New` server-side.
- Added payload validation and sanitisation in `lib/lead-validation.ts`.
- Added honeypot field to reduce bot submissions.
- Added simple in-memory rate limiting to the API route.
- Added security headers in `next.config.ts`.
- Fixed `metadataBase` so placeholder domains do not break build.
- Added `sitemap.ts`, `robots.ts`, and `not-found.tsx`.
- Replaced customer-facing code placeholders in active website code files.
- Added placeholder scan script.
- Added basic Node test coverage for core website lead rules.

## Still Required Before Live

- Final business name, phone, email, domain and WhatsApp number must be set in `.env.local`.
- Supabase RLS must block direct anon inserts into `leads`.
- Production rate limiting should be moved to platform middleware, Supabase Edge Function, Upstash, Cloudflare, or similar.
- Legal pages need final solicitor/privacy wording if the business goes live.
- Full Playwright/e2e tests are still recommended.

## Commands

```bash
npm install
npm run test
npm run test:placeholders
npm run typecheck
npm run build
```
