import Link from "next/link";
import { unreadLeadCount } from "@/lib/leads";

const shortcuts = [
  {
    href: "/admin/work",
    kicker: "Homepage + /work",
    title: "Selected Work",
    body: "الصور والمشاريع اللي بتظهر في Selected Work على الرئيسية، وفي صفحة الأعمال.",
  },
  {
    href: "/admin/history",
    kicker: "Homepage + /history",
    title: "Our Story",
    body: "فصول القصة اللي بتظهر في Our Story على الرئيسية، وفي صفحة التاريخ.",
  },
  {
    href: "/admin/services",
    kicker: "/services",
    title: "Services",
    body: "قائمة الخدمات كاملة. اللي هنا هو اللي يظهر في صفحة الخدمات.",
  },
];

export default function AdminHomePage() {
  const unread = unreadLeadCount();

  return (
    <div className="mx-auto grid max-w-4xl gap-6">
      <div>
        <p className="text-sm text-brand-green">لوحة التحكم</p>
        <h2 className="font-display mt-2 text-3xl">عدّل الصفحات اللي بتظهر للعملاء</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {shortcuts.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="border border-line bg-elevated p-6 transition hover:border-brand-green/50"
          >
            <p className="text-[11px] tracking-[0.14em] text-muted">{item.kicker}</p>
            <h3 className="font-display mt-3 text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </Link>
        ))}
        <Link href="/admin/leads" className="border border-line bg-elevated p-6 transition hover:border-brand-pink/50">
          <p className="text-[11px] tracking-[0.14em] text-muted">Inbox</p>
          <h3 className="font-display mt-3 text-2xl">الطلبات</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {unread > 0 ? `${unread} طلب جديد من فورم الموقع.` : "الموجزات اللي جت من فورم التواصل."}
          </p>
        </Link>
      </div>
    </div>
  );
}
