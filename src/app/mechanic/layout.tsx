import Link from "next/link";
import Image from "next/image";

export default function MechanicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4">
          <Link href="/mechanic" className="flex items-center gap-2">
            <Image src="/vouch-logo.svg" alt="Vouch" width={28} height={28} />
            <span className="text-lg font-bold tracking-tight text-primary">
              Vouch
            </span>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
              Mechanic
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Switch role
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-2xl px-6 py-8">{children}</main>
    </div>
  );
}
