"use client";

import { ImagePlus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { FormState } from "@/app/admin/actions";
import { categories, type Equipment } from "@/lib/data";
import { adminButton, useAdminForm } from "./useAdminForm";

function Field({ label, hint, full, children }: { label: string; hint?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className="label">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-xs text-ink-500">{hint}</span>}
    </label>
  );
}

export function FleetForm({ action, machine }: { action: (prev: FormState, form: FormData) => Promise<FormState>; machine?: Equipment }) {
  const { state, pending, onSubmit } = useAdminForm(action);
  const [preview, setPreview] = useState(machine?.image);
  const [fileError, setFileError] = useState<string | null>(null);
  const error = fileError ?? state?.error;
  const highlights = machine?.highlights ?? [{ label: "Rental terms", value: "Short & long term" }];

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <section className="card grid gap-4 p-6 sm:grid-cols-2">
          <Field label="Name *" hint="As shown in the fleet, e.g. Mobile Cranes">
            <input name="name" className="field" required maxLength={80} defaultValue={machine?.name} />
          </Field>
          <Field label="Singular name" hint="Used in quote messages. Filled in from the name if empty.">
            <input name="singular" className="field" maxLength={80} defaultValue={machine?.singular} />
          </Field>
          <Field label="Category *">
            <select name="category" className="field" defaultValue={machine?.category ?? "lifting"}>
              {categories
                .filter((c) => c.id !== "all")
                .map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
            </select>
          </Field>
          <Field label="Capacity *" hint="e.g. 25 – 500 Ton">
            <input name="capacity" className="field" required maxLength={60} defaultValue={machine?.capacity} />
          </Field>
          <Field label="Tagline" full>
            <input name="tagline" className="field" maxLength={80} defaultValue={machine?.tagline} />
          </Field>
          <Field label="Summary *" full>
            <textarea name="summary" className="field min-h-24" required maxLength={600} defaultValue={machine?.summary} />
          </Field>
          <Field label="Typical applications" hint="One per line." full>
            <textarea name="applications" className="field min-h-28" defaultValue={machine?.applications.join("\n")} />
          </Field>
        </section>

        <section className="card p-6">
          <h2 className="font-extrabold">Key facts</h2>
          <p className="mt-1 text-sm text-ink-500">Up to three, shown at the top of the machine&apos;s page.</p>
          <div className="mt-4 space-y-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="grid grid-cols-2 gap-3">
                <input name={`highlight-label-${i}`} className="field" placeholder="Label, e.g. Capacity range" aria-label={`Fact ${i + 1} label`} defaultValue={highlights[i]?.label} />
                <input name={`highlight-value-${i}`} className="field" placeholder="Value, e.g. 25 – 500 T" aria-label={`Fact ${i + 1} value`} defaultValue={highlights[i]?.value} />
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="space-y-6">
        <section className="card p-6">
          <span className="label">Photo {machine ? "" : "*"}</span>
          <label className="group relative mt-1 grid aspect-[4/3] cursor-pointer place-items-center overflow-hidden rounded-xl border border-dashed border-ink-900/20 bg-sky-tint text-center transition focus-within:ring-4 focus-within:ring-brand-500/15 hover:border-brand-500">
            {preview ? (
              // Shows a local blob URL for new files, which next/image can't load.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <span className="px-4 text-sm font-semibold text-ink-500">
                <ImagePlus className="mx-auto mb-2 h-6 w-6" /> Choose a photo
              </span>
            )}
            <input
              name="image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required={!machine}
              className="absolute inset-0 cursor-pointer opacity-0"
              aria-label="Machine photo"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                // Over the server's request limit the save would fail outright, so stop it here.
                if (file.size > 5 * 1024 * 1024) {
                  e.target.value = "";
                  setFileError("The photo must be 5 MB or smaller.");
                  return;
                }
                setFileError(null);
                setPreview(URL.createObjectURL(file));
              }}
            />
          </label>
          <p className="mt-2 text-xs text-ink-500">JPG, PNG or WebP, up to 5 MB. Landscape (4:3) works best.</p>
        </section>

        <section className="card p-6">
          <label className="flex items-start gap-3">
            <input name="published" type="checkbox" defaultChecked={machine?.published ?? true} className="mt-0.5 h-5 w-5 accent-brand-600" />
            <span>
              <span className="block text-sm font-bold">Show on website</span>
              <span className="text-xs text-ink-500">Untick to keep it as a hidden draft.</span>
            </span>
          </label>
        </section>

        {error && (
          <p role="alert" className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </p>
        )}
        <div className="flex gap-3">
          <button disabled={pending} className={`${adminButton} flex-1`}>
            {pending ? "Saving…" : machine ? "Save changes" : "Add to fleet"}
          </button>
          <Link href="/admin/fleet" className="btn-ghost">
            Cancel
          </Link>
        </div>
      </div>
    </form>
  );
}
