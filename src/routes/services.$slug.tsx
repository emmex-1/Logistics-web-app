import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Check,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  getService,
  SERVICES,
  type ServiceDetail,
} from "@/constants/services-catalog";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }): { service: ServiceDetail } => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    const title = s
      ? `${s.title} — Quick Reach Logistics`
      : "Service — Quick Reach Logistics";
    const desc =
      s?.description ??
      "Premium Lagos logistics services by Quick Reach Logistics.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main className="mx-auto max-w-3xl px-6 py-32 text-center">
        <Badge variant="secondary">404</Badge>
        <h1 className="mt-4 font-display text-3xl font-semibold">
          Service not found
        </h1>
        <p className="mt-2 text-muted-foreground">
          The service you're looking for doesn't exist.
        </p>
        <Button asChild className="mt-6">
          <Link to="/services">Browse all services</Link>
        </Button>
      </main>
      <MarketingFooter />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen grid place-items-center p-6 text-center">
      <div>
        <p className="text-sm text-muted-foreground">Something went wrong</p>
        <p className="mt-1 text-base">{String(error?.message ?? error)}</p>
      </div>
    </div>
  ),
  component: ServicePage,
});

// ─── Page ─────────────────────────────────────────────────────────────────────

function ServicePage() {
  const { service } = Route.useLoaderData() as { service: ServiceDetail };
  const Icon = service.icon;
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        {/* ── 1. Hero ── */}
        <section
          className={`relative overflow-hidden border-b bg-gradient-to-br ${service.tint}`}
        >
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
            <div>
              <Badge variant="secondary" className="rounded-full">
                <Link
                  to="/services"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Services
                </Link>
                <span className="mx-1.5 text-muted-foreground/60">/</span>
                {service.title}
              </Badge>

              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                {service.tagline}
              </p>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {service.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-glow">
                  <Link to="/book">Book delivery</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/quote">
                    Get a quote <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">ETA</span>
                  <strong>{service.eta}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">From</span>
                  <strong>{service.priceFrom}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <strong>Insured</strong>
                </div>
              </div>
            </div>

            {/* Hero card — What's included */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
              <Card className="relative overflow-hidden p-8">
                <div className="grid h-16 w-16 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mt-6 font-display text-xl font-semibold">
                  What's included
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* ── 2. Service Overview (Features) ── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="rounded-full">
              Features
            </Badge>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Why teams pick Quick Reach Logistics for this.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.features.map((f) => (
              <Card key={f.title} className="p-6">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 3. Best For ── */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <Badge variant="secondary" className="rounded-full">
                Best For
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for who you are.
              </h2>
              <p className="mt-3 text-muted-foreground">
                Whether you're a solo entrepreneur or running logistics for a
                national brand, this service is designed around your
                constraints.
              </p>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {service.bestFor.map((b) => (
                <Card
                  key={b.label}
                  className="flex flex-col gap-2 p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated"
                >
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <h3 className="font-display font-semibold">{b.label}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. Coverage Areas ── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="secondary" className="rounded-full">
              Coverage Areas
            </Badge>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Where we operate.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Our network is concentrated where it matters most — with clear
              ETAs per zone.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.coverageAreas.map((zone) => (
              <Card key={zone.zone} className="p-6">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-display font-semibold">{zone.zone}</h3>
                  </div>
                  <Badge variant="outline" className="shrink-0 text-xs">
                    {zone.eta}
                  </Badge>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {zone.areas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 5. Pricing ── */}
        <section className="border-y bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="rounded-full">
                Pricing
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Transparent pricing. No surprises.
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                Fixed rates calculated upfront. Pay only for what you use.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-3">
              {service.pricing.map((tier) => (
                <Card
                  key={tier.label}
                  className={cn(
                    "relative flex flex-col p-7 transition-all",
                    tier.popular &&
                      "border-primary/50 shadow-glow ring-1 ring-primary/30"
                  )}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full">
                      Most popular
                    </Badge>
                  )}
                  <div className="text-sm font-medium text-muted-foreground">
                    {tier.label}
                  </div>
                  <div className="mt-2 font-display text-3xl font-semibold tracking-tight">
                    {tier.price}
                  </div>
                  <p className="mt-3 flex-1 text-sm text-muted-foreground">
                    {tier.description}
                  </p>
                  <Button
                    asChild
                    className="mt-6"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    <Link to="/book">Get started</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. Use Cases + How It Works ── */}
        <section>
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Use cases */}
            <div>
              <Badge variant="secondary" className="rounded-full">
                Use cases
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Built for situations like these.
              </h2>
              <ul className="mt-6 space-y-3">
                {service.useCases.map((u) => (
                  <li key={u} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* How it works */}
            <div>
              <Badge variant="secondary" className="rounded-full">
                How it works
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                From booking to drop-off.
              </h2>
              <ol className="mt-6 space-y-4">
                {service.process.map((p, i) => (
                  <li key={p.step} className="flex gap-4">
                    <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-display font-semibold">{p.step}</div>
                      <p className="text-sm text-muted-foreground">{p.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── 7. FAQ ── */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="rounded-full">
                FAQ
              </Badge>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Common questions.
              </h2>
            </div>
            <Accordion type="single" collapsible className="mt-8">
              {service.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* ── 8. CTA ── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-10 text-center">
            {/* decorative blob */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

            <Badge variant="secondary" className="rounded-full">
              Ready to ship?
            </Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Need a delivery today?
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              Book in 60 seconds. Track in real time. Pay only when you're
              happy.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <Link to="/book">Book delivery</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/quote">Get quote</Link>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              No account needed to book. Pay securely via card or transfer.
            </p>
          </Card>
        </section>

        {/* ── Other services ── */}
        <section className="border-t bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Other services
              </h2>
              <Link
                to="/services"
                className="text-sm font-medium text-primary hover:underline"
              >
                View all{" "}
                <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((o) => {
                const OIcon = o.icon;
                return (
                  <Link
                    key={o.slug}
                    to="/services/$slug"
                    params={{ slug: o.slug }}
                    className="group"
                  >
                    <Card className="h-full p-5 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary-soft text-primary">
                        <OIcon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-4 font-display font-semibold">
                        {o.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {o.tagline}
                      </p>
                      <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
                        Explore{" "}
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}