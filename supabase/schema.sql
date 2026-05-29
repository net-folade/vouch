-- Vouch schema. Run this first in the Supabase SQL editor, then seed.sql.
-- Re-running drops and recreates all four tables (destructive — demo only).

create extension if not exists pgcrypto;

drop table if exists scans cascade;
drop table if exists reports cascade;
drop table if exists parts cascade;
drop table if exists mechanics cascade;

create table mechanics (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  shop_name text not null,
  city text not null,
  country text not null,
  certified boolean default true,
  scan_count int default 0,
  counterfeit_finds int default 0,
  created_at timestamptz default now()
);

create table parts (
  id uuid primary key default gen_random_uuid(),
  qr_code text unique not null,
  part_number text not null,
  name text not null,
  brand text not null,                  -- Peugeot, Citroën, Opel, Fiat
  vehicle_models text[] default '{}',
  plant text default 'Kenitra, Morocco',
  batch_number text,
  manufactured_at date,
  created_at timestamptz default now()
);

create table scans (
  id uuid primary key default gen_random_uuid(),
  qr_code text not null,
  result text not null,                 -- 'genuine' | 'counterfeit' | 'unknown'
  scanned_by_role text not null,        -- 'consumer' | 'mechanic'
  mechanic_id uuid references mechanics(id),
  city text,
  country text,
  created_at timestamptz default now()
);

create table reports (
  id uuid primary key default gen_random_uuid(),
  qr_code text,
  seller_name text not null,
  seller_location text not null,
  price_paid numeric,
  notes text,
  reporter_role text not null,
  status text default 'new',            -- 'new' | 'investigating' | 'resolved'
  created_at timestamptz default now()
);

-- Helpful indexes for the admin dashboard aggregates.
create index scans_created_at_idx on scans (created_at desc);
create index scans_city_result_idx on scans (city, result);
create index reports_status_idx on reports (status);
