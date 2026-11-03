import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "hygerx-admin";
const SESSION_SECONDS = 60 * 60 * 24 * 7;

const sha = (v: string) => createHash("sha256").update(v).digest();

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

export const checkPassword = (attempt: string) =>
  adminConfigured() && timingSafeEqual(sha(attempt), sha(process.env.ADMIN_PASSWORD!));

// Sessions are signed with a key derived from the password, so changing the password signs everyone out.
const sign = (expires: string) => createHmac("sha256", sha(`session:${process.env.ADMIN_PASSWORD}`)).update(expires).digest("hex");

export async function startSession() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export const endSession = async () => (await cookies()).delete(COOKIE);

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const [expires, signature] = ((await cookies()).get(COOKIE)?.value ?? "").split(".");
  if (!expires || !signature || Number(expires) * 1000 < Date.now()) return false;
  const expected = Buffer.from(sign(expires));
  const given = Buffer.from(signature);
  return expected.length === given.length && timingSafeEqual(expected, given);
}

/** Call at the top of every admin page and action: layouts alone don't re-run on client navigation. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}
