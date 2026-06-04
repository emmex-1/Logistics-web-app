import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X, ArrowUpRight, LayoutGrid } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const services = [
  { label: "Express Delivery",      slug: "express-delivery" },
  { label: "Scheduled Delivery",    slug: "scheduled-delivery" },
  { label: "E-Commerce Fulfilment", slug: "ecommerce-fulfilment" },
  { label: "Warehouse & Storage",   slug: "warehouse-storage" },
  { label: "Package Pickup",        slug: "package-pickup" },
];

export function MarketingNav() {
  const [open, setOpen]       = useState(false);
  const [svc, setSvc]         = useState(false);
  const [svcMobile, setSvcMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const svcRef                = useRef<HTMLDivElement>(null);
  const hideTimer             = useRef<ReturnType<typeof setTimeout> | null>(null);
  const path = useRouterState({ select: (r) => r.location.pathname });

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── close mobile menu on route change ── */
  useEffect(() => { setOpen(false); }, [path]);

  /* ── close desktop dropdown on outside click ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) {
        setSvc(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* ── hover helpers with delay so crossing the gap doesn't close it ── */
  const openSvc  = () => { if (hideTimer.current) clearTimeout(hideTimer.current); setSvc(true); };
  const closeSvc = () => { hideTimer.current = setTimeout(() => setSvc(false), 120); };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pb-2 lg:px-8">

      {/* ── Glass pill ── */}
      <div
        className="mx-auto flex h-[56px] max-w-6xl items-center justify-between px-4 lg:px-6"
        style={{
          background:       scrolled ? "rgba(30,27,27,0.95)" : "rgba(255,255,255,0.08)",
          backdropFilter:   "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border:           scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.14)",
          transition:       "background 0.3s ease, border 0.3s ease",
          borderRadius:     "999px",
          boxShadow:        "0 4px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          {/* Replace src with your actual logo image path, e.g. "/logo.png" or import it */}
          <img
            src="/media/qrl.jpg"
            alt="QuickReach Logistics logo"
            style={{
              height:    "32px",
              width:     "32px",
              objectFit: "contain",
              display:   "block",
            }}
          />
          <span
            style={{
              fontFamily:    "'Syne', sans-serif",
              fontSize:      "clamp(14px, 2.5vw, 17px)",
              fontWeight:    800,
              color:         "#fff",
              letterSpacing: "-0.4px",
              whiteSpace:    "nowrap",
              lineHeight:    1,
            }}
          >
            <span style={{ color: "#ef0004" }}>QuickReach</span>{" "}
            <span style={{ color: "#fff" }}>Logistics</span>
          </span>
        </Link>

        {/* ── Desktop centre nav ── */}
        <nav className="hidden items-center gap-0 md:flex">

          <NavLink to="/" active={path === "/"}>Home</NavLink>
          <NavLink to="/about" active={path === "/about"}>About</NavLink>

          {/* Services dropdown */}
          <div
            ref={svcRef}
            className="relative"
            onMouseEnter={openSvc}
            onMouseLeave={closeSvc}
          >
            <Link
              to="/services"
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                path.startsWith("/services") ? "text-white" : "text-white/55 hover:text-white"
              )}
            >
              Services
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", svc && "rotate-180")} />
            </Link>

            {/* Dropdown panel — transparent bridge prevents gap-hover closing */}
            <div
              className={cn(
                "absolute left-0 top-full w-64 transition-all duration-200 origin-top",
                svc ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-95 pointer-events-none"
              )}
              style={{ paddingTop: "10px" }} /* bridge gap */
            >
              <div
                className="rounded-2xl p-1.5 shadow-2xl"
                style={{
                  background:     "rgba(12,12,12,0.96)",
                  backdropFilter: "blur(20px)",
                  border:         "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {/* View all */}
                <Link
                  to="/services"
                  onClick={() => setSvc(false)}
                  className="mb-1 flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-semibold text-white/90 hover:text-white hover:bg-white/[0.06] transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}
                >
                  <LayoutGrid className="h-3.5 w-3.5 text-red-500 shrink-0" />
                  View all services
                </Link>

                {services.map(({ label, slug }) => (
                  <Link
                    key={slug}
                    to="/services/$slug"
                    params={{ slug }}
                    onClick={() => setSvc(false)}
                    className="block rounded-xl px-3.5 py-2 text-sm text-white/65 hover:text-white hover:bg-white/[0.06] transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <NavLink to="/pricing" active={path === "/pricing"}>Pricing</NavLink>
          <NavLink to="/quote"   active={path === "/quote"}>Get Quote</NavLink>
          <NavLink to="/contact" active={path === "/contact"}>Contact</NavLink>
        </nav>

        {/* ── Desktop right CTAs ── */}
        <div className="hidden items-center gap-2 md:flex shrink-0">
          <Link
            to="/login"
            className="rounded-full px-4 py-1.5 text-sm font-medium text-white/70 hover:text-white transition-colors whitespace-nowrap"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95 whitespace-nowrap"
            style={{
              background:  "#ef0004",
              boxShadow:   "0 0 20px rgba(255,77,0,0.4)",
            }}
          >
            Get Started
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-9 w-9 place-items-center rounded-full text-white md:hidden shrink-0"
          style={{
            background: "rgba(255,255,255,0.1)",
            border:     "1px solid rgba(255,255,255,0.12)",
          }}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className={cn(
          "mx-auto mt-2 max-w-6xl overflow-hidden rounded-3xl md:hidden transition-all duration-300 ease-in-out",
          open ? "max-h-[90vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        )}
        style={{
          background:     "rgba(10,10,10,0.96)",
          backdropFilter: "blur(24px)",
          border:         open ? "1px solid rgba(255,255,255,0.1)" : "none",
        }}
      >
        <nav className="flex flex-col px-4 py-3 overflow-y-auto max-h-[80vh]">

          {/* Primary links */}
          {[
            { to: "/"        as const, label: "Home"      },
            { to: "/about"   as const, label: "About"     },
            { to: "/pricing" as const, label: "Pricing"   },
            { to: "/quote"   as const, label: "Get Quote" },
            { to: "/contact" as const, label: "Contact"   },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                path === l.to ? "text-white bg-white/[0.06]" : "text-white/65 hover:text-white hover:bg-white/5"
              )}
            >
              {l.label}
            </Link>
          ))}

          {/* Services accordion */}
          <div className="mt-1 border-t border-white/[0.08] pt-2">
            <button
              onClick={() => setSvcMobile((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-white/65 hover:text-white hover:bg-white/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LayoutGrid className="h-3.5 w-3.5 text-red-500" />
                Services
              </span>
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", svcMobile && "rotate-180")} />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-200",
                svcMobile ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="pl-3 pb-1">
                {/* View all */}
                <Link
                  to="/services"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                >
                  View all services
                  <ArrowUpRight className="h-3 w-3 text-red-500" />
                </Link>

                {services.map(({ label, slug }) => (
                  <Link
                    key={slug}
                    to="/services/$slug"
                    params={{ slug }}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm text-white/50 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile CTA row */}
          <div className="mt-3 grid grid-cols-2 gap-2 px-1 pb-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center rounded-full py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
              style={{
                background: "rgba(255,255,255,0.08)",
                border:     "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 rounded-full py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "#ef0004" }}
            >
              Get Started <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ── tiny helper so desktop nav links stay DRY ── */
function NavLink({
  to,
  active,
  children,
}: {
  to: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to as never}
      className={cn(
        "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors whitespace-nowrap",
        active ? "text-white" : "text-white/55 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}