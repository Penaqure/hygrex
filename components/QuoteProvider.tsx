"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useSite } from "./SiteProvider";

type Item = { slug: string; qty: number };

type QuoteCtx = {
  items: Item[];
  count: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  has: (slug: string) => boolean;
  clear: () => void;
  toast: string | null;
};

const Ctx = createContext<QuoteCtx | null>(null);
const KEY = "hygerx-quote";

export function QuoteProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const { getEquipment } = useSite();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      // A saved list can name machines that have since been hidden or removed.
      if (raw) setItems((JSON.parse(raw) as Item[]).filter((i) => getEquipment(i.slug)));
    } catch {}
    setReady(true);
  }, [getEquipment]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const add = useCallback((slug: string) => {
    setItems((prev) =>
      prev.some((i) => i.slug === slug)
        ? prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { slug, qty: 1 }],
    );
    setToast(slug);
  }, []);

  const remove = useCallback((slug: string) => setItems((p) => p.filter((i) => i.slug !== slug)), []);
  const setQty = useCallback(
    (slug: string, qty: number) =>
      setItems((p) => (qty <= 0 ? p.filter((i) => i.slug !== slug) : p.map((i) => (i.slug === slug ? { ...i, qty } : i)))),
    [],
  );

  const value = useMemo<QuoteCtx>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.qty, 0),
      open,
      setOpen,
      add,
      remove,
      setQty,
      has: (slug) => items.some((i) => i.slug === slug),
      clear: () => setItems([]),
      toast,
    }),
    [items, open, add, remove, setQty, toast],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useQuote() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useQuote must be used inside QuoteProvider");
  return c;
}
