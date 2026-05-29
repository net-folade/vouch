// No real auth in this demo: the "logged-in" mechanic is hardcoded to seed
// mechanic #1 (Chidi Okafor, AutoTrust Motors). See supabase/seed.sql.
export const CURRENT_MECHANIC_ID = "11111111-1111-1111-1111-111111111111";

// Trust score: 100 - (counterfeit_finds / scan_count) * 100, floored at 50,
// rounded to the nearest int. Returns null when there isn't enough history
// yet (scan_count < 10) — the UI shows "Building trust score…" in that case.
export function trustScore(
  scanCount: number,
  counterfeitFinds: number
): number | null {
  if (scanCount < 10) return null;
  const raw = 100 - (counterfeitFinds / scanCount) * 100;
  return Math.max(50, Math.round(raw));
}
