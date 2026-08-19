"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteLeadAction,
  saveLeadNotesAction,
  setLeadContactedAction,
  setLeadReadAction,
} from "@/app/admin/actions";
import { phoneDigits } from "@/lib/brief";
import { whatsappHref } from "@/lib/whatsapp";
import type { Lead } from "@/lib/site-types";
import clsx from "clsx";

type StatusFilter = "all" | "new" | "waiting" | "contacted";
type RangeFilter = "all" | "today" | "week" | "month";
type LangFilter = "all" | "ar" | "en";

function leadStatus(item: Lead): Exclude<StatusFilter, "all"> {
  if (item.contacted) return "contacted";
  if (!item.read) return "new";
  return "waiting";
}

function statusLabel(status: ReturnType<typeof leadStatus>) {
  if (status === "new") return "جديد";
  if (status === "waiting") return "لسه";
  return "تم التواصل";
}

function when(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString("ar-EG", { dateStyle: "medium", timeStyle: "short" });
}

function displayPhone(raw: string) {
  const digits = phoneDigits(raw);
  if (/^201[0125]\d{8}$/.test(digits)) {
    return `+20 ${digits.slice(2, 4)} ${digits.slice(4, 8)} ${digits.slice(8)}`;
  }
  return digits ? `+${digits}` : "";
}

function inRange(iso: string, range: RangeFilter) {
  if (range === "all") return true;
  const stamp = new Date(iso).getTime();
  if (Number.isNaN(stamp)) return false;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  if (range === "today") return stamp >= start.getTime();
  if (range === "week") return stamp >= Date.now() - 7 * 86400000;
  return stamp >= Date.now() - 30 * 86400000;
}

function matchesQuery(item: Lead, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const hay = `${item.name} ${item.company} ${item.email} ${item.phone} ${item.message} ${item.notes}`.toLowerCase();
  if (hay.includes(q)) return true;
  const qDigits = phoneDigits(q);
  if (qDigits.length < 3) return false;
  const phone = phoneDigits(item.phone);
  if (phone.includes(qDigits)) return true;
  if (phone.startsWith("20") && `0${phone.slice(2)}`.includes(qDigits)) return true;
  return false;
}

function waText(item: Lead) {
  return item.locale === "en"
    ? `Hi ${item.name}, we received your brief from the EVENTS ON site.`
    : `أهلاً ${item.name}، وصلنا موجزكم من موقع EVENTS ON.`;
}

