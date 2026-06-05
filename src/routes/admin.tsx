import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/shared/app-shell";
import { LayoutDashboard, Package, Users, Truck, Wallet, BarChart3, Map, LifeBuoy, Settings, PackagePlus, Camera, Warehouse, Send, Receipt, Bell, NotebookPen, FileBarChart } from "lucide-react";

const items: NavItem[] = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard },
  { to: "/admin/orders", label: "Orders", icon: Package },
  { to: "/attendant/create", label: "Create shipment", icon: PackagePlus },
  { to: "/attendant/capture", label: "Parcel capture", icon: Camera },
  { to: "/attendant/intake", label: "Parcel intake", icon: Warehouse },
  { to: "/attendant/dispatch", label: "Dispatch", icon: Send },
  { to: "/attendant/payments", label: "Payments", icon: Wallet },
  { to: "/attendant/receipts", label: "Receipts", icon: Receipt },
  { to: "/attendant/summary", label: "Daily summary", icon: FileBarChart },
  { to: "/attendant/notes", label: "Notes & issues", icon: NotebookPen },
  { to: "/admin/riders", label: "Riders", icon: Users },
  { to: "/admin/fleet", label: "Fleet", icon: Truck },
  { to: "/admin/finance", label: "Finance", icon: Wallet },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/zones", label: "Zones & Pricing", icon: Map },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/support", label: "Support", icon: LifeBuoy },
  { to: "/admin/settings", label: "Settings", icon: Settings },
  { to: "/attendant/notifications", label: "Notifications", icon: Bell },
];

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Quick Reach Logistics" }] }),
  component: () => <AppShell items={items} accentLabel="Admin" title="Operations"><Outlet /></AppShell>,
});
