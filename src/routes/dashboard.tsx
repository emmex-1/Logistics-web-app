import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/shared/app-shell";
import { LayoutDashboard, Package, MapPin, Bookmark, Receipt, Settings, LifeBuoy, Shield } from "lucide-react";

const items: NavItem[] = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/dashboard/shipments", label: "Shipments", icon: Package },
  { to: "/dashboard/tracking", label: "Live tracking", icon: MapPin },
  { to: "/dashboard/bookings", label: "Bookings", icon: Bookmark },
  { to: "/dashboard/invoices", label: "Invoices", icon: Receipt },
  { to: "/dashboard/support", label: "Support", icon: LifeBuoy },
  { to: "/dashboard/security", label: "Security", icon: Shield },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Quick Reach Logistics" }] }),
  component: () => <AppShell items={items} accentLabel="Customer" title="Dashboard"><Outlet /></AppShell>,
});
