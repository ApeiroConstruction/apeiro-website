-- Owner dashboard (Looker Studio): counts-only summary of quote requests.
-- Run once in Supabase > SQL Editor (done Nov 25, 2026). Replace the password placeholder
-- when re-running; the real password lives only in the company password manager and in Looker Studio.

-- Private area for the dashboard (not exposed through the website's Data API)
create schema if not exists dashboard;

-- Counts only: no names, emails, phones or messages. Test requests excluded.
create or replace view dashboard.quote_stats as
select
  (created_at at time zone 'America/Toronto')::date as day,
  project_type,
  budget,
  timeline,
  count(*)::int as requests
from public.quote_requests
where name not ilike 'test%'
group by 1, 2, 3, 4;

-- Read-only login that can see ONLY the summary above
create role dashboard_reader with login password 'CHOOSE-A-STRONG-PASSWORD';
grant usage on schema dashboard to dashboard_reader;
grant select on dashboard.quote_stats to dashboard_reader;
alter role dashboard_reader set statement_timeout = '10s';
