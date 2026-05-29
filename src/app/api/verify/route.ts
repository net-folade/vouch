import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { Part, ScanResult } from "@/lib/types";

// POST /api/verify
// Body: { qr_code, scanned_by_role?, mechanic_id?, city?, country? }
// Looks up the part, decides genuine | counterfeit | unknown, logs a scan,
// and returns the verdict (plus part details when genuine).
//
// Verdict rule (demo logic):
//   - code matches a row in `parts`        -> genuine
//   - code starts with "CLONE-"            -> counterfeit (a known fake)
//   - anything else                        -> unknown
export async function POST(request: Request) {
  let body: {
    qr_code?: string;
    scanned_by_role?: "consumer" | "mechanic";
    mechanic_id?: string | null;
    city?: string | null;
    country?: string | null;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const code = body.qr_code?.trim();
  if (!code) {
    return NextResponse.json({ error: "qr_code is required." }, { status: 400 });
  }

  const role = body.scanned_by_role ?? "consumer";

  // Look up the part by QR code.
  const { data: part } = await supabase
    .from("parts")
    .select("*")
    .eq("qr_code", code)
    .maybeSingle<Part>();

  let result: ScanResult;
  if (part) {
    result = "genuine";
  } else if (code.toUpperCase().startsWith("CLONE-")) {
    result = "counterfeit";
  } else {
    result = "unknown";
  }

  // Log the scan. Consumers have no geolocation in this demo, so we default
  // to Accra to keep the admin map populated. Best-effort: a failed insert
  // must not break the verdict the user sees.
  await supabase.from("scans").insert({
    qr_code: code,
    result,
    scanned_by_role: role,
    mechanic_id: role === "mechanic" ? body.mechanic_id ?? null : null,
    city: body.city ?? "Accra",
    country: body.country ?? "Ghana",
  });

  return NextResponse.json({ result, part: part ?? null });
}
