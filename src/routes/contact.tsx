import { createFileRoute } from "@tanstack/react-router";
import { MarketingNav } from "@/components/shared/marketing-nav";
import { MarketingFooter } from "@/components/shared/marketing-footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Building2,
  Package,
  ChevronDown,
  CheckCircle2,
  Truck,
  ArrowRight,
} from "lucide-react";
import { BRAND } from "@/constants";
import { toast } from "sonner";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Quick Reach Logistics" },
      {
        name: "description",
        content:
          "Talk to Quick Reach Logistics about deliveries, quotes, tracking, and business logistics across Lagos.",
      },
      { property: "og:title", content: "Contact Quick Reach Logistics" },
      { property: "og:description", content: "We're here to help." },
    ],
  }),
  component: Contact,
});

const contactCards = [
  {
    icon: Phone,
    label: "Phone Number",
    sub: "Call our support team",
    value: BRAND.phone ?? "+234 800 000 0000",
    href: `tel:${BRAND.phone ?? "+2348000000000"}`,
    cta: "Call Now",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "Chat with us instantly",
    value: BRAND.phone ?? "+234 800 000 0000",
    href: `https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`,
    cta: "Open Chat",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Mail,
    label: "Email Address",
    sub: "Send inquiries & support requests",
    value: BRAND.email ?? "hello@quickreachlogistics.com",
    href: `mailto:${BRAND.email ?? "hello@quickreachlogistics.com"}`,
    cta: "Send Email",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: MapPin,
    label: "Office Location",
    sub: "Visit our office",
    value: BRAND.address ?? "Ikeja, Lagos, Nigeria",
    href: "https://maps.google.com",
    cta: "Get Directions",
    color: "bg-rose-50 text-rose-600",
  },
];

const businessTypes = [
  { icon: "🛒", label: "E-commerce Stores" },
  { icon: "💊", label: "Pharmacies" },
  { icon: "🍽️", label: "Restaurants" },
  { icon: "🏪", label: "Retail Businesses" },
  { icon: "🏢", label: "Corporate Offices" },
];

const coverageAreas = [
  "Ikeja",
  "Lekki",
  "Ajah",
  "Ikorodu",
  "Yaba",
  "Surulere",
  "Maryland",
  "Gbagada",
  "Victoria Island",
  "Lagos Island",
  "Festac",
  "Magodo",
];

const faqs = [
  {
    q: "How quickly can I get a quote?",
    a: "Usually within minutes. Fill out the quick delivery inquiry form and our team will respond almost immediately during business hours.",
  },
  {
    q: "Do you offer same-day delivery?",
    a: "Yes, we offer same-day delivery across Lagos. Book before 2 PM for guaranteed same-day dispatch.",
  },
  {
    q: "Can I track my shipment?",
    a: "Absolutely. Every shipment gets a unique tracking ID you can use on our tracking portal for real-time updates.",
  },
  {
    q: "Do you work with businesses?",
    a: "Yes — we provide dedicated business logistics solutions with volume pricing, priority support, and reporting dashboards.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left font-medium transition-colors hover:text-primary"
      >
        <span>{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>
      )}
    </div>
  );
}

