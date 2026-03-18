"use client";

import { VerifiedBadge } from "./VerifiedBadge";
import { MarketTag } from "./MarketTag";
import { AvailabilityBadge } from "./AvailabilityBadge";
import { IdUploadStep } from "./onboarding/IdUploadStep";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardProfileProps {
  profile: {
    full_name: string;
    bio: string | null;
    availability: string;
    markets_worked: string[];
    skills: string[];
  };
  verification: {
    status: "pending" | "approved" | "rejected";
  } | null;
}

export function DashboardProfile({ profile, verification }: DashboardProfileProps) {
  const [showUpload, setShowUpload] = useState(false);
  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="text-2xl font-bold text-brand-dark">Your Dashboard</h1>

      {/* Verification status banner */}
      <div className="mt-4">
        {verification?.status === "approved" && (
          <div className="rounded-lg bg-brand-green/10 p-4">
            <div className="flex items-center gap-2">
              <VerifiedBadge level="verified" size="lg" />
              <span className="text-sm text-brand-dark">
                Your identity has been verified. The badge is visible on your profile.
              </span>
            </div>
          </div>
        )}
        {verification?.status === "pending" && (
          <div className="rounded-lg bg-brand-amber/10 p-4">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-amber">
                <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                </svg>
              </span>
              <span className="text-sm font-medium text-brand-dark">
                ID verification pending review
              </span>
            </div>
          </div>
        )}
        {verification?.status === "rejected" && (
          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm text-red-700">
              Your ID verification was not approved. Please upload a clearer photo of your government-issued ID.
            </p>
          </div>
        )}
        {!verification && (
          <div className="rounded-lg bg-brand-cream p-4">
            <p className="text-sm text-brand-muted">
              You haven&apos;t submitted your ID for verification yet.{" "}
              <button
                onClick={() => setShowUpload(true)}
                className="font-medium text-brand-green hover:underline"
              >
                Upload now
              </button>{" "}
              to get the verified badge.
            </p>
          </div>
        )}
      </div>

      {/* ID Upload section (when triggered) */}
      {showUpload && !verification && (
        <div className="mt-6 rounded-xl bg-white p-6 shadow-sm">
          <IdUploadStep
            onComplete={() => {
              setShowUpload(false);
              router.refresh();
            }}
            onSkip={() => setShowUpload(false)}
          />
        </div>
      )}

      {/* Profile card */}
      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-dark">
              {profile.full_name}
            </h2>
            {verification?.status === "approved" && (
              <div className="mt-1">
                <VerifiedBadge level="verified" size="lg" />
              </div>
            )}
          </div>
        </div>

        {profile.bio && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              About
            </h3>
            <p className="mt-1 text-brand-dark">{profile.bio}</p>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Availability
          </h3>
          <div className="mt-1">
            <AvailabilityBadge availability={profile.availability} />
          </div>
        </div>

        {profile.skills.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              Skills
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-dark"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.markets_worked.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              Markets
            </h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {profile.markets_worked.map((market) => (
                <MarketTag key={market} name={market} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
