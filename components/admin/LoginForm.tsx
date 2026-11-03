"use client";

import { login } from "@/app/admin/actions";
import { adminButton, useAdminForm } from "./useAdminForm";

export function LoginForm() {
  const { state, pending, onSubmit } = useAdminForm(login);
  return (
    <form onSubmit={onSubmit} className="mt-6">
      <label>
        <span className="label">Password</span>
        <input name="password" type="password" className="field" required autoFocus autoComplete="current-password" />
      </label>
      {state?.error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-600">
          {state.error}
        </p>
      )}
      <button disabled={pending} className={`${adminButton} mt-5 w-full`}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
