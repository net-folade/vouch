import Link from "next/link";
import {
  ScanLine,
  Award,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrustScore } from "@/components/trust-score";
import { supabase } from "@/lib/supabase";
import { CURRENT_MECHANIC_ID, trustScore } from "@/lib/mechanic";
import type { Mechanic, Scan, ScanResult } from "@/lib/types";

// Always fetch fresh — the dashboard reflects scans logged during the demo.
export const dynamic = "force-dynamic";

const RESULT_META: Record<
  ScanResult,
  { icon: typeof CheckCircle2; tone: string; label: string }
> = {
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

export default async function MechanicDashboard() {
  const { data: mechanic } = await supabase
    .from("mechanics")
    .select("*")
    .eq("id", CURRENT_MECHANIC_ID)
    .maybeSingle<Mechanic>();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const { count: todayCount } = await supabase
    .from("scans")
    .select("id", { count: "exact", head: true })
    .eq("mechanic_id", CURRENT_MECHANIC_ID)
    .gte("created_at", startOfToday.toISOString());

  const { data: recent } = await supabase
    .from("scans")
    .select("*")
    .eq("mechanic_id", CURRENT_MECHANIC_ID)
    .order("created_at", { ascending: false })
    .limit(10);

  if (!mechanic) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Couldn&apos;t load the mechanic profile. Is the database seeded?
      </p>
    );
  }

  const score = trustScore(mechanic.scan_count, mechanic.counterfeit_finds);
  const scans = (recent ?? []) as Scan[];

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">
          {mechanic.name}
        </h1>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          {mechanic.shop_name} · {mechanic.city}
          {mechanic.certified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-genuine/10 px-2 py-0.5 text-xs font-medium text-genuine">
              <ShieldCheck className="h-3 w-3" /> Certified
            </span>
          )}
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-5 py-8">
          <TrustScore score={score} />
          <Button asChild variant="outline" size="sm">
            <Link href="/mechanic/certificate">
              <Award /> View trust certificate
            </Link>
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        <StatTile
          icon={CalendarDays}
          value={todayCount ?? 0}
          label="Scans today"
        />
        <StatTile
          icon={CheckCircle2}
          value={mechanic.scan_count}
          label="Lifetime verified"
        />
        <StatTile
          icon={AlertTriangle}
          value={mechanic.counterfeit_finds}
          label="Counterfeits caught"
          tone="text-destructive"
        />
      </div>

      <Button asChild size="lg" className="w-full">
        <Link href="/mechanic/scan">
          <ScanLine /> Scan a part
        </Link>
      </Button>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          Recent scans
        </h2>
        {scans.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              No scans yet. Scan a part to get started.
            </CardContent>
          </Card>
        ) : (
          <Card>
            <ul className="divide-y">
              {scans.map((scan) => {
                const meta = RESULT_META[scan.result];
                const Icon = meta.icon;
                return (
                  <li
                    key={scan.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <Icon className={`h-5 w-5 shrink-0 ${meta.tone}`} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-mono text-sm text-foreground">
                        {scan.qr_code}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {meta.label} · {scan.city}
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
        )}
      </div>
    </div>
  );
}

function StatTile({
  icon: Icon,
  value,
  label,
  tone = "text-primary",
}: {
  icon: typeof CheckCircle2;
  value: number;
  label: string;
  tone?: string;
}) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-1 px-2 py-4 text-center">
        <Icon className={`h-5 w-5 ${tone}`} />
        <span className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </span>
        <span className="text-xs leading-tight text-muted-foreground">
          {label}
        </span>
      </CardContent>
    </Card>
  );
}
