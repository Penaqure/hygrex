"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ClipboardList, Mail, Minus, Plus, Trash2, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { emirates, getEquipment } from "@/lib/data";
import { buildMessage, durations, mailLink, whatsappLink } from "@/lib/enquiry";
import { HdImage } from "./HdImage";
import { WhatsAppIcon } from "./Logo";
import { useQuote } from "./QuoteProvider";
import { ease } from "./motion";

export function QuoteDrawer() {
  const { open, setOpen, items, setQty, remove, clear, count } = useQuote();
  const [f, setF] = useState({ name: "", company: "", phone: "", emirate: "Dubai", start: "", duration: "Weekly", operator: "Not sure", notes: "" });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setOpen]);

  const valid = f.name.trim() && f.phone.trim() && items.length > 0;
  const msg = buildMessage({ ...f, items });
  const waHref = whatsappLink(msg);
  const mailHref = mailLink(msg);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const go = (href: string) => (e: React.MouseEvent) => {
    setTouched(true);
    if (!valid) {
      e.preventDefault();
      return;
    }
    window.open(href, href.startsWith("mailto") ? "_self" : "_blank", "noopener");
    e.preventDefault();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink-950/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Your quote list"
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease }}
          >
            <header className="flex items-center justify-between border-b border-ink-900/8 px-6 py-5">
              <div>
                <p className="eyebrow">Quote builder</p>
                <h2 className="mt-1 text-xl font-extrabold">
                  Your list <span className="text-ink-500">({count})</span>
                </h2>
              </div>
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-steel hover:bg-brand-50" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <div className="grid place-items-center py-16 text-center">
                  <div className="grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <ClipboardList className="h-8 w-8" />
                  </div>
                  <p className="mt-4 font-bold">Your quote list is empty</p>
                  <p className="mt-1 text-sm text-ink-500">Add machines from the fleet to get started.</p>
                  <Link href="/fleet" onClick={() => setOpen(false)} className="btn-primary mt-6">
                    Browse the fleet
                  </Link>
                </div>
              ) : (
                <>
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((i) => {
                        const e = getEquipment(i.slug);
                        if (!e) return null;
                        return (
                          <motion.li
                            key={i.slug}
                            layout
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -30, height: 0, marginTop: 0 }}
                            className="flex items-center gap-3 rounded-2xl border border-ink-900/8 p-2.5"
                          >
                            <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-xl bg-steel">
                              <HdImage name={e.image} sizes="64px" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-bold">{e.name}</p>
                              <p className="text-xs text-brand-600">{e.capacity}</p>
                            </div>
                            <div className="flex items-center rounded-full bg-steel">
                              <button className="grid h-8 w-8 place-items-center" onClick={() => setQty(i.slug, i.qty - 1)} aria-label="Decrease">
                                <Minus className="h-3.5 w-3.5" />
                              </button>
                              <span className="w-5 text-center text-sm font-bold">{i.qty}</span>
                              <button className="grid h-8 w-8 place-items-center" onClick={() => setQty(i.slug, i.qty + 1)} aria-label="Increase">
                                <Plus className="h-3.5 w-3.5" />
                              </button>
                            </div>
                            <button onClick={() => remove(i.slug)} className="p-1.5 text-ink-500 hover:text-red-600" aria-label={`Remove ${e.name}`}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>
                  <button onClick={clear} className="mt-3 text-xs font-bold text-ink-500 hover:text-red-600">
                    Clear list
                  </button>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div>
                      <label className="label">Rental period</label>
                      <select className="field" value={f.duration} onChange={set("duration")}>
                        {durations.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Start date</label>
                      <input type="date" className="field" value={f.start} onChange={set("start")} />
                    </div>
                    <div>
                      <label className="label">Site location</label>
                      <select className="field" value={f.emirate} onChange={set("emirate")}>
                        {emirates.map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Operator</label>
                      <select className="field" value={f.operator} onChange={set("operator")}>
                        {["Needed", "Not needed", "Not sure"].map((d) => (
                          <option key={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="label">Name *</label>
                      <input className="field" value={f.name} onChange={set("name")} autoComplete="name" />
                    </div>
                    <div>
                      <label className="label">Phone *</label>
                      <input className="field" value={f.phone} onChange={set("phone")} type="tel" autoComplete="tel" />
                    </div>
                    <div className="col-span-2">
                      <label className="label">Company</label>
                      <input className="field" value={f.company} onChange={set("company")} autoComplete="organization" />
                    </div>
                    <div className="col-span-2">
                      <label className="label">Notes</label>
                      <textarea className="field min-h-20" value={f.notes} onChange={set("notes")} placeholder="Site details, lift weights, access…" />
                    </div>
                  </div>
                  {touched && !valid && <p className="mt-3 text-sm font-semibold text-red-600">Please add your name and phone number.</p>}
                </>
              )}
            </div>

            {items.length > 0 && (
              <footer className="grid grid-cols-2 gap-2 border-t border-ink-900/8 p-4">
                <a href={waHref} onClick={go(waHref)} className="btn bg-[#1faa53] text-white hover:bg-[#178c44]">
                  <WhatsAppIcon /> WhatsApp
                </a>
                <a href={mailHref} onClick={go(mailHref)} className="btn-primary">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </footer>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
