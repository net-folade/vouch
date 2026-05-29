"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Html5Qrcode } from "html5-qrcode";
import { Loader2, Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const READER_ID = "vouch-qr-reader";

// Real camera scanner (html5-qrcode). `basePath` lets the mechanic flow reuse
// this in Phase 3 — on a successful scan we route to `${basePath}/result/<code>`.
export function Scanner({ basePath = "/consumer" }: { basePath?: string }) {
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [status, setStatus] = useState<"starting" | "scanning" | "error">(
    "starting"
  );
  const [manualCode, setManualCode] = useState("");

  function goToResult(code: string) {
    const trimmed = code.trim();
    if (!trimmed) return;
    router.push(`${basePath}/result/${encodeURIComponent(trimmed)}`);
  }

  useEffect(() => {
    const scanner = new Html5Qrcode(READER_ID);
    scannerRef.current = scanner;
    let handled = false;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        (decodedText) => {
          if (handled) return;
          handled = true;
          scanner.stop().catch(() => {});
          goToResult(decodedText);
        },
        () => {
          // Ignore per-frame "not found" callbacks — they fire constantly.
        }
      )
      .then(() => setStatus("scanning"))
      .catch(() => setStatus("error"));

    return () => {
      const s = scannerRef.current;
      if (s && s.isScanning) {
        s.stop()
          .then(() => s.clear())
          .catch(() => {});
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden rounded-lg border bg-black">
        <div id={READER_ID} className="w-full" />
      </div>

      {status === "starting" && (
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="animate-spin" /> Starting camera… allow camera
          access when prompted.
        </p>
      )}
      {status === "scanning" && (
        <p className="text-center text-sm text-muted-foreground">
          Point your camera at the QR code on the part or its packaging.
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-sm text-destructive">
          Couldn&apos;t open the camera. Use manual entry below instead.
        </p>
      )}

      {/* Fallback for laptops without a usable camera. */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goToResult(manualCode);
        }}
        className="flex flex-col gap-2 rounded-lg border bg-muted/40 p-4"
      >
        <label className="flex items-center gap-2 text-sm font-medium">
          <Keyboard className="h-4 w-4" /> No camera? Enter a code
        </label>
        <div className="flex gap-2">
          <Input
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            placeholder="e.g. VCH-0001 or CLONE-2231"
          />
          <Button type="submit" disabled={!manualCode.trim()}>
            Verify
          </Button>
        </div>
      </form>
    </div>
  );
}
