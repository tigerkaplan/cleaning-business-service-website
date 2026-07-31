-- Supabase inbound_submissions table for website quote requests.
-- Phase 1 rule: website creates inbound submissions only. It does not create customers, quotes, jobs, invoices or payments.
-- Apply in Supabase SQL editor before testing /api/quote-request.

create extension if not exists pgcrypto;

create table if not exists public.inbound_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  source text not null default 'Website',
  channel text not null default 'Form',

  name text not null,
  phone text not null,
  email text not null,
  service_type text not null,
  postcode text not null,
  property_type text,
  bedrooms integer,
  bathrooms integer,
  preferred_date text,
  urgency text not null default 'Medium',
  access_notes text,
  customer_photos text not null default 'Requested',
  message text,
  consent boolean not null default false,

  raw_message jsonb,

  constraint inbound_submissions_urgency_check check (urgency in ('High', 'Medium', 'Low')),
  constraint inbound_submissions_customer_photos_check check (customer_photos in ('Requested', 'Received', 'Not needed')),
  constraint inbound_submissions_service_type_check check (service_type in ('End of Tenancy', 'Airbnb / Short-Let', 'Office Cleaning', 'Domestic', 'Deep Clean', 'Gym & Studio', 'Other')),
  constraint inbound_submissions_source_check check (source in ('Website', 'Email', 'WhatsApp', 'Phone', 'Manual', 'Referral', 'Google Business Profile', 'Facebook', 'Nextdoor', 'Gumtree', 'Local outreach')),
  constraint inbound_submissions_channel_check check (channel in ('Form', 'Email', 'WhatsApp', 'Phone', 'SMS', 'In person', 'DM')),
  constraint inbound_submissions_bedrooms_check check (bedrooms is null or bedrooms between 0 and 8),
  constraint inbound_submissions_bathrooms_check check (bathrooms is null or bathrooms between 0 and 8)
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_inbound_submissions_updated_at on public.inbound_submissions;
create trigger set_inbound_submissions_updated_at
before update on public.inbound_submissions
for each row execute function public.set_updated_at();

create index if not exists inbound_submissions_created_at_idx on public.inbound_submissions (created_at desc);
create index if not exists inbound_submissions_source_idx on public.inbound_submissions (source);
create index if not exists inbound_submissions_service_type_idx on public.inbound_submissions (service_type);

alter table public.inbound_submissions enable row level security;

-- The public website must not insert directly with anon credentials.
-- The Next.js API route uses SUPABASE_SERVICE_ROLE_KEY server-side.
-- Add read policies later only for authenticated/local-app sync needs.
