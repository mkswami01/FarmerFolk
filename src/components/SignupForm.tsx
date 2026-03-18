"use client";

import { useState } from "react";
import Link from "next/link";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    setStatus("loading");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setStatus("error");
      setErrorMessage(data.error || "Something went wrong.");
    } else {
      setStatus("success");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl bg-brand-green/10 p-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-brand-dark">Check your email</h3>
        <p className="mt-1 text-brand-muted">
          We sent a confirmation link to <span className="font-medium text-brand-dark">{email}</span>.
          Click the link to activate your account.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-dark">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-brand-dark">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-brand-dark">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      {status === "error" && (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-amber py-3 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light disabled:opacity-50"
      >
        {status === "loading" ? "Creating account..." : "Sign Up as a Helper"}
      </button>

      <p className="text-center text-sm text-brand-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-brand-green hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
