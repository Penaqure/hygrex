import { ArrowLeft, ArrowUpRight, CheckCircle2, MapPin, ShieldCheck, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToQuoteButton, DetailHeroImage } from "@/components/DetailClient";
import { WhatsAppIcon } from "@/components/Logo";
import { Reveal } from "@/components/motion";
import { equipment, getEquipment } from "@/lib/data";
import { whatsappLink } from "@/lib/enquiry";
import { HdImage } from "@/components/HdImage";

export function generateStaticParams() {
  return equipment.map((e) => ({ slug: e.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEquipment(slug);
  if (!e) return {};
  return {
    title: `${e.name} Rental in Dubai & UAE (${e.capacity})`,
    description: `${e.summary} Short-term and long-term ${e.name.toLowerCase()} rental from HYGERX, delivered across the UAE.`,
    openGraph: { images: [`/images/hd/${e.image}.jpg`] },
  };
}

export default async function EquipmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = equipment.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const e = equipment[idx];
  const related = [...equipment.slice(idx + 1), ...equipment.slice(0, idx)].slice(0, 3);

  return (
    <>
      <section className="slash-bg relative overflow-hidden bg-gradient-to-b from-[#dceafc] to-white pb-20 pt-[110px]">
        <div className="container-x">
          <Link href="/fleet" className="inline-flex items-center gap-2 text-sm font-bold text-ink-600 hover:text-brand-600">
            <ArrowLeft className="h-4 w-4" /> Back to fleet
          </Link>
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <p className="eyebrow eyebrow-dash">
                  {e.no} · {e.tagline}
                </p>
                <h1 className="display mt-6 text-[clamp(2.6rem,6vw,5rem)] text-ink-950">{e.name}</h1>
                <p className="mt-3 text-2xl font-extrabold text-brand-600">{e.capacity}</p>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">{e.summary}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <dl className="mt-8 grid grid-cols-3 gap-3">
                  {e.highlights.map((h) => (
                    <div key={h.label} className="rounded-2xl border border-ink-900/8 bg-white/80 p-4 backdrop-blur">
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink-500">{h.label}</dt>
                      <dd className="mt-1 text-sm font-extrabold sm:text-base">{h.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <AddToQuoteButton slug={e.slug} />
                  <a
                    href={whatsappLink(`Hello HYGERX, I'd like a quote for ${e.name.toLowerCase()} (${e.capacity}).`)}
                    target="_blank"
                    rel="noopener"
                    className="btn bg-[#1faa53] text-white hover:bg-[#178c44]"
                  >
                    <WhatsAppIcon /> Ask on WhatsApp
                  </a>
                </div>
              </Reveal>
            </div>
            <DetailHeroImage name={e.image} alt={e.singular} />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2">
          <Reveal className="card p-8">
            <h2 className="text-2xl font-extrabold">Typical applications</h2>
            <ul className="mt-6 space-y-4">
              {e.applications.map((a) => (
                <li key={a} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  <span className="text-ink-700">{a}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1} className="rounded-3xl bg-ink-950 p-8 text-white">
            <h2 className="text-2xl font-extrabold">Every HYGERX rental</h2>
            <ul className="mt-6 space-y-5">
              {[
                { icon: ShieldCheck, t: "Inspection-ready", d: "Strict maintenance and rigorous inspections before every hire." },
                { icon: Wrench, t: "Local support", d: "On-ground support across the UAE for the length of your rental." },
                { icon: MapPin, t: "UAE-wide delivery", d: "Centrally located in Dubai, delivering to your site." },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-bold">{t}</span>
                    <span className="text-sm text-white/65">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {related.length > 0 && (
      <section className="bg-sky-tint py-20">
        <div className="container-x">
          <h2 className="display text-3xl sm:text-4xl">More from our fleet</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 0.08}>
                <Link href={`/fleet/${r.slug}`} className="card group block overflow-hidden">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <HdImage name={r.image} alt={r.name} sizes="(min-width:768px) 33vw, 100vw" className="transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="font-extrabold">{r.name}</p>
                      <p className="text-sm text-brand-600">{r.capacity}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:rotate-45" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
