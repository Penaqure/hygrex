"use client";

import { saveSettings } from "@/app/admin/actions";
import type { Company } from "@/lib/data";
import { adminButton, useAdminForm } from "./useAdminForm";

export function SettingsForm({ company }: { company: Company }) {
  const { state, pending, onSubmit } = useAdminForm(saveSettings);
  return (
    <form onSubmit={onSubmit} className="card grid max-w-3xl gap-4 p-6 sm:grid-cols-2">
      <label className="sm:col-span-2">
        <span className="label">Company name *</span>
        <input name="name" className="field" required defaultValue={company.name} />
      </label>
      <label>
        <span className="label">Main phone *</span>
        <input name="phone1" type="tel" className="field" required defaultValue={company.phones[0]?.label} />
        <span className="mt-1.5 block text-xs text-ink-500">Enquiries sent by WhatsApp go to this number.</span>
      </label>
      <label>
        <span className="label">Second phone</span>
        <input name="phone2" type="tel" className="field" defaultValue={company.phones[1]?.label} />
      </label>
      <label>
        <span className="label">Email *</span>
        <input name="email" type="email" className="field" required defaultValue={company.email} />
      </label>
      <label>
        <span className="label">Website *</span>
        <input name="website" className="field" required defaultValue={company.website} />
      </label>
      <label>
        <span className="label">City</span>
        <input name="city" className="field" defaultValue={company.city} />
      </label>
      <label>
        <span className="label">Tagline</span>
        <input name="tagline" className="field" defaultValue={company.tagline} />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-semibold text-red-600 sm:col-span-2">
          {state.error}
        </p>
      )}
      <div className="flex items-center gap-3 sm:col-span-2">
        <button disabled={pending} className={adminButton}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {state?.saved && !pending && <span className="text-sm font-semibold text-emerald-700" role="status">Saved</span>}
      </div>
    </form>
  );
}
