"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/providers/ToastProvider";
import { DEFAULT_ADMIN_EMAIL } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState(DEFAULT_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const data = await response.json();
        if (data.authenticated) {
          router.replace("/admin/dashboard");
          return;
        }
      } catch {
        // no-op
      } finally {
        setChecking(false);
      }
    }

    checkSession();
  }, [router]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        showToast(data.error || "Invalid credentials.", "error");
        return;
      }

      showToast("Login successful.", "success");
      router.replace("/admin/dashboard");
    } catch {
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="grid min-h-screen place-items-center bg-black px-4">
        <p className="text-sm text-white/70">Checking session...</p>
      </div>
    );
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-black px-4">
      <div className="pointer-events-none absolute left-1/2 top-[-200px] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,50,50,0.25)_0%,rgba(255,50,50,0)_70%)]" />
      <form onSubmit={handleSubmit} className="z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-red-200/80">Admin</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">NeuroFlow Dashboard Login</h1>
        <p className="mt-2 text-sm text-white/65">Secure access for leads, contacts, bookings, and analytics.</p>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            placeholder="Admin email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm text-white outline-none focus:border-red-300/50"
            placeholder="Password"
            required
          />
        </div>

        <button
          disabled={loading}
          className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
