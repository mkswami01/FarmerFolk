"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const data = await res.json();
      setStatus("error");
      setErrorMessage(data.error || "Invalid email or password.");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your password"
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      {status === "error" && (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-green py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-light disabled:opacity-50"
      >
        {status === "loading" ? "Logging in..." : "Log In"}
      </button>

      <p className="text-center text-sm text-brand-muted">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="font-medium text-brand-green hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
