-- Vouch seed data. Run AFTER schema.sql.
-- Safe to re-run: clears all four tables first.
truncate table scans, reports, parts, mechanics restart identity cascade;

-- ───────────────────────── Mechanics (5) ─────────────────────────
-- Fixed UUIDs so the demo can hardcode "logged-in mechanic #1" = Malta Daniels.
insert into mechanics (id, name, shop_name, city, country, certified, scan_count, counterfeit_finds) values
  ('11111111-1111-1111-1111-111111111111', 'Malta Daniels',      'AutoTrust Motors',     'Accra',      'Ghana',   true, 142, 9),
  ('22222222-2222-2222-2222-222222222222', 'Aisha Bello',        'Lekki Genuine Parts',  'Lagos',      'Nigeria', true,  87, 14),
  ('33333333-3333-3333-3333-333333333333', 'James Mwangi',       'Mwangi Auto Clinic',   'Nairobi',    'Kenya',   true,  63, 7),
  ('44444444-4444-4444-4444-444444444444', 'Kwame Mensah',       'Accra Car Care',       'Accra',      'Ghana',   true,  38, 3),
  ('55555555-5555-5555-5555-555555555555', 'Youssef El Amrani',  'Casa Motors',          'Casablanca', 'Morocco', true,   8, 1);

