import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ReportForm } from "@/components/report-form";

export default function ConsumerReportPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  return (
    <div className="space-y-6">
      <Link
        href="/consumer"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Report a counterfeit
        </h1>
        <p className="text-sm text-muted-foreground">
          Tell us where you bought it. Your report helps protect other drivers.
        </p>
      </div>

      <ReportForm initialCode={searchParams.code ?? ""} />
    </div>
  );
}
