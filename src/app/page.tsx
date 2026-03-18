import { HeroSection } from "@/components/HeroSection";
import { WorkerCard } from "@/components/WorkerCard";
import { VendorCard } from "@/components/VendorCard";
import { workers } from "@/data/workers";
import { vendors } from "@/data/vendors";
import Link from "next/link";

export default function BrowsePage() {
  return (
    <>
      <HeroSection />

      <section id="workers" className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">
            Verified Helpers Ready to Help
          </h2>
          <p className="mt-2 text-brand-muted">
            Browse trusted, ID-verified helpers available at farmers markets
            near you.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} />
          ))}
        </div>
      </section>

      <section id="vendors" className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl">
              Vendors on MarketFolk
            </h2>
            <p className="mt-2 text-brand-muted">
              Local businesses that operate at farmers markets near you.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-xl bg-brand-green/5 p-8 text-center">
          <h3 className="text-xl font-semibold text-brand-dark">
            Ready to join the marketplace?
          </h3>
          <p className="mt-2 text-brand-muted">
            Whether you&apos;re a vendor looking for reliable help or a helper
            looking for booth shifts — we&apos;ve got you covered.
          </p>
          <Link
            href="/waitlist"
            className="mt-4 inline-block rounded-full bg-brand-amber px-6 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-amber-light"
          >
            Join the Waitlist
          </Link>
        </div>
      </section>
    </>
  );
}
