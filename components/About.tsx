"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Eye, Target } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { HdImage } from "./HdImage";
import { useSite } from "./SiteProvider";
import { Reveal, SplitWords, rise, stagger } from "./motion";

export function Marquee() {
  const { equipment } = useSite();
  const items = [...equipment, ...equipment];
  return (
    <div className="relative overflow-hidden border-y border-ink-900/8 bg-ink-950 py-5 text-white">
      <div className="flex w-max animate-marquee gap-10 hover:[animation-play-state:paused]">
        {items.map((e, i) => (
          <Link key={i} href={`/fleet/${e.slug}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="display text-2xl text-white/90 transition hover:text-brand-300 sm:text-3xl">{e.name}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5 text-brand-400" aria-hidden>
              <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </Link>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-950" />
    </div>
  );
}

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" className="slash-bg relative overflow-hidden py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow eyebrow-dash">Welcome to HYGERX · Your partner in progress</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] text-ink-950">
            <SplitWords text="The right machinery" />
            <br />
            <SplitWords text="for a stronger" delay={0.15} /> <SplitWords text="tomorrow" className="text-brand-600" delay={0.3} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-7 text-lg leading-relaxed text-ink-600">
              <strong className="font-bold text-ink-900">HYGERX Heavy Equipment Rental L.L.C</strong> is your reliable partner for heavy
              machinery solutions in the region. We provide a wide range of heavy equipment for both short-term and long-term rental,
              tailored to support projects of any scale.
            </p>
            <p className="mt-4 leading-relaxed text-ink-600">
              Centrally located in Dubai, we deliver high-quality, well-maintained machinery so your construction, industrial and
              infrastructure projects run smoothly and efficiently.
            </p>
          </Reveal>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="mt-10 grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                body: "To provide reliable, safe and efficient heavy equipment rental solutions that empower our clients to build the future with confidence.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                body: "To be the leading and most trusted heavy equipment rental provider across the UAE and the broader GCC region.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <motion.div
                key={title}
                variants={rise}
                whileHover={{ y: -6 }}
                className="card group relative overflow-hidden p-6"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand-500/10 transition-transform duration-700 group-hover:scale-[2.6]" />
                <div className="relative grid h-12 w-12 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="relative mt-5 text-xl font-extrabold text-brand-700">{title}</h3>
                <div className="relative mt-2 h-0.5 w-8 bg-brand-500" />
                <p className="relative mt-3 text-sm leading-relaxed text-ink-600">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div ref={ref} className="relative lg:sticky lg:top-28 lg:col-span-6 lg:self-start">
          <Reveal className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-ink-900/20" y={50}>
            <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
              <HdImage name="about-section" alt="Dubai skyline with construction cranes" sizes="(min-width: 1024px) 800px, 500px" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-200">Strong equipment</p>
              <p className="display mt-2 text-3xl text-white sm:text-4xl">Stronger tomorrow</p>
            </div>
          </Reveal>
          <motion.div
            aria-hidden
            className="absolute -left-6 -top-6 hidden h-24 w-24 animate-float rounded-3xl border-4 border-brand-500/30 lg:block"
          />
        </div>
      </div>
    </section>
  );
}
