import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
  ArrowUpRight,
  Linkedin,
  Twitter,
  Youtube,
  Github,
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
        content: "Talk to Quick Reach Logistics about deliveries, quotes, tracking, and business logistics across Lagos.",
      },
    ],
  }),
  component: Contact,
});

/* ─────────────────────────────────────────
   HERO SECTION — matches About/Services style
───────────────────────────────────────── */
function HeroSection() {
  return (
    <section className="bg-white px-2 sm:px-3 pt-2 pb-0">
      <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[260px] sm:min-h-[360px] lg:min-h-[480px]">

        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?w=1600&q=80"
          alt="Contact QuickReach Logistics"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-end min-h-[260px] sm:min-h-[360px] lg:min-h-[480px] px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 pt-20 sm:pt-28">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-2 mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span
              className="text-red-500 text-xs font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Contact Us
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="text-white font-bold leading-tight mb-3"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(38px, 4vw, 78px)",
              letterSpacing: "-2px",
              lineHeight: 1.05,
            }}
          >
            We're Here<br />to Help.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.22 }}
            className="text-white/70 max-w-md leading-relaxed mb-8"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(13px, 1.6vw, 16px)" }}
          >
            Deliveries, quotes, tracking, and business logistics solutions across Lagos — one message away.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href={`tel:${BRAND.phone ?? "+2348000000000"}`}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
              style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
            >
              Call Us
              <span
                className="inline-flex items-center justify-center rounded-full"
                style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}
              >
                <Phone size={11} color="#fff" />
              </span>
            </a>
            <a
              href={`https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/30 text-white transition-all hover:bg-white/10"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              WhatsApp Us
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT INFO CARDS
───────────────────────────────────────── */
const contactCards = [
  {
    icon: Phone,
    label: "Phone Number",
    sub: "Call our support team",
    value: BRAND.phone ?? "+234 800 000 0000",
    href: `tel:${BRAND.phone ?? "+2348000000000"}`,
    cta: "Call Now",
    color: "bg-red-50 text-red-400",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "Chat with us instantly",
    value: BRAND.phone ?? "+234 800 000 0000",
    href: `https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`,
    cta: "Open Chat",
    color:"bg-red-50 text-red-400",
  },
  {
    icon: Mail,
    label: "Email Address",
    sub: "Send inquiries & support requests",
    value: BRAND.email ?? "hello@quickreachlogistics.com",
    href: `mailto:${BRAND.email ?? "hello@quickreachlogistics.com"}`,
    cta: "Send Email",
    color: "bg-red-50 text-red-400",
  },
  {
    icon: MapPin,
    label: "Office Location",
    sub: "Visit our office",
    value: BRAND.address ?? "Ikeja, Lagos, Nigeria",
    href: "https://maps.google.com",
    cta: "Get Directions",
    color: "bg-red-50 text-red-400",
  },
];

function ContactCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {contactCards.map(({ icon: Icon, label, sub, value, href, cta, color }) => (
          <Card key={label} className="group flex flex-col gap-4 p-6 transition-shadow hover:shadow-md">
            <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{sub}</p>
              <p className="mt-1 font-semibold">{label}</p>
              <p className="mt-1 break-all text-sm text-muted-foreground">{value}</p>
            </div>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline"
            >
              {cta} <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </Card>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   CONTACT FORM + MAP (replaces Quick Quote)
───────────────────────────────────────── */
function ContactFormAndMap() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">

        {/* LEFT — Contact Form */}
        <div>
          <Badge variant="secondary" className="rounded-full">Get In Touch</Badge>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Send us a message</h2>
          <p className="mt-2 text-muted-foreground">We'll get back to you within an hour during business hours.</p>

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
                <Textarea required rows={5} placeholder="Tell us about your delivery needs or any questions you have..." />
              </div>
<Button
  type="submit"
  size="lg"
  className="w-full gap-2 text-white hover:opacity-90 transition-opacity"
  style={{ background: "#ef0004", border: "none" }}
>
  Send Message <ArrowRight className="h-4 w-4" />
</Button>
            </form>
          </Card>
        </div>

        {/* RIGHT — Map + Social (like image 2) */}
        <div className="flex flex-col gap-0">
          <Badge variant="outline" className="rounded-full w-fit mb-3 border-slate-300 bg-slate-100 text-slate-700">
            Find Us
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Our Location</h2>
          <p className="text-muted-foreground mb-6">Come visit us or use the contact options below.</p>

          <Card className="overflow-hidden shadow-sm flex-1 flex flex-col">
            {/* Google Map embed */}
            <div className="relative" style={{ height: "320px" }}>
              <iframe
                title="Quick Reach Logistics Office Location"
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7!2d3.5697!3d6.4698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf59d4a4a4a4a%3A0x0!2sF3%2C192%20Abraham%20Adesanya%20Shopping%20Complex%2C%20Abraham%20Adesanya%2C%20Lagos!5e0!3m2!1sen!2sng!4v1700000000000!5m2!1sen!2sng"
                className="h-full w-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Map overlay card — like image 2 */}
              <div
                className="absolute bottom-4 left-4 flex items-center gap-3 rounded-xl px-4 py-3"
                style={{ background: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 3, minWidth: "200px" }}
              >
                <div
                  className="flex items-center justify-center rounded-xl text-white"
                  style={{ width: "40px", height: "40px", background: "#ef0004", flexShrink: 0 }}
                >
                  <MapPin size={18} color="#fff" />
                </div>
                <div>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "13px", color: "#0f0f0f", lineHeight: 1.1 }}>
                    QuickReach Logistics
                  </p>
                  <p style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
                   F3, 192 Abraham Adesanya, Lagos
                  </p>
                </div>
              </div>
            </div>

            {/* Call + Email CTA row — like image 2 */}
            {/* <div className="grid grid-cols-2 divide-x divide-border border-t">
              <a
                href={`tel:${BRAND.phone ?? "+2348000000000"}`}
                className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-slate-50"
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: "36px", height: "36px", background: "#0f0f0f", flexShrink: 0 }}
                >
                  <Phone size={14} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#888", fontWeight: 600 }}>
                    Call Us
                  </p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "#0f0f0f" }}>
                    {BRAND.phone ?? "+234 800 000 0000"}
                  </p>
                </div>
              </a>
              <a
                href={`mailto:${BRAND.email ?? "hello@quickreachlogistics.com"}`}
                className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-blue-50"
                style={{ background: "#3b82f6" }}
              >
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{ width: "36px", height: "36px", background: "rgba(255,255,255,0.2)", flexShrink: 0 }}
                >
                  <Mail size={14} color="#fff" />
                </div>
                <div>
                  <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", fontWeight: 600 }}>
                    Email Us
                  </p>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "13px", color: "#fff" }}>
                    Send an Email
                  </p>
                </div>
              </a>
            </div> */}

            {/* Social icons — like image 2 */}
            <div className="px-5 py-4 border-t">
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0f0f0f", fontFamily: "'Syne', sans-serif", marginBottom: "12px" }}>
                Follow QuickReach
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex items-center justify-center rounded-full border border-border transition-all hover:border-slate-400 hover:bg-slate-50"
                    style={{ width: "40px", height: "40px" }}
                  >
                    <Icon size={16} className="text-muted-foreground" />
                  </a>
                ))}
              </div>
            </div>
          </Card>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   BUSINESS LOGISTICS
───────────────────────────────────────── */
// const businessTypes = [
//   { icon: "🛒", label: "E-commerce Stores" },
//   { icon: "💊", label: "Pharmacies" },
//   { icon: "🍽️", label: "Restaurants" },
//   { icon: "🏪", label: "Retail Businesses" },
//   { icon: "🏢", label: "Corporate Offices" },
// ];

// function BusinessLogistics() {
//   return (
//     <section className="py-16">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white md:p-12">
//           <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
//             <div>
//               <Badge className="rounded-full border-white/20 bg-white/10 text-white">
//                 Business & Corporate
//               </Badge>
//               <h2 className="mt-4 text-3xl font-bold tracking-tight lg:text-4xl">
//                 Business &amp; Corporate{" "}
//                 <span style={{ color: "#ef0004" }}>Inquiries</span>
//               </h2>
//               <p className="mt-3 text-slate-300">
//                 Scale your logistics with dedicated support, volume pricing, and real-time reporting. Perfect for:
//               </p>
//               <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
//                 {businessTypes.map(({ icon, label }) => (
//                   <div key={label} className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm">
//                     <span>{icon}</span>
//                     <span>{label}</span>
//                   </div>
//                 ))}
//               </div>
//               <Button
//                 size="lg"
//                 className="mt-8 gap-2 text-white hover:opacity-90"
//                 style={{ background: "#ef0004" }}
//                 asChild
//               >
//                 <a
//                   href={`https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Building2 className="h-4 w-4" /> Speak With Our Team
//                 </a>
//               </Button>
//             </div>
//             <div className="grid gap-4">
//               {[
//                 { label: "Dedicated Account Manager", desc: "A single point of contact for all your logistics needs." },
//                 { label: "Volume Pricing", desc: "Discounted rates as your delivery volume grows." },
//                 { label: "Priority Support", desc: "Faster response times and escalation paths." },
//                 { label: "Reporting Dashboard", desc: "Track all deliveries and spend in one place." },
//               ].map(({ label, desc }) => (
//                 <div key={label} className="flex items-start gap-3 rounded-xl bg-white/5 p-4">
//                   <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" style={{ color: "#ef0004" }} />
//                   <div>
//                     <p className="font-semibold">{label}</p>
//                     <p className="mt-0.5 text-sm text-slate-400">{desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* ─────────────────────────────────────────
   OFFICE HOURS + COVERAGE
───────────────────────────────────────── */
const coverageAreas = [
  "Ikeja", "Lekki", "Ajah", "Ikorodu", "Yaba", "Surulere",
  "Maryland", "Gbagada", "Victoria Island", "Lagos Island", "Festac", "Magodo",
];

function HoursAndCoverage() {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <Badge variant="secondary" className="rounded-full">Office Hours</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Customer Support</h2>
          <Card className="mt-5 overflow-hidden shadow-sm">
            {[
              { day: "Monday – Friday", hours: "8:00 AM – 6:00 PM", active: true },
              { day: "Saturday", hours: "9:00 AM – 4:00 PM", active: true },
              { day: "Sunday", hours: "Emergency support only", active: false },
            ].map(({ day, hours, active }, i) => (
              <div key={day} className={`flex items-center justify-between px-6 py-4 ${i !== 2 ? "border-b border-border" : ""}`}>
                <div className="flex items-center gap-3">
                  <span className={`h-2 w-2 rounded-full ${active ? "bg-green-500" : "bg-orange-400"}`} />
                  <span className="font-medium">{day}</span>
                </div>
                <span className={`text-sm ${active ? "text-foreground" : "text-muted-foreground"}`}>{hours}</span>
              </div>
            ))}
          </Card>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <Badge variant="secondary" className="rounded-full">Coverage</Badge>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Areas We Serve</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {coverageAreas.map((area) => (
              <span key={area} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-medium shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#ef0004" }} />
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
  );
}

/* ─────────────────────────────────────────
   FAQ
───────────────────────────────────────── */
const faqs = [
  { q: "How quickly can I get a quote?", a: "Usually within minutes. Fill out the contact form and our team will respond almost immediately during business hours." },
  { q: "Do you offer same-day delivery?", a: "Yes, we offer same-day delivery across Lagos. Book before 2 PM for guaranteed same-day dispatch." },
  { q: "Can I track my shipment?", a: "Absolutely. Every shipment gets a unique tracking ID you can use on our tracking portal for real-time updates." },
  { q: "Do you work with businesses?", a: "Yes — we provide dedicated business logistics solutions with volume pricing, priority support, and reporting dashboards." },
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
        <ChevronDown className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{a}</p>}
    </div>
  );
}

function FAQ() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <Badge variant="secondary" className="rounded-full">FAQ</Badge>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">Frequently Asked Questions</h2>
          <p className="mt-2 text-muted-foreground">Quick answers to common questions.</p>
        </div>
        <Card className="mt-8 px-6 py-2 shadow-sm">
          {faqs.map((faq) => <FAQItem key={faq.q} {...faq} />)}
        </Card>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────── */
function FinalCTA() {
  return (
    <section style={{ background: "#f8f3f3" }}>
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-12 sm:p-16"
          style={{ minHeight: "330px" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/media/huge.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.72)" }} />
          <div className="relative flex flex-col items-center text-center gap-8" style={{ zIndex: 2 }}>
            <div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1 }}>
                Ready to Ship Across Lagos?
              </h2>
              <p className="mt-3 max-w-lg mx-auto text-base" style={{ color: "rgba(255,255,255,0.8)" }}>
                Let our team handle your delivery quickly and professionally. Join hundreds of businesses who trust QuickReach.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`tel:${BRAND.phone ?? "+2348000000000"}`}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold transition-all hover:opacity-90"
                style={{ background: "#ef0004", color: "#fff", fontFamily: "'Syne', sans-serif" }}
              >
                Call Now
                <span
                  className="inline-flex items-center justify-center rounded-full"
                  style={{ width: "22px", height: "22px", background: "rgba(0,0,0,0.25)" }}
                >
                  <ArrowUpRight size={12} color="#fff" />
                </span>
              </a>
              <a
                href={`https://wa.me/${(BRAND.phone ?? "2348000000000").replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold border border-white/40 text-white transition-all hover:bg-white/10"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE ROOT
───────────────────────────────────────── */
function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />
      <main>
        <HeroSection />
        <ContactCards />
        <ContactFormAndMap />
        {/* <BusinessLogistics /> */}
        <HoursAndCoverage />
        <FAQ />
        <FinalCTA />
      </main>
      <MarketingFooter />
    </div>
  );
}