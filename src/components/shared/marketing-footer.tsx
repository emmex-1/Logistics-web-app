import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { BRAND } from "@/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export function MarketingFooter() {
  const columns = [
    {
      title: "Product",
      items: [["Quote", "/quote"], ["Track Delivery", "/track"], ["Book Delivery", "/book"], ["Services", "/services"]] as [string, string][],
    },
    {
      title: "Company",
      items: [["About", "/about"], ["Contact", "/contact"], ["Register", "/signup"], ["Login", "/login"]] as [string, string][],
    },
    {
      title: "For Business",
      items: [["Customer dashboard", "/dashboard"], ["Rider dashboard", "/rider"], ["Admin dashboard", "/admin"], ["Receptionist dashboard", "/attendant"]] as [string, string][],
    },
    
  ];

  return (
    <footer
      className="bg-black"
      style={{
        borderRadius: "32px 32px 0 0",
        marginTop: "-32px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">

        {/* ── Top grid ── */}
        <div className="grid gap-10 md:grid-cols-5">

          {/* Brand column — full width on mobile, 2 cols on md */}
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              {BRAND.description}
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-white" />
                <span>{BRAND.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-white" />
                <span>{BRAND.email}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-white mt-0.5" />
                <span>{BRAND.address}</span>
              </div>
            </div>
          </div>

          {/* ── Link columns ──
               Mobile:  2-column grid (Product + Company | For Business + blank)
               md+:     3 separate single columns inside the md:col-span-3 area  */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {columns.map((col) => (
                <div key={col.title}>
                  <div
                    className="text-sm font-semibold text-white mb-4"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {col.title}
                  </div>
                  <ul className="space-y-2.5 text-sm text-muted-foreground">
                    {col.items.map(([label, href]) => (
                      <li key={label}>
                        <Link
                          to={href}
                          className="hover:text-white transition-colors leading-snug block"
                        >
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span className="text-white text-center sm:text-left">
            © {new Date().getFullYear()} QuickReach Logistics Ltd. Lagos, Nigeria.
          </span>
          <span className="flex gap-4">
            <Link to="/about" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/about" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/about" className="hover:text-white transition-colors">Status</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}