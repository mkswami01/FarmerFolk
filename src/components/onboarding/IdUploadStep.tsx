"use client";

import { useState, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";

export function IdUploadStep({
  onComplete,
  onSkip,
}: {
  onComplete: () => void;
  onSkip: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file (JPEG, PNG).");
      return;
    }

    if (selected.size > 10 * 1024 * 1024) {
      setErrorMessage("File must be under 10MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setErrorMessage("");
  }

  async function handleUpload() {
    if (!file) return;
    setStatus("uploading");
    setErrorMessage("");

    try {
      const supabase = createSupabaseBrowserClient();

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setErrorMessage("You must be logged in.");
        setStatus("error");
        return;
      }

      // Upload to Supabase Storage
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const filePath = `${user.id}/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("id-documents")
        .upload(filePath, file);

      if (uploadError) {
        setErrorMessage("Upload failed. Please try again.");
        setStatus("error");
        return;
      }

      // Create id_verifications record via API
      const res = await fetch("/api/id-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to save verification record.");
        setStatus("error");
        return;
      }

      onComplete();
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-brand-dark">
          Upload Your Government ID
        </h3>
        <p className="mt-1 text-sm text-brand-muted">
          Upload a photo of your driver&apos;s license or government-issued ID.
          This helps vendors trust that you are who you say you are.
        </p>
      </div>

      {/* Upload area */}
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-xl border-2 border-dashed border-brand-green/30 p-8 text-center transition-colors hover:border-brand-green/50 hover:bg-brand-green/5"
      >
        {preview ? (
          <div className="space-y-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="ID preview"
              className="mx-auto max-h-48 rounded-lg"
            />
            <p className="text-sm text-brand-muted">{file?.name}</p>
            <p className="text-xs text-brand-green">Click to change</p>
          </div>
        ) : (
          <div className="space-y-2">
            <svg
              className="mx-auto h-12 w-12 text-brand-green/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <p className="text-sm font-medium text-brand-dark">
              Click to upload your ID
            </p>
            <p className="text-xs text-brand-muted">JPEG or PNG, max 10MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {errorMessage && (
        <p className="text-center text-sm text-red-600">{errorMessage}</p>
      )}

      <div className="flex flex-col gap-3">
        {file && (
          <button
            onClick={handleUpload}
            disabled={status === "uploading"}
            className="w-full rounded-full bg-brand-green py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-light disabled:opacity-50"
          >
            {status === "uploading" ? "Uploading..." : "Upload & Complete"}
          </button>
        )}

        <button
          onClick={onSkip}
          className="w-full rounded-full border border-brand-green/20 py-3 text-base font-medium text-brand-muted transition-colors hover:bg-brand-green/5 hover:text-brand-dark"
        >
          Skip for now
        </button>
      </div>

      <p className="text-center text-xs text-brand-muted">
        Your ID is securely stored and only reviewed by our team.
        You can always upload it later from your dashboard.
      </p>
    </div>
  );
}
