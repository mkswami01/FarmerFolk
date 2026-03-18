"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StepIndicator } from "./onboarding/StepIndicator";
import { ProfileStep } from "./onboarding/ProfileStep";
import { IdUploadStep } from "./onboarding/IdUploadStep";

export function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleProfileSubmit(data: {
    fullName: string;
    bio: string;
    availability: string;
    marketsWorked: string[];
    skills: string[];
  }) {
    setError("");

    const res = await fetch("/api/worker-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json();
      setError(body.error || "Failed to save profile.");
      return;
    }

    setStep(2);
  }

  function handleComplete() {
    router.push("/onboarding/success");
  }

  function handleSkip() {
    router.push("/onboarding/success");
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-8">
        <StepIndicator currentStep={step} />
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-center text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {step === 1 && <ProfileStep onNext={handleProfileSubmit} />}
        {step === 2 && (
          <IdUploadStep onComplete={handleComplete} onSkip={handleSkip} />
        )}
      </div>
    </div>
  );
}
