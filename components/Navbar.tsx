"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { ClipboardList, Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company } from "@/lib/data";
import { Logo } from "./Logo";
import { useQuote } from "./QuoteProvider";
import { ease } from "./motion";

const links = [
  { href: "/about", label: "About" },
  { href: "/fleet", label: "Fleet" },
  { href: "/crane-finder", label: "Crane Finder" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useQuote();
  // The static export uses trailing slashes, which the links below don't have.
  const pathname = usePathname().replace(/(.)\/$/, "$1");
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // These pages open on a dark header band, so the bar needs light text until it gains its background.
  // Machine pages and the 404 have light headers, so this must stay an exact match.
  const hasDarkHeader = pathname === "/photo-credits" || links.some((l) => l.href === pathname);
  const onDark = hasDarkHeader && !scrolled && !menu;

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 500 && y > prev && !menu);
  });

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.35, ease }}
      >
        <div
          className={`transition-all duration-500 ${
            scrolled || menu ? "border-b border-ink-900/8 bg-white/80 shadow-[0_10px_30px_-20px_rgba(7,13,31,0.4)] backdrop-blur-xl" : "bg-transparent"
          }`}
        >
          <nav className="container-x flex h-[72px] items-center justify-between gap-4">
            <Logo light={onDark} className="h-8 w-auto sm:h-9" />

            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={`group relative rounded-full px-3.5 py-2 text-[13px] font-semibold transition ${
                      onDark ? "text-white hover:text-brand-200" : isActive(l.href) ? "text-brand-600" : "text-ink-800 hover:text-brand-600"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left rounded bg-brand-500 transition-transform duration-300 group-hover:scale-x-100 ${
                        isActive(l.href) ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a href={company.phones[0].href} className={`hidden items-center gap-2 text-[13px] font-bold xl:flex ${onDark ? "text-white" : "text-ink-800"}`}>
                <Phone className={`h-4 w-4 ${onDark ? "text-brand-300" : "text-brand-600"}`} /> {company.phones[0].label}
              </a>
              <button
                onClick={() => setOpen(true)}
                className="relative inline-flex items-center gap-2 rounded-full bg-ink-900 px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-brand-600"
                aria-label={`Open quote list, ${count} items`}
              >
                <ClipboardList className="h-4 w-4" />
                <span className="hidden sm:inline">Quote list</span>
                <AnimatePresence mode="popLayout">
                  {count > 0 && (
                    <motion.span
                      key={count}
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                      className="grid h-5 min-w-5 place-items-center rounded-full bg-amber px-1 text-[11px] font-extrabold text-ink-950"
                    >
                      {count}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
              <button
                className="grid h-10 w-10 place-items-center rounded-full border border-ink-900/10 bg-white/80 lg:hidden"
                onClick={() => setMenu((m) => !m)}
                aria-label="Toggle menu"
                aria-expanded={menu}
              >
                {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
          <motion.div className="h-[2px] origin-left bg-gradient-to-r from-brand-500 to-brand-300" style={{ scaleX: progress }} />
        </div>
      </motion.header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="fixed inset-0 z-40 bg-ink-950/95 backdrop-blur-lg lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease }}
          >
            <ul className="container-x flex h-full flex-col justify-center gap-2 pt-16">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, ease, duration: 0.5 }}
                >
                  <Link href={l.href} onClick={() => setMenu(false)} className="display block py-2 text-4xl text-white hover:text-brand-300">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 space-y-1 text-brand-200">
                {company.phones.map((p) => (
                  <a key={p.href} href={p.href} className="block text-lg font-semibold">
                    {p.label}
                  </a>
                ))}
                <a href={`mailto:${company.email}`} className="block text-lg font-semibold">
                  {company.email}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
