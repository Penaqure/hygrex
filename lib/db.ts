import { MongoClient, type Db } from "mongodb";
import { seedCompany, seedFaqs, seedFleet } from "./seed";

// Shared across requests and hot reloads so the app holds one connection pool.
const cache = globalThis as unknown as { hygerxDb?: Promise<Db> };

const isDuplicateKey = (err: unknown) => (err as { code?: number }).code === 11000;
export { isDuplicateKey };

async function seedOnce(db: Db) {
  const meta = db.collection<{ _id: string }>("meta");
  if (await meta.findOne({ _id: "seeded" })) return;

  // Keyed upserts so two servers starting together can't add duplicates. The marker
  // goes last, and stops items deleted in the admin panel from coming back.
  await db.collection<{ _id: string }>("fleet").bulkWrite(
    seedFleet.map(({ slug, ...e }, position) => ({
      updateOne: { filter: { _id: slug }, update: { $setOnInsert: { ...e, position } }, upsert: true },
    })),
  );
  await db.collection<{ _id: string }>("faqs").bulkWrite(
    seedFaqs.map(({ id, ...f }, position) => ({
      updateOne: { filter: { _id: id }, update: { $setOnInsert: { ...f, position } }, upsert: true },
    })),
  );
  await db.collection<{ _id: string }>("settings").updateOne({ _id: "company" }, { $setOnInsert: seedCompany }, { upsert: true });
  await meta.updateOne({ _id: "seeded" }, { $set: { at: new Date() } }, { upsert: true });
}

async function connect() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not set");
  const client = await new MongoClient(uri, { serverSelectionTimeoutMS: 5000, ignoreUndefined: true }).connect();
  // The driver reports "test" when the URI names no database, which is common for hosted connection strings.
  const name = client.options.dbName;
  const db = client.db(name === "test" ? "hygerx" : name);

  await Promise.all([
    db.collection("fleet").createIndex({ position: 1 }),
    db.collection("faqs").createIndex({ position: 1 }),
    db.collection("enquiries").createIndex({ createdAt: -1 }),
    db.collection("enquiries").createIndex({ status: 1, createdAt: -1 }),
    db.collection("rate_limits").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
  ]);
  await seedOnce(db);
  return db;
}

export function getDb() {
  cache.hygerxDb ??= connect().catch((err) => {
    // Let the next request try again rather than caching the failure.
    cache.hygerxDb = undefined;
    throw err;
  });
  return cache.hygerxDb;
}
