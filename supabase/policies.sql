-- Vouch RLS policy: DISABLE row-level security on all tables.
--
-- This is a NO-AUTH DEMO. Every request uses the public anon key, so the app
-- needs the anon role to read/write freely. RLS got enabled on the project
-- (schema.sql never turned it on), which blocked anon reads on `parts` and
-- anon inserts on `scans`/`reports`.
--
-- Run this once in the Supabase SQL editor. Safe to re-run.
-- Do NOT use this pattern in production.

alter table parts     disable row level security;
alter table mechanics disable row level security;
alter table scans     disable row level security;
alter table reports   disable row level security;
