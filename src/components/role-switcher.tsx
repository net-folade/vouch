"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, Car, Wrench, ShieldCheck, Home } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Role = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const ROLES: Role[] = [
  { href: "/consumer", label: "Consumer", icon: Car },
  { href: "/mechanic", label: "Mechanic", icon: Wrench },
  { href: "/admin", label: "Brand Protection", icon: ShieldCheck },
];

// Persistent role switcher used in every role layout, so the demo can hop
// between Consumer / Mechanic / Admin without going back to the landing page.
export function RoleSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = ROLES.find((r) => pathname.startsWith(r.href)) ?? ROLES[0];

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
      >
        <current.icon className="h-4 w-4 text-primary" />
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-md border bg-popover shadow-md"
        >
          <p className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Switch role
          </p>
          {ROLES.map((role) => {
            const active = role.href === current.href;
            return (
              <Link
                key={role.href}
                href={role.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground hover:bg-accent"
              >
                <role.icon className="h-4 w-4 text-primary" />
                <span className="flex-1">{role.label}</span>
                {active && <Check className="h-4 w-4 text-genuine" />}
              </Link>
            );
          })}
          <Link
            href="/"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2.5 border-t px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}
