"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { logoutAction } from "@/app/admin/actions";
import clsx from "clsx";

const groups = [
  {
    label: "اليوم",
    items: [{ href: "/admin/leads", label: "الطلبات", hint: "اللي بيجي من فورم الموقع" }],
  },
  {
    label: "الموقع",
    items: [
      { href: "/admin/copy", label: "الكلام", hint: "العناوين والجمل على الصفحات" },
      { href: "/admin/work", label: "الأعمال", hint: "صور ومشاريع المعرض" },
      { href: "/admin/services", label: "الخدمات", hint: "أسماء الخدمات وشرحها" },
      { href: "/admin/team", label: "الفريق", hint: "صور الأدوار والجمل" },
      { href: "/admin/history", label: "قصتنا", hint: "فصول القصة على الموقع" },
    ],
  },
  {
    label: "الإعدادات",
    items: [
      { href: "/admin/settings", label: "التواصل", hint: "واتساب، إيميل، ولينكات الصفحات" },
      { href: "/admin/seo", label: "جوجل", hint: "العنوان والوصف في نتائج البحث" },
    ],
  },
];

const extra = [{ href: "/admin/media", label: "الصور", hint: "مكتبة الصور" }];

function active(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function currentPage(pathname: string) {
  for (const group of groups) {
    const match = group.items.find((item) => active(pathname, item.href));
    if (match) return match;
  }
  return extra.find((item) => active(pathname, item.href));
}

export function AdminShell({
  children,
  unread = 0,
}: {
  children: React.ReactNode;
  unread?: number;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const page = currentPage(pathname);
  const board = pathname.startsWith("/admin/leads");

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="admin-app min-h-dvh lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside
        className={clsx(
          "admin-side flex-col bg-[#0c0c0c] text-white lg:sticky lg:top-0 lg:flex lg:h-dvh",
          open ? "fixed inset-0 z-50 flex lg:static" : "hidden lg:flex",
        )}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-2">
          <Link href="/admin/leads" className="inline-flex max-w-full text-[16px]">
            <Logo variant="onDark" />
          </Link>
          <button type="button" className="text-sm text-white/50 lg:hidden" onClick={() => setOpen(false)}>
            إغلاق
          </button>
        </div>
        <p className="px-6 pb-4 text-[11px] tracking-[0.14em] text-white/35">لوحة التحكم</p>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {groups.map((group) => (
            <div key={group.label} className="admin-nav-group">
              <p className="admin-nav-label">{group.label}</p>
              <div className="grid gap-0.5">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx("admin-link", active(pathname, item.href) && "is-active")}
                  >
                    <span>{item.label}</span>
                    {item.href === "/admin/leads" && unread > 0 ? (
                      <span className="admin-unread">{unread}</span>
                    ) : null}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-6 py-5 text-sm">
          <a href="/ar" target="_blank" rel="noreferrer" className="block text-white/60 transition hover:text-white">
            شوف الموقع
          </a>
          <form action={logoutAction} className="mt-4">
            <button type="submit" className="text-white/40 transition hover:text-brand-pink">
              خروج
            </button>
          </form>
        </div>
      </aside>

      <div className="flex min-h-dvh min-w-0 flex-col">
        <div className="flex items-center justify-between border-b border-line bg-elevated px-5 py-3 lg:hidden">
          <div>
            <p className="text-sm font-medium">{page?.label ?? "لوحة التحكم"}</p>
            {unread > 0 && pathname.startsWith("/admin/leads") ? (
              <p className="text-xs text-brand-pink">{unread} جديد</p>
            ) : null}
          </div>
          <button type="button" className="border border-line px-3 py-2 text-sm" onClick={() => setOpen(true)}>
            القائمة
          </button>
        </div>

        <header className="admin-top hidden border-b border-line bg-elevated lg:flex">
          <div>
            <h1 className="font-display">{page?.label ?? "لوحة التحكم"}</h1>
            {page?.hint ? <p>{page.hint}</p> : null}
          </div>
          {unread > 0 && board ? <span className="admin-top-count">{unread} طلب جديد</span> : null}
        </header>

        <div className={clsx("admin-main flex-1", board && "is-board")}>{children}</div>
      </div>
    </div>
  );
}
