import { useEffect, useState, useCallback } from "react";
import type { Tier } from "@/data/nykaa";

const listeners = new Map<string, Set<() => void>>();

function notify(key: string) {
  listeners.get(key)?.forEach((fn) => fn());
}

export function useLocalStorage<T>(key: string, initial: T) {
  const read = useCallback((): T => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  }, [key, initial]);

  const [value, setValue] = useState<T>(initial);

  useEffect(() => {
    setValue(read());
    const fn = () => setValue(read());
    if (!listeners.has(key)) listeners.set(key, new Set());
    listeners.get(key)!.add(fn);
    return () => {
      listeners.get(key)?.delete(fn);
    };
  }, [key, read]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const v = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(v));
        } catch {
          /* noop */
        }
        notify(key);
        return v;
      });
    },
    [key],
  );

  return [value, update] as const;
}

export type CartItem = { productId: string; quantity: number };

export function useCart() {
  const [items, setItems] = useLocalStorage<CartItem[]>("nykaa_cart", []);
  const add = (productId: string) =>
    setItems((prev) => {
      const found = prev.find((i) => i.productId === productId);
      if (found) return prev.map((i) => (i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { productId, quantity: 1 }];
    });
  const remove = (productId: string) => setItems((prev) => prev.filter((i) => i.productId !== productId));
  const setQty = (productId: string, qty: number) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.productId !== productId) : prev.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
    );
  const count = items.reduce((s, i) => s + i.quantity, 0);
  return { items, add, remove, setQty, count };
}

export function useWishlist() {
  const [items, setItems] = useLocalStorage<string[]>("nykaa_wishlist", []);
  const toggle = (id: string) =>
    setItems((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  const has = (id: string) => items.includes(id);
  return { items, toggle, has, count: items.length };
}

// ============= Store Mode =============

export type StoreModeState = {
  active: boolean;
  storeId: string | null;
};

export function useStoreMode() {
  const [state, setState] = useLocalStorage<StoreModeState>("nykaa_store_mode", { active: false, storeId: null });
  const activate = (storeId: string) => setState({ active: true, storeId });
  const deactivate = () => setState({ active: false, storeId: null });
  const toggle = (storeId: string) =>
    setState((prev) => (prev.active ? { active: false, storeId: null } : { active: true, storeId }));
  return { ...state, activate, deactivate, toggle };
}

// ============= Loyalty / Nykaa ONE =============

export type LoyaltyState = {
  points: number;
  tier: Tier;
  streak: number;
  monthlyVisited: boolean;
};

export function useLoyalty() {
  const [state] = useLocalStorage<LoyaltyState>("nykaa_loyalty", {
    points: 4250,
    tier: "gold",
    streak: 5,
    monthlyVisited: false,
  });
  return state;
}

// ============= BOPIS Orders =============

export type BopisOrder = {
  id: string;
  storeId: string;
  productIds: string[];
  pickupBy: string;
  status: "ready" | "picked-up";
};

export function useBopisOrders() {
  const [orders, setOrders] = useLocalStorage<BopisOrder[]>("nykaa_bopis", []);
  const add = (order: BopisOrder) => setOrders((prev) => [...prev, order]);
  return { orders, add };
}

// ============= Tester Kit Bookings =============

export type TesterBooking = {
  id: string;
  productIds: string[];
  status: "booked" | "in-transit" | "delivered" | "converted";
  bookedAt: string;
};

export function useTesterBookings() {
  const [bookings, setBookings] = useLocalStorage<TesterBooking[]>("nykaa_testers", []);
  const add = (productIds: string[]) => {
    const booking: TesterBooking = {
      id: `tk-${Date.now()}`,
      productIds,
      status: "booked",
      bookedAt: new Date().toISOString(),
    };
    setBookings((prev) => [...prev, booking]);
    return booking;
  };
  return { bookings, add };
}
