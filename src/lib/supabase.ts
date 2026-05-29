import { createClient } from "@supabase/supabase-js";

// Demo client. No auth, no RLS — relies on the anon key only.
// Keys live in .env.local (see .env.example). The non-null assertions are
// intentional: if env vars are missing we want a loud failure in dev.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
