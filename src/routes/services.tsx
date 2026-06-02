import { createFileRoute, Link } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bike, Package, Truck, MapPin, Shield, Warehouse,
  Snowflake, FileText, Container, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Sendaro Logistics" },
      { name: "description", content: "Bike express, same-day parcel, van and truck, scheduled routes, high-value cargo, warehousing — Sendaro's full service catalogue." },
      { property: "og:title", content: "Services — Sendaro Logistics" },
      { property: "og:description", content: "From a single envelope to a full container." },
    ],
  }),
  component: ServicesPage,
});

const items = [
  { icon: Bike, title: "Bike Express", price: "from ₦1,500", desc: "Documents and small parcels delivered island-wide in under 90 minutes." },
  { icon: Package, title: "Same-Day Parcel", price: "from ₦2,800", desc: "Door-to-door delivery before 6pm across all Lagos LGAs." },
  { icon: Truck, title: "Van & Mini-Truck", price: "from ₦12,000", desc: "Furniture, appliances, and bulk inventory moves." },
  { icon: Container, title: "Long-Haul Trailer", price: "Custom", desc: "Port-to-warehouse and inter-state freight." },
  { icon: MapPin, title: "Scheduled Routes", price: "from ₦45,000/mo", desc: "Recurring B2B deliveries with dedicated capacity." },
  { icon: Shield, title: "High-Value Cargo", price: "Custom", desc: "Insured, two-rider escort, sealed handling." },
  { icon: Warehouse, title: "Warehouse + Fulfilment", price: "Custom", desc: "Pick, pack, dispatch from our Apapa facility." },
  { icon: Snowflake, title: "Cold-Chain", price: "from ₦8,500", desc: "Temperature-controlled food and pharma delivery." },
  { icon: FileText, title: "Bulk SMS + POD", price: "Add-on", desc: "Automated customer comms and signed proof-of-delivery." },
];

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
            <p className="mt-4 max-w-2xl text-muted-foreground">Pick the right service for the job — from a same-day bike run to scheduled trailer freight.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((s) => (
              <Card key={s.title} className="group p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{s.price}</span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
                <Button asChild variant="ghost" className="-ml-3 mt-3">
                  <Link to="/quote">Get a quote <ArrowRight className="ml-1 h-4 w-4" /></Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
