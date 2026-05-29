import Link from "next/link";
import { ScanLine, Flag, ShieldCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ConsumerHome() {
  return (
    <div className="space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-primary">
          Before you buy, check it&apos;s real
        </h1>
        <p className="text-muted-foreground">
          Scan the QR code on any part to confirm it&apos;s a genuine Stellantis
          component — in seconds.
        </p>
      </div>

      <Card className="border-primary/20 bg-primary text-primary-foreground">
        <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
          <ShieldCheck className="h-12 w-12" strokeWidth={1.75} />
          <div>
            <h2 className="text-xl font-semibold">Scan a part</h2>
            <p className="mt-1 text-sm opacity-80">
              Use your camera to verify a part instantly.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="w-full max-w-xs">
            <Link href="/consumer/scan">
              <ScanLine /> Start scanning
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 py-6">
          <Flag className="h-8 w-8 shrink-0 text-destructive" strokeWidth={1.75} />
          <div className="flex-1">
            <h3 className="font-semibold text-foreground">
              Bought a fake already?
            </h3>
            <p className="text-sm text-muted-foreground">
              Report the seller so others don&apos;t get caught out.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/consumer/report">Report</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
