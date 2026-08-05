<h1>Vouch</h1>

---
**Vouch** is a web app that lets people verify whether a part is genuine or fake, and
turns every scan into intelligence that brands can act on. One product, three roles
across the automotive value chain:

- **Consumer** — scan a part before you buy, instantly see if it's genuine, and report counterfeits.
- **Mechanic** — verify parts in front of customers and build a public **trust score** for your shop.
- **Brand Protection (admin)** — watch counterfeit **hotspots light up across an Africa map** in real time and act on them.

> ⚠️ This is a **portfolio demo**, not a production system. It deliberately skips real
> authentication (a persistent role switcher stands in) and optimizes for a clear,
> 5-minute walkthrough over scalability and edge cases.

## What the demo does

**Consumer flow** (`/consumer`)
- Real camera QR scanner (`html5-qrcode`), with a manual code-entry fallback for laptops.
- Each scan resolves to **genuine / counterfeit / unknown**, with full part details (brand, plant, batch, fitment) for genuine parts.
- One-tap **counterfeit report** form (seller, location, price, notes) that feeds the admin queue.

**Mechanic flow** (`/mechanic`)
- Dashboard with **scans today**, lifetime verified, counterfeits caught, and a **trust score** widget.
- Reuses the scanner, but logs scans against the mechanic so they count toward the score.
- A public, shareable **trust certificate** for the shop.

**Brand Protection / admin** (`/admin`)
- Four live stat cards: scans today, counterfeits this month, active mechanics, pending reports.
- An **Africa map** with circle markers sized by counterfeit volume and colored by severity (red → amber → green) — the demo's centerpiece.
- A live **recent-scans feed** and a **top counterfeited categories** bar chart.
- A **reports queue** (`/admin/reports`) to triage filed reports from new → investigating → resolved.

Every dashboard reads live from Supabase, so scans logged during the walkthrough show up
immediately. A persistent role switcher in the top nav lets you hop between all three roles
at any time.

### Suggested walkthrough
1. Start on the landing page → enter as **Consumer**, scan a `CLONE-...`, `VCH-...`code → see the counterfeit verdict → file a report.
2. Switch to **Mechanic** → scan a genuine code → watch "scans today" and the trust score reflect it.
3. Switch to **Brand Protection** → the map, feed, and reports queue all show the activity you just generated.

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Supabase (Postgres, free tier)
- `html5-qrcode` (camera scanner), `react-simple-maps` (Africa map), `recharts` (charts)
- Deploys to Vercel

## Project structure

```
src/
├── app/          # routes: landing, /consumer, /mechanic, /admin, /api
├── components/   # ui/ (shadcn) + feature components (scanner, map, cards…)
└── lib/          # supabase client, shared types, admin aggregates, utils
supabase/         # schema.sql + seed.sql
test-qr-codes/    # 30 scannable PNGs + contact sheet for demoing the scanner
```
