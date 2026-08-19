"use client";

import { useState } from "react";
import { uploadMediaAction } from "@/app/admin/actions";

export function MediaGrid({ images }: { images: string[] }) {
  const [items, setItems] = useState(images);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div>
      <label className="btn btn-primary btn-sm inline-flex cursor-pointer">
        {busy ? "الصور بتتحمل…" : "ارفع صور من جهازك"}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          disabled={busy}
          onChange={async (event) => {
            const files = Array.from(event.target.files ?? []);
            event.target.value = "";
            if (!files.length) return;
            setBusy(true);
            setError("");
            try {
              const uploaded: string[] = [];
              for (const file of files) {
                const data = new FormData();
                data.set("file", file);
                uploaded.push(await uploadMediaAction(data));
              }
              setItems((current) => [...uploaded, ...current]);
            } catch {
              setError("في صورة ما اترفعتش. جرّب jpg أو png أصغر.");
            } finally {
              setBusy(false);
            }
          }}
        />
      </label>
      {error ? <p className="mt-3 text-sm text-brand-pink">{error}</p> : null}
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((src) => (
          <figure key={src} className="border border-line bg-elevated">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="aspect-square w-full object-cover" />
          </figure>
        ))}
      </div>
    </div>
  );
}
