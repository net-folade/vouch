import { ShieldCheck } from "lucide-react";

// Mechanic trust-score widget. `score` is null when there isn't enough scan
// history yet (see trustScore() in src/lib/mechanic.ts).
export function TrustScore({ score }: { score: number | null }) {
  if (score === null) {
    return (
      <div className="flex flex-col items-center gap-1 text-center">
        <ShieldCheck className="h-10 w-10 text-muted-foreground" strokeWidth={1.75} />
        <p className="text-sm font-medium text-muted-foreground">
          Building trust score…
        </p>
        <p className="text-xs text-muted-foreground">
          Verify at least 10 parts to unlock your score.
        </p>
      </div>
    );
  }

  // Color the number by band: strong (green), fair (amber), low (red).
  const tone =
    score >= 90 ? "text-genuine" : score >= 75 ? "text-amber-500" : "text-destructive";

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <div className="flex items-baseline">
        <span className={`text-5xl font-bold tracking-tight ${tone}`}>{score}</span>
        <span className="text-lg font-medium text-muted-foreground">/100</span>
      </div>
      <p className="text-sm font-medium text-foreground">Trust score</p>
      <p className="text-xs text-muted-foreground">
        Based on your verified-vs-counterfeit history
      </p>
    </div>
  );
}
