import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const roles = [
  {
    href: "/consumer",
    title: "Consumer",
    emoji: "🚗",
    description:
      "Scan a part before you buy. Instantly see if it's genuine, and report counterfeits.",
    cta: "I'm a driver",
  },
  {
    href: "/mechanic",
    title: "Mechanic",
    emoji: "🔧",
    description:
      "Verify parts in front of your customers and build a public trust score for your shop.",
    cta: "I'm a mechanic",
  },
  {
    href: "/admin",
    title: "Brand Protection",
    emoji: "🛡️",
    description:
      "See counterfeit hotspots across Africa in real time and act on the worst offenders.",
    cta: "I'm Stellantis",
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="flex items-center justify-center gap-2 bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground">
        <Sparkles className="h-4 w-4 shrink-0" />
        Demo mode: click any role to explore, switch anytime.
      </div>

      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center sm:py-24">
        <div className="mb-6 flex items-center gap-3">
          <Image
            src="/vouch-logo.svg"
            alt="Vouch"
            width={48}
            height={48}
            priority
          />
          <span className="text-3xl font-bold tracking-tight text-primary">
            Vouch
          </span>
        </div>

        <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Verify genuine auto parts across Africa
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          Counterfeit automotive parts cost lives and money. Vouch makes it easy for drivers, mechanics, 
          and brands to verify the authenticity of auto parts across Africa, ensuring every journey is a safe one.
        </p>

        <p className="mt-10 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          Choose a role to explore the demo
        </p>

        <div className="mt-6 grid w-full gap-6 sm:grid-cols-3">
          {roles.map((role) => (
            <Link key={role.href} href={role.href} className="group">
              <Card className="h-full text-left transition-all group-hover:-translate-y-1 group-hover:border-primary group-hover:shadow-md">
                <CardHeader>
                  <span className="text-4xl" aria-hidden>
                    {role.emoji}
                  </span>
                  <CardTitle className="mt-2 text-xl text-primary">
                    {role.title}
                  </CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" tabIndex={-1}>
                    {role.cta}
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
