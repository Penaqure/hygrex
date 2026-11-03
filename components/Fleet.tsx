"use client";

import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Check, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { categories, equipment, type Category, type Equipment } from "@/lib/data";
import { HdImage } from "./HdImage";
import { useQuote } from "./QuoteProvider";
import { Reveal, SplitWords, ease } from "./motion";

export function Fleet() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");

  const list = useMemo(
    () =>
      equipment.filter(
        (e) =>
          (cat === "all" || e.category === cat) &&
          (q.trim() === "" || `${e.name} ${e.summary} ${e.applications.join(" ")}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, q],
  );

  return (
    <section id="fleet" className="relative bg-sky-tint py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow eyebrow-dash">Complete machinery solutions</p>
            </Reveal>
            <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] text-ink-950">
              <SplitWords text="Equipment for" /> <SplitWords text="every challenge" className="text-brand-600" delay={0.2} />
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">
                From earthmoving to high-rise construction — stability, height or power — the right certified machine, ready for delivery
                across the UAE.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="w-full lg:w-80">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search e.g. trenching, lifting…"
                className="field rounded-full pl-11"
                aria-label="Search equipment"
              />
            </label>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="inline-flex flex-wrap gap-1 rounded-full border border-ink-900/8 bg-white p-1.5 shadow-sm" role="tablist">
            {categories.map((c) => {
              const active = cat === c.id;
              const n = c.id === "all" ? equipment.length : equipment.filter((e) => e.category === c.id).length;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCat(c.id)}
                  className={`relative rounded-full px-4 py-2 text-sm font-bold transition-colors ${active ? "text-white" : "text-ink-600 hover:text-ink-900"}`}
                >
                  {active && (
                    <motion.span layoutId="fleet-pill" className="absolute inset-0 rounded-full bg-brand-600" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                  )}
                  <span className="relative">
                    {c.label} <span className={active ? "text-white/70" : "text-ink-500/60"}>{n}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <motion.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((e, i) => (
              <motion.li
                key={e.slug}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{ duration: 0.6, ease, delay: i * 0.05 }}
              >
                <FleetCard e={e} />
              </motion.li>
            ))}
            {cat === "all" && q === "" && (
              <motion.li key="cta" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="sm:col-span-2 lg:col-span-2">
                <FleetCta />
              </motion.li>
            )}
          </AnimatePresence>
        </motion.ul>

        {list.length === 0 && (
          <p className="mt-10 rounded-2xl border border-dashed border-ink-900/15 p-10 text-center text-ink-500">
            No matches for “{q}”. Try another term — or <Link href="/contact" className="font-bold text-brand-600 underline">ask our team</Link>.
          </p>
        )}
      </div>
    </section>
  );
}

/** The catalog on the home page, without search or filters. */
export function FleetPreview() {
  return (
    <section className="relative bg-sky-tint py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <p className="eyebrow eyebrow-dash">Complete machinery solutions</p>
            </Reveal>
            <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] text-ink-950">
              <SplitWords text="Equipment for" /> <SplitWords text="every challenge" className="text-brand-600" delay={0.2} />
            </h2>
          </div>
          <Reveal delay={0.1} className="shrink-0">
            <Link href="/fleet" className="btn-ghost">
              View the full fleet <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {equipment.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={i * 0.05}>
              <FleetCard e={e} />
            </Reveal>
          ))}
          <Reveal as="li" className="sm:col-span-2 lg:col-span-2">
            <FleetCta />
          </Reveal>
        </ul>
      </div>
    </section>
  );
}

function FleetCta() {
  return (
    <div className="relative flex h-full min-h-72 flex-col justify-between overflow-hidden rounded-3xl bg-brand-700 p-8 text-white sm:p-10">
      <div className="grid-lines absolute inset-0" aria-hidden />
      <svg viewBox="0 0 24 24" className="absolute -right-10 -top-10 h-64 w-64 text-white/10" aria-hidden>
        <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="relative">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-200">The right equipment for every challenge</p>
        <h3 className="display mt-4 max-w-md text-3xl sm:text-4xl">Need a specific model or capacity?</h3>
        <p className="mt-3 max-w-md text-white/75">Tell us your project and our team will match the right machine — short-term or long-term.</p>
      </div>
      <div className="relative mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="btn bg-white text-brand-700 hover:bg-brand-50">Talk to our team</Link>
        <Link href="/crane-finder" className="btn border border-white/30 text-white hover:bg-white/10">Try the Crane Finder</Link>
      </div>
    </div>
  );
}

function FleetCard({ e }: { e: Equipment }) {
  const { add, has } = useQuote();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, (v) => `${v * 100}%`);
  const glowY = useTransform(my, (v) => `${v * 100}%`);
  const glow = useTransform([glowX, glowY], ([x, y]) => `radial-gradient(400px circle at ${x} ${y}, rgba(76,130,251,0.14), transparent 45%)`);
  const added = has(e.slug);

  return (
    <motion.div
      ref={ref}
      onPointerMove={(ev) => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((ev.clientX - r.left) / r.width);
        my.set((ev.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      className="card group relative flex h-full flex-col overflow-hidden"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#d9e7fa] to-[#eef3fa]">
        <HdImage
          name={e.image}
          alt={e.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]"
        />
        <div className="absolute left-0 top-0 flex h-14 w-14 items-start justify-start bg-brand-700 p-3 [clip-path:polygon(0_0,100%_0,100%_60%,60%_100%,0_100%)]">
          <span className="display text-lg text-white">{e.no}</span>
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-700 backdrop-blur">
          {e.category}
        </span>
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-ink-500">{e.tagline}</p>
        <h3 className="mt-2 text-2xl font-extrabold text-ink-950">{e.name}</h3>
        <p className="mt-1 font-bold text-brand-600">{e.capacity}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-600">{e.summary}</p>

        <div className="mt-auto flex items-center gap-2 pt-6">
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => add(e.slug)}
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-bold transition-colors ${
              added ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20" : "bg-ink-900 text-white hover:bg-brand-600"
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={added ? "y" : "n"}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {added ? "Added — add another" : "Add to quote"}
              </motion.span>
            </AnimatePresence>
          </motion.button>
          <Link
            href={`/fleet/${e.slug}`}
            aria-label={`${e.name} details`}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink-900/12 text-ink-900 transition hover:border-brand-500 hover:bg-brand-500 hover:text-white"
          >
            <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
