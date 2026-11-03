"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/auth";
import { categories, type Category, type EnquiryStatus } from "@/lib/data";
import { allow } from "@/lib/rate-limit";
import { addFaq, addFleet, getAllFleet, getCompany, moveFaqItem, moveFleetItem, removeEnquiry, removeFaq, removeFleet, removeImage, saveCompany, saveImage, setEnquiryStatus, toggleFleet, updateFaq, updateFleetItem } from "@/lib/store";

export type FormState = { error?: string; saved?: boolean } | null;

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

const field = (form: FormData, key: string) => String(form.get(key) ?? "").trim();
const refresh = () => revalidatePath("/", "layout");

/* ---------------- Session ---------------- */
export async function login(_prev: FormState, form: FormData): Promise<FormState> {
  if (!(await allow("login", 5, 15 * 60 * 1000))) return { error: "Too many attempts. Try again in 15 minutes." };
  if (!checkPassword(String(form.get("password") ?? ""))) return { error: "That password isn't right." };
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/* ---------------- Fleet ---------------- */
export async function saveFleet(slug: string | null, _prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();

  const name = field(form, "name");
  const capacity = field(form, "capacity");
  const summary = field(form, "summary");
  const category = field(form, "category") as Category;
  if (!name || !capacity || !summary) return { error: "Name, capacity and summary are required." };
  if (category === ("all" as Category) || !categories.some((c) => c.id === category)) return { error: "Choose a category." };

  const fleet = await getAllFleet();
  const current = slug ? fleet.find((e) => e.slug === slug) : undefined;
  if (slug && !current) return { error: "This machine no longer exists." };

  let image = current?.image;
  const file = form.get("image");
  const hasFile = file instanceof File && file.size > 0;
  if (hasFile) {
    if (file.size > MAX_IMAGE_BYTES) return { error: "The photo must be 5 MB or smaller." };
    const saved = await saveImage(file);
    if (!saved) return { error: "The photo must be a JPG, PNG or WebP image." };
    image = saved;
  }
  if (!image) return { error: "Add a photo of the machine." };

  const values = {
    name,
    singular: field(form, "singular") || name.replace(/s$/, ""),
    category,
    capacity,
    tagline: field(form, "tagline"),
    image,
    summary,
    applications: field(form, "applications")
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    highlights: [0, 1, 2]
      .map((i) => ({ label: field(form, `highlight-label-${i}`), value: field(form, `highlight-value-${i}`) }))
      .filter((h) => h.label && h.value),
    published: form.get("published") === "on",
  };

  if (slug) await updateFleetItem(slug, values);
  else await addFleet(values);
  if (hasFile && current) await removeImage(current.image);
  refresh();
  redirect("/admin/fleet");
}

export async function toggleFleetPublished(slug: string) {
  await requireAdmin();
  await toggleFleet(slug);
  refresh();
}

export async function moveFleet(slug: string, direction: number) {
  await requireAdmin();
  await moveFleetItem(slug, direction);
  refresh();
}

export async function deleteFleet(slug: string) {
  await requireAdmin();
  const image = await removeFleet(slug);
  if (image) await removeImage(image);
  refresh();
}

/* ---------------- Enquiries ---------------- */
export async function updateEnquiryStatus(id: string, form: FormData) {
  await requireAdmin();
  const status = field(form, "status") as EnquiryStatus;
  if (!["new", "contacted", "closed"].includes(status)) return;
  await setEnquiryStatus(id, status);
  refresh();
}

export async function deleteEnquiry(id: string) {
  await requireAdmin();
  await removeEnquiry(id);
  refresh();
}

/* ---------------- FAQs ---------------- */
export async function saveFaq(id: string | null, _prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const q = field(form, "q");
  const a = field(form, "a");
  if (!q || !a) return { error: "Add both a question and an answer." };
  if (id) await updateFaq(id, q, a);
  else await addFaq(q, a);
  refresh();
  return { saved: true };
}

export async function moveFaq(id: string, direction: number) {
  await requireAdmin();
  await moveFaqItem(id, direction);
  refresh();
}

export async function deleteFaq(id: string) {
  await requireAdmin();
  await removeFaq(id);
  refresh();
}

/* ---------------- Company settings ---------------- */
const toPhone = (label: string) => {
  const digits = label.replace(/\D/g, "");
  return { label, href: `tel:+${digits}`, wa: digits };
};

export async function saveSettings(_prev: FormState, form: FormData): Promise<FormState> {
  await requireAdmin();
  const name = field(form, "name");
  const email = field(form, "email");
  const website = field(form, "website").replace(/^https?:\/\//, "").replace(/\/+$/, "");
  const phones = [field(form, "phone1"), field(form, "phone2")].filter(Boolean).map(toPhone);

  if (!name || !website) return { error: "Company name and website are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter a valid email address." };
  if (!phones.length) return { error: "Add at least one phone number." };
  if (phones.some((p) => p.wa.length < 8)) return { error: "Phone numbers need the full international format, e.g. +971 50 123 4567." };

  await saveCompany({
    ...(await getCompany()),
    name,
    tagline: field(form, "tagline"),
    city: field(form, "city"),
    phones,
    email,
    website,
    url: `https://${website}`,
  });
  refresh();
  return { saved: true };
}
