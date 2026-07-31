# Website Rewrite Status

Status: Rewritten but integration test deferred.

Working code path:

```text
05_CODE_FOR_WEBSITE/cleaning-website
```

## Completed

- Website quote form rewritten from Supabase `leads` table to `inbound_submissions`.
- Typecheck passed.
- Build passed.
- Tests passed: 24/24.
- No remaining Supabase `leads` table references found.

## Deferred

- Manual TEST Supabase integration test not done yet.
- Gate 1 end-to-end test not passed yet.

## Do not

- Do not merge into `CLEANING_BUSINESS_PLATFORM` yet.
- Do not move into `01_WEBSITE` yet.
- Do not create R00 yet.
- Do not run production SQL yet.

## Next required test

```text
Website QuoteForm
→ Supabase inbound_submissions
→ local source_item
→ contact/account
→ opportunity
```

## 2026-07-08 - Deferred Gate 1 Website → Supabase live test

Status: Deferred.

Website code path is verified:

* API writes to `public.inbound_submissions`.
* No Supabase `leads` table write found.
* `npm test` passed 24/24.
* `npm run typecheck` passed.
* `npm run build` passed.

Live TEST Supabase insert was not completed because the Supabase environment was not explicitly confirmed as TEST.

Next required action:

* Confirm TEST Supabase project.
* Create/check `public.inbound_submissions`.
* Add local TEST credentials only.
* Add non-secret marker such as `SUPABASE_ENV=TEST`.
* Run one safe `/api/quote-request` live insert.
* Verify inserted row exists in `public.inbound_submissions`.

Full Gate 1 remains pending until Website → Supabase → Local App chain is proven end to end.
