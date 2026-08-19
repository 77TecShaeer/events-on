import { redirect } from "next/navigation";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";

export default async function LoginPage() {
  if (await isAdmin()) redirect("/admin");
  const ready = adminConfigured();

  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-[#0c0c0c] px-5 py-16 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-1" aria-hidden>
        <span className="flex-1 bg-brand-pink" />
        <span className="w-24 bg-white" />
        <span className="flex-1 bg-brand-green" />
      </div>
      <div className="w-full max-w-md border border-white/10 bg-[#141414] p-8 sm:p-10">
        <div className="text-[22px]">
          <Logo variant="onDark" />
        </div>
        <h1 className="font-display mt-8 text-4xl">أهلاً</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/55">
          {ready ? "ادخل عشان تشوف الطلبات وتغيّر كلام وصور الموقع." : "الدخول مش جاهز لسه. كلّم اللي عامل الموقع."}
        </p>
        {ready ? <LoginForm /> : null}
      </div>
    </main>
  );
}
