"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ScanLine } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function ReportForm({ initialCode = "" }: { initialCode?: string }) {
  const [form, setForm] = useState({
    qr_code: initialCode,
    seller_name: "",
    seller_location: "",
    price_paid: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, reporter_role: "consumer" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <CheckCircle2 className="h-14 w-14 text-genuine" strokeWidth={1.75} />
          <h2 className="text-xl font-bold text-primary">Report submitted</h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Thank you. Stellantis brand protection has been notified and will
            review this seller.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/consumer/scan">
                <ScanLine /> Scan another part
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/consumer">Back to home</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="seller_name">Seller name *</Label>
            <Input
              id="seller_name"
              required
              value={form.seller_name}
              onChange={(e) => update("seller_name", e.target.value)}
              placeholder="e.g. Example Auto Spares"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller_location">Seller location *</Label>
            <Input
              id="seller_location"
              required
              value={form.seller_location}
              onChange={(e) => update("seller_location", e.target.value)}
              placeholder="e.g. Example Market, Accra"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price_paid">Price paid (ghs)</Label>
              <Input
                id="price_paid"
                type="number"
                min="0"
                value={form.price_paid}
                onChange={(e) => update("price_paid", e.target.value)}
                placeholder="e.g. 4500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="qr_code">Part code</Label>
              <Input
                id="qr_code"
                value={form.qr_code}
                onChange={(e) => update("qr_code", e.target.value)}
                placeholder="e.g. CLONE-2231"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">What went wrong?</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="e.g. Packaging looked off, no hologram on the box."
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting && <Loader2 className="animate-spin" />}
            {submitting ? "Submitting…" : "Submit report"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
