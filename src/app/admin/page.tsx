import { ScanLine, AlertTriangle, Wrench, Flag } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { RecentScansFeed } from "@/components/recent-scans-feed";
import { AfricaMap } from "@/components/africa-map";
import { getAdminStats } from "@/lib/admin-stats";

// Always fetch fresh — the dashboard reflects scans logged during the demo.
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stats = await getAdminStats();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-primary">Brand Protection</h1>
        <p className="text-sm text-muted-foreground">
          Live counterfeit intelligence across Vouch&apos;s African network.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={ScanLine} value={stats.scansToday} label="Scans today" />
        <StatCard
          icon={AlertTriangle}
          value={stats.counterfeitsThisMonth}
          label="Counterfeits this month"
          tone="text-destructive"
        />
        <StatCard icon={Wrench} value={stats.activeMechanics} label="Active mechanics" />
        <StatCard
          icon={Flag}
          value={stats.pendingReports}
          label="Pending reports"
          tone="text-destructive"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base text-primary">Counterfeit hotspots</CardTitle>
          </CardHeader>
          <CardContent>
            <AfricaMap hotspots={stats.hotspots} />
          </CardContent>
        </Card>

        <div className="space-y-2">
          <h2 className="px-1 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Recent scans
          </h2>
          <RecentScansFeed scans={stats.recentScans} />
        </div>
      </div>
    </div>
  );
}
