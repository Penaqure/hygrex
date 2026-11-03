"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Info, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getEquipment } from "@/lib/data";
import { HdImage } from "./HdImage";
import { useQuote } from "./QuoteProvider";
import { Reveal, SplitWords, ease } from "./motion";

type Ground = "firm" | "soft";
type Pattern = "multi" | "single";
type Job = "heavy" | "materials";

const MAX = 600;

export function CraneFinder() {
  const [load, setLoad] = useState(80);
  const [ground, setGround] = useState<Ground>("firm");
  const [pattern, setPattern] = useState<Pattern>("multi");
  const [job, setJob] = useState<Job>("heavy");
  const { add } = useQuote();

  const result = useMemo(() => {
    if (job === "materials")
      return {
        slug: "telehandlers",
        why: "For placing palletised materials up and out — floors, roofs, over obstacles — a telehandler is usually faster and leaner than a crane.",
      };
    if (load > 500)
      return {
        slug: null,
        why: "Above our standard 500 T range. Share your lift details and our team will advise on the best approach.",
      };
    if (load > 400)
      return {
        slug: "mobile-cranes",
        why:
          ground === "soft"
            ? "Over 400 T points to our largest mobile cranes. Soft ground will need assessment and preparation — our team will review your site."
            : "Over 400 T is beyond our crawler range, so a large mobile crane is the fit.",
      };
    if (ground === "soft" || pattern === "single")
      return {
        slug: "crawler-cranes",
        why:
          ground === "soft"
            ? "Tracks spread the load on soft or uneven ground — crawler cranes give the stability you need."
            : "For long-duration lifting on one site, a crawler crane is the steady, cost-effective workhorse.",
      };
    return {
      slug: "mobile-cranes",
      why: "Firm access and lifts across several locations — a road-going mobile crane sets up fast and moves between sites easily.",
    };
  }, [load, ground, pattern, job]);

  const eq = result.slug ? getEquipment(result.slug) : null;
  const pct = (v: number) => `${(v / MAX) * 100}%`;

  return (
    <section id="crane-finder" className="relative overflow-hidden bg-ink-950 py-24 text-white sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-60" aria-hidden />
      <div className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-brand-600/30 blur-[120px]" aria-hidden />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-brand-300 eyebrow-dash">New · Interactive tool</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)]">
            <SplitWords text="Crane" /> <SplitWords text="finder" className="text-brand-400" delay={0.1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-white/70">Answer three quick questions to see which machine fits your lift.</p>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12">
          {/* Controls */}
          <Reveal className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-8 lg:col-span-7">
            <Toggle
              label="What are you lifting?"
              value={job}
              onChange={setJob}
              options={[
                { v: "heavy", l: "Heavy single loads" },
                { v: "materials", l: "Materials to height" },
              ]}
            />

            <AnimatePresence initial={false}>
              {job === "heavy" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease }}
                  className="overflow-hidden"
                >
                  <div className="pt-8">
                    <div className="flex items-end justify-between">
                      <span className="label text-white/60">Heaviest load</span>
                      <span className="display text-4xl text-brand-300">
                        {load}
                        <span className="ml-1 text-xl text-white/60">T</span>
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={MAX}
                      value={load}
                      onChange={(e) => setLoad(+e.target.value)}
                      className="mt-4 w-full accent-brand-500"
                      aria-label="Heaviest load in tonnes"
                    />

                    {/* Capacity range chart */}
                    <div className="mt-6 space-y-3 text-xs font-semibold">
                      {[
                        { n: "Mobile cranes", a: 25, b: 500, on: result.slug === "mobile-cranes" },
                        { n: "Crawler cranes", a: 55, b: 400, on: result.slug === "crawler-cranes" },
                      ].map((r) => (
                        <div key={r.n} className="flex items-center gap-3">
                          <span className={`w-28 shrink-0 ${r.on ? "text-white" : "text-white/50"}`}>{r.n}</span>
                          <div className="relative h-3 flex-1 rounded-full bg-white/8">
                            <motion.div
                              className={`absolute inset-y-0 rounded-full ${r.on ? "bg-brand-500" : "bg-white/20"}`}
                              style={{ left: pct(r.a), width: pct(r.b - r.a) }}
                              layout
                            />
                            <motion.div
                              className="absolute -top-1 h-5 w-0.5 rounded bg-amber"
                              animate={{ left: pct(Math.min(load, MAX)) }}
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          </div>
                          <span className="w-16 shrink-0 text-right text-white/50">
                            {r.a}–{r.b} T
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-6 sm:grid-cols-2">
                      <Toggle
                        label="Ground conditions"
                        value={ground}
                        onChange={setGround}
                        options={[
                          { v: "firm", l: "Firm / paved" },
                          { v: "soft", l: "Soft / uneven" },
                        ]}
                      />
                      <Toggle
                        label="Lifting pattern"
                        value={pattern}
                        onChange={setPattern}
                        options={[
                          { v: "multi", l: "Several locations" },
                          { v: "single", l: "One site, long term" },
                        ]}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-8 flex gap-2 text-xs leading-relaxed text-white/50">
              <Info className="mt-0.5 h-4 w-4 shrink-0" />
              Indicative only. Final crane selection depends on lift radius, boom length and site conditions — our team confirms against
              your lift plan.
            </p>
          </Reveal>

          {/* Result */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="relative h-full overflow-hidden rounded-3xl bg-white text-ink-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={(result.slug ?? "none") + result.why}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease }}
                  className="flex h-full flex-col"
                >
                  <div className="relative aspect-[16/10] bg-gradient-to-b from-[#d9e7fa] to-[#eef3fa]">
                    {eq ? (
                      <HdImage name={eq.image} alt={eq.name} sizes="(min-width:1024px) 40vw, 100vw" />
                    ) : (
                      <div className="grid h-full place-items-center">
                        <p className="display text-6xl text-brand-600/30">500T+</p>
                      </div>
                    )}
                    <span className="absolute left-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      Recommended
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-2xl font-extrabold">{eq ? eq.name : "Specialist lift"}</h3>
                    {eq && <p className="font-bold text-brand-600">{eq.capacity}</p>}
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">{result.why}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {eq ? (
                        <>
                          <button onClick={() => add(eq.slug)} className="btn-primary flex-1">
                            <Plus className="h-4 w-4" /> Add to quote
                          </button>
                          <Link href={`/fleet/${eq.slug}`} className="btn-ghost">
                            Details
                          </Link>
                        </>
                      ) : (
                        <Link href="/contact" className="btn-primary flex-1">
                          Talk to our team <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Toggle<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { v: T; l: string }[];
}) {
  return (
    <div>
      <span className="label text-white/60">{label}</span>
      <div className="mt-1 grid grid-cols-2 gap-1 rounded-2xl bg-white/[0.06] p-1">
        {options.map((o) => (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            aria-pressed={value === o.v}
            className={`relative rounded-xl px-3 py-2.5 text-sm font-bold transition-colors ${value === o.v ? "text-white" : "text-white/55 hover:text-white"}`}
          >
            {value === o.v && (
              <motion.span layoutId={`tg-${label}`} className="absolute inset-0 rounded-xl bg-brand-600" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
            )}
            <span className="relative">{o.l}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
