import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/quote", label: "Get Quote" },
  { to: "/track", label: "Track" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (r) => r.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center"><Logo /></Link>
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to} to={l.to}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                path === l.to && "bg-secondary text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
          <Button asChild size="sm" className="shadow-glow"><Link to="/signup">Get started</Link></Button>
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
            <div className="mt-2 grid grid-cols-2 gap-2 px-3 pb-2">
              <Button asChild variant="outline" size="sm"><Link to="/login">Sign in</Link></Button>
              <Button asChild size="sm"><Link to="/signup">Get started</Link></Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
