<div align="center">
  <img src="public/vouch-logo.svg" width="56" alt="Vouch logo" />
  <h1>Vouch</h1>
  <p><strong>Verify genuine auto parts across Africa.</strong></p>
</div>

---

Counterfeit automotive parts are a major safety and economic problem across Africa.
**Vouch** is a web app that lets people verify whether a part is genuine or fake, and
turns each scan into intelligence that brands can act on. One product, three roles:

- **Consumer** — scan a part before you buy, instantly see if it's genuine, and report counterfeits.
- **Mechanic** — verify parts in front of customers and build a public **trust score** for your shop.
- **Brand Protection (admin)** — watch counterfeit **hotspots light up across an Africa map** in real time and act on them.

> ⚠️ This is a **portfolio demo**, not a production system. It deliberately skips real
> authentication (a role switcher stands in) and optimizes for a clear, working walkthrough.

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (Postgres, free tier)
- `html5-qrcode` (camera scanner), `react-simple-maps` (Africa map), `recharts` (charts)
- Deploys to **Vercel**

## Getting started

### 1. Install

```bash
npm install
```

### 2. Set up Supabase

Create a free project at [supabase.com](https://supabase.com), then in the **SQL Editor** run, in order:

1. `supabase/schema.sql` — creates the `mechanics`, `parts`, `scans`, and `reports` tables.
2. `supabase/seed.sql` — loads 5 mechanics, 30 genuine parts, ~200 historical scans, and sample reports.

### 3. Configure environment

Copy the example file and fill in your project's values (Supabase → **Project Settings → API**):

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and pick a role to explore.

## Project structure

```
src/
├── app/          # routes: landing, /consumer, /mechanic, /admin, /api
├── components/   # ui/ (shadcn) + feature components (scanner, map, cards…)
└── lib/          # supabase client, shared types, seed/static data, utils
supabase/         # schema.sql + seed.sql
```

## Status

Built in sequential phases:

- [x] **Phase 1 — Foundation:** scaffold, design system, Supabase schema + seed, landing page
- [ ] **Phase 2 — Consumer flow:** camera scanner, verify result, counterfeit report form
- [ ] **Phase 3 — Mechanic flow:** dashboard, trust score, shareable certificate
- [ ] **Phase 4 — Admin dashboard:** stat cards, Africa hotspot map, scans feed, reports queue
- [ ] **Phase 5 — Polish:** persistent nav, responsive, loading/empty states

_Live demo and screenshots: coming once the build is complete._
