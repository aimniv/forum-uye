'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { COUPONS } from './site';
import { getProduct, type Product } from './products';

interface Line {
  slug: string;
  qty: number;
}

interface CartValue {
  ready: boolean;
  lines: { product: Product; qty: number }[];
  count: number;
  subtotal: number;
  coupon: string | null;
  discount: number;
  total: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  applyCoupon: (code: string) => boolean;
  clearCoupon: () => void;
}

const KEY = 'cart:v1';
const Ctx = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Line[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  // localStorage yalnızca istemcide okunabilir; SSR uyuşmazlığı olmaması için mount sonrası yüklenir.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null');
      if (saved) {
        setRaw(saved.lines ?? []);
        setCoupon(saved.coupon ?? null);
      }
    } catch {}
    setReady(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify({ lines: raw, coupon }));
    } catch {}
  }, [raw, coupon, ready]);

  const add = useCallback((slug: string, qty = 1) => {
    setRaw((l) => {
      const hit = l.find((x) => x.slug === slug);
      return hit ? l.map((x) => (x.slug === slug ? { ...x, qty: Math.min(x.qty + qty, 10) } : x)) : [...l, { slug, qty }];
    });
  }, []);
  const setQty = useCallback((slug: string, qty: number) => {
    setRaw((l) => l.map((x) => (x.slug === slug ? { ...x, qty: Math.max(1, Math.min(qty, 10)) } : x)));
  }, []);
  const remove = useCallback((slug: string) => setRaw((l) => l.filter((x) => x.slug !== slug)), []);
  const clear = useCallback(() => {
    setRaw([]);
    setCoupon(null);
  }, []);
  const applyCoupon = useCallback((code: string) => {
    const c = code.trim().toUpperCase();
    if (!(c in COUPONS)) return false;
    setCoupon(c);
    return true;
  }, []);
  const clearCoupon = useCallback(() => setCoupon(null), []);

  const value = useMemo<CartValue>(() => {
    const lines = raw.flatMap((l) => {
      const product = getProduct(l.slug);
      return product && product.inStock ? [{ product, qty: l.qty }] : [];
    });
    const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
    const rate = coupon ? COUPONS[coupon] ?? 0 : 0;
    const discount = Math.round(subtotal * rate * 100) / 100;
    return {
      ready,
      lines,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      coupon,
      discount,
      total: subtotal - discount,
      add,
      setQty,
      remove,
      clear,
      applyCoupon,
      clearCoupon,
    };
  }, [raw, coupon, ready, add, setQty, remove, clear, applyCoupon, clearCoupon]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useCart yalnızca CartProvider içinde kullanılabilir');
  return v;
}
