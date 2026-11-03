import type { Metadata } from "next";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { adminConfigured, isAdmin } from "@/lib/auth";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  return (
    <main className="grid min-h-screen place-items-center p-4">
      <div className="card w-full max-w-sm p-8">
        <Image src="/images/logo.png" alt="HYGERX" width={1179} height={270} priority className="h-9 w-auto" />
        <h1 className="mt-6 text-2xl font-extrabold">Admin sign in</h1>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-ink-600">
            Sign-in is turned off because no admin password is set. Add <code className="font-bold">ADMIN_PASSWORD</code> to the server&apos;s environment and restart.
          </p>
        )}
      </div>
    </main>
  );
}
