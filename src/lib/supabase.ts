import { createClient } from "@supabase/supabase-js";

// Demo client. No auth, no RLS — relies on the anon key only.
// Keys live in .env.local (see .env.example). The non-null assertions are
// intentional: if env vars are missing we want a loud failure in dev.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// `cache: "no-store"` so Next.js never caches these reads — the dashboards must
// reflect scans logged live during the demo (force-dynamic alone doesn't reach
// supabase-js's own fetch).
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: (input, init) => fetch(input, { ...init, cache: "no-store" }),
  },
});
