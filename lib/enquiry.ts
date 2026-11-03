import type { NumberedEquipment } from "./data";

export type Enquiry = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  emirate?: string;
  start?: string;
  duration?: string;
  operator?: string;
  notes?: string;
  items?: { slug: string; qty: number }[];
};

export const durations = ["Daily", "Weekly", "Monthly", "Long term (3+ months)"];

export function buildMessage(e: Enquiry, getEquipment: (slug: string) => NumberedEquipment | undefined) {
  const lines = ["Hello HYGERX, I'd like a rental quote.", ""];
  if (e.items?.length) {
    lines.push("Equipment:");
    e.items.forEach((i) => lines.push(`• ${i.qty} × ${getEquipment(i.slug)?.singular ?? i.slug}`));
    lines.push("");
  }
  const add = (k: string, v?: string) => v && lines.push(`${k}: ${v}`);
  add("Rental period", e.duration);
  add("Start date", e.start);
  add("Site location", e.emirate);
  add("Operator", e.operator);
  add("Notes", e.notes);
  lines.push("");
  add("Name", e.name);
  add("Company", e.company);
  add("Phone", e.phone);
  add("Email", e.email);
  return lines.join("\n");
}

export const whatsappLink = (text: string, number: string) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const mailLink = (text: string, email: string, subject = "Equipment rental enquiry") =>
  `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
