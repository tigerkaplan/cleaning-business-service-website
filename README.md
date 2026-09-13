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

The Git-backed local runtime is `01_WEBSITE/cleaning-business-service-website-git`.
The previous `01_WEBSITE/06_CODE` remains preserved. Project controls remain solely
in `01_WEBSITE/00_CONTROL`.

The homepage uses the seven supplied PNG assets in `public/images`, with responsive
Next.js images and bottom-aligned service-card links.

## Current limitations

- This repository does not represent a deployed service. Indexing remains disabled.
- Phone, email, domain, privacy/ICO decisions and production intake acceptance remain unresolved.
- GitHub intake types, validation and persistence are preserved; differences from the previous local intake require a separate reconciliation before using its earlier live acceptance evidence.
- A verified public origin is still required before adding absolute canonical URLs, absolute sitemap or robots URLs, URL-based structured-data URLs, and social-sharing metadata.
- Automated checks do not replace manual release accessibility checks, production form smoke testing, performance review or search-engine validation.
- Only fictional or demo data belongs in demonstrations and tests.

## Relationship to the Operations Application

The Website and Operations Application demonstrate complementary stages of the service journey. Automated end-to-end Website-to-Local-App intake synchronisation has not yet been verified.

## Open the correct website preview

Run these commands from `01_WEBSITE/cleaning-business-service-website-git`:

```powershell
npm run build
npm run preview:website
```

Open **http://127.0.0.1:3001/**. Stop any older website preview using that port first.
Port 3000 belongs to the separate local app. Starting `npm run dev` from the
preserved `01_WEBSITE/06_CODE` serves its old icon-only homepage and SVG hero;
it does not serve this repository's photographs. GitHub pushes do not switch
an already running local server to a different folder.
