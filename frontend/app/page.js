"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordInput from "../components/PasswordInput";
import Icon from "../components/Icon";

export default function Home() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || data.message || "Login failed");
        return;
      }

      sessionStorage.setItem("access_token", data.access_token);

      const payload = JSON.parse(
        atob(data.access_token.split(".")[1])
      );

      if (payload.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f6f8fb]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(13,38,79,0.08),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(13,118,110,0.07),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[0.9fr_1.1fr]">

          <div className="relative hidden overflow-hidden bg-[#0d264f] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/5 blur-2xl" />
            <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />

            <div className="relative">
              <div className="mb-10 flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                <Icon name="dashboard" size={20} />
              </div>

              <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-teal-300">
                Smart Campus
              </p>

              <h1 className="max-w-sm text-4xl font-semibold leading-[1.1] tracking-[-0.04em]">
                One place to report what needs fixing.
              </h1>

              <p className="mt-5 max-w-sm text-sm leading-6 text-slate-300">
                Submit campus complaints, let the system classify them
                automatically, and track their progress from one dashboard.
              </p>
            </div>

            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/6 p-4">
                <Icon name="spark" size={18} />
                <p className="mt-3 text-xs font-medium text-slate-300">
                  Automatic
                </p>
                <p className="mt-1 text-sm font-medium">
                  AI classification
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/6 p-4">
                <Icon name="clock" size={18} />
                <p className="mt-3 text-xs font-medium text-slate-300">
                  Real-time
                </p>
                <p className="mt-1 text-sm font-medium">
                  Status tracking
                </p>
              </div>
            </div>
          </div>

          <div className="p-7 sm:p-10 lg:p-14">
            <div className="mx-auto max-w-md">
              <div className="mb-9">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d264f]/5 text-[#0d264f] lg:hidden">
                  <Icon name="dashboard" size={18} />
                </div>

                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
                  Welcome back
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950">
                  Sign in to your account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Access your complaints and campus updates.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-semibold text-slate-700"
                    >
                      Password
                    </label>
                  </div>

                  <PasswordInput
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                </div>

                {error && (
                  <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d264f] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(13,38,79,0.16)] transition hover:-translate-y-0.5 hover:bg-[#102f61] hover:shadow-[0_12px_25px_rgba(13,38,79,0.20)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : "Sign in"}
                  {!loading && <Icon name="arrow" size={17} />}
                </button>
              </form>

              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-[11px] font-medium text-slate-400">
                  OR
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <p className="text-center text-sm text-slate-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-[#0d264f] transition hover:text-teal-700"
                >
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}