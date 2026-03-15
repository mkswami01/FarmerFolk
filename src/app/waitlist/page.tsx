import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata = {
  title: "Join the Waitlist — MarketFolk",
};

export default function WaitlistPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-dark sm:text-4xl">
          Join the Market<span className="text-brand-amber">Folk</span> Waitlist
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">
          Be the first to know when we launch. Whether you&apos;re a vendor
          looking for reliable help or a worker looking for booth shifts,
          we&apos;ve got you covered.
        </p>
      </div>

      <div className="mt-10">
        <WaitlistForm />
      </div>

      {/* Value prop cards */}
      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-green/10">
            <svg className="h-5 w-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-brand-dark">
            For Vendors
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-green">&#10003;</span>
              Browse verified, ID-checked workers
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-green">&#10003;</span>
              Find help filtered by market and availability
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-green">&#10003;</span>
              No more word-of-mouth guessing games
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-green">&#10003;</span>
              Read reviews from other vendors
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-amber/10">
            <svg className="h-5 w-5 text-brand-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-brand-dark">
            For Workers
          </h3>
          <ul className="mt-3 space-y-2 text-sm text-brand-muted">
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-amber">&#10003;</span>
              Get verified and stand out to vendors
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-amber">&#10003;</span>
              Build a reputation with reviews and ratings
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-amber">&#10003;</span>
              Set your availability and preferred markets
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 text-brand-amber">&#10003;</span>
              Find consistent booth work near you
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
