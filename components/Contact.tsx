"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Check, Globe, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { emirates } from "@/lib/data";
import { buildMessage, mailLink, whatsappLink } from "@/lib/enquiry";
import { recordEnquiry } from "@/lib/record-enquiry";
import { HdImage } from "./HdImage";
import { Logo, WhatsAppIcon } from "./Logo";
import { useQuote } from "./QuoteProvider";
import { useSite } from "./SiteProvider";
import { Reveal, SplitWords, ease } from "./motion";

export function Contact() {
  const { company, equipment, getEquipment } = useSite();
  const [f, setF] = useState({ name: "", company: "", phone: "", email: "", emirate: "Dubai", equipment: "", notes: "" });
  const [err, setErr] = useState(false);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const send = (via: "wa" | "mail") => {
    if (!f.name.trim() || !f.phone.trim()) return setErr(true);
    setErr(false);
    const enquiry = { ...f, items: f.equipment ? [{ slug: f.equipment, qty: 1 }] : [] };
    const msg = buildMessage(enquiry, getEquipment);
    if (via === "wa") window.open(whatsappLink(msg, company.phones[0].wa), "_blank", "noopener");
    else window.location.href = mailLink(msg, company.email);
    recordEnquiry(enquiry, "contact");
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-white to-[#e4eefc] pt-24 sm:pt-32">
      <div className="container-x relative z-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow eyebrow-dash">Ready to</p>
          </Reveal>
          <h2 className="display mt-6 text-[clamp(2.4rem,4.6vw,4.2rem)] text-brand-700">
            <SplitWords text="Build" /> <SplitWords text="together?" delay={0.1} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-5 text-lg text-ink-600">For rental enquiries, specifications and project support, reach out to our team.</p>
          </Reveal>

          <div className="mt-10 space-y-3">
            {[
              ...company.phones.map((p) => ({ icon: Phone, k: "Call us today", v: p.label, href: p.href })),
              { icon: Mail, k: "Email", v: company.email, href: `mailto:${company.email}` },
              { icon: Globe, k: "Website", v: company.website, href: company.url },
            ].map(({ icon: Icon, k, v, href }, i) => (
              <Reveal key={v} delay={0.05 * i}>
                <a href={href} className="group flex items-center gap-4 rounded-2xl border border-ink-900/8 bg-white/80 p-4 backdrop-blur transition hover:border-brand-500 hover:shadow-lg">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-brand-600 text-white transition group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-bold uppercase tracking-[0.25em] text-ink-500">{k}</span>
                    <span className="block text-lg font-extrabold text-ink-950">{v}</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form onSubmit={(e) => (e.preventDefault(), send("wa"))} className="card p-6 sm:p-9" noValidate>
            <h3 className="text-2xl font-extrabold">Send an enquiry</h3>
            <p className="mt-1 text-sm text-ink-500">Opens WhatsApp or your email app with your details filled in.</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <Field label="Full name *">
                <input className="field" value={f.name} onChange={set("name")} autoComplete="name" />
              </Field>
              <Field label="Company">
                <input className="field" value={f.company} onChange={set("company")} autoComplete="organization" />
              </Field>
              <Field label="Phone *">
                <input className="field" type="tel" value={f.phone} onChange={set("phone")} autoComplete="tel" placeholder="+971" />
              </Field>
              <Field label="Email">
                <input className="field" type="email" value={f.email} onChange={set("email")} autoComplete="email" />
              </Field>
              <Field label="Equipment">
                <select className="field" value={f.equipment} onChange={set("equipment")}>
                  <option value="">Select equipment</option>
                  {equipment.map((e) => (
                    <option key={e.slug} value={e.slug}>
                      {e.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Site location">
                <select className="field" value={f.emirate} onChange={set("emirate")}>
                  {emirates.map((e) => (
                    <option key={e}>{e}</option>
                  ))}
                </select>
              </Field>
              <Field label="Project details" full>
                <textarea className="field min-h-28" value={f.notes} onChange={set("notes")} placeholder="Dates, duration, capacities, site access…" />
              </Field>
            </div>
            <AnimatePresence>
              {err && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-sm font-semibold text-red-600">
                  Please add your name and phone number so we can get back to you.
                </motion.p>
              )}
            </AnimatePresence>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="submit" className="btn bg-[#1faa53] text-white hover:bg-[#178c44]">
                <WhatsAppIcon /> Send via WhatsApp
              </button>
              <button type="button" onClick={() => send("mail")} className="btn-primary">
                <Mail className="h-4 w-4" /> Send via email
              </button>
            </div>
          </form>
        </Reveal>
      </div>

      <div className="relative mt-16 h-[38vh] min-h-[260px]">
        <HdImage name="contact-strip" alt="Dubai skyline at sunset" position="50% 62%" />
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#e4eefc] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink-950 to-transparent" />
        <p className="absolute inset-x-0 bottom-6 text-center text-xs font-semibold uppercase tracking-[0.5em] text-white/85">
          People · Equipment · Progress
        </p>
      </div>
    </section>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="label">{label}</span>
      {children}
    </label>
  );
}

const pages = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/crane-finder", label: "Crane Finder" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const { company, equipment } = useSite();
  return (
    <footer className="bg-ink-950 text-white/70">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light className="h-10 w-auto" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Reliable heavy equipment rental in Dubai and across the UAE. Short-term and long-term rentals tailored to projects of any scale.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.4em] text-brand-300">Built for a stronger tomorrow</p>
        </div>
        <div className="md:col-span-2">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">Company</p>
          <ul className="mt-4 space-y-2 text-sm">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="transition hover:text-white">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">Fleet</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
            {equipment.map((e) => (
              <li key={e.slug}>
                <Link href={`/fleet/${e.slug}`} className="transition hover:text-white">
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white">Contact</p>
          <ul className="mt-4 space-y-2 text-sm">
            {company.phones.map((p) => (
              <li key={p.href}>
                <a href={p.href} className="hover:text-white">
                  {p.label}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-white">
                {company.email}
              </a>
            </li>
            <li>{company.city}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs sm:flex-row">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link href="/photo-credits" className="transition hover:text-white">
              Photo credits
            </Link>
            <span className="uppercase tracking-[0.3em]">{company.tagline}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export function FloatingActions() {
  const [show, setShow] = useState(false);
  const { toast, setOpen } = useQuote();
  const { company, getEquipment } = useSite();
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const added = toast ? getEquipment(toast) : null;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        <AnimatePresence>
          {show && (
            <motion.button
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink-900 shadow-lg ring-1 ring-ink-900/10 hover:text-brand-600"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
        <motion.a
          href={whatsappLink("Hello HYGERX, I have an equipment rental enquiry.", company.phones[0].wa)}
          target="_blank"
          rel="noopener"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, type: "spring", stiffness: 260, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          className="relative grid h-14 w-14 place-items-center rounded-full bg-[#1faa53] text-white shadow-xl shadow-[#1faa53]/40"
          aria-label="Chat on WhatsApp"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#1faa53] opacity-30" />
          <WhatsAppIcon className="relative h-7 w-7" />
        </motion.a>
      </div>

      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 40, x: "-50%" }}
            transition={{ duration: 0.4, ease }}
            className="fixed bottom-6 left-1/2 z-50 flex items-center gap-3 rounded-full bg-ink-950 py-2 pl-2 pr-2 text-sm text-white shadow-2xl"
            role="status"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-500">
              <Check className="h-4 w-4" />
            </span>
            <span className="font-semibold">{added.singular} added</span>
            <button onClick={() => setOpen(true)} className="rounded-full bg-white/10 px-3 py-1.5 font-bold hover:bg-brand-600">
              View list
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
