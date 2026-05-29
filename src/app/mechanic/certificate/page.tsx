import Link from "next/link";
import { ChevronLeft, ShieldCheck, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { CURRENT_MECHANIC_ID, trustScore } from "@/lib/mechanic";
import type { Mechanic } from "@/lib/types";

export const dynamic = "force-dynamic";

// Public, shareable trust certificate for a mechanic's shop.
export default async function CertificatePage() {
  const { data: mechanic } = await supabase
    .from("mechanics")
    .select("*")
    .eq("id", CURRENT_MECHANIC_ID)
    .maybeSingle<Mechanic>();

  if (!mechanic) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Couldn&apos;t load the certificate. Is the database seeded?
      </p>
    );
  }

  const score = trustScore(mechanic.scan_count, mechanic.counterfeit_finds);

  return (
    <div className="space-y-6">
      <Link
        href="/mechanic"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back
      </Link>

      <Card className="overflow-hidden border-primary/20">
        <div className="flex flex-col items-center gap-3 bg-primary px-6 py-10 text-center text-primary-foreground">
          <ShieldCheck className="h-12 w-12" strokeWidth={1.75} />
          <p className="text-xs uppercase tracking-widest opacity-80">
            Verified by Vouch
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            {mechanic.shop_name}
          </h1>
          <p className="text-sm opacity-90">
            {mechanic.name} · {mechanic.city}, {mechanic.country}
          </p>
          {mechanic.certified && (
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
              <BadgeCheck className="h-4 w-4" /> Certified mechanic
            </span>
          )}
        </div>

        <CardContent className="grid grid-cols-2 divide-x py-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight text-genuine">
              {mechanic.scan_count}
            </p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Parts verified
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold tracking-tight text-primary">
              {score === null ? "—" : score}
            </p>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Trust score
            </p>
          </div>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        This shop verifies every part with Vouch. Share this certificate to
        prove its commitment to genuine components.
      </p>
    </div>
  );
}
