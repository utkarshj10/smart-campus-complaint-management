"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Icon from "../../components/Icon";
import { apiFetch } from "../../lib/api";

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await apiFetch("/complaints/");

        if (!cancelled) {
          setComplaints(data.complaints || []);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      await apiFetch("/complaints/", {
        method: "POST",
        body: JSON.stringify({
          description,
          venue,
        }),
      });

      setDescription("");
      setVenue("");
      setMessage("Your complaint has been submitted successfully.");

      const data = await apiFetch("/complaints/");
      setComplaints(data.complaints || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const pending = complaints.filter(
    (c) => c.status === "Pending"
  ).length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress"
  ).length;

  const resolved = complaints.filter(
    (c) => c.status === "Resolved"
  ).length;

  const statusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-teal-50 text-teal-700 border-teal-100";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  const priorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-600 border-red-100";
    }

    if (priority === "Medium") {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }

    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Navbar title="Student Portal" />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <section className="mb-8 overflow-hidden rounded-3xl bg-[#0d264f] px-7 py-8 text-white shadow-[0_15px_45px_rgba(13,38,79,0.13)] sm:px-9">
          <div className="relative">
            <div className="absolute -right-20 -top-32 h-72 w-72 rounded-full bg-white/4 blur-2xl" />

            <div className="relative">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-300">
                Student Portal
              </p>

              <h1 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Keep your campus running better.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300">
                Report problems, let our system categorize them automatically,
                and follow their progress until they are resolved.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <StatCard
            label="Total complaints"
            value={complaints.length}
            caption="All submissions"
            icon="clipboard"
          />

          <StatCard
            label="Active"
            value={pending + inProgress}
            caption="Pending or in progress"
            icon="clock"
            accent="amber"
          />

          <StatCard
            label="Resolved"
            value={resolved}
            caption="Successfully completed"
            icon="check"
            accent="teal"
          />
        </section>

        <div className="grid gap-6 xl:grid-cols-[390px_1fr]">
          <section className="h-fit rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_8px_30px_rgba(15,23,42,0.045)] sm:p-7">
            <div className="mb-7">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d264f]/5 text-[#0d264f]">
                <Icon name="plus" size={20} />
              </div>

              <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                Report an issue
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-slate-500">
                Give us enough detail to understand what needs attention.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What is wrong?"
                  rows={6}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-slate-700">
                  Location
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    <Icon name="location" size={17} />
                  </div>

                  <input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Lab 308"
                    required
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
                  />
                </div>
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
                disabled={submitting}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d264f] text-sm font-semibold text-white shadow-[0_8px_20px_rgba(13,38,79,0.14)] transition hover:-translate-y-0.5 hover:bg-[#102f61] hover:shadow-[0_12px_25px_rgba(13,38,79,0.18)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Analyzing complaint..." : "Submit complaint"}

                {!submitting && <Icon name="arrow" size={17} />}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Icon name="spark" size={13} />
                Category and priority are assigned automatically.
              </div>
            </form>
          </section>

          <section>
            <div className="mb-5 flex items-end justify-between">
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-teal-700">
                  Activity
                </p>

                <h2 className="text-xl font-semibold tracking-tight text-slate-950">
                  Your complaints
                </h2>
              </div>

              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500">
                {complaints.length} total
              </span>
            </div>

            {loading ? (
              <div className="rounded-[20px] border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                Loading your complaints...
              </div>
            ) : complaints.length === 0 ? (
              <div className="rounded-[20px] border border-dashed border-slate-300 bg-white px-8 py-16 text-center">
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0d264f]/5 text-[#0d264f]">
                  <Icon name="clipboard" size={20} />
                </div>

                <h3 className="font-semibold text-slate-800">
                  Nothing here yet
                </h3>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  Once you submit a complaint, its category, priority and
                  current status will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {complaints.map((complaint) => (
                  <article
                    key={complaint.complaint_id}
                    className="group rounded-[18px] border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)]"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="min-w-0">
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="rounded-md bg-[#0d264f]/5 px-2.5 py-1 text-[11px] font-semibold text-[#0d264f]">
                            {complaint.category}
                          </span>

                          <span
                            className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold ${priorityStyle(
                              complaint.priority
                            )}`}
                          >
                            {complaint.priority} priority
                          </span>
                        </div>

                        <p className="text-sm font-medium leading-6 text-slate-900">
                          {complaint.description}
                        </p>

                        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                          <Icon name="location" size={14} />
                          {complaint.venue}
                        </div>
                      </div>

                      <span
                        className={`shrink-0 self-start rounded-full border px-3 py-1.5 text-[11px] font-semibold ${statusStyle(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, caption, icon, accent = "navy" }) {
  const styles = {
    navy: {
      wrapper: "border-slate-200/80 bg-white",
      icon: "bg-[#0d264f]/5 text-[#0d264f]",
      value: "text-[#0d264f]",
    },
    amber: {
      wrapper: "border-amber-100 bg-amber-50/60",
      icon: "bg-amber-100/70 text-amber-700",
      value: "text-amber-700",
    },
    teal: {
      wrapper: "border-teal-100 bg-teal-50/60",
      icon: "bg-teal-100/70 text-teal-700",
      value: "text-teal-700",
    },
  };

  const style = styles[accent];

  return (
    <div className={`rounded-[18px] border p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] ${style.wrapper}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{label}</p>

          <p className={`mt-2 text-3xl font-semibold tracking-[-0.04em] ${style.value}`}>
            {value}
          </p>

          <p className="mt-1 text-[11px] text-slate-400">{caption}</p>
        </div>

        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${style.icon}`}>
          <Icon name={icon} size={17} />
        </div>
      </div>
    </div>
  );
}