import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { deleteFleet, moveFleet, toggleFleetPublished } from "@/app/admin/actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { requireAdmin } from "@/lib/auth";
import { getAllFleet } from "@/lib/store";

export const metadata: Metadata = { title: "Fleet" };

const iconButton = "grid h-9 w-9 place-items-center rounded-lg text-ink-600 transition hover:bg-steel hover:text-ink-900 disabled:opacity-30 disabled:hover:bg-transparent";

export default async function FleetAdminPage() {
  await requireAdmin();
  const fleet = await getAllFleet();

  return (
    <>
      <AdminHeader title="Fleet" intro="The order here is the order on the website.">
        <Link href="/admin/fleet/new" className="btn bg-brand-600 text-white hover:bg-brand-700">
          <Plus className="h-4 w-4" /> Add machine
        </Link>
      </AdminHeader>

      {fleet.length === 0 ? (
        <p className="card p-10 text-center text-ink-500">The fleet is empty. Add your first machine to show it on the website.</p>
      ) : (
        <ul className="card divide-y divide-ink-900/8 overflow-hidden">
          {fleet.map((e, i) => (
            <li key={e.slug} className="flex flex-wrap items-center gap-4 p-4">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-steel">
                <Image src={e.image} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <div className="min-w-40 flex-1">
                <Link href={`/admin/fleet/${e.slug}`} className="font-bold hover:text-brand-600">
                  {e.name}
                </Link>
                <p className="text-sm capitalize text-ink-600">
                  {e.category} · <span className="normal-case">{e.capacity}</span>
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${e.published ? "bg-emerald-50 text-emerald-700" : "bg-steel text-ink-600"}`}>
                {e.published ? "On website" : "Hidden"}
              </span>
              <div className="flex items-center">
                <form action={moveFleet.bind(null, e.slug, -1)}>
                  <button className={iconButton} disabled={i === 0} aria-label={`Move ${e.name} up`} title="Move up">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </form>
                <form action={moveFleet.bind(null, e.slug, 1)}>
                  <button className={iconButton} disabled={i === fleet.length - 1} aria-label={`Move ${e.name} down`} title="Move down">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                </form>
                <form action={toggleFleetPublished.bind(null, e.slug)}>
                  <button className={iconButton} aria-label={`${e.published ? "Hide" : "Show"} ${e.name}`} title={e.published ? "Hide from website" : "Show on website"}>
                    {e.published ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </form>
                <Link href={`/admin/fleet/${e.slug}`} className={iconButton} aria-label={`Edit ${e.name}`} title="Edit">
                  <Pencil className="h-4 w-4" />
                </Link>
                <form action={deleteFleet.bind(null, e.slug)}>
                  <ConfirmButton message={`Delete ${e.name}? This can't be undone. To take it off the website for now, hide it instead.`} label={`Delete ${e.name}`} className={`${iconButton} hover:!text-red-600`}>
                    <Trash2 className="h-4 w-4" />
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
