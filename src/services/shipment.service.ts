import { apiRequest } from "@/lib/api-client";
import { mockShipments } from "@/mock/data";
import type { Shipment } from "@/types";

export const shipmentService = {
  list: () => apiRequest<Shipment[]>("/shipments"),
  get: (id: string) => apiRequest<Shipment>(`/shipments/${id}`),
  create: (data: Partial<Shipment>) =>
    apiRequest<Shipment>("/bookings", { method: "POST", body: data, latencyMs: 900 }),
};

/** Finds a shipment from mock data by tracking code OR id */
function findMock(codeOrId: string): Shipment | undefined {
  const needle = codeOrId.trim().toUpperCase();
  return mockShipments.find(
    (s) =>
      s.trackingCode.toUpperCase() === needle ||
      s.id.toUpperCase() === needle ||
      s.id === codeOrId.trim()
  );
}

export const trackingService = {
  /** Resolve by tracking code — mock-first, API optional */
  byCode: async (code: string): Promise<Shipment> => {
    const mock = findMock(code);
    if (mock) return mock;           // instant — no API needed
    try {
      return await apiRequest<Shipment>("/tracking", { query: { code } });
    } catch {
      throw new Error("Shipment not found");
    }
  },

  /**
   * Subscribe to live position updates.
   * Strategy:
   *   1. Immediately emit mock data so the page renders at once.
   *   2. Every 2.5 s try the real API; on failure keep using mock + simulated drift.
   */
  subscribe(id: string, onUpdate: (s: Shipment) => void): () => void {
    let cancelled = false;
    let counter = 0;

    // ── Step 1: emit immediately from mock so UI never hangs ──
    const base = findMock(id);
    if (base) {
      onUpdate({ ...base });
    }

    // ── Step 2: poll for live data ──
    const tick = async () => {
      if (cancelled) return;

      try {
        // Wrap with a 3-second timeout so a hanging API never blocks the UI
        const raw = await Promise.race<Shipment>([
          apiRequest<Shipment>(`/shipments/${id}`, { latencyMs: 150 }),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 3000)
          ),
        ]);

        if (cancelled) return;

        const s: Shipment = {
          ...raw,
          currentLocation: raw.currentLocation
            ? {
                lat: raw.currentLocation.lat + Math.sin(counter / 3) * 0.0015,
                lng: raw.currentLocation.lng + Math.cos(counter / 3) * 0.0015,
              }
            : raw.currentLocation,
          etaMinutes: Math.max(0, (raw.etaMinutes ?? 20) - 1),
        };
        counter++;
        onUpdate(s);
      } catch {
        // API unavailable — keep updating with mock + drift so the UI stays alive
        if (cancelled) return;
        const fresh = findMock(id);
        if (fresh) {
          const s: Shipment = {
            ...fresh,
            currentLocation: fresh.currentLocation
              ? {
                  lat: fresh.currentLocation.lat + Math.sin(counter / 3) * 0.0015,
                  lng: fresh.currentLocation.lng + Math.cos(counter / 3) * 0.0015,
                }
              : fresh.currentLocation,
            etaMinutes:
              fresh.status === "delivered"
                ? 0
                : Math.max(0, (fresh.etaMinutes ?? 20) - Math.floor(counter / 4)),
          };
          counter++;
          onUpdate(s);
        }
      }

      if (!cancelled) {
        setTimeout(tick, 2500);
      }
    };

    // Small delay before first poll so the immediate emit renders first
    setTimeout(tick, 300);

    return () => {
      cancelled = true;
    };
  },
};