-- ───────────────────────── Parts (30) ─────────────────────────
insert into parts (qr_code, part_number, name, brand, vehicle_models, plant, batch_number, manufactured_at) values
  -- Peugeot (8)
  ('VCH-0001', '1109.AY',     'Oil Filter',            'Peugeot', '{Peugeot 208,Peugeot 2008}',        'Kenitra, Morocco',  'KEN-2024-0312', '2024-03-12'),
  ('VCH-0002', '1109.CL',     'Oil Filter',            'Peugeot', '{Peugeot 308,Peugeot 3008}',        'Mulhouse, France',  'MUL-2024-0118', '2024-01-18'),
  ('VCH-0003', '4254.21',     'Front Brake Pad Set',   'Peugeot', '{Peugeot 308,Peugeot 508}',         'Trnava, Slovakia',  'TRN-2023-1109', '2023-11-09'),
  ('VCH-0004', '4252.32',     'Rear Brake Pad Set',    'Peugeot', '{Peugeot 2008,Peugeot 3008}',       'Trnava, Slovakia',  'TRN-2024-0204', '2024-02-04'),
  ('VCH-0005', '1444.TT',     'Air Filter',            'Peugeot', '{Peugeot 208,Peugeot 308}',         'Kenitra, Morocco',  'KEN-2024-0501', '2024-05-01'),
  ('VCH-0006', '1444.QF',     'Air Filter',            'Peugeot', '{Peugeot 508,Peugeot 5008}',        'Kenitra, Morocco',  'KEN-2023-0917', '2023-09-17'),
  ('VCH-0007', '5960.F9',     'Iridium Spark Plug',    'Peugeot', '{Peugeot 208,Peugeot 2008}',        'Bursa, Turkey',     'BUR-2024-0322', '2024-03-22'),
  ('VCH-0008', '5960.J6',     'Iridium Spark Plug',    'Peugeot', '{Peugeot 3008,Peugeot 5008}',       'Bursa, Turkey',     'BUR-2023-1205', '2023-12-05'),
  -- Citroën (7)
  ('VCH-0009', '1109.AH',     'Oil Filter',            'Citroën', '{Citroën C3,Citroën C4}',           'Kenitra, Morocco',  'KEN-2024-0227', '2024-02-27'),
  ('VCH-0010', '1109.R6',     'Oil Filter',            'Citroën', '{Citroën C5 Aircross,Berlingo}',    'Mulhouse, France',  'MUL-2024-0408', '2024-04-08'),
  ('VCH-0011', '4253.49',     'Front Brake Pad Set',   'Citroën', '{Citroën C4,Citroën C5 Aircross}',  'Trnava, Slovakia',  'TRN-2023-1021', '2023-10-21'),
  ('VCH-0012', '1611843480',  'Rear Brake Pad Set',    'Citroën', '{Citroën C3,Citroën Berlingo}',     'Trnava, Slovakia',  'TRN-2024-0115', '2024-01-15'),
  ('VCH-0013', '1444.VK',     'Air Filter',            'Citroën', '{Citroën C3,Citroën C4}',           'Kenitra, Morocco',  'KEN-2024-0330', '2024-03-30'),
  ('VCH-0014', '1444.SS',     'Air Filter',            'Citroën', '{Citroën C5 Aircross,Berlingo}',    'Kenitra, Morocco',  'KEN-2023-0808', '2023-08-08'),
  ('VCH-0015', '5960.L2',     'Iridium Spark Plug',    'Citroën', '{Citroën C3,Citroën C4}',           'Bursa, Turkey',     'BUR-2024-0211', '2024-02-11'),
  -- Opel (7)
  ('VCH-0016', '95528233',    'Oil Filter',            'Opel',    '{Opel Corsa,Opel Astra}',           'Tychy, Poland',     'TYC-2024-0419', '2024-04-19'),
  ('VCH-0017', '95599256',    'Front Brake Pad Set',   'Opel',    '{Opel Astra,Opel Insignia}',        'Tychy, Poland',     'TYC-2023-1130', '2023-11-30'),
  ('VCH-0018', '13367308',    'Air Filter',            'Opel',    '{Opel Corsa,Opel Mokka}',           'Tychy, Poland',     'TYC-2024-0107', '2024-01-07'),
  ('VCH-0019', '12622019',    'Iridium Spark Plug',    'Opel',    '{Opel Astra,Opel Mokka}',           'Bursa, Turkey',     'BUR-2024-0305', '2024-03-05'),
  ('VCH-0020', '95519314',    'Oil Filter',            'Opel',    '{Opel Insignia,Opel Grandland}',    'Tychy, Poland',     'TYC-2023-0922', '2023-09-22'),
  ('VCH-0021', '13356864',    'Rear Brake Pad Set',    'Opel',    '{Opel Corsa,Opel Mokka}',           'Tychy, Poland',     'TYC-2024-0228', '2024-02-28'),
  ('VCH-0022', '13412796',    'Air Filter',            'Opel',    '{Opel Astra,Opel Insignia}',        'Tychy, Poland',     'TYC-2024-0512', '2024-05-12'),
  -- Fiat (8)
  ('VCH-0023', '71773620',    'Oil Filter',            'Fiat',    '{Fiat 500,Fiat Panda}',             'Bursa, Turkey',     'BUR-2024-0401', '2024-04-01'),
  ('VCH-0024', '77364857',    'Front Brake Pad Set',   'Fiat',    '{Fiat Tipo,Fiat Doblo}',            'Bursa, Turkey',     'BUR-2023-1014', '2023-10-14'),
  ('VCH-0025', '51897597',    'Air Filter',            'Fiat',    '{Fiat 500,Fiat Tipo}',              'Bursa, Turkey',     'BUR-2024-0223', '2024-02-23'),
  ('VCH-0026', '55209037',    'Iridium Spark Plug',    'Fiat',    '{Fiat 500,Fiat Panda}',             'Bursa, Turkey',     'BUR-2024-0318', '2024-03-18'),
  ('VCH-0027', '46544820',    'Oil Filter',            'Fiat',    '{Fiat Tipo,Fiat Doblo}',            'Bursa, Turkey',     'BUR-2023-1206', '2023-12-06'),
  ('VCH-0028', '77366488',    'Rear Brake Pad Set',    'Fiat',    '{Fiat 500X,Fiat Tipo}',             'Bursa, Turkey',     'BUR-2024-0129', '2024-01-29'),
  ('VCH-0029', '51890841',    'Air Filter',            'Fiat',    '{Fiat Panda,Fiat Doblo}',           'Bursa, Turkey',     'BUR-2024-0506', '2024-05-06'),
  ('VCH-0030', '55232245',    'Iridium Spark Plug',    'Fiat',    '{Fiat Tipo,Fiat 500X}',             'Bursa, Turkey',     'BUR-2023-0829', '2023-08-29');

-- ───────────────────────── Scans (~200) ─────────────────────────
-- 185 historical scans over the last 45 days, weighted toward Lagos & Nairobi,
-- ~15% counterfeit and ~7% unknown. ~35% logged by a mechanic.
with city_pool(city, country, w) as (
  values
    ('Lagos','Nigeria',5), ('Nairobi','Kenya',4), ('Accra','Ghana',2),
    ('Casablanca','Morocco',2), ('Dakar','Senegal',1),
    ('Abidjan','Côte d''Ivoire',1), ('Kampala','Uganda',1)
),
weighted(city, country) as (
  select city, country from city_pool, generate_series(1, w)
)
insert into scans (qr_code, result, scanned_by_role, mechanic_id, city, country, created_at)
select
  case when v.result = 'unknown'
       then 'CLONE-' || lpad((floor(random() * 9999))::int::text, 4, '0')
       else (select qr_code from parts order by random() limit 1)
  end,
  v.result,
  v.role,
  case when v.role = 'mechanic' then v.mech_id end,
  loc.city,
  loc.country,
  now() - (random() * interval '45 days')
