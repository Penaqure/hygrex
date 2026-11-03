"use client";

import { startTransition, useActionState } from "react";
import type { FormState } from "@/app/admin/actions";

/**
 * Submits through a transition instead of the form's `action` prop, because React
 * resets `action` forms afterwards and a failed save would wipe what was typed.
 */
export function useAdminForm(action: (prev: FormState, form: FormData) => Promise<FormState>) {
  const [state, dispatch, pending] = useActionState(action, null);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => dispatch(data));
  };
  return { state, pending, onSubmit };
}

export const adminButton = "btn bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-60";
