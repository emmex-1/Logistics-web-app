import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight, Truck, Package, Clock, Shield, MapPin, Zap, Phone,
  Star, ChevronRight, CheckCircle2, BarChart3, Bike,
} from "lucide-react";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { AnimatedRouteMap } from "@/components/shared/animated-route-map";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LAGOS_LGAS } from "@/constants";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sendaro — Premium Logistics for Lagos" },
      { name: "description", content: "Same-day deliveries, on-demand fleet, and real-time tracking across all 20 Lagos LGAs. Built for Nigerian businesses." },
      { property: "og:title", content: "Sendaro — Premium Logistics for Lagos" },
      { property: "og:description", content: "Same-day deliveries, on-demand fleet, real-time tracking." },
    ],
  }),
  component: Home,
});

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <Hero />
        <TrustBar />
        <BentoFeatures />
        <Services />
        <Coverage />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <MarketingFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 gradient-radial-primary" />
      <div className="pointer-events-none absolute inset-0 -z-10 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
        <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
          <Badge variant="secondary" className="rounded-full border-primary/20 bg-primary-soft px-3 py-1 text-primary">
            <span className="mr-1.5 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Now live across 20 Lagos LGAs
          </Badge>
          <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Lagos moves faster <br className="hidden sm:block" /> with <span className="gradient-text">Sendaro.</span>
          </h1>
          <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
            Premium same-day deliveries, on-demand fleet, and live tracking — built for the speed and scale Lagos businesses need.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-full px-6 shadow-glow">
              <Link to="/quote">Get a quote <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-6">
              <Link to="/track">Track package</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="h-12 rounded-full px-6">
              <Link to="/book">Book delivery</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
            {["No setup fees", "Live driver tracking", "Insurance included"].map((t) => (
              <span key={t} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-success" /> {t}</span>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.15 }}>
          <AnimatedRouteMap />
        </motion.div>
      </div>
    </section>
  );
}

function TrustBar() {
  const stats = [
    { value: "1.2M+", label: "Deliveries completed" },
    { value: "18,400", label: "Happy clients" },
    { value: "20/20", label: "LGAs covered" },
    { value: "97%", label: "On-time rate" },
  ];
  return (
    <section className="border-y bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="text-center text-xs uppercase tracking-widest text-muted-foreground">Trusted by leading Lagos businesses</div>
        <div className="mt-5 grid grid-cols-3 items-center justify-items-center gap-6 opacity-70 md:grid-cols-6">
          {["JUMIA", "FLUTTERWAVE", "PAYSTACK", "ANDELA", "INTERSWITCH", "GTBANK"].map((n) => (
            <div key={n} className="font-display text-sm font-bold tracking-widest text-muted-foreground">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <Badge variant="secondary" className="rounded-full">Why Sendaro</Badge>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          A logistics OS built for Lagos.
        </h2>
        <p className="mt-3 text-muted-foreground">Everything you need to move parcels, pallets, and freight across the city — in one premium platform.</p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-4">
        <Card className="relative col-span-6 overflow-hidden p-7 md:col-span-4 md:row-span-2">
          <Badge className="rounded-full bg-primary/10 text-primary hover:bg-primary/15">Live tracking</Badge>
          <h3 className="mt-3 font-display text-2xl font-semibold">Watch every package move in real time.</h3>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">WebSocket-powered live map, driver ETA, photo POD, and event timeline — same view your customer sees.</p>
          <div className="mt-6"><AnimatedRouteMap className="!aspect-[16/9]" /></div>
        </Card>

        <Card className="col-span-3 p-6 md:col-span-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg gradient-primary text-primary-foreground"><Zap className="h-5 w-5" /></div>
          <h3 className="mt-4 font-display text-lg font-semibold">Express in 2 hours</h3>
          <p className="mt-1 text-sm text-muted-foreground">Priority routing across the island and mainland with dedicated riders.</p>
        </Card>

        <Card className="col-span-3 p-6 md:col-span-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-success/15 text-success"><Shield className="h-5 w-5" /></div>
          <h3 className="mt-4 font-display text-lg font-semibold">Insurance included</h3>
          <p className="mt-1 text-sm text-muted-foreground">Up to ₦500k cover on every priority shipment, no paperwork.</p>
        </Card>

        <Card className="col-span-3 p-6 md:col-span-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-info/15 text-info"><Bike className="h-5 w-5" /></div>
          <h3 className="mt-4 font-display text-lg font-semibold">Full fleet</h3>
          <p className="mt-1 text-sm text-muted-foreground">Bikes, vans, trucks, trailers — book the right vehicle in seconds.</p>
        </Card>

        <Card className="col-span-3 p-6 md:col-span-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-warning/15 text-warning-foreground"><BarChart3 className="h-5 w-5" /></div>
          <h3 className="mt-4 font-display text-lg font-semibold">Business dashboard</h3>
          <p className="mt-1 text-sm text-muted-foreground">Shipment analytics, invoicing, and team roles for ops teams.</p>
        </Card>

        <Card className="col-span-6 flex items-center justify-between gap-6 p-7 md:col-span-2">
          <div>
            <h3 className="font-display text-xl font-semibold">24/7 support</h3>
            <p className="mt-1 text-sm text-muted-foreground">WhatsApp, voice, and email. Real humans in Lagos.</p>
          </div>
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
            <Phone className="h-6 w-6" />
          </div>
        </Card>
      </div>
    </section>
  );
}

function Services() {
  const items = [
    { icon: Bike, title: "Bike Express", desc: "Documents and small parcels island-wide." },
    { icon: Package, title: "Same-Day Parcel", desc: "Door-to-door before 6pm." },
    { icon: Truck, title: "Van & Truck", desc: "Bulk and furniture across LGAs." },
    { icon: MapPin, title: "Scheduled Routes", desc: "Recurring B2B deliveries." },
    { icon: Shield, title: "High-Value Cargo", desc: "Insured, secure handling." },
    { icon: Clock, title: "Warehouse + Fulfilment", desc: "Pick, pack, dispatch." },
  ];
  return (
    <section className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6">
          <div>
            <Badge variant="secondary" className="rounded-full">Services</Badge>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">From a single envelope to a full container.</h2>
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex">
            <Link to="/services">All services <ChevronRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }} transition={{ delay: i * 0.05 }}
            >
              <Card className="group h-full p-6 transition-all hover:-translate-y-0.5 hover:shadow-elevated">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <it.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{it.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{it.desc}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="h-4 w-4" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coverage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <Badge variant="secondary" className="rounded-full">Coverage</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">All 20 Lagos LGAs. One platform.</h2>
          <p className="mt-3 text-muted-foreground">From Badagry to Epe, our riders and partner fleet operate across every Local Government Area in Lagos State — with live density routing during traffic peaks.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {LAGOS_LGAS.map((l) => (
              <span key={l} className="rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">{l}</span>
            ))}
          </div>
        </div>
        <AnimatedRouteMap />
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Get a quote", desc: "Enter pickup, drop-off, and cargo. See instant pricing tiers." },
    { n: "02", title: "Book in minutes", desc: "Confirm details, pick a payment method, and lock in your rider." },
    { n: "03", title: "Track live", desc: "Watch the journey on the map, get POD, share with your customer." },
  ];
  return (
    <section className="border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">From quote to delivered in three moves.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <Card key={s.n} className="p-7">
              <div className="font-display text-5xl font-semibold gradient-text">{s.n}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const t = [
    { name: "Aisha Bello", role: "Ops Lead, Jumia Lagos", quote: "Sendaro cut our island delivery time in half. The live POD alone is worth it.", rating: 5 },
    { name: "Tunde Okeke", role: "Founder, Lagos Eats", quote: "We dispatch 400+ meals a day on Sendaro. Zero missed drops last month.", rating: 5 },
    { name: "Ngozi Adekunle", role: "Logistics Manager, Interswitch", quote: "Finally a Lagos operator with enterprise-grade dashboards and clean APIs.", rating: 5 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <Badge variant="secondary" className="rounded-full">Loved by ops teams</Badge>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">The fastest way to deliver in Lagos.</h2>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {t.map((q) => (
          <Card key={q.name} className="p-6">
            <div className="flex gap-0.5">
              {Array.from({ length: q.rating }).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}
            </div>
            <p className="mt-4 text-pretty text-sm">{q.quote}</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary font-display text-xs font-semibold text-primary-foreground">
                {q.name.split(" ").map((s) => s[0]).join("")}
              </div>
              <div>
                <div className="text-sm font-medium">{q.name}</div>
                <div className="text-xs text-muted-foreground">{q.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    ["How fast is Same-Day delivery?", "Most island-to-island deliveries arrive in under 3 hours during business hours."],
    ["Do you cover the mainland?", "Yes — all 20 Lagos LGAs, including Ikorodu, Badagry, and Epe."],
    ["What payment methods do you accept?", "Paystack, Flutterwave, bank transfer, USSD, and a Sendaro wallet for businesses."],
    ["Is my package insured?", "Standard cover is included; Priority shipments come with up to ₦500k declared-value insurance."],
    ["Do you support API integration?", "Yes — REST + webhooks. Ask about the developer plan."],
  ];
  return (
    <section className="border-t bg-surface">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Badge variant="secondary" className="rounded-full">FAQ</Badge>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Questions, answered.</h2>
          <p className="mt-3 text-muted-foreground">Still curious? Our team is one message away.</p>
          <Button asChild className="mt-6 rounded-full"><Link to="/contact">Contact us</Link></Button>
        </div>
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="w-full">
            {items.map(([q, a], i) => (
              <AccordionItem key={i} value={`i-${i}`}>
                <AccordionTrigger className="text-left font-display text-base">{q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-primary-foreground shadow-glow sm:p-14">
        <div className="absolute inset-0 noise opacity-[0.12]" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Ready to move faster?</h2>
            <p className="mt-3 max-w-lg text-primary-foreground/85">Get an instant quote in 30 seconds. No card needed.</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <Button asChild size="lg" variant="secondary" className="h-12 rounded-full bg-white text-foreground hover:bg-white/90"><Link to="/quote">Get a quote</Link></Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-white/40 bg-transparent text-primary-foreground hover:bg-white/10"><Link to="/contact">Talk to sales</Link></Button>
          </div>
        </div>
      </div>
    </section>
  );
}
