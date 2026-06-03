import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell, type NavItem } from "@/components/shared/app-shell";
import {
  LayoutDashboard, PackagePlus, Camera, Users, Package,
  Warehouse, Send, Search, Receipt, Wallet,
  FileBarChart, Bell, NotebookPen, UserCog, LogOut,
} from "lucide-react";

const items: NavItem[] = [
  { to: "/attendant", label: "Overview", icon: LayoutDashboard },
  { to: "/attendant/create", label: "Create shipment", icon: PackagePlus },
  { to: "/attendant/capture", label: "Parcel capture", icon: Camera },
  { to: "/attendant/customers", label: "Customers", icon: Users },
  { to: "/attendant/shipments", label: "Shipments", icon: Package },
  { to: "/attendant/intake", label: "Parcel intake", icon: Warehouse },
  { to: "/attendant/dispatch", label: "Dispatch", icon: Send },
  { to: "/attendant/track", label: "Search & track", icon: Search },
  { to: "/attendant/receipts", label: "Receipts", icon: Receipt },
  { to: "/attendant/payments", label: "Payments", icon: Wallet },
  { to: "/attendant/summary", label: "Daily summary", icon: FileBarChart },
  { to: "/attendant/notifications", label: "Notifications", icon: Bell },
  { to: "/attendant/notes", label: "Notes & issues", icon: NotebookPen },
  { to: "/attendant/profile", label: "My profile", icon: UserCog },
  { to: "/attendant/signout", label: "Sign out", icon: LogOut },
];

export const Route = createFileRoute("/attendant")({
  head: () => ({ meta: [{ title: "Attendant — Quick Reach Logistics" }] }),
  component: () => (
    <AppShell items={items} accentLabel="Attendant" title="Lagos HQ Front Desk">
      <Outlet />
    </AppShell>
  ),
});
