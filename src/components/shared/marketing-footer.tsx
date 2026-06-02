import { Link } from "@tanstack/react-router";
import { Logo } from "./logo";
import { BRAND } from "@/constants";
import { Mail, Phone, MapPin } from "lucide-react";

export function MarketingFooter() {
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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-5 lg:px-8">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">{BRAND.description}</p>
          <div className="mt-6 space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> {BRAND.phone}</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> {BRAND.email}</div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {BRAND.address}</div>
          </div>
        </div>
        {[
          { title: "Product", items: [["Quote", "/quote"], ["Track", "/track"], ["Book", "/book"], ["Services", "/services"]] },
          { title: "Company", items: [["About", "/about"], ["Contact", "/contact"], ["Careers", "/about"], ["Press", "/about"]] },
          { title: "For Business", items: [["Customer dashboard", "/dashboard"], ["Rider portal", "/rider"], ["Admin", "/admin"], ["API docs", "/about"]] },
        ].map((col) => (
          <div key={col.title}>
            <div className="font-display text-sm font-semibold">{col.title}</div>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {col.items.map(([label, href]) => (
                <li key={label}><Link to={href} className="hover:text-white">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <span>© {new Date().getFullYear()} QuickReach Logistics Ltd. Lagos, Nigeria.</span>
          <span className="flex gap-4">
            <Link to="/about" className="hover:text-foreground">Privacy</Link>
            <Link to="/about" className="hover:text-foreground">Terms</Link>
            <Link to="/about" className="hover:text-foreground">Status</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}