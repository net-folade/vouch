import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Scanner } from "@/components/scanner";

export default function MechanicScanPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/mechanic"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          Scan a part
        </h1>
        <p className="text-sm text-muted-foreground">
          Verify the part in front of your customer — every scan builds your
          trust score.
        </p>
      </div>

      <Scanner basePath="/mechanic" />
    </div>
  );
}
