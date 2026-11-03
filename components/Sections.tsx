"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ClipboardList, Handshake, HardHat, MapPin, Minus, Plus, Send, ShieldCheck, Truck, Users, Wrench } from "lucide-react";
import { useRef, useState } from "react";
import { emirates, faqs } from "@/lib/data";
import { HdImage } from "./HdImage";
import { Reveal, SplitWords, ease, rise, stagger } from "./motion";

/* ---------------- Why choose ---------------- */
const pillars = [
  { icon: ShieldCheck, title: "Reliable Equipment", body: "Well-maintained and inspection-ready." },
  { icon: Wrench, title: "Local Expertise", body: "On-ground support across the UAE." },
  { icon: Handshake, title: "Flexible Rental Options", body: "Short-term and long-term terms." },
  { icon: Users, title: "Your Success, Our Priority", body: "Committed to building together." },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-900 to-ink-950 py-24 text-white sm:py-32">
      <div className="grid-lines absolute inset-0 opacity-40" aria-hidden />
      <div className="absolute inset-y-0 right-0 hidden w-[40%] [mask-image:linear-gradient(to_right,transparent,black_70%)] lg:block" aria-hidden>
        <HdImage name="why-us" sizes="(min-width: 2000px) 2200px, 1200px" position="35% 75%" className="opacity-40 mix-blend-luminosity" />
      </div>

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow text-brand-300 eyebrow-dash">Stronger projects together</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)]">
            <SplitWords text="Why choose" /> <SplitWords text="HYGERX?" className="text-brand-300" delay={0.15} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-white/75">
              We combine top-tier machinery with local expertise. Strict maintenance, transparency and rigorous inspections mean you invest
              in equipment that powers your project&apos;s success.
            </p>
          </Reveal>
        </div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {pillars.map(({ icon: Icon, title, body }, i) => (
            <motion.li key={title} variants={rise} className="group relative bg-brand-900/70 p-7 backdrop-blur transition-colors duration-500 hover:bg-brand-700/80">
              <span className="absolute right-6 top-6 font-display text-sm font-bold text-white/25">0{i + 1}</span>
              <motion.div
                whileHover={{ rotate: -8, scale: 1.08 }}
                className="grid h-14 w-14 place-items-center rounded-2xl border border-white/20 bg-white/5 text-brand-200 transition group-hover:border-white/50 group-hover:text-white"
              >
                <Icon className="h-7 w-7" strokeWidth={1.6} />
              </motion.div>
              <h3 className="mt-6 text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm text-white/65">{body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */
const steps = [
  { icon: ClipboardList, title: "Build your list", body: "Pick machines from the fleet and add them to your quote list in one tap." },
  { icon: Send, title: "Send your enquiry", body: "Share dates, site location and needs by WhatsApp or email — straight from the site." },
  { icon: Truck, title: "We deliver", body: "Inspection-ready equipment delivered to your site anywhere in the UAE." },
  { icon: HardHat, title: "Build with support", body: "On-ground support for the length of your rental, short or long term." },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const line = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <Reveal>
            <p className="eyebrow eyebrow-dash">How it works</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(2.2rem,5vw,4rem)] text-ink-950">
            <SplitWords text="From enquiry" /> <SplitWords text="to site" className="text-brand-600" delay={0.15} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg leading-relaxed text-ink-600">Reliable equipment. Flexible solutions. Real progress — in four simple steps.</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative lg:col-span-7">
          <div className="absolute bottom-6 left-[27px] top-6 w-0.5 bg-ink-900/10" aria-hidden />
          <motion.div className="absolute bottom-6 left-[27px] top-6 w-0.5 origin-top bg-brand-500" style={{ scaleY: line }} aria-hidden />
          <ol className="space-y-6">
            {steps.map(({ icon: Icon, title, body }, i) => (
              <Reveal as="li" key={title} delay={i * 0.05} className="relative flex gap-6">
                <div className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 shadow-lg shadow-ink-900/10 ring-1 ring-ink-900/8">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="card flex-1 p-6 transition hover:-translate-y-1 hover:shadow-xl">
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">Step 0{i + 1}</p>
                  <h3 className="mt-2 text-xl font-extrabold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Coverage ---------------- */
export function Coverage() {
  return (
    <section className="relative overflow-hidden bg-sky-tint py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow eyebrow-dash">Service area</p>
            <h2 className="display mt-6 text-[clamp(2rem,4vw,3.2rem)] text-ink-950">
              Based in Dubai.
              <br />
              <span className="text-brand-600">Delivering UAE-wide.</span>
            </h2>
            <p className="mt-4 text-ink-600">Centrally located for fast delivery to sites in every emirate — with our sights set on the wider GCC.</p>
          </Reveal>
        </div>
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 lg:col-span-7 lg:justify-end"
        >
          {emirates.map((e, i) => (
            <motion.li
              key={e}
              variants={rise}
              whileHover={{ y: -4 }}
              className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-sm ${
                i === 0 ? "bg-brand-600 text-white shadow-brand-600/30" : "border border-ink-900/8 bg-white text-ink-800"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                {i === 0 && <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />}
                <MapPin className={`h-2.5 w-2.5 ${i === 0 ? "text-white" : "text-brand-500"}`} />
              </span>
              {e}
              {i === 0 && <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-wider">HQ</span>}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="eyebrow eyebrow-dash">FAQ</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(2rem,3.6vw,3.2rem)] text-ink-950">
            <SplitWords text="Good" /> <SplitWords text="questions" className="text-brand-600" delay={0.1} />
          </h2>
        </div>
        <div className="divide-y divide-ink-900/10 border-y border-ink-900/10 lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`text-lg font-bold transition-colors sm:text-xl ${isOpen ? "text-brand-700" : "text-ink-900"}`}>{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${isOpen ? "bg-brand-600 text-white" : "bg-steel text-ink-900"}`}
                  >
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-6 leading-relaxed text-ink-600">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