export function LeadsInbox({ initial }: { initial: Lead[] }) {
  const [items, setItems] = useState(initial);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [range, setRange] = useState<RangeFilter>("all");
  const [lang, setLang] = useState<LangFilter>("all");
  const [open, setOpen] = useState("");
  const [noteDraft, setNoteDraft] = useState("");
  const [noteSaved, setNoteSaved] = useState(false);
  const [notePending, setNotePending] = useState(false);

  const counts = useMemo(
    () => ({
      all: items.length,
      new: items.filter((item) => leadStatus(item) === "new").length,
      waiting: items.filter((item) => leadStatus(item) === "waiting").length,
      contacted: items.filter((item) => item.contacted).length,
    }),
    [items],
  );

  const visible = useMemo(() => {
    return items.filter((item) => {
      if (status !== "all" && leadStatus(item) !== status) return false;
      if (lang !== "all" && item.locale !== lang) return false;
      if (!inRange(item.createdAt, range)) return false;
      return matchesQuery(item, query);
    });
  }, [items, lang, query, range, status]);

  const current = items.find((item) => item.id === open) ?? null;

  useEffect(() => {
    if (open && !visible.some((item) => item.id === open)) setOpen("");
  }, [open, visible]);

  useEffect(() => {
    setNoteDraft(current?.notes ?? "");
    setNoteSaved(false);
  }, [current?.id, current?.notes]);

  async function patchLocal(id: string, next: Partial<Lead>) {
    setItems((list) => list.map((item) => (item.id === id ? { ...item, ...next } : item)));
  }

  async function markRead(id: string, read: boolean) {
    await patchLocal(id, { read });
    await setLeadReadAction(id, read);
  }

  async function markContacted(id: string, contacted: boolean) {
    if (contacted) {
      await patchLocal(id, { contacted: true, contactedAt: new Date().toISOString(), read: true });
    } else {
      await patchLocal(id, { contacted: false, contactedAt: "" });
    }
    await setLeadContactedAction(id, contacted);
  }

  async function saveNotes(id: string) {
    const notes = noteDraft.trim().slice(0, 2000);
    setNotePending(true);
    await patchLocal(id, { notes });
    await saveLeadNotesAction(id, notes);
    setNoteDraft(notes);
    setNoteSaved(true);
    setNotePending(false);
  }

  async function remove(id: string) {
    if (!window.confirm("تمسح الطلب ده؟ مش هيرجع.")) return;
    setItems((list) => list.filter((item) => item.id !== id));
    if (open === id) setOpen("");
    await deleteLeadAction(id);
  }

  function selectLead(item: Lead) {
    setOpen(item.id);
    if (!item.read) void markRead(item.id, true);
  }

  if (!items.length) {
    return (
      <p className="border border-line bg-elevated p-6 text-base text-muted">
        لسه مفيش طلبات. أول ما حد يملا الفورم على الموقع، هتظهر هنا.
      </p>
    );
  }

  const noteDirty = current ? noteDraft.trim() !== (current.notes ?? "").trim() : false;
  const tabs = [
    ["all", "الكل", counts.all],
    ["new", "جديد", counts.new],
    ["waiting", "لسه", counts.waiting],
    ["contacted", "تم التواصل", counts.contacted],
  ] as const;

  return (
    <div className="leads-wrap">
      <div className="leads-toolbar">
        <div className="leads-tabs" role="tablist">
          {tabs.map(([id, label, count]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={status === id}
              className={clsx(status === id && "is-active")}
              onClick={() => setStatus(id)}
            >
              {label}
              <b>{count}</b>
            </button>
          ))}
        </div>
        <div className="leads-tools">
          <input
            className="admin-input"
            placeholder="دور باسم أو رقم…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="admin-select" value={range} onChange={(event) => setRange(event.target.value as RangeFilter)}>
            <option value="all">كل الوقت</option>
            <option value="today">النهاردة</option>
            <option value="week">آخر أسبوع</option>
            <option value="month">آخر شهر</option>
          </select>
          <select className="admin-select" value={lang} onChange={(event) => setLang(event.target.value as LangFilter)}>
            <option value="all">كل اللغات</option>
            <option value="ar">عربي</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      <div className="leads-board" data-pane={current ? "detail" : "list"}>
        <div className="leads-list">
          {visible.map((item) => {
            const statusId = leadStatus(item);
            const phone = displayPhone(item.phone);
            return (
              <button
                key={item.id}
                type="button"
                className={clsx("leads-row", open === item.id && "is-active", statusId === "new" && "is-new")}
                onClick={() => selectLead(item)}
              >
                <span className={clsx("lead-dot", `is-${statusId}`)} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate font-medium">{item.name}</span>
                    <span className={clsx("lead-badge", `is-${statusId}`)}>{statusLabel(statusId)}</span>
                  </span>
                  <span className="mt-1 block truncate text-sm text-muted">
                    <span dir="ltr">{phone || item.phone}</span>
                    {item.company ? ` · ${item.company}` : ""}
                  </span>
                </span>
              </button>
            );
          })}
          {visible.length === 0 ? <p className="p-5 text-sm text-muted">مفيش طلبات بالفلتر ده.</p> : null}
        </div>

        <div className="leads-detail">
          {current ? (
            <LeadDetail
              item={current}
              noteDraft={noteDraft}
              noteDirty={noteDirty}
              noteSaved={noteSaved}
              notePending={notePending}
              onBack={() => setOpen("")}
              onNote={(value) => {
                setNoteDraft(value);
                setNoteSaved(false);
              }}
              onSaveNotes={() => void saveNotes(current.id)}
              onContacted={() => void markContacted(current.id, !current.contacted)}
              onToggleRead={() => void markRead(current.id, !current.read)}
              onDelete={() => void remove(current.id)}
            />
          ) : (
            <p className="hidden h-full place-items-center text-sm text-muted lg:grid">اختار طلب من القائمة.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function LeadDetail({
  item,
  noteDraft,
  noteDirty,
  noteSaved,
  notePending,
  onBack,
  onNote,
  onSaveNotes,
  onContacted,
  onToggleRead,
  onDelete,
}: {
  item: Lead;
  noteDraft: string;
  noteDirty: boolean;
  noteSaved: boolean;
  notePending: boolean;
  onBack: () => void;
  onNote: (value: string) => void;
  onSaveNotes: () => void;
  onContacted: () => void;
  onToggleRead: () => void;
  onDelete: () => void;
}) {
  const statusId = leadStatus(item);
  const phone = displayPhone(item.phone);
  const wa = whatsappHref(item.phone, waText(item));

  return (
    <div className="grid gap-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <button type="button" className="mb-3 text-sm text-muted lg:hidden" onClick={onBack}>
            رجوع للقائمة
          </button>
          <p className="font-display text-3xl">{item.name}</p>
          <p className="mt-2 text-sm text-muted">{when(item.createdAt)}</p>
        </div>
        <span className={clsx("lead-badge", `is-${statusId}`)}>{statusLabel(statusId)}</span>
      </div>

      <dl className="leads-meta">
        <div>
          <dt>الموبايل</dt>
          <dd>
            <a href={`tel:+${phoneDigits(item.phone)}`} dir="ltr">
              {phone || item.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt>الإيميل</dt>
          <dd>
            {item.email ? (
              <a href={`mailto:${item.email}`} dir="ltr">
                {item.email}
              </a>
            ) : (
              "مش مكتوب"
            )}
          </dd>
        </div>
        <div>
          <dt>الشركة</dt>
          <dd>{item.company || "مش مكتوبة"}</dd>
        </div>
        <div>
          <dt>اللغة</dt>
          <dd>{item.locale === "en" ? "English" : "عربي"}</dd>
        </div>
        {item.contactedAt ? (
          <div>
            <dt>اتكلمنا</dt>
            <dd>{when(item.contactedAt)}</dd>
          </div>
        ) : null}
      </dl>

      <section>
        <h2 className="mb-2 text-sm font-medium">الموجز</h2>
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{item.message}</p>
      </section>

      <label className="grid gap-2">
        <span className="text-sm font-medium">ملاحظات الفريق</span>
        <textarea
          className="admin-area"
          value={noteDraft}
          maxLength={2000}
          placeholder="كلّمته امتى؟ رد إيه؟ معاد؟"
          onChange={(event) => onNote(event.target.value)}
        />
        <span className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="text-sm text-brand-green disabled:text-muted"
            disabled={!noteDirty || notePending}
            onClick={onSaveNotes}
          >
            {notePending ? "بيتحفظ…" : "حفظ الملاحظة"}
          </button>
          {noteSaved && !noteDirty ? <span className="text-xs text-muted">اتحفظت.</span> : null}
        </span>
      </label>

      <div className="leads-actions">
        {wa ? (
          <a href={wa} target="_blank" rel="noreferrer" className="btn btn-green btn-sm">
            واتساب
          </a>
        ) : null}
        {item.email ? (
          <a href={`mailto:${item.email}`} className="btn btn-secondary btn-sm">
            إيميل
          </a>
        ) : null}
        <button type="button" className="btn btn-primary btn-sm" onClick={onContacted}>
          {item.contacted ? "رجّعه لسه" : "تم التواصل"}
        </button>
        <button type="button" className="text-sm text-muted" onClick={onToggleRead}>
          {item.read ? "رجّعه جديد" : "اعتبره مقروء"}
        </button>
        <button type="button" className="text-sm text-brand-pink" onClick={onDelete}>
          امسح
        </button>
      </div>
    </div>
  );
}
