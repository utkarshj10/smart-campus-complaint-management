"use client";

import { useState } from "react";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Enter your password",
  name,
  id,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#0d264f] focus:bg-white focus:ring-4 focus:ring-[#0d264f]/5"
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
      >
        {showPassword ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.6 10.7a2 2 0 002.7 2.7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.9 4.2A10.8 10.8 0 0112 4c5.2 0 8.8 4.7 9.8 7a12.7 12.7 0 01-3.1 4"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.2 6.3C4.3 7.7 3.1 9.4 2.2 11c1 2.3 4.6 7 9.8 7 1 0 2-.2 2.9-.5"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z"
            />
            <circle cx="12" cy="12" r="2.5" />
          </svg>
        )}
      </button>
    </div>
  );
}
