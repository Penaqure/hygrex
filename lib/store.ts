import { randomUUID } from "node:crypto";
import type { Binary, Collection, WithId } from "mongodb";
import type { Company, Equipment, EnquiryStatus, Faq, NumberedEquipment, StoredEnquiry } from "./data";
import { getDb, isDuplicateKey } from "./db";

type Ordered = { position: number };
type FleetDoc = Omit<Equipment, "slug"> & Ordered & { _id: string };
type FaqDoc = Omit<Faq, "id"> & Ordered & { _id: string };
type CompanyDoc = Company & { _id: string };
type EnquiryDoc = Omit<StoredEnquiry, "id" | "createdAt"> & { _id: string; createdAt: Date };
type ImageDoc = { _id: string; mime: string; data: Binary | Buffer; createdAt: Date };

const fleetCol = async () => (await getDb()).collection<FleetDoc>("fleet");
const faqCol = async () => (await getDb()).collection<FaqDoc>("faqs");
const settingsCol = async () => (await getDb()).collection<CompanyDoc>("settings");
const enquiryCol = async () => (await getDb()).collection<EnquiryDoc>("enquiries");
const imageCol = async () => (await getDb()).collection<ImageDoc>("images");

const inOrder = { position: 1, _id: 1 } as const;

async function nextPosition<T extends Ordered & { _id: string }>(col: Collection<T>) {
  const [last] = await col.find().sort({ position: -1 }).limit(1).toArray();
  return last ? (last as Ordered).position + 1 : 0;
}

/** Swaps an item with its neighbour in the list. */
async function moveItem<T extends Ordered & { _id: string }>(col: Collection<T>, id: string, direction: number) {
  const items = (await col.find().sort(inOrder).project({ position: 1 }).toArray()) as unknown as (Ordered & { _id: string })[];
  const index = items.findIndex((i) => i._id === id);
  const other = items[index + direction];
  if (index < 0 || !other) return;
  // Normalising to the list index also repairs any two items that ended up sharing a position.
  const a = items[index];
  const ops = [
    { _id: a._id, position: index + direction },
    { _id: other._id, position: index },
  ];
  await col.bulkWrite(ops.map(({ _id, position }) => ({ updateOne: { filter: { _id } as never, update: { $set: { position } } as never } })));
}

/* ---------------- Fleet ---------------- */
const toEquipment = ({ _id, position: _position, ...e }: WithId<FleetDoc>): Equipment => ({ ...e, slug: _id });

export type FleetValues = Omit<Equipment, "slug">;

export const getAllFleet = async () => (await (await fleetCol()).find().sort(inOrder).toArray()).map(toEquipment);

export async function getPublishedFleet(): Promise<NumberedEquipment[]> {
  const docs = await (await fleetCol()).find({ published: true }).sort(inOrder).toArray();
  return docs.map((d, i) => ({ ...toEquipment(d), no: String(i + 1).padStart(2, "0") }));
}

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "machine";

/** Adds a machine. The slug is its _id, so the database itself guards against two machines sharing a URL. */
export async function addFleet(values: FleetValues) {
  const col = await fleetCol();
  const position = await nextPosition(col);
  const base = slugify(values.name);
  for (let n = 1; ; n++) {
    const _id = n === 1 ? base : `${base}-${n}`;
    try {
      await col.insertOne({ ...values, position, _id });
      return _id;
    } catch (err) {
      if (!isDuplicateKey(err)) throw err;
    }
  }
}

export const updateFleetItem = async (slug: string, values: FleetValues) => {
  await (await fleetCol()).updateOne({ _id: slug }, { $set: values });
};

export const toggleFleet = async (slug: string) => {
  await (await fleetCol()).updateOne({ _id: slug }, [{ $set: { published: { $not: "$published" } } }]);
};

export const moveFleetItem = async (slug: string, direction: number) => moveItem(await fleetCol(), slug, direction);

/** Deletes a machine and returns its image path so the caller can clean it up. */
export const removeFleet = async (slug: string) => (await (await fleetCol()).findOneAndDelete({ _id: slug }))?.image;

/* ---------------- FAQs ---------------- */
export const getFaqs = async (): Promise<Faq[]> =>
  (await (await faqCol()).find().sort(inOrder).toArray()).map(({ _id, q, a }) => ({ id: _id, q, a }));

