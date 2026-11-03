export type Category = "lifting" | "earthmoving" | "compact";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All equipment" },
  { id: "lifting", label: "Lifting" },
  { id: "earthmoving", label: "Earthmoving" },
  { id: "compact", label: "Compact" },
];

export type Equipment = {
  slug: string;
  name: string;
  singular: string;
  category: Category;
  capacity: string;
  tagline: string;
  image: string;
  summary: string;
  applications: string[];
  highlights: { label: string; value: string }[];
  published: boolean;
};

/** A fleet entry as shown publicly, numbered by its position in the list. */
export type NumberedEquipment = Equipment & { no: string };

export type Company = {
  name: string;
  short: string;
  tagline: string;
  city: string;
  phones: { label: string; href: string; wa: string }[];
  email: string;
  website: string;
  url: string;
};

export type Faq = { id: string; q: string; a: string };

export type EnquiryStatus = "new" | "contacted" | "closed";

export const statusLabels: Record<EnquiryStatus, string> = { new: "New", contacted: "Contacted", closed: "Closed" };

export type StoredEnquiry = {
  id: string;
  createdAt: string;
  status: EnquiryStatus;
  source: "quote" | "contact";
  name: string;
  company?: string;
  phone: string;
  email?: string;
  emirate?: string;
  start?: string;
  duration?: string;
  operator?: string;
  notes?: string;
  items: { slug: string; name: string; qty: number }[];
};

export const emirates = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];
