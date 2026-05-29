import { Card, CardContent } from "@/components/ui/card";

// Skeleton mirroring the mechanic dashboard while the profile + scans load.
export default function MechanicLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="h-7 w-44 animate-pulse rounded bg-muted" />
        <div className="h-4 w-60 animate-pulse rounded bg-muted" />
      </div>

      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-8">
          <div className="h-24 w-24 animate-pulse rounded-full bg-muted" />
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex flex-col items-center gap-2 py-4">
              <div className="h-5 w-5 animate-pulse rounded bg-muted" />
              <div className="h-7 w-10 animate-pulse rounded bg-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="h-11 w-full animate-pulse rounded-md bg-muted" />

      <div className="space-y-3">
        <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        <Card>
          <CardContent className="space-y-4 py-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-full animate-pulse rounded bg-muted" />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