function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        {/* ── 1. Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 text-white">
          {/* decorative blobs */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Badge className="mb-6 rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20">
              Contact Us
            </Badge>
            <h1 className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              We're Here{" "}
              <span className="text-amber-400">to Help</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-slate-300">
              Deliveries, quotes, tracking, and business logistics solutions
              across Lagos — one message away.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="gap-2 bg-amber-400 text-slate-900 hover:bg-amber-300"
                asChild
              >
                <a href={`tel:${BRAND.phone ?? "+2348000000000"}`}>
                  <Phone className="h-4 w-4" /> Call Us
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20"
                asChild
              >
                <a
                  href={`https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* ── 2. Contact Info Cards ── */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map(({ icon: Icon, label, sub, value, href, cta, color }) => (
              <Card
                key={label}
                className="group flex flex-col gap-4 p-6 transition-shadow hover:shadow-md"
              >
                <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {sub}
                  </p>
                  <p className="mt-1 font-semibold">{label}</p>
                  <p className="mt-1 break-all text-sm text-muted-foreground">
                    {value}
                  </p>
                </div>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  {cta} <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* ── 3. Contact Form + 4. Quick Delivery Inquiry ── */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Contact Form */}
            <div>
              <Badge variant="secondary" className="rounded-full">
                Get In Touch
              </Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Send us a message
              </h2>
              <p className="mt-2 text-muted-foreground">
                We'll get back to you within an hour during business hours.
              </p>

              <Card className="mt-6 p-6 shadow-sm">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Message sent! We'll be in touch shortly.");
                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Full Name</Label>
                      <Input required placeholder="Tunde Adebayo" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Email Address</Label>
                      <Input type="email" required placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Phone Number</Label>
                      <Input required placeholder="+234 800 000 0000" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Subject</Label>
                      <Input required placeholder="e.g. Delivery inquiry" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label>Message</Label>
                    <Textarea
                      required
                      rows={5}
                      placeholder="Tell us about your delivery needs or any questions you have..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full gap-2">
                    Send Message <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>

            {/* Quick Delivery Inquiry */}
            <div>
              <Badge
                variant="outline"
                className="rounded-full border-amber-300 bg-amber-50 text-amber-700"
              >
                Quick Quote
              </Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Need a delivery?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Get an instant quote — no account needed.
              </p>

              <Card className="mt-6 p-6 shadow-sm">
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success(
                      "Quote request received! We'll respond within minutes."
                    );
                    (e.target as HTMLFormElement).reset();
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Pickup Location</Label>
                      <Input required placeholder="e.g. Ikeja" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Delivery Location</Label>
                      <Input required placeholder="e.g. Lekki Phase 1" />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label>Package Type</Label>
                      <Input required placeholder="e.g. Documents, Parcel" />
                    </div>
                    <div className="space-y-1.5">
                      <Label>Preferred Delivery Date</Label>
                      <Input type="date" required />
                    </div>
                  </div>

                  <div className="rounded-xl bg-amber-50 p-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-amber-800">
                      <CheckCircle2 className="h-4 w-4 text-amber-500" />
                      Same-day delivery available across Lagos
                    </p>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 bg-amber-500 text-white hover:bg-amber-600"
                  >
                    Request Quote <Package className="h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* ── 5. Business Logistics ── */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white md:p-12">
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                <div>
                  <Badge className="rounded-full border-white/20 bg-white/10 text-white">
                    Business & Corporate
                  </Badge>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
                    Business &amp; Corporate{" "}
                    <span className="text-amber-400">Inquiries</span>
                  </h2>
                  <p className="mt-3 text-slate-300">
                    Scale your logistics with dedicated support, volume pricing, and
                    real-time reporting. Perfect for:
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {businessTypes.map(({ icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm"
                      >
                        <span>{icon}</span>
                        <span>{label}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    size="lg"
                    className="mt-8 gap-2 bg-amber-400 text-slate-900 hover:bg-amber-300"
                    asChild
                  >
                    <a
                      href={`https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Building2 className="h-4 w-4" /> Speak With Our Team
                    </a>
                  </Button>
                </div>
                <div className="grid gap-4">
                  {[
                    { label: "Dedicated Account Manager", desc: "A single point of contact for all your logistics needs." },
                    { label: "Volume Pricing", desc: "Discounted rates as your delivery volume grows." },
                    { label: "Priority Support", desc: "Faster response times and escalation paths." },
                    { label: "Reporting Dashboard", desc: "Track all deliveries and spend in one place." },
                  ].map(({ label, desc }) => (
                    <div
                      key={label}
                      className="flex items-start gap-3 rounded-xl bg-white/5 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-400" />
                      <div>
                        <p className="font-semibold">{label}</p>
                        <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 6. Office Hours + 7. Coverage Areas ── */}
        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {/* Office Hours */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="rounded-full">
                  Office Hours
                </Badge>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Customer Support
              </h2>
              <Card className="mt-5 overflow-hidden shadow-sm">
                {[
                  {
                    day: "Monday – Friday",
                    hours: "8:00 AM – 6:00 PM",
                    active: true,
                  },
                  { day: "Saturday", hours: "9:00 AM – 4:00 PM", active: true },
                  {
                    day: "Sunday",
                    hours: "Emergency support only",
                    active: false,
                  },
                ].map(({ day, hours, active }, i) => (
                  <div
                    key={day}
                    className={`flex items-center justify-between px-6 py-4 ${i !== 2 ? "border-b border-border" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-orange-400"}`}
                      />
                      <span className="font-medium">{day}</span>
                    </div>
                    <span
                      className={`text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}
                    >
                      {hours}
                    </span>
                  </div>
                ))}
              </Card>
            </div>

            {/* Coverage Areas */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="rounded-full">
                  Coverage
                </Badge>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Areas We Serve
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {coverageAreas.map((area) => (
                  <span
                    key={area}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    {area}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Don't see your area?{" "}
                <a
                  href={`https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  Ask us — we may still cover you.
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* ── 8. Google Map ── */}
        <section className="h-72 w-full overflow-hidden bg-slate-200 sm:h-96">
          <iframe
            title="Quick Reach Logistics Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126818.49080013042!2d3.2766997!3d6.5483746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sIkeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
            className="h-full w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>

        {/* ── 9. FAQ ── */}
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <Badge variant="secondary" className="rounded-full">
                FAQ
              </Badge>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-muted-foreground">
                Quick answers to common questions.
              </p>
            </div>
            <Card className="mt-8 px-6 py-2 shadow-sm">
              {faqs.map((faq) => (
                <FAQItem key={faq.q} {...faq} />
              ))}
            </Card>
          </div>
        </section>

        {/* ── 10. Final CTA ── */}
        <section className="bg-amber-400 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <Truck className="mx-auto mb-4 h-12 w-12 text-slate-900/60" />
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Ready to Ship Across Lagos?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-800">
              Let our team handle your delivery quickly and professionally.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="gap-2 bg-slate-900 text-white hover:bg-slate-800"
              >
                <Package className="h-4 w-4" /> Book Delivery
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-slate-900/30 bg-amber-300 text-slate-900 hover:bg-amber-200"
              >
                Get Quote <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}