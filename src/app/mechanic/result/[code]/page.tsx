import { headers } from "next/headers";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ResultCard } from "@/components/result-card";
import { CURRENT_MECHANIC_ID } from "@/lib/mechanic";
import type { Part, ScanResult } from "@/lib/types";

// Server component: POSTs the scanned code to /api/verify (which logs the scan
// and returns the verdict), then renders the result card. Mirrors the consumer
// result page but logs as a mechanic so the scan counts toward the trust score.
export default async function MechanicResultPage({
  params,
}: {
  params: { code: string };
}) {
  const code = decodeURIComponent(params.code);

  const h = headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = `${proto}://${host}`;

  let result: ScanResult = "unknown";
  let part: Part | null = null;

  try {
    const res = await fetch(`${base}/api/verify`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        qr_code: code,
        scanned_by_role: "mechanic",
        mechanic_id: CURRENT_MECHANIC_ID,
      }),
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { result: ScanResult; part: Part | null };
      result = data.result;
      part = data.part;
    }
  } catch {
    // Fall back to the "unknown" result rendered below.
  }

  return (
    <div className="space-y-6">
      <Link
        href="/mechanic"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Dashboard
      </Link>
      <ResultCard result={result} code={code} part={part} basePath="/mechanic" />
    </div>
  );
}
