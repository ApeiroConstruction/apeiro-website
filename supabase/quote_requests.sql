-- Run once in Supabase: Dashboard > SQL Editor > New query > paste > Run.
-- Creates the table for Request a Quote submissions and locks it down.

create table if not exists public.quote_requests (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  project_type text not null,
  budget       text not null,
  timeline     text not null,
  name         text not null,
  company      text not null,
  email        text not null,
  phone        text not null,
  page_url     text
);

-- Row-level security ON with no policies: the public (anon/authenticated keys) can't
-- read, insert, update or delete. Only the website's server, using the secret
-- service role key, can insert. Staff view submissions in the Supabase dashboard.
alter table public.quote_requests enable row level security;

revoke all on public.quote_requests from anon, authenticated;

-- Newer Supabase projects don't grant table access to service_role automatically.
-- The website's server (secret key = service_role) only needs to add rows.
grant insert on public.quote_requests to service_role;

-- Keep-awake function for the daily health check (/api/health). Returns the current
-- time only, reads no data. A successful call counts as activity, so the free-plan
-- project doesn't pause after 7 idle days.
create or replace function public.keepalive()
returns timestamptz
language sql
stable
as $$ select now() $$;

revoke all on function public.keepalive() from public, anon, authenticated;
grant execute on function public.keepalive() to service_role;

-- Optional "Project details" text from the quote form (added Nov 2026).
alter table public.quote_requests add column if not exists message text;
