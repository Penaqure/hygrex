"use client";

import { MotionConfig } from "framer-motion";
import { QuoteProvider } from "./QuoteProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <QuoteProvider>{children}</QuoteProvider>
    </MotionConfig>
  );
}
