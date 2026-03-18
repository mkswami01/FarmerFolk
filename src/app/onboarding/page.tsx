import { OnboardingWizard } from "@/components/OnboardingWizard";

export const metadata = {
  title: "Set Up Your Profile — MarketFolk",
};

export default function OnboardingPage() {
  return (
    <div>
      <div className="bg-brand-green py-8 text-center">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Set Up Your Helper Profile
        </h1>
        <p className="mt-2 text-white/70">
          Tell vendors who you are and what you bring to the booth.
        </p>
      </div>
      <OnboardingWizard />
    </div>
  );
}
