import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/shared/app-shell";
import { LayoutDashboard, Package, Users, Truck, Wallet, BarChart3, Map, LifeBuoy, Settings } from "lucide-react";

const items: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: Package },
  { to: "/admin/riders", label: "Riders", icon: Users },
  { to: "/admin/fleet", label: "Fleet", icon: Truck },
  { to: "/admin/finance", label: "Finance", icon: Wallet },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/zones", label: "Zones & Pricing", icon: Map },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/support", label: "Support", icon: LifeBuoy },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Quick Reach Logistics" }] }),
  component: () => <AppShell items={items} accentLabel="Admin" title="Operations"><Outlet /></AppShell>,
});
