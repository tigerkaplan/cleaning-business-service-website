# QA_CHECK — 05_CODE_FOR_WEBSITE

Last updated: 2026-06-28
Revision: website code v4 #3A1078 mobile-first design update

## Current QA status

The current Website implementation passes automated tests, TypeScript and a production build. It still needs real-browser keyboard, zoom, responsive and assistive-technology review.

## Completed checks

- [x] Primary colour token added as `#3A1078`.
- [x] Header updated to dark desktop pattern.
- [x] Mobile-first header CSS added.
- [x] Mobile menu button uses minimum 44px tap target.
- [x] Desktop nav hidden by default and enabled at wider breakpoint.
- [x] `Get Quote` CTA kept visible on desktop and mobile drawer.
- [x] Homepage has matching anchor targets for Services, Areas, How It Works and FAQ.
- [x] Blog link not added because there is no active route.
- [x] Duplicate `src/` folder removed.
- [x] Root-level `app`, `components`, `config`, `content`, `lib`, `types` structure preserved.
- [x] `npm test` passed — 15/15 tests.
- [x] `npm run test:placeholders` passed.

## Checks still required locally

- [ ] Run `npm install`.
- [x] Run `npm run typecheck`.
- [x] Run `npm run build`.
- [x] Run `npm test` — 31/31 passed.
- [x] Run `npm run test:placeholders`.
- [ ] Review mobile header at 320px.
- [ ] Review mobile header at 375px.
- [ ] Review mobile header at 390px.
- [ ] Review mobile header at 430px.
- [ ] Review tablet at 768px.
- [ ] Review desktop at 1024px and 1440px.
- [ ] Confirm hero text does not overflow on mobile.
- [ ] Confirm quote CTA is reachable without friction on mobile.
- [ ] Confirm mobile drawer closes after link click.

## Typecheck note

`npm run typecheck` and `npm run build` passed on 2026-07-28. Manual browser accessibility checks are not implied by those results.

## Go-live blockers

- [ ] Brand name confirmed.
- [ ] Logo/mark confirmed.
- [ ] Real phone number confirmed.
- [ ] Real email confirmed.
- [ ] Domain confirmed.
- [ ] Supabase project created.
- [ ] `supabase/inbound_submissions.sql` applied/verified in the intended test environment.
- [ ] `.env.local` configured.
- [ ] Quote form API tested.
- [ ] Real/test lead appears in Supabase.
- [ ] Isolated Local App intake from `public.inbound_submissions` is proven.
- [ ] Milestone 1 E2E confirmed.

## Do not publish if

- Supabase quote form connection is not tested.
- Header mobile layout is not reviewed in a real browser.
- Brand placeholders are still unresolved.
- CTA or contact links are broken.
- The website creates anything other than `public.inbound_submissions` records.

## 2026-06-28 — Latest landing-page update QA

- [x] Homepage no longer contains the exact above-the-fold line `Serving Brighton & Hove and nearby areas`.
- [x] Header no longer uses the old `service-area-strip`.
- [x] Header uses a quieter desktop contact strip with opening hours, phone and email.
- [x] Homepage H1 leads with the service message, not the location.
- [x] Homepage includes `public/images/landing-page-office-cleaning-hero.svg`.
- [x] `Gym & Studio` quote-form label exists in `SERVICE_LABELS`.
- [x] Sitemap includes `/cookie-policy` and `/reviews`.
- [x] `node --test tests/*.test.cjs` passed — 19/19.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] `npm run typecheck` still needs to be run locally after `npm install`.
- [ ] `npm run build` still needs to be run locally after `npm install`.
- [ ] Real mobile browser review still required.

## 2026-06-28 — Duplicate React key QA

- [x] Homepage service cards no longer use `key={s.href}`.
- [x] Homepage service cards use unique React keys even where two cards link to the same route.
- [x] `node --test tests/*.test.cjs` passed — 20/20.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] Confirm in browser console that duplicate key warning for `/office-cleaning` is gone.
- [ ] Run `npm run typecheck` locally after `npm install`.
- [ ] Run `npm run build` locally after `npm install`.

## 2026-06-28 — How It Works section QA

