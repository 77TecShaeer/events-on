"use client";

import { useState } from "react";
import { uploadMediaAction } from "@/app/admin/actions";
import clsx from "clsx";

export function ImagePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (src: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [over, setOver] = useState(false);

  async function take(file?: File | null) {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const data = new FormData();
      data.set("file", file);
      onChange(await uploadMediaAction(data));
    } catch {
      setError("الصورة ما اترفعتش. جرّب jpg أو png.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-2">
      <label
        className={clsx("admin-photo", over && "is-over", busy && "is-busy")}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          void take(event.dataTransfer.files[0]);
        }}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" />
        ) : (
          <span className="admin-photo-empty">اضغط هنا عشان تحط صورة</span>
        )}
        <span className="admin-photo-btn">{busy ? "بتتحمل…" : value ? "غيّر الصورة" : "اختار صورة"}</span>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          disabled={busy}
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            void take(file);
          }}
        />
      </label>
      {error ? <p className="text-sm text-brand-pink">{error}</p> : null}
    </div>
  );
}
