"use client";

import { MotionConfig } from "framer-motion";
import type { Company, NumberedEquipment } from "@/lib/data";
import { QuoteProvider } from "./QuoteProvider";
import { SiteProvider } from "./SiteProvider";

export function Providers({ company, equipment, children }: { company: Company; equipment: NumberedEquipment[]; children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteProvider company={company} equipment={equipment}>
        <QuoteProvider>{children}</QuoteProvider>
      </SiteProvider>
    </MotionConfig>
  );
}
