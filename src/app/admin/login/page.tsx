import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) redirect("/admin");

  return (
    <div className="grid min-h-screen place-items-center bg-hero-mesh p-4">
      <div className="pointer-events-none fixed inset-0 grid-lines opacity-30" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 backdrop-blur">
            <LogoMark className="h-12" variant="white" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            Hiral Admin
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Sign in to manage your website
          </p>
        </div>
        <div className="rounded-3xl border border-white/15 bg-white/95 p-8 shadow-brand backdrop-blur">
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Hiral International Courier Service
        </p>
      </div>
    </div>
  );
}
