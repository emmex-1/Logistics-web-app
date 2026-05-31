import type {
  Driver, FleetVehicle, Invoice, Notification, Shipment, ShipmentEvent,
  SupportTicket, User, AdminMetric, LatLng,
} from "@/types";

const now = Date.now();
const iso = (offsetMin = 0) => new Date(now + offsetMin * 60_000).toISOString();

// ---------- Lagos coordinates ----------
export const LAGOS_CENTER: LatLng = { lat: 6.5244, lng: 3.3792 };

const LAGOS_POINTS: Record<string, LatLng> = {
  "Lekki Phase 1": { lat: 6.4413, lng: 3.4738 },
  "Victoria Island": { lat: 6.4281, lng: 3.4219 },
  "Ikoyi": { lat: 6.4500, lng: 3.4350 },
  "Ikeja GRA": { lat: 6.5833, lng: 3.3667 },
  "Yaba": { lat: 6.5095, lng: 3.3711 },
  "Surulere": { lat: 6.4969, lng: 3.3540 },
  "Apapa Port": { lat: 6.4458, lng: 3.3666 },
  "Ajah": { lat: 6.4667, lng: 3.5667 },
  "Oshodi": { lat: 6.5550, lng: 3.3470 },
  "Mushin": { lat: 6.5274, lng: 3.3540 },
  "Agege": { lat: 6.6151, lng: 3.3209 },
  "Alimosho": { lat: 6.6018, lng: 3.2670 },
};
export const LAGOS_AREAS = Object.keys(LAGOS_POINTS);
export const areaCoords = (a: string) => LAGOS_POINTS[a] ?? LAGOS_CENTER;

// ---------- Users ----------
export const mockUser: User = {
  id: "usr_001",
  fullName: "Tunde Adebayo",
  email: "tunde@sendaro.ng",
  phone: "+2348101234567",
  role: "customer",
  avatarUrl: "",
  createdAt: iso(-60 * 24 * 120),
  twoFactorEnabled: true,
};

export const mockAdmin: User = { ...mockUser, id: "usr_admin", fullName: "Amaka Eze", role: "admin", email: "amaka@sendaro.ng" };
export const mockRiderUser: User = { ...mockUser, id: "usr_rider", fullName: "Sola Bakare", role: "rider", email: "sola@sendaro.ng" };

// ---------- Drivers ----------
const driverNames = [
  "Emeka Okafor", "Bisi Adekunle", "Chinedu Obi", "Funmi Lawal",
  "Kelechi Nwosu", "Yemi Sanusi", "Tope Adeoye", "Ngozi Eze",
];
export const mockDrivers: Driver[] = driverNames.map((n, i) => ({
  id: `drv_${i + 1}`,
  name: n,
  phone: `+23480${10000000 + i * 117}`,
  rating: 4.6 + ((i % 4) * 0.1),
  trips: 320 + i * 47,
  vehicle: {
    type: (["bike", "van", "truck", "car"] as const)[i % 4],
    plate: `LAG-${100 + i * 13}-XY`,
    model: ["Yamaha YBR", "Toyota Hiace", "Mitsubishi Canter", "Toyota Corolla"][i % 4],
  },
}));

// ---------- Shipments ----------
const status = ["delivered", "in_transit", "out_for_delivery", "rider_assigned", "confirmed", "picked_up"] as const;
function makeEvents(s: Shipment["status"]): ShipmentEvent[] {
  const base: ShipmentEvent[] = [
    { id: "e1", at: iso(-180), status: "confirmed", title: "Order confirmed", description: "Payment received and shipment confirmed.", location: "Sendaro HQ, Lekki" },
    { id: "e2", at: iso(-160), status: "rider_assigned", title: "Rider assigned", description: "Emeka Okafor is on the way.", location: "Lekki Phase 1" },
    { id: "e3", at: iso(-140), status: "picked_up", title: "Package picked up", location: "12 Admiralty Way, Lekki", coords: LAGOS_POINTS["Lekki Phase 1"] },
    { id: "e4", at: iso(-90), status: "in_transit", title: "In transit", description: "Heading to Ikeja via Third Mainland Bridge.", coords: { lat: 6.5, lng: 3.4 } },
    { id: "e5", at: iso(-30), status: "out_for_delivery", title: "Out for delivery", coords: LAGOS_POINTS["Ikeja GRA"] },
    { id: "e6", at: iso(0), status: "delivered", title: "Delivered", description: "Package handed over to Chika.", location: "Ikeja GRA" },
  ];
  const idx = base.findIndex((b) => b.status === s);
  return base.slice(0, idx === -1 ? base.length : idx + 1);
}

