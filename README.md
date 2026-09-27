# Brightshore Cleaning Website

An accessible, mobile-first cleaning-service Website demonstration for visitors who need clear service information and a structured way to request a quote.

## What it demonstrates

- A responsive service Website built around clear calls to action.
- An accessible quote-request form with shared client and server validation, conditional fields, inline errors and focused error/success handling.
- A server-side `POST /api/quote-request` route that validates requests before attempting persistence.
- An OpenAPI description of the implemented quote-request contract at `docs/quote-request.openapi.yaml`.
- Source-contract, browser and accessibility-focused automated checks.
- A bounded SEO baseline using Next.js metadata, origin-safe sitemap and robots routes, and verified Website structured data.

## Technology

Next.js, React, TypeScript, Supabase client libraries, Playwright and axe-core.

## Local setup

Use a supported Node.js release and install the dependencies declared in `package-lock.json`.

```powershell
npm install
Copy-Item .env.local.example .env.local
npm run dev
```

Environment values are local-only. Use placeholder values in example files and never commit credentials.

Website intake requires explicit server-only configuration: `WEBSITE_INTAKE_MODE=TEST` with TEST URL/secret values, or `WEBSITE_INTAKE_MODE=PRODUCTION`, explicit production approval, and separate production URL/secret values. No Supabase secret belongs in a `NEXT_PUBLIC_` variable.

## Verification

```powershell
node --test tests/seo-config.test.cjs
npm test
npm run typecheck
npm run build
npm run test:e2e:chromium
```

The browser checks use fictional mocked submissions and do not submit data to a live service.

## Current working copy

The authoritative runtime is `01_WEBSITE/06_CODE`. Project controls remain solely
in `01_WEBSITE/00_CONTROL`. The empty `cleaning-business-service-website-git`
directory is not the active Website source.

The homepage uses the seven supplied PNG assets in `public/images`, with responsive
Next.js images and bottom-aligned service-card links.

## Current limitations

- The Website is deployed at `https://cleaning-business-service.netlify.app`; indexing remains disabled until the final domain and launch decision.
- Phone, email, custom domain and privacy/ICO decisions remain unresolved.
- Production intake is fail-closed unless the four server-only production variables documented above are present in the Netlify Production deploy context. Live acceptance remains separate from code release.
- A verified public origin is still required before adding absolute canonical URLs, absolute sitemap or robots URLs, URL-based structured-data URLs, and social-sharing metadata.
- Automated checks do not replace manual release accessibility checks, production form smoke testing, performance review or search-engine validation.
- Only fictional or demo data belongs in demonstrations and tests.

## Relationship to the Operations Application

The Website writes validated enquiries to Supabase `public.inbound_submissions`; the Local App imports each stable remote UUID once into local SQLite. TEST end-to-end intake and isolated production acceptance are verified. Supabase remains intake/history, not the operational business database.

## Open the correct website preview

Run these commands from `01_WEBSITE/06_CODE`:

```powershell
npm run build
npm run preview:website
```

Open **http://127.0.0.1:3001/**. Stop any older website preview using that port first.
Port 3000 belongs to the separate local app. The production Website preview uses
port 3001. Stop an older process on that port before starting a new preview.
