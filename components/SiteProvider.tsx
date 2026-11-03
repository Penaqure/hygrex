"use client";

import { createContext, useContext, useMemo } from "react";
import type { Company, NumberedEquipment } from "@/lib/data";

type SiteCtx = {
  company: Company;
  equipment: NumberedEquipment[];
  getEquipment: (slug: string) => NumberedEquipment | undefined;
};

const Ctx = createContext<SiteCtx | null>(null);

export function SiteProvider({ company, equipment, children }: { company: Company; equipment: NumberedEquipment[]; children: React.ReactNode }) {
  const value = useMemo<SiteCtx>(
    () => ({ company, equipment, getEquipment: (slug) => equipment.find((e) => e.slug === slug) }),
    [company, equipment],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSite() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSite must be used inside SiteProvider");
  return c;
}
