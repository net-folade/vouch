import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Shown while the result page POSTs to /api/verify and waits for the verdict.
export default function MechanicResultLoading() {
  return (
    <div className="space-y-6">
      <div className="h-5 w-24 animate-pulse rounded bg-muted" />
      <Card className="overflow-hidden">
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary" strokeWidth={1.75} />
          <p className="text-lg font-semibold text-primary">Verifying part…</p>
          <p className="text-sm text-muted-foreground">
            Checking this code against the Vouch registry.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
