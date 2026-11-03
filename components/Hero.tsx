"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { equipment } from "@/lib/data";
import { HdImage } from "./HdImage";
import { Counter, ease } from "./motion";

const words = ["Rent", "Build", "Move", "Grow"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setW((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#f1f6fd] pt-[72px] xl:min-h-[max(100svh,62.5vw)]">
      <motion.div style={{ y: textY, opacity: fade }} className="container-x relative z-10 flex-1 pt-8 sm:pt-12 xl:pt-8">
        <div className="lg:max-w-[75%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/20 bg-white/70 px-3.5 py-1.5 text-xs font-bold text-brand-700 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-brand-500" />
            </span>
            Heavy equipment rental · Dubai, UAE
          </motion.p>

          <h1 className="display text-[clamp(2.6rem,5vw,5.2rem)] text-ink-950">
            {["Powering", "your projects"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease, delay: 0.15 + i * 0.12 }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block bg-gradient-to-r from-brand-700 via-brand-500 to-brand-400 bg-clip-text text-transparent"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease, delay: 0.39 }}
              >
                forward
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-6 max-w-xl"
          >
            <p className="text-base leading-relaxed text-ink-600 sm:text-lg">
              Reliable, inspection-ready cranes, excavators, loaders and more — on short-term or long-term rental, delivered
              across the UAE.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/fleet" className="btn-primary group">
                Explore the fleet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/contact" className="btn-ghost">
                Request a quote
              </Link>
            </div>
          </motion.div>
        </div>

      </motion.div>

      {/* Rent · Build · Move · Grow ticker */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.9 }}
        className="absolute right-8 top-[120px] z-10 hidden lg:block xl:right-[26vw]"
      >
        <div className="text-right">
          <p className="eyebrow text-ink-500">We help you</p>
          <div className="relative mt-2 h-16 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={words[w]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease }}
                className="display block text-6xl text-brand-600"
              >
                {words[w]}
              </motion.span>
            </AnimatePresence>
          </div>
          <div className="mt-3 flex justify-end gap-1.5">
            {words.map((x, i) => (
              <span key={x} className={`h-1 rounded-full transition-all duration-500 ${i === w ? "w-8 bg-brand-500" : "w-3 bg-ink-900/15"}`} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Equipment lineup */}
      <div className="relative mt-6 aspect-[16/10] w-full xl:absolute xl:inset-0 xl:-z-10 xl:mt-0 xl:aspect-auto">
        <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease }}
            className="absolute inset-0"
          >
            <HdImage
              name="hero"
              alt="HYGERX equipment lineup: mobile crane, crawler crane, excavator, wheel loader, skid steer, backhoe loader and telehandler"
              priority
              position="50% 100%"
            />
          </motion.div>
        </motion.div>
      </div>

      {/* stat bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 1.1 }}
        className="relative z-10 bg-ink-950 py-4 xl:absolute xl:inset-x-0 xl:bottom-4 xl:bg-transparent xl:py-0"
      >
        <div className="container-x">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 text-white backdrop-blur-xl sm:grid-cols-4">
            <Stat value={<Counter to={equipment.length} />} label="Equipment categories" />
            <Stat value={<Counter to={500} suffix="T" />} label="Max crane capacity" />
            <Stat value={<Counter to={60} suffix="T" />} label="Largest excavator" />
            <div className="hidden items-center gap-3 bg-ink-950/30 px-5 py-4 sm:flex">
              <div className="space-y-1.5 text-xs font-semibold text-white/85">
                <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brand-300" /> Inspection-ready</p>
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-300" /> Delivered UAE-wide</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ value, label }: { value: React.ReactNode; label: string }) {
  return (
    <div className="bg-ink-950/30 px-4 py-4 sm:px-5">
      <p className="display text-2xl sm:text-4xl">{value}</p>
      <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 sm:text-[11px]">{label}</p>
    </div>
  );
}