- [x] Old pale five-step `How it works` list removed from homepage.
- [x] New dark `Booking / How It Works` section added.
- [x] Section uses three cards: `Send your request`, `Get a clear quote`, `Confirm your booking`.
- [x] Step number blocks use strong contrast.
- [x] Desktop layout uses responsive three-card grid.
- [x] `node --test tests/*.test.cjs` passed — 21/21.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] Run `npm run typecheck` locally after `npm install`.
- [ ] Run `npm run build` locally after `npm install`.
- [ ] Check mobile visual spacing in a real browser.

## 2026-06-28 — Homepage FAQ QA

- [x] Homepage FAQ section added.
- [x] FAQ appears before the final quote CTA panel.
- [x] FAQ uses accessible `<details>/<summary>` elements.
- [x] FAQ answers cover quote request, phone/WhatsApp, photos, commercial/local spaces, pricing and next steps.
- [x] `node --test tests/*.test.cjs` passed after update.
- [x] `node scripts/check-placeholders.cjs` passed after update.
- [ ] Review FAQ spacing on mobile in a real browser.
- [ ] Run `npm run typecheck` locally after `npm install`.
- [ ] Run `npm run build` locally after `npm install`.

## 2026-06-28 — Sticky navbar / How It Works / service page QA

- [x] Header uses `className="site-header"`.
- [x] `.site-header` uses `position: sticky`, `top: 0` and high z-index.
- [x] `How It Works` uses current purple brand variables instead of the old navy/teal block colours.
- [x] Step cards use purple-system contrast and no `#2DD4BF` turquoise token.
- [x] Individual service pages no longer render `Pricing note`.
- [x] Individual service pages no longer render `How to book`.
- [x] Individual service pages no longer render separate per-service `FAQ` blocks.
- [x] Homepage FAQ includes broader booking-friction answers.
- [x] `node --test tests/*.test.cjs` passed — 24/24.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] Run `npm run typecheck` locally after `npm install`.
- [ ] Run `npm run build` locally after `npm install`.
- [ ] Confirm sticky navbar behaviour in a real mobile browser.
- [ ] Confirm shorter service pages still lead clearly to quote/call/WhatsApp.
## 2026-06-28 — How It Works same landing background QA

- [x] `.how-it-works` uses the light landing-page gradient: `#FFFFFF → #FAF8FF → #F3E8FF`.
- [x] Step cards use white backgrounds instead of dark translucent cards.
- [x] Step number blocks use purple accent styling.
- [x] Regression test updated to prevent the removed dark-card style returning.
- [x] `node --test tests/*.test.cjs` passed — 24/24.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] Run `npm run typecheck` locally after `npm install`.
- [ ] Run `npm run build` locally after `npm install`.
- [ ] Visual QA needed on mobile because background flow is a design decision, not only a code check.

## 2026-06-28 — Mobile service-card UI polish QA

- [x] Homepage service cards use inline SVG icons instead of weak text symbols.
- [x] Service card markup includes `.service-card__content` for title/description alignment.
- [x] Service card CTA uses `.service-card__cta` pill styling.
- [x] Mobile service-card layout uses `grid-template-columns: 60px minmax(0, 1fr)`.
- [x] Cards use stronger purple border, rounded corners, subtle shadow and focus-visible styling.
- [x] Desktop service cards still switch to centred one-column card layout at wide screens.
- [x] `node --test tests/*.test.cjs` passed — 25/25.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] Run `npm run typecheck` locally after `npm install`.
- [ ] Run `npm run build` locally after `npm install`.
- [ ] Visual-review service card spacing on real mobile widths.

## 2026-06-28 — Tailwind v4 PostCSS dependency QA

- [x] `package.json` includes `@tailwindcss/postcss` in `devDependencies`.
- [x] `package-lock.json` includes `node_modules/@tailwindcss/postcss`.
- [x] `postcss.config.mjs` still uses the Tailwind v4 plugin: `@tailwindcss/postcss`.
- [x] `npm install --ignore-scripts` completed.
- [x] `npm run typecheck` passed.
- [x] `npm run build` passed on Next.js 16.2.7 / Turbopack.
- [x] `node --test tests/*.test.cjs` passed — 25/25.
- [x] `node scripts/check-placeholders.cjs` passed.
- [ ] Local browser check still needed with `npm run dev` on Windows.
