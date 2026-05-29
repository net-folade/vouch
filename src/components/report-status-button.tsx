"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ReportStatus } from "@/lib/types";

// Advances a report to the next status. 'new' → investigating → resolved.
// Resolved reports show nothing.
const NEXT: Partial<Record<ReportStatus, { status: ReportStatus; label: string }>> = {
  new: { status: "investigating", label: "Mark as investigating" },
  investigating: { status: "resolved", label: "Mark as resolved" },
};

export function ReportStatusButton({
  id,
  status,
}: {
  id: string;
  status: ReportStatus;
}) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const next = NEXT[status];

  if (!next) return null;

  async function handleClick() {
    setPending(true);
    try {
      const res = await fetch("/api/report", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status: next!.status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} disabled={pending}>
      {pending && <Loader2 className="animate-spin" />}
      {next.label}
    </Button>
  );
}
