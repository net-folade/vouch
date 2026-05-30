import { supabase } from "@/lib/supabase";
import type { Scan } from "@/lib/types";

// [lng, lat] for the cities that appear in the seed (plus Accra, the consumer
// default). Used to place hotspot markers on the Africa map. A scan in a city
// not listed here is simply left off the map.
export const CITY_COORDS: Record<string, [number, number]> = {
  Lagos: [3.3792, 6.5244],
  Nairobi: [36.8219, -1.2921],
  Accra: [-0.187, 5.6037],
  Casablanca: [-7.5898, 33.5731],
  Dakar: [-17.4677, 14.7167],
  Abidjan: [-4.0083, 5.3599],
  Kampala: [32.5825, 0.3476],
  Cairo: [31.2357, 30.0444],
  Johannesburg: [28.0473, -26.2041],
  Kano: [8.592, 12.0022],
  Kumasi: [-1.6244, 6.6885],
  Douala: [9.7679, 4.0511],
  "Dar es Salaam": [39.2083, -6.7924],
  "Addis Ababa": [38.7578, 9.0192],
  Khartoum: [32.5599, 15.5007],
  Tunis: [10.1815, 36.8065],
  Algiers: [3.0588, 36.7538],
  Kinshasa: [15.2663, -4.4419],
  Luanda: [13.2343, -8.839],
};

export interface CityHotspot {
  city: string;
  coordinates: [number, number];
  counterfeits: number;
}

export interface CategoryCount {
  name: string;
  count: number;
}

export interface AdminStats {
  scansToday: number;
  counterfeitsThisMonth: number;
  activeMechanics: number;
  pendingReports: number;
  hotspots: CityHotspot[];
  recentScans: Scan[];
  topCategories: CategoryCount[];
}

// Fetches everything the admin dashboard needs in one pass. Mirrors the
// "fetch in the server component" pattern used by the mechanic dashboard
// rather than going through an API route (the page is itself a server
// component, so a round trip would be wasted).
export async function getAdminStats(): Promise<AdminStats> {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [todayRes, monthRes, mechRes, reportsRes, counterfeitRes, recentRes, partsRes] =
    await Promise.all([
      supabase
        .from("scans")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfToday.toISOString()),
      supabase
        .from("scans")
        .select("id", { count: "exact", head: true })
        .eq("result", "counterfeit")
        .gte("created_at", startOfMonth.toISOString()),
      supabase
        .from("mechanics")
        .select("id", { count: "exact", head: true })
        .eq("certified", true),
      supabase
        .from("reports")
        .select("id", { count: "exact", head: true })
        .neq("status", "resolved"),
      supabase.from("scans").select("qr_code, city").eq("result", "counterfeit"),
      supabase.from("scans").select("*").order("created_at", { ascending: false }).limit(10),
      supabase.from("parts").select("qr_code, name"),
    ]);

  const counterfeitRows = (counterfeitRes.data ?? []) as {
    qr_code: string;
    city: string | null;
  }[];

  // City hotspots: counterfeit count per known city, biggest first.
  const cityCounts = new Map<string, number>();
  for (const row of counterfeitRows) {
    if (!row.city) continue;
    cityCounts.set(row.city, (cityCounts.get(row.city) ?? 0) + 1);
  }
  const hotspots: CityHotspot[] = Array.from(cityCounts.entries())
    .filter(([city]) => CITY_COORDS[city])
    .map(([city, counterfeits]) => ({ city, coordinates: CITY_COORDS[city], counterfeits }))
    .sort((a, b) => b.counterfeits - a.counterfeits);

  // Top counterfeited part categories: map each counterfeit scan's qr_code to
  // its part name. CLONE-* codes don't match a real part, so they're skipped.
  const partName = new Map<string, string>();
  for (const p of (partsRes.data ?? []) as { qr_code: string; name: string }[]) {
    partName.set(p.qr_code, p.name);
  }
  const catCounts = new Map<string, number>();
  for (const row of counterfeitRows) {
    const name = partName.get(row.qr_code);
    if (!name) continue;
    catCounts.set(name, (catCounts.get(name) ?? 0) + 1);
  }
  const topCategories: CategoryCount[] = Array.from(catCounts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    scansToday: todayRes.count ?? 0,
    counterfeitsThisMonth: monthRes.count ?? 0,
    activeMechanics: mechRes.count ?? 0,
    pendingReports: reportsRes.count ?? 0,
    hotspots,
    recentScans: (recentRes.data ?? []) as Scan[],
    topCategories,
  };
}