export const mockShipments: Shipment[] = Array.from({ length: 24 }).map((_, i) => {
  const pickAreas = LAGOS_AREAS;
  const pa = pickAreas[i % pickAreas.length];
  const da = pickAreas[(i * 3 + 2) % pickAreas.length];
  const st = status[i % status.length];
  const events = makeEvents(st);
  const distanceKm = 8 + (i % 22);
  const total = 2500 + distanceKm * 280 + (i % 3) * 800;
  return {
    id: `shp_${1000 + i}`,
    trackingCode: `SDR${String(900000 + i * 47).slice(-7)}`,
    status: st,
    createdAt: iso(-60 * 24 * (i + 1)),
    pickup: {
      label: "Pickup", street: `${10 + i} Admiralty Way`, area: pa, city: "Lagos", state: "Lagos",
      coords: areaCoords(pa), contactName: "Sender", contactPhone: "+2348100000000",
    },
    destination: {
      label: "Drop", street: `${5 + i} Allen Avenue`, area: da, city: "Lagos", state: "Lagos",
      coords: areaCoords(da), contactName: "Receiver", contactPhone: "+2348100000001",
    },
    cargo: (["documents", "parcel", "electronics", "food", "fragile", "furniture"] as const)[i % 6],
    weightKg: 2 + (i % 30),
    vehicle: (["bike", "van", "truck", "car"] as const)[i % 4],
    urgency: (["standard", "same_day", "express", "scheduled"] as const)[i % 4],
    insurance: i % 3 === 0,
    pricing: {
      base: 1500, distance: distanceKm * 220, weight: (i % 30) * 60, vehicle: 800,
      urgency: (i % 4) * 400, insurance: i % 3 === 0 ? 600 : 0, fuel: 350,
      vat: Math.round(total * 0.075), total: Math.round(total * 1.075),
      currency: "NGN", distanceKm, etaMinutes: 25 + distanceKm * 3,
    },
    driver: mockDrivers[i % mockDrivers.length],
    currentLocation: events.at(-1)?.coords ?? areaCoords(pa),
    etaMinutes: st === "delivered" ? 0 : 18 + (i % 40),
    events,
    pod: st === "delivered" ? {
      photos: [], receivedBy: "Chika O.", receivedAt: iso(-2), notes: "Left at reception.",
    } : undefined,
    customerId: mockUser.id,
  };
});

// ---------- Notifications ----------
export const mockNotifications: Notification[] = [
  { id: "n1", title: "Shipment SDR0009047 delivered", body: "Your package arrived at Ikeja GRA.", at: iso(-15), read: false, type: "shipment" },
  { id: "n2", title: "Payment successful", body: "₦14,800 charged via Paystack.", at: iso(-90), read: false, type: "payment" },
  { id: "n3", title: "Rider on the way", body: "Emeka is 6 minutes away from pickup.", at: iso(-180), read: true, type: "shipment" },
  { id: "n4", title: "20% off scheduled deliveries", body: "Book before Friday and save.", at: iso(-60 * 12), read: true, type: "promo" },
];

// ---------- Invoices ----------
export const mockInvoices: Invoice[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `inv_${2000 + i}`,
  number: `INV-${String(20240 + i)}`,
  amount: 12000 + i * 2350,
  status: i % 4 === 0 ? "unpaid" : i % 7 === 0 ? "overdue" : "paid",
  issuedAt: iso(-60 * 24 * (i + 3)),
  dueAt: iso(60 * 24 * (10 - i)),
  shipmentId: mockShipments[i]?.id,
}));

// ---------- Support ----------
export const mockTickets: SupportTicket[] = [
  { id: "tkt_1", subject: "Package arrived damaged", status: "in_progress", priority: "high", createdAt: iso(-60 * 24), lastMessageAt: iso(-120), shipmentId: "shp_1003" },
  { id: "tkt_2", subject: "Refund for cancelled booking", status: "open", priority: "medium", createdAt: iso(-60 * 6), lastMessageAt: iso(-60 * 2) },
  { id: "tkt_3", subject: "Update billing address", status: "resolved", priority: "low", createdAt: iso(-60 * 72), lastMessageAt: iso(-60 * 70) },
];

// ---------- Fleet ----------
export const mockFleet: FleetVehicle[] = Array.from({ length: 14 }).map((_, i) => ({
  id: `veh_${300 + i}`,
  plate: `LAG-${200 + i * 17}-AB`,
  type: (["bike", "van", "truck", "car", "trailer"] as const)[i % 5],
  model: ["Yamaha YBR", "Toyota Hiace", "Mitsubishi Canter", "Toyota Corolla", "MAN Trailer"][i % 5],
  status: (["active", "active", "maintenance", "idle", "active"] as const)[i % 5],
  driverId: mockDrivers[i % mockDrivers.length]?.id,
  lastService: iso(-60 * 24 * (3 + i)),
  odometerKm: 12000 + i * 4310,
  fuelLevel: 30 + ((i * 9) % 70),
}));

// ---------- Admin metrics ----------
export const mockAdminMetrics: AdminMetric[] = [
  { label: "Deliveries today", value: 1247, delta: 12.4, spark: [12, 18, 14, 22, 28, 26, 34], format: "number" },
  { label: "Revenue (24h)", value: 8_412_500, delta: 8.1, spark: [4, 5, 6, 8, 7, 9, 11], format: "currency" },
  { label: "Active riders", value: 312, delta: -2.1, spark: [320, 318, 322, 315, 311, 314, 312], format: "number" },
  { label: "On-time rate", value: 97, delta: 1.3, spark: [94, 95, 95, 96, 96, 97, 97], format: "percent" },
];

export const mockRevenueSeries = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: 3_000_000 + Math.round(Math.sin(i / 2) * 1_200_000) + i * 280_000,
  deliveries: 800 + Math.round(Math.cos(i / 2) * 200) + i * 70,
}));

export const mockZoneBreakdown = [
  { zone: "Lekki / VI / Ikoyi", value: 38 },
  { zone: "Ikeja / Maryland", value: 22 },
  { zone: "Mainland", value: 18 },
  { zone: "Ajah / Sangotedo", value: 12 },
  { zone: "Apapa / Port", value: 10 },
];
