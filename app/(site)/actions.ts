"use server";

import type { Enquiry } from "@/lib/enquiry";
import { allow } from "@/lib/rate-limit";
import { addEnquiry, getPublishedFleet } from "@/lib/store";

const text = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "") || undefined;

export async function submitEnquiry(e: Enquiry, source: "quote" | "contact") {
  const name = text(e?.name);
  const phone = text(e?.phone, 40);
  if (!name || !phone) return;
  if (!(await allow("enquiry", 10, 60 * 60 * 1000))) return;

  const fleet = await getPublishedFleet();
  const items = (Array.isArray(e.items) ? e.items : []).slice(0, 30).flatMap((i) => {
    const machine = fleet.find((m) => m.slug === i?.slug);
    const qty = Math.min(Math.max(Math.floor(Number(i?.qty)) || 1, 1), 999);
    return machine ? [{ slug: machine.slug, name: machine.name, qty }] : [];
  });

  await addEnquiry({
    source: source === "quote" ? "quote" : "contact",
    name,
    phone,
    company: text(e.company),
    email: text(e.email),
    emirate: text(e.emirate, 40),
    start: text(e.start, 20),
    duration: text(e.duration, 40),
    operator: text(e.operator, 20),
    notes: text(e.notes, 3000),
    items,
  });
}
