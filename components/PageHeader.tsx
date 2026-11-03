import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { HdImageName } from "@/lib/hd-images";
import { HdImage } from "./HdImage";
import { Reveal } from "./motion";

export function PageHeader({
  eyebrow,
  title,
  intro,
  image = "banner-about",
  position = "50% 60%",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: HdImageName;
  position?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-950 pb-16 pt-[136px] text-white sm:pb-20 sm:pt-[160px]">
      {/* The band is taller than the photo's shape on phones, so it needs a wider file than the screen width. */}
      <HdImage name={image} priority sizes="(max-width: 767px) 900px, 100vw" position={position} className="-z-20" />
      {/* Darkens only behind the text and navbar, leaving the rest of the photo at full strength. */}
      <div className="absolute inset-0 -z-10 max-md:bg-ink-950/65 md:bg-gradient-to-r md:from-ink-950/90 md:via-ink-950/50 md:to-transparent" aria-hidden />
      <div className="absolute inset-x-0 top-0 -z-10 h-28 bg-gradient-to-b from-ink-950/70 to-transparent" aria-hidden />
      <div className="container-x">
        <Reveal>
          <p className="eyebrow eyebrow-dash text-brand-300">{eyebrow}</p>
          <h1 className="display mt-6 max-w-3xl text-[clamp(2.6rem,6vw,5rem)]">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/75">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Ready to build together?",
  body = "Tell us your dates and site, and our team will come back with availability and pricing.",
  secondary = { href: "/fleet", label: "Browse the fleet" },
}: {
  title?: string;
  body?: string;
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="py-20">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-3xl bg-brand-700 p-8 text-white sm:p-12">
          <div className="grid-lines absolute inset-0" aria-hidden />
          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="display text-3xl sm:text-4xl">{title}</h2>
              <p className="mt-3 text-white/75">{body}</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <Link href="/contact" className="btn bg-white text-brand-700 hover:bg-brand-50">
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={secondary.href} className="btn border border-white/30 text-white hover:bg-white/10">
                {secondary.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
