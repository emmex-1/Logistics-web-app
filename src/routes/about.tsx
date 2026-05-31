import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Sendaro Logistics" },
      { name: "description", content: "Sendaro is building the operating system for African logistics, starting with Lagos." },
      { property: "og:title", content: "About Sendaro" },
      { property: "og:description", content: "Building the operating system for African logistics." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <Badge variant="secondary" className="rounded-full">Our story</Badge>
        <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Moving the city that never sleeps.
        </h1>
        <p className="mt-6 text-pretty text-muted-foreground">
          Lagos runs on commerce. Every day, millions of parcels, pallets, and packages cross 20 LGAs, three bridges,
          and one of the densest urban grids on earth. Sendaro exists to make that movement faster, safer, and more
          predictable — for the bodega owner in Mushin and the e-commerce ops team in Lekki alike.
        </p>
        <p className="mt-4 text-pretty text-muted-foreground">
          We started in 2023 with three bikes and a Google sheet. Today, our 300+ riders and partner fleet move over
          a million shipments a year for businesses across Nigeria.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[["Mission","Make Lagos logistics frictionless."],["Vision","An open OS for African commerce."],["Values","Speed. Trust. Care."]].map(([t,d]) => (
            <div key={t}>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
              <div className="mt-2 font-display text-lg font-semibold">{d}</div>
            </div>
          ))}
        </div>
      </main>
      <MarketingFooter />
    </div>
  );
}
