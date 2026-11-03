import { ArrowRight, Plus } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { requireAdmin } from "@/lib/auth";
import { statusLabels } from "@/lib/data";
import { countEnquiries, getAllFleet, getEnquiries } from "@/lib/store";

export const metadata: Metadata = { title: "Dashboard" };

export default async function DashboardPage() {
  await requireAdmin();
  const [fleet, enquiries, counts] = await Promise.all([getAllFleet(), getEnquiries({ limit: 5 }), countEnquiries()]);
  const live = fleet.filter((e) => e.published).length;
  const stats = [
    { label: "Machines on the website", value: live, href: "/admin/fleet" },
    { label: "Hidden drafts", value: fleet.length - live, href: "/admin/fleet" },
    { label: "New enquiries", value: counts.new, href: "/admin/enquiries?status=new" },
    { label: "All enquiries", value: counts.all, href: "/admin/enquiries" },
  ];

  return (
    <>
      <AdminHeader title="Dashboard">
        <Link href="/admin/fleet/new" className="btn bg-brand-600 text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Add machine
        </Link>
      </AdminHeader>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card p-5 transition hover:border-brand-500">
            <p className="text-3xl font-extrabold text-ink-950">{s.value}</p>
            <p className="mt-1 text-sm text-ink-600">{s.label}</p>
          </Link>
        ))}
      </div>

      <section className="card mt-6 overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="font-extrabold">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="inline-flex items-center gap-1 text-sm font-bold text-brand-600">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        {enquiries.length === 0 ? (
          <p className="border-t border-ink-900/8 p-5 text-sm text-ink-500">No enquiries yet. They appear here when customers send a quote or the contact form.</p>
        ) : (
          <ul className="divide-y divide-ink-900/8 border-t border-ink-900/8">
            {enquiries.map((e) => (
              <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3 text-sm">
                <span>
                  <span className="font-bold">{e.name}</span>
                  {e.items.length > 0 && <span className="text-ink-600"> · {e.items.map((i) => i.name).join(", ")}</span>}
                </span>
                <span className="text-xs font-semibold text-ink-500">
                  {statusLabels[e.status]} · {new Date(e.createdAt).toLocaleDateString("en-GB", { dateStyle: "medium", timeZone: "Asia/Dubai" })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
