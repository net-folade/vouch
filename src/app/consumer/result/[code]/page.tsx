import { headers } from "next/headers";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ResultCard } from "@/components/result-card";
import type { Part, ScanResult } from "@/lib/types";

// Server component: POSTs the scanned code to /api/verify (which logs the scan
// and returns the verdict), then renders the result card.
export default async function ResultPage({
  params,
}: {
  params: { code: string };
}) {
  const code = decodeURIComponent(params.code);

  // Build an absolute URL for the internal API call.
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
      body: JSON.stringify({ qr_code: code, scanned_by_role: "consumer" }),
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
        href="/consumer/scan"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Scan again
      </Link>
      <ResultCard result={result} code={code} part={part} />
    </div>
  );
}
