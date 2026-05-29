import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Scanner } from "@/components/scanner";

export default function ConsumerScanPage() {
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
          Scan a part
        </h1>
        <p className="text-sm text-muted-foreground">
          Hold the QR code steady inside the frame.
        </p>
      </div>

      <Scanner basePath="/consumer" />
    </div>
  );
}
