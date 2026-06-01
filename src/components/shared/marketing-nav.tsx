import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  ["Same-Day Delivery", "/services"],
  ["Express Delivery", "/services"],
  ["Dispatch Rider Services", "/services"],
  ["E-commerce Delivery", "/services"],
  ["Business Logistics", "/services"],
  ["Bulk & Multi-Stop", "/services"],
  ["Scheduled Pickups", "/services"],
  ["Document & Parcel", "/services"],
] as const;

const links = [
  { to: "/", label: "Home" },
  { to: "/track", label: "Track" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center"><Logo /></Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/" className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground", path === "/" && "bg-secondary text-foreground")}>Home</Link>
          <div className="relative" onMouseEnter={() => setSvc(true)} onMouseLeave={() => setSvc(false)}>
            <button className={cn("inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground", path.startsWith("/services") && "bg-secondary text-foreground")}>
              Services <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {svc && (
              <div className="absolute left-0 top-full w-64 pt-2">
                <div className="rounded-2xl border bg-popover p-2 shadow-elevated">
                  {services.map(([label, to]) => (
                    <Link key={label} to={to} className="block rounded-lg px-3 py-2 text-sm font-medium hover:bg-secondary">{label}</Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {links.slice(1).map((l) => (
            <Link key={l.to} to={l.to} className={cn("rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground", path === l.to && "bg-secondary text-foreground")}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm"><Link to="/quote">Get Quote</Link></Button>
          <Button asChild size="sm" className="shadow-glow"><Link to="/book">Book delivery</Link></Button>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="grid h-10 w-10 place-items-center rounded-lg border md:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">
                {l.label}
              </Link>
            ))}
            <Link to="/services" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary">Services</Link>
            <div className="mt-2 grid grid-cols-2 gap-2 px-3 pb-2">
              <Button asChild variant="outline" size="sm"><Link to="/quote">Get Quote</Link></Button>
              <Button asChild size="sm"><Link to="/book">Book</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
