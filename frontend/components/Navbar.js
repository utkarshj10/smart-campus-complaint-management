"use client";

import { useRouter, usePathname } from "next/navigation";
import Icon from "./Icon";

export default function Navbar({ title }) {
  const router = useRouter();
  const pathname = usePathname();

  const isAdmin = pathname?.startsWith("/admin");

  const logout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0d264f] text-white shadow-sm">
              <Icon name="dashboard" size={18} strokeWidth={1.7} />
            </div>

            <div>
              <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#0d264f]">
                Smart Campus
              </p>
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
                Complaint Management
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden rounded-lg bg-slate-50 px-3 py-2 sm:block">
              <span className="text-xs font-medium text-slate-500">
                {title || (isAdmin ? "Admin Portal" : "Student Portal")}
              </span>
            </div>

            <button
              onClick={logout}
              className="group flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 hover:text-[#0d264f]"
            >
              <Icon name="logout" size={15} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}