import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Factory,
  Calendar,
  Hash,
  Car,
  ScanLine,
  Flag,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Part, ScanResult } from "@/lib/types";

const COPY: Record<
  ScanResult,
  { label: string; blurb: string; icon: typeof CheckCircle2; tone: string }
> = {
  genuine: {
    label: "Genuine part",
    blurb: "This part is verified as a genuine Stellantis component.",
    icon: CheckCircle2,
    tone: "genuine",
  },
  counterfeit: {
    label: "Counterfeit detected",
    blurb:
      "This code is flagged as a known counterfeit. Do not fit this part — it may be unsafe.",
    icon: AlertTriangle,
    tone: "counterfeit",
  },
  unknown: {
    label: "Couldn't verify",
    blurb:
      "We don't recognise this code. It may be counterfeit or simply not in our system yet.",
    icon: HelpCircle,
    tone: "unknown",
  },
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hash;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="font-medium text-foreground">{value}</p>
      </div>
    </div>
  );
}

export function ResultCard({
  result,
  code,
  part,
}: {
  result: ScanResult;
  code: string;
  part: Part | null;
}) {
  const { label, blurb, icon: Icon, tone } = COPY[result];

  // Tone-driven classes (kept explicit so Tailwind doesn't purge them).
  const banner =
    tone === "genuine"
      ? "bg-genuine text-genuine-foreground"
      : tone === "counterfeit"
        ? "bg-counterfeit text-counterfeit-foreground"
        : "bg-muted text-foreground";

  return (
    <Card className="overflow-hidden">
      <div className={`flex flex-col items-center gap-3 px-6 py-10 text-center ${banner}`}>
        <Icon className="h-14 w-14" strokeWidth={1.75} />
        <h1 className="text-2xl font-bold tracking-tight">{label}</h1>
        <p className="max-w-sm text-sm opacity-90">{blurb}</p>
        <p className="mt-1 rounded-full bg-black/10 px-3 py-1 font-mono text-xs">
          {code}
        </p>
      </div>

      <CardContent className="space-y-1 pt-6">
        {result === "genuine" && part && (
          <div className="divide-y rounded-lg border px-4">
            <DetailRow icon={Hash} label="Part" value={`${part.name} · ${part.part_number}`} />
            <DetailRow icon={Car} label="Brand" value={part.brand} />
            {part.vehicle_models?.length > 0 && (
              <DetailRow
                icon={Car}
                label="Fits"
                value={part.vehicle_models.join(", ")}
              />
            )}
            <DetailRow icon={Factory} label="Plant" value={part.plant} />
            {part.batch_number && (
              <DetailRow icon={Hash} label="Batch" value={part.batch_number} />
            )}
            {part.manufactured_at && (
              <DetailRow
                icon={Calendar}
                label="Manufactured"
                value={part.manufactured_at}
              />
            )}
          </div>
        )}

        <div className="flex flex-col gap-3 pt-4 sm:flex-row">
          {result !== "genuine" && (
            <Button asChild variant="destructive" className="flex-1">
              <Link href={`/consumer/report?code=${encodeURIComponent(code)}`}>
                <Flag /> Report this seller
              </Link>
            </Button>
          )}
          <Button
            asChild
            variant={result === "genuine" ? "default" : "outline"}
            className="flex-1"
          >
            <Link href="/consumer/scan">
              <ScanLine /> Scan another part
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
