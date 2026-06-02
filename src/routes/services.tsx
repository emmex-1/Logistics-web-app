import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/constants/services-catalog";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Sendaro Logistics" },
      { name: "description", content: "Same-day, express, dispatch riders, e-commerce, business logistics, bulk multi-stop, scheduled pickups, document & parcel — Sendaro's full Lagos service catalogue." },
      { property: "og:title", content: "Services — Sendaro Logistics" },
      { property: "og:description", content: "From a single envelope to a full container." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <section className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <Badge variant="secondary" className="rounded-full">Service catalogue</Badge>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Every kind of move, one operator.
            </h1>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Pick the right service for the job — from a same-day bike run to monthly enterprise contracts.
            </p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group">
                  <Card className={`relative h-full overflow-hidden bg-gradient-to-br ${s.tint} p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated`}>
                    <div className="flex items-start justify-between">
                      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-muted-foreground">from {s.priceFrom}</span>
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.tagline}</p>
                    <span className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border bg-muted/30 p-8 text-center">
            <h2 className="font-display text-2xl font-semibold">Not sure which service you need?</h2>
            <p className="max-w-xl text-sm text-muted-foreground">Tell us what you're moving — we'll quote the best option in under a minute.</p>
            <div className="mt-2 flex gap-3">
              <Button asChild><Link to="/quote">Get a quote</Link></Button>
              <Button asChild variant="outline"><Link to="/contact">Talk to sales</Link></Button>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
