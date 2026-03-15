import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-brand-green">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
          Find Verified Workers for Your{" "}
          <span className="text-brand-amber">Farmers Market</span> Booth
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
          The first marketplace connecting vendors with trusted, ID-verified
          help. No more word-of-mouth. No more no-shows.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/waitlist"
            className="rounded-full bg-brand-amber px-8 py-3 text-base font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light"
          >
            Join the Waitlist
          </Link>
          <a
            href="#workers"
            className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            Browse Workers
          </a>
        </div>
      </div>
    </section>
  );
}
