"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Icon from "../../components/Icon";
import { apiFetch } from "../../lib/api";

const statuses = ["Pending", "In Progress", "Resolved"];

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const data = await apiFetch("/complaints/admin");

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

  const updateStatus = async (complaintId, status) => {
    setUpdating(complaintId);
    setError("");

    try {
      await apiFetch(
        `/complaints/admin/${complaintId}/status?status=${encodeURIComponent(
          status,
        )}`,
        {
          method: "PUT",
        },
      );

      setComplaints((current) =>
        current.map((complaint) =>
          complaint.complaint_id === complaintId
            ? { ...complaint, status }
            : complaint,
        ),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdating("");
    }
  };

  const pending = complaints.filter((c) => c.status === "Pending").length;

  const inProgress = complaints.filter(
    (c) => c.status === "In Progress",
  ).length;

  const resolved = complaints.filter((c) => c.status === "Resolved").length;

  const priorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-600 border-red-100";
    }

    if (priority === "Medium") {
      return "bg-amber-50 text-amber-700 border-amber-100";
    }

    return "bg-slate-50 text-slate-600 border-slate-200";
  };

  const statusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-teal-50 text-teal-700 border-teal-100";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Navbar title="Admin Portal" />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-teal-700">
            Administration
          </p>

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Complaint overview
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Review, prioritize and update reported campus issues.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500">
              <Icon name="shield" size={15} />
              Administrator access
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStat label="Total" value={complaints.length} />

          <AdminStat label="Pending" value={pending} accent="amber" />

          <AdminStat label="In progress" value={inProgress} accent="blue" />

          <AdminStat label="Resolved" value={resolved} accent="teal" />
        </div>

        {error && (
          <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-[20px] border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            Loading complaints...
          </div>
        ) : complaints.length === 0 ? (
          <div className="rounded-[20px] border border-dashed border-slate-300 bg-white p-14 text-center">
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#0d264f]/5 text-[#0d264f]">
              <Icon name="clipboard" size={19} />
            </div>

            <h3 className="font-semibold text-slate-800">
              No complaints found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              New complaints will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <article
                key={complaint.complaint_id}
                className="rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] transition hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.07)] sm:p-6"
              >
                <div className="grid gap-6 lg:grid-cols-[1fr_190px]">
                  <div>
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d264f] text-sm font-semibold text-white">
                        {complaint.student_name?.charAt(0)?.toUpperCase() ||
                          "S"}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {complaint.student_name}
                        </p>

                        <p className="mt-0.5 text-xs text-slate-400">
                          {complaint.student_id}
                          {complaint.student_email
                            ? ` · ${complaint.student_email}`
                            : ""}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold ${priorityStyle(
                          complaint.priority,
                        )}`}
                      >
                        {complaint.priority} priority
                      </span>

                      <span className="rounded-md bg-[#0d264f]/5 px-2.5 py-1 text-[11px] font-semibold text-[#0d264f]">
                        {complaint.category}
                      </span>
                    </div>

                    <p className="mt-4 max-w-3xl text-sm font-medium leading-6 text-slate-900">
                      {complaint.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Icon name="location" size={14} />
                        {complaint.venue}
                      </span>

                      <span>
                        Department:{" "}
                        <span className="font-medium text-slate-700">
                          {complaint.department}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="lg:border-l lg:border-slate-100 lg:pl-6">
                    <label className="mb-2 block text-xs font-semibold text-slate-500">
                      Update status
                    </label>

                    <StatusDropdown
                      value={complaint.status}
                      disabled={updating === complaint.complaint_id}
                      onChange={(status) =>
                        updateStatus(complaint.complaint_id, status)
                      }
                    />

                    {updating === complaint.complaint_id && (
                      <p className="mt-2 text-[11px] text-slate-400">
                        Updating...
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function AdminStat({ label, value, accent = "navy" }) {
  const styles = {
    navy: "border-slate-200/80 bg-white text-[#0d264f]",
    amber: "border-amber-100 bg-amber-50/60 text-amber-700",
    blue: "border-blue-100 bg-blue-50/60 text-blue-700",
    teal: "border-teal-100 bg-teal-50/60 text-teal-700",
  };

  return (
    <div
      className={`rounded-[18px] border p-5 shadow-[0_5px_20px_rgba(15,23,42,0.035)] ${styles[accent]}`}
    >
      <p className="text-xs font-medium opacity-75">{label}</p>

      <p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{value}</p>
    </div>
  );
}

function StatusDropdown({ value, onChange, disabled }) {
  const [open, setOpen] = useState(false);

  const statusStyle = (status) => {
    if (status === "Resolved") {
      return "bg-teal-50 text-teal-700 border-teal-100";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700 border-blue-100";
    }

    return "bg-amber-50 text-amber-700 border-amber-100";
  };

  return (
    <div className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`flex h-11 w-full items-center justify-between rounded-xl border px-3 text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-[#0d264f]/5 disabled:cursor-not-allowed disabled:opacity-60 ${statusStyle(
          value,
        )}`}
      >
        <span>{value}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          {statuses.map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => {
                setOpen(false);
                onChange(status);
              }}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                status === value
                  ? "bg-slate-50 text-[#0d264f]"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
