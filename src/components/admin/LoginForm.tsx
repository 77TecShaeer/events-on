"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);

  return (
    <form action={action} className="mt-10 grid gap-4">
      <label className="grid gap-1 text-sm">
        <span className="text-white/50">الإيميل</span>
        <input
          name="email"
          type="email"
          required
          autoFocus
          autoComplete="username"
          className="admin-input admin-input-dark"
          dir="ltr"
        />
      </label>
      <label className="grid gap-1 text-sm">
        <span className="text-white/50">كلمة السر</span>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="admin-input admin-input-dark"
          dir="ltr"
        />
      </label>
      {state?.error ? <p className="text-sm text-brand-pink">{state.error}</p> : null}
      <button type="submit" disabled={pending} className="btn btn-primary btn-md">
        {pending ? "بيدخل…" : "دخول"}
      </button>
    </form>
  );
}
