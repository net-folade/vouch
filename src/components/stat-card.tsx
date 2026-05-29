import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// One tile in the admin dashboard's top row.
export function StatCard({
  icon: Icon,
  value,
  label,
  tone = "text-primary",
}: {
  icon: LucideIcon;
  value: number;
  label: string;
  tone?: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 py-5">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-secondary ${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-2xl font-bold leading-none tracking-tight text-foreground">
            {value}
          </p>
          <p className="mt-1.5 text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
