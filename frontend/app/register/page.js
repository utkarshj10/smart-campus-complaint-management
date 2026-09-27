"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PasswordInput from "../../components/PasswordInput";
import Icon from "../../components/Icon";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    student_id: "",
    academic_department: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.detail || data.message || "Registration failed");
        return;
      }

      setMessage("Registration successful. Redirecting to sign in...");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch {
      setError("Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb] px-5 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] max-w-xl items-center">
        <div className="w-full rounded-[26px] border border-slate-200 bg-white p-7 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-10">
          <div className="mb-8">
            <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d264f] text-white shadow-sm">
              <Icon name="dashboard" size={19} />
            </div>

            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-teal-700">
              Smart Campus
            </p>

            <h1 className="text-3xl font-semibold tracking-[-0.035em] text-slate-950">
              Create your account
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Register as a student to report and track campus complaints.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Full name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Student ID
                </label>

                <input
                  name="student_id"
                  value={form.student_id}
                  onChange={handleChange}
                  placeholder="e.g. 2026AIML001"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Department
                </label>

                <input
                  name="academic_department"
                  value={form.academic_department}
                  onChange={handleChange}
                  placeholder="e.g. AIML"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Email address
              </label>

              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold text-slate-700">
                Password
              </label>

              <PasswordInput
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
              />
            </div>

            {message && (
              <div className="rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-700">
                {message}
              </div>
            )}

            {error && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d264f] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(13,38,79,0.16)] transition hover:-translate-y-0.5 hover:bg-[#102f61] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
              {!loading && <Icon name="arrow" size={17} />}
            </button>
          </form>

          <div className="mt-7 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/"
                className="font-semibold text-[#0d264f] hover:text-teal-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}