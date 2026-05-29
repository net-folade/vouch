import { CheckCircle2, AlertTriangle, HelpCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Scan, ScanResult } from "@/lib/types";

const RESULT_META: Record<ScanResult, { icon: LucideIcon; tone: string; label: string }> = {
  genuine: { icon: CheckCircle2, tone: "text-genuine", label: "Genuine" },
  counterfeit: { icon: AlertTriangle, tone: "text-destructive", label: "Counterfeit" },
  unknown: { icon: HelpCircle, tone: "text-muted-foreground", label: "Unknown" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

// Live feed of the most recent scans across every city and role.
export function RecentScansFeed({ scans }: { scans: Scan[] }) {
  if (scans.length === 0) {
    return (
      <Card className="flex items-center justify-center py-12 text-center text-sm text-muted-foreground">
        No scans yet.
      </Card>
    );
  }

  return (
    <Card>
      <ul className="divide-y">
        {scans.map((scan) => {
          const meta = RESULT_META[scan.result];
          const Icon = meta.icon;
          return (
            <li key={scan.id} className="flex items-center gap-3 px-4 py-3">
              <Icon className={`h-5 w-5 shrink-0 ${meta.tone}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm text-foreground">{scan.qr_code}</p>
                <p className="text-xs text-muted-foreground">
                  {meta.label} · {scan.city ?? "Unknown"}
                  <span className="capitalize"> · {scan.scanned_by_role}</span>
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {timeAgo(scan.created_at)}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
