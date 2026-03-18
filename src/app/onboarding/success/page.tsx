import Link from "next/link";

export const metadata = {
  title: "Profile Created — MarketFolk",
};

export default function OnboardingSuccessPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green">
        <svg
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-brand-dark">Profile Created!</h1>
      <p className="mt-3 text-brand-muted">
        Your helper profile is live. Vendors will be able to find you on
        MarketFolk.
      </p>

      <div className="mt-6 rounded-xl bg-brand-amber/10 p-4">
        <p className="text-sm text-brand-dark">
          <span className="font-semibold">Want the verified badge?</span> Upload
          your government ID from your dashboard to get verified and stand out to
          vendors.
        </p>
      </div>

      <Link
        href="/dashboard"
        className="mt-8 inline-block rounded-full bg-brand-green px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-light"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
