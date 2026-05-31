import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem { to: string; label: string; icon: LucideIcon }

export function AppShell({ items, title, children, accentLabel }: {
  items: NavItem[]; title: string; children?: ReactNode; accentLabel: string;
}) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <div className="min-h-screen bg-surface">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r bg-sidebar lg:flex lg:flex-col">
          <div className="flex h-16 items-center border-b px-5"><Link to="/"><Logo /></Link></div>
          <div className="px-3 py-4">
            <div className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{accentLabel}</div>
            <nav className="mt-2 space-y-0.5">
              {items.map((it) => {
                const active = path === it.to || (it.to !== "/dashboard" && path.startsWith(it.to));
                return (
                  <Link key={it.to} to={it.to} className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}>
                    <it.icon className="h-4 w-4" /> {it.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="mt-auto border-t p-4 text-xs text-muted-foreground">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start"><Link to="/"><LogOut className="mr-2 h-4 w-4" />Sign out</Link></Button>
          </div>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6">
            <div>
              <div className="text-xs text-muted-foreground">{accentLabel}</div>
              <div className="font-display text-base font-semibold">{title}</div>
            </div>
            <div className="hidden flex-1 px-8 md:block">
              <div className="relative mx-auto max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="h-10 pl-9" placeholder="Search shipments, riders, invoices…" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost"><Bell className="h-4 w-4" /></Button>
              <div className="grid h-9 w-9 place-items-center rounded-full gradient-primary font-display text-xs font-semibold text-primary-foreground">TA</div>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-6 lg:p-8">{children ?? <Outlet />}</main>
        </div>
      </div>
    </div>
  );
}