export const addFaq = async (q: string, a: string) => {
  const col = await faqCol();
  await col.insertOne({ _id: randomUUID(), q, a, position: await nextPosition(col) });
};

export const updateFaq = async (id: string, q: string, a: string) => {
  await (await faqCol()).updateOne({ _id: id }, { $set: { q, a } });
};

export const moveFaqItem = async (id: string, direction: number) => moveItem(await faqCol(), id, direction);

export const removeFaq = async (id: string) => {
  await (await faqCol()).deleteOne({ _id: id });
};

/* ---------------- Company ---------------- */
export async function getCompany(): Promise<Company> {
  const doc = await (await settingsCol()).findOne({ _id: "company" });
  if (!doc) throw new Error("Company settings are missing from the database");
  const { _id, ...company } = doc;
  return company;
}

export const saveCompany = async (company: Company) => {
  await (await settingsCol()).replaceOne({ _id: "company" }, company, { upsert: true });
};

/* ---------------- Enquiries ---------------- */
const toEnquiry = ({ _id, createdAt, ...e }: WithId<EnquiryDoc>): StoredEnquiry => ({ ...e, id: _id, createdAt: createdAt.toISOString() });

export async function getEnquiries({ status, limit }: { status?: EnquiryStatus; limit: number }) {
  const docs = await (await enquiryCol()).find(status ? { status } : {}).sort({ createdAt: -1 }).limit(limit).toArray();
  return docs.map(toEnquiry);
}

export async function countEnquiries(): Promise<Record<EnquiryStatus | "all", number>> {
  const rows = await (await enquiryCol()).aggregate<{ _id: EnquiryStatus; n: number }>([{ $group: { _id: "$status", n: { $sum: 1 } } }]).toArray();
  const count = (s: EnquiryStatus) => rows.find((r) => r._id === s)?.n ?? 0;
  return { new: count("new"), contacted: count("contacted"), closed: count("closed"), all: rows.reduce((t, r) => t + r.n, 0) };
}

export const addEnquiry = async (e: Omit<StoredEnquiry, "id" | "createdAt" | "status">) => {
  await (await enquiryCol()).insertOne({ ...e, _id: randomUUID(), createdAt: new Date(), status: "new" });
};

export const setEnquiryStatus = async (id: string, status: EnquiryStatus) => {
  await (await enquiryCol()).updateOne({ _id: id }, { $set: { status } });
};

export const removeEnquiry = async (id: string) => {
  await (await enquiryCol()).deleteOne({ _id: id });
};

/* ---------------- Uploads ---------------- */
const imageTypes = {
  jpg: { mime: "image/jpeg", magic: (b: Buffer) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  png: { mime: "image/png", magic: (b: Buffer) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) },
  webp: { mime: "image/webp", magic: (b: Buffer) => b.toString("latin1", 0, 4) === "RIFF" && b.toString("latin1", 8, 12) === "WEBP" },
};
const uploadName = /^[0-9a-f-]{36}\.(jpg|png|webp)$/;

/** Stores an uploaded image, trusting its bytes rather than its name or declared type. Returns its public path, or null if unsupported. */
export async function saveImage(file: File): Promise<string | null> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = (Object.keys(imageTypes) as (keyof typeof imageTypes)[]).find((k) => imageTypes[k].magic(bytes));
  if (!ext) return null;
  const name = `${randomUUID()}.${ext}`;
  await (await imageCol()).insertOne({ _id: name, mime: imageTypes[ext].mime, data: bytes, createdAt: new Date() });
  return `/uploads/${name}`;
}

/** Deletes an image previously stored by saveImage. Bundled images under /images are left alone. */
export async function removeImage(publicPath: string) {
  const name = publicPath.replace(/^\/uploads\//, "");
  if (name === publicPath || !uploadName.test(name)) return;
  await (await imageCol()).deleteOne({ _id: name });
}

export async function readImage(name: string): Promise<{ bytes: Buffer; mime: string } | null> {
  if (!uploadName.test(name)) return null;
  const doc = await (await imageCol()).findOne({ _id: name });
  if (!doc) return null;
  const data = doc.data as Binary;
  return { bytes: Buffer.from(data.buffer.subarray(0, data.position)), mime: doc.mime };
}
