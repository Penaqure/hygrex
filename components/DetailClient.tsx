"use client";

import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
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

export function DetailHeroImage({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#d9e7fa] to-[#eef3fa] shadow-2xl shadow-ink-900/20"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </motion.div>
  );
}
