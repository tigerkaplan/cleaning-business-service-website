# Website P0 Before Live

This code is not live-ready until these are fixed:

1. Replace `[BRAND_NAME]`, `[BRAND_DOMAIN]`, `[PHONE]`, `[EMAIL]`, and `[WA_NUMBER]` through `config/business.ts` or environment config.
2. Move remaining page-level placeholder copy into real customer-facing copy.
3. Confirm Supabase table structure matches the local app lead fields.
4. Confirm GDPR/privacy wording before collecting leads.
5. Add tests for quote form validation and Supabase submission.
6. Remove emoji icons from service cards if the final brand direction is more premium/professional.

Do not deploy while placeholders are visible in customer-facing pages, metadata, footer, contact page, or legal pages.

## Additional P0 checks from latest landing-page update

7. Confirm the new hero image fits the final brand direction or replace it with a real high-quality business image.
8. Confirm the hero does not reintroduce the line `Serving Brighton & Hove and nearby areas` above the fold.
9. Confirm all phone links use the real business number through environment variables before launch.
10. Confirm WhatsApp links use the real WhatsApp-enabled number before launch.
