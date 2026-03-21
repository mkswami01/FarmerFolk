"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function VendorSignupForm() {
  const [businessName, setBusinessName] = useState("");
  const [password, setPassword] = useState("");
  const [infoType, setInfoType] = useState<"website" | "description">("website");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    // Store in sessionStorage for the profile page to pick up
    const vendorData = {
      businessName,
      website: infoType === "website" ? website : "",
      description: infoType === "description" ? description : "",
    };
    sessionStorage.setItem("vendor-demo", JSON.stringify(vendorData));

    // Simulate a brief loading state for the demo
    setTimeout(() => {
      router.push("/vendor-profile");
    }, 800);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="businessName" className="block text-sm font-medium text-brand-dark">
          Business Name *
        </label>
        <input
          id="businessName"
          type="text"
          required
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          placeholder="e.g. Saffron Scoops n' Bites"
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-brand-dark">
          Create a Password *
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

      {/* Toggle: website or description */}
      <div>
        <p className="text-sm font-medium text-brand-dark">
          Tell us about your business *
        </p>
        <div className="mt-2 flex rounded-lg bg-brand-cream p-1">
          <button
            type="button"
            onClick={() => setInfoType("website")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              infoType === "website"
                ? "bg-brand-green text-white"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            Website URL
          </button>
          <button
            type="button"
            onClick={() => setInfoType("description")}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition-colors ${
              infoType === "description"
                ? "bg-brand-green text-white"
                : "text-brand-muted hover:text-brand-dark"
            }`}
          >
            Describe It
          </button>
        </div>

        {infoType === "website" ? (
          <input
            type="url"
            required
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://yourbusiness.com"
            className="mt-3 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        ) : (
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you sell? Which markets do you operate at?"
            rows={3}
            className="mt-3 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-brand-amber py-3 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light disabled:opacity-50"
      >
        {status === "loading" ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating your profile...
          </span>
        ) : (
          "Sign Up & Create Profile"
        )}
      </button>

      <p className="text-center text-xs text-brand-muted">
        Your profile will be generated automatically from the info you provide.
      </p>
    </form>
  );
}
