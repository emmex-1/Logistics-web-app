/**
 * Lightweight Zustand stores. Persisted to localStorage where useful.
 * Backend-ready: session token + user are stored here; replace mock auth flow
 * with real JWT once Express endpoints land.
 */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User, BookingDraft } from "@/types";

interface AuthState {
  session: Session | null;
  user: User | null;
  setSession: (s: Session | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      session: null,
      user: null,
      setSession: (s) => set({ session: s, user: s?.user ?? null }),
      logout: () => set({ session: null, user: null }),
    }),
    { name: "quickreach.auth" },
  ),
);

interface BookingState {
  draft: BookingDraft;
  setDraft: (patch: Partial<BookingDraft>) => void;
  reset: () => void;
}
const emptyDraft: BookingDraft = { step: 0 };

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      draft: emptyDraft,
      setDraft: (patch) => set((s) => ({ draft: { ...s.draft, ...patch } })),
      reset: () => set({ draft: emptyDraft }),
    }),
    { name: "quickreach.booking" },
  ),
);

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebar: (v: boolean) => void;
}
export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebar: (v) => set({ sidebarOpen: v }),
}));
