import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem { to: string; label: string; icon: LucideIcon }

function NavList({ items, accentLabel, onNavigate }: { items: NavItem[]; accentLabel: string; onNavigate?: () => void }) {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <>
      <div className="px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{accentLabel}</div>
      <nav className="mt-2 space-y-0.5">
        {items.map((it) => {
          const active = path === it.to || (it.to !== "/dashboard" && it.to !== "/admin" && it.to !== "/rider" && it.to !== "/attendant" && path.startsWith(it.to));
          return (
            <Link
              key={it.to}
              to={it.to}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-secondary hover:text-foreground",
              )}
            >
              <it.icon className="h-4 w-4" /> {it.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export function AppShell({ items, title, children, accentLabel }: {
  items: NavItem[]; title: string; children?: ReactNode; accentLabel: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-surface">
      <div className="grid lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r bg-sidebar lg:flex lg:flex-col">
          <div className="flex h-16 items-center border-b px-5"><Link to="/"><Logo /></Link></div>
          <div className="px-3 py-4 overflow-y-auto">
            <NavList items={items} accentLabel={accentLabel} />
          </div>
          <div className="mt-auto border-t p-4 text-xs text-muted-foreground">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start"><Link to="/"><LogOut className="mr-2 h-4 w-4" />Sign out</Link></Button>
          </div>
        </aside>
        <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-2 border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6">
            <div className="flex items-center gap-2 min-w-0">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button size="icon" variant="ghost" className="lg:hidden shrink-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-72 p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <div className="flex h-16 items-center border-b px-5"><Logo /></div>
                  <div className="px-3 py-4 overflow-y-auto h-[calc(100vh-4rem)]">
                    <NavList items={items} accentLabel={accentLabel} onNavigate={() => setOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
              <div className="min-w-0">
                <div className="text-xs text-muted-foreground truncate">{accentLabel}</div>
                <div className="font-display text-base font-semibold truncate">{title}</div>
              </div>
            </div>
            <div className="hidden flex-1 px-8 md:block">
              <div className="relative mx-auto max-w-md">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="h-10 pl-9" placeholder="Search shipments, riders, invoices…" />
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
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
