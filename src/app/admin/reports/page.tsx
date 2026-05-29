import { MapPin, Tag } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ReportStatusButton } from "@/components/report-status-button";
import { supabase } from "@/lib/supabase";
import type { Report, ReportStatus } from "@/lib/types";

// Always fetch fresh — status changes during the demo must show immediately.
export const dynamic = "force-dynamic";

const STATUS_META: Record<ReportStatus, { label: string; className: string }> = {
  new: { label: "New", className: "bg-destructive/10 text-destructive" },
  investigating: { label: "Investigating", className: "bg-secondary text-secondary-foreground" },
  resolved: { label: "Resolved", className: "bg-genuine/10 text-genuine" },
};

export default async function ReportsQueue() {
  const { data } = await supabase
    .from("reports")
    .select("*")
    .order("created_at", { ascending: false });

  const reports = (data ?? []) as Report[];

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Counterfeit reports</h1>
        <p className="text-sm text-muted-foreground">
          Reports filed by drivers and mechanics. Triage the queue from new to resolved.
        </p>
      </div>

      {reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-sm text-muted-foreground">
            No reports filed yet.
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {reports.map((report) => {
            const meta = STATUS_META[report.status];
            return (
              <Card key={report.id}>
                <CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-foreground">{report.seller_name}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${meta.className}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0" />
                      {report.seller_location}
                      {report.qr_code && (
                        <>
                          <Tag className="ml-2 h-3.5 w-3.5 shrink-0" />
                          <span className="font-mono">{report.qr_code}</span>
                        </>
                      )}
                      {report.price_paid != null && (
                        <span className="ml-2">· {report.price_paid}</span>
                      )}
                    </p>
                    {report.notes && (
                      <p className="text-sm text-muted-foreground">&ldquo;{report.notes}&rdquo;</p>
                    )}
                    <p className="text-xs text-muted-foreground capitalize">
                      Reported by {report.reporter_role}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <ReportStatusButton id={report.id} status={report.status} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