from generate_series(1, 185) g
cross join lateral (
  select city, country from weighted order by random() limit 1
) loc
cross join lateral (
  select
    case when s.rr < 0.15 then 'counterfeit'
         when s.rr < 0.22 then 'unknown'
         else 'genuine' end as result,
    case when s.rm < 0.35 then 'mechanic' else 'consumer' end as role,
    (select id from mechanics order by random() limit 1) as mech_id
  from (select random() as rr, random() as rm) s
) v;

-- 15 scans from "today" so the dashboard feels live.
with city_pool(city, country, w) as (
  values
    ('Lagos','Nigeria',5), ('Nairobi','Kenya',4), ('Accra','Ghana',2),
    ('Casablanca','Morocco',2), ('Dakar','Senegal',1),
    ('Abidjan','Côte d''Ivoire',1), ('Kampala','Uganda',1)
),
weighted(city, country) as (
  select city, country from city_pool, generate_series(1, w)
)
insert into scans (qr_code, result, scanned_by_role, mechanic_id, city, country, created_at)
select
  case when v.result = 'unknown'
       then 'CLONE-' || lpad((floor(random() * 9999))::int::text, 4, '0')
       else (select qr_code from parts order by random() limit 1)
  end,
  v.result,
  v.role,
  case when v.role = 'mechanic' then v.mech_id end,
  loc.city,
  loc.country,
  now() - (random() * interval '14 hours')
from generate_series(1, 15) g
cross join lateral (
  select city, country from weighted order by random() limit 1
) loc
cross join lateral (
  select
    case when s.rr < 0.18 then 'counterfeit'
         when s.rr < 0.24 then 'unknown'
         else 'genuine' end as result,
    case when s.rm < 0.35 then 'mechanic' else 'consumer' end as role,
    (select id from mechanics order by random() limit 1) as mech_id
  from (select random() as rr, random() as rm) s
) v;

-- ─────────────── Extra counterfeit hotspots ───────────────
-- Plants a guaranteed spread of counterfeits across the continent so the
-- brand-protection map is densely populated. `n` per city sets the bubble
-- size / severity tier. Every city here also lives in CITY_COORDS, so each
-- one renders as a marker.
with hotspot_pool(city, country, n) as (
  values
    ('Cairo','Egypt',14), ('Johannesburg','South Africa',12),
    ('Kano','Nigeria',11), ('Kumasi','Ghana',9),
    ('Douala','Cameroon',8), ('Dar es Salaam','Tanzania',7),
    ('Addis Ababa','Ethiopia',6), ('Khartoum','Sudan',5),
    ('Tunis','Tunisia',4), ('Algiers','Algeria',3),
    ('Kinshasa','DR Congo',3), ('Luanda','Angola',2)
)
insert into scans (qr_code, result, scanned_by_role, mechanic_id, city, country, created_at)
select
  (select qr_code from parts order by random() limit 1),
  'counterfeit',
  v.role,
  case when v.role = 'mechanic' then v.mech_id end,
  hp.city,
  hp.country,
  now() - (random() * interval '30 days')
from hotspot_pool hp
cross join generate_series(1, hp.n) g
cross join lateral (
  select
    case when random() < 0.35 then 'mechanic' else 'consumer' end as role,
    (select id from mechanics order by random() limit 1) as mech_id
) v;

-- ───────────────────────── Reports (6) ─────────────────────────
insert into reports (qr_code, seller_name, seller_location, price_paid, notes, reporter_role, status) values
  ('CLONE-2231', 'Alaba Auto Spares',      'Alaba Market, Lagos',          4500,  'Packaging looked off, no hologram on the box.',          'consumer', 'new'),
  ('CLONE-8841', 'Ikeja Parts Hub',        'Computer Village, Lagos',      6200,  'Brake pads wore out in two weeks.',                      'consumer', 'new'),
  ('VCH-0017',   'Kariakoo Motors',        'Kariakoo, Nairobi',            3800,  'Filter seal failed almost immediately.',                 'mechanic', 'investigating'),
  ('CLONE-0457', 'Accra Spare Center',     'Abossey Okai, Accra',          2900,  'Customer brought it in — clearly a clone.',              'mechanic', 'new'),
  ('CLONE-7720', 'Medina Auto',            'Medina, Dakar',                5100,  'Seller had a stack of identical "genuine" boxes.',       'consumer', 'investigating'),
  ('CLONE-3398', 'Adjame Pieces Auto',     'Adjamé, Abidjan',              3300,  'Spark plug misfired on first install.',                  'mechanic', 'new');
