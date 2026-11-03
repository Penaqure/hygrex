import { headers } from "next/headers";
import { getDb } from "./db";

/** Fixed-window limiter per client IP, kept in the database so it holds across restarts and servers. Returns false once `max` is exceeded. */
export async function allow(action: string, max: number, windowMs: number) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? h.get("x-real-ip") ?? "unknown";
  const window = Math.floor(Date.now() / windowMs);
  const hits = (await getDb()).collection<{ _id: string; count: number; expiresAt: Date }>("rate_limits");
  const doc = await hits.findOneAndUpdate(
    { _id: `${action}:${ip}:${window}` },
    { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * windowMs) } },
    { upsert: true, returnDocument: "after" },
  );
  return (doc?.count ?? 0) <= max;
}
