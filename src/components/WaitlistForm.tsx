"use client";

import { useState } from "react";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"worker" | "vendor">("worker");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    if (!res.ok) {
      const data = await res.json();
      setStatus("error");
      setErrorMessage(data.error || "Something went wrong. Please try again.");
    } else {
      setStatus("success");
      setEmail("");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-brand-green/10 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-brand-dark">
          You&apos;re on the list!
        </h3>
        <p className="mt-1 text-brand-muted">
          We&apos;ll be in touch soon with updates.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm font-medium text-brand-green hover:underline"
        >
          Sign up another email
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4">
      {/* Role toggle */}
      <div className="flex rounded-lg bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setRole("worker")}
          className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
            role === "worker"
              ? "bg-brand-green text-white"
              : "text-brand-muted hover:text-brand-dark"
          }`}
        >
          I&apos;m a Worker
        </button>
        <button
          type="button"
          onClick={() => setRole("vendor")}
          className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
            role === "vendor"
              ? "bg-brand-green text-white"
              : "text-brand-muted hover:text-brand-dark"
          }`}
        >
          I&apos;m a Vendor
        </button>
      </div>

      {/* Email input */}
      <div>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      {/* Error message */}
      {status === "error" && (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-amber py-3 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light disabled:opacity-50"
      >
        {status === "loading" ? "Joining..." : "Join the Waitlist"}
      </button>
    </form>
  );
}
