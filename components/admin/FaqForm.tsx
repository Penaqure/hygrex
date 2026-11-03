"use client";

import { useEffect, useRef } from "react";
import type { FormState } from "@/app/admin/actions";
import type { Faq } from "@/lib/data";
import { adminButton, useAdminForm } from "./useAdminForm";

export function FaqForm({ action, faq }: { action: (prev: FormState, form: FormData) => Promise<FormState>; faq?: Faq }) {
  const { state, pending, onSubmit } = useAdminForm(action);
  const ref = useRef<HTMLFormElement>(null);

  // The "add" form starts empty again after each save.
  useEffect(() => {
    if (state?.saved && !faq) ref.current?.reset();
  }, [state, faq]);

  return (
    <form ref={ref} onSubmit={onSubmit} className="space-y-3">
      <label className="block">
        <span className="label">Question</span>
        <input name="q" className="field" required maxLength={200} defaultValue={faq?.q} />
      </label>
      <label className="block">
        <span className="label">Answer</span>
        <textarea name="a" className="field min-h-24" required maxLength={2000} defaultValue={faq?.a} />
      </label>
      {state?.error && (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <button disabled={pending} className={`${adminButton} !py-2.5`}>
          {pending ? "Saving…" : faq ? "Save" : "Add question"}
        </button>
        {state?.saved && !pending && <span className="text-sm font-semibold text-emerald-700" role="status">Saved</span>}
      </div>
    </form>
  );
}
