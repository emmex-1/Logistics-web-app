import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowUpRight } from "lucide-react";
import { useState, useEffect } from "react";
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

const resources = [
  ["Blog", "/blog"],
  ["Case Studies", "/case-studies"],
  ["API Docs", "/docs"],
  ["Help Center", "/help"],
];

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  const [res, setRes] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 80);
   onScroll();
   window.addEventListener("scroll", onScroll, { passive: true });
   return () => window.removeEventListener("scroll", onScroll);
 }, []);

  return (
    /* Outer wrapper: full-width, positions the pill navbar inside */
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pb-2 lg:px-8">
      {/* Glass pill navbar */}
      <div
        className="mx-auto flex h-[56px] max-w-6xl items-center justify-between px-4 lg:px-6"
  style={{
   background: scrolled ? "rgba(30, 27, 27, 0.95)" : "rgba(255,255,255,0.08)",
   backdropFilter: "blur(24px)",
   WebkitBackdropFilter: "blur(24px)",
   border: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.14)",
   transition: "background 0.3s ease, border 0.3s ease",
    borderRadius: "999px",
    boxShadow: "0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
  }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(16px, 3vw, 18px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.5px",
            }}
          >
            <span style={{ color: "#ef0004" }}>QuickReach</span> Logistics
          </span>
        </Link>

        {/* Center Nav */}
        <nav className="hidden items-center gap-0 md:flex">
          <Link
            to="/"
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              path === "/" ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            Home
          </Link>

                    <Link
            to="/about"
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              path === "/about" ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            About
          </Link>

          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSvc(true)}
            onMouseLeave={() => setSvc(false)}
          >
            <button
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                path.startsWith("/services") ? "text-white" : "text-white/55 hover:text-white"
              )}
            >
              Services{" "}
              <ChevronDown className={cn("h-3 w-3 transition-transform", svc && "rotate-180")} />
            </button>
            {svc && (
              <div className="absolute left-0 top-full w-60 pt-3">
                <div
                  className="rounded-2xl p-1.5 shadow-2xl"
                  style={{
                    background: "rgba(12,12,12,0.92)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {services.map(([label, to]) => (
                    <Link
                      key={label}
                      to={to}
                      className="block rounded-xl px-3.5 py-2 text-sm text-white/65 hover:text-white hover:bg-white/6 transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setRes(true)}
            onMouseLeave={() => setRes(false)}
          >
            <button className="inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium text-white/55 hover:text-white transition-colors">
              Resources{" "}
              <ChevronDown className={cn("h-3 w-3 transition-transform", res && "rotate-180")} />
            </button>
            {res && (
              <div className="absolute left-0 top-full w-44 pt-3">
                <div
                  className="rounded-2xl p-1.5 shadow-2xl"
                  style={{
                    background: "rgba(12,12,12,0.92)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {resources.map(([label, href]) => (
                    <a
                      key={label}
                      href={href}
                      className="block rounded-xl px-3.5 py-2 text-sm text-white/65 hover:text-white hover:bg-white/6 transition-colors"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* <Link
            to="/about"
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              path === "/about" ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            About
          </Link> */}

          <Link
            to="/contact"
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              path === "/contact" ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            Career
          </Link>
        </nav>

        {/* Right CTAs: Sign In + Get Started */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            style={{
              background: "#ef0004",
              boxShadow: "0 0 20px rgba(255,77,0,0.4)",
            }}
          >
            Get Started
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden"
          style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.12)" }}
          aria-label="Menu"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* Mobile menu — drops below pill */}
      {open && (
        <div
          className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl md:hidden"
          style={{
            background: "rgba(10,10,10,0.94)",
            backdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <nav className="flex flex-col px-4 py-3">
            {[
              { to: "/" as const, label: "Home" },
              { to: "/services" as const, label: "Services" },
              { to: "/pricing" as const, label: "Pricing" },
              { to: "/about" as const, label: "About" },
              { to: "/contact" as const, label: "Career" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-2 px-1 pb-2">
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full py-2.5 text-sm font-medium text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                Sign In
              </Link>
              <Link
                to="/book"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-white"
                style={{ background: "#ef0004" }}
              >
                Get Started <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}