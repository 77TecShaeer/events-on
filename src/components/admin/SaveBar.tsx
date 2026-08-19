"use client";

import { useState, type FormEvent } from "react";

export function useSave<T>(action: (value: T) => Promise<void>) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function save(value: T, event?: FormEvent) {
    event?.preventDefault();
    setPending(true);
    setError("");
    try {
      await action(value);
      setSaved(true);
      window.setTimeout(() => setSaved(false), 4000);
    } catch {
      setError("الحفظ ما تمش. جرّب تاني، ولو فضلت المشكلة كلّم اللي عامل الموقع.");
    } finally {
      setPending(false);
    }
  }

  return { saved, error, pending, save };
}

export function SaveBar({
  pending,
  saved,
  error,
}: {
  pending: boolean;
  saved: boolean;
  error: string;
}) {
  return (
    <div className="sticky bottom-4 z-10 mt-10 flex flex-wrap items-center justify-between gap-3 border border-line bg-elevated/95 p-4 shadow-[0_-12px_40px_rgb(0_0_0/0.06)] backdrop-blur">
      <div>
        <p className="text-sm">{pending ? "بيتحفظ…" : saved ? "اتحفظ." : "لما تخلّص، اضغط حفظ."}</p>
        {saved ? (
          <a href="/ar" target="_blank" rel="noreferrer" className="text-sm text-brand-green">
            افتح الموقع وشوف التغيير
          </a>
        ) : null}
        {error ? <p className="text-sm text-brand-pink">{error}</p> : null}
      </div>
      <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
        {pending ? "بيحفظ…" : "حفظ"}
      </button>
    </div>
  );
}
