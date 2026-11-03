"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import type { HdImageName } from "@/lib/hd-images";
import { HdImage } from "./HdImage";
import { useQuote } from "./QuoteProvider";

export function AddToQuoteButton({ slug, className = "btn-primary" }: { slug: string; className?: string }) {
  const { add, has } = useQuote();
  const added = has(slug);
  return (
    <motion.button whileTap={{ scale: 0.95 }} onClick={() => add(slug)} className={className}>
      {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
      {added ? "Added — add another" : "Add to quote"}
    </motion.button>
  );
}

export function DetailHeroImage({ name, alt }: { name: HdImageName; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#d9e7fa] to-[#eef3fa] shadow-2xl shadow-ink-900/20"
    >
      <HdImage name={name} alt={alt} priority sizes="(min-width: 1024px) 50vw, 100vw" />
    </motion.div>
  );
}
