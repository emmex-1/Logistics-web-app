import { apiRequest } from "@/lib/api-client";
import type { Shipment } from "@/types";

export const shipmentService = {
  list: () => apiRequest<Shipment[]>("/shipments"),
  get: (id: string) => apiRequest<Shipment>(`/shipments/${id}`),
  create: (data: Partial<Shipment>) =>
    apiRequest<Shipment>("/bookings", { method: "POST", body: data, latencyMs: 900 }),
};

export const trackingService = {
  byCode: (code: string) => apiRequest<Shipment>("/tracking", { query: { code } }),
  /** Subscribes to live position updates. In the real backend this becomes a WebSocket. */
  subscribe(id: string, onUpdate: (s: Shipment) => void): () => void {
    let cancelled = false;
    let counter = 0;
    const tick = async () => {
      if (cancelled) return;
      try {
        const s = await apiRequest<Shipment>(`/shipments/${id}`, { latencyMs: 150 });
        // simulate driver drift
        if (s.currentLocation) {
          s.currentLocation = {
            lat: s.currentLocation.lat + (Math.sin(counter / 3) * 0.0015),
            lng: s.currentLocation.lng + (Math.cos(counter / 3) * 0.0015),
          };
          s.etaMinutes = Math.max(1, (s.etaMinutes ?? 20) - 1);
        }
        counter += 1;
        onUpdate(s);
      } catch {/* ignore */}
      setTimeout(tick, 2500);
    };
    void tick();
    return () => { cancelled = true; };
  },
};
