import { useEffect, useState, useCallback } from "react";

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
