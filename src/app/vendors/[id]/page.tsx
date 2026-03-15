import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { vendors } from "@/data/vendors";
import { MarketTag } from "@/components/MarketTag";

export function generateStaticParams() {
  return vendors.map((v) => ({ id: v.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const vendor = vendors.find((v) => v.id === id);
    return {
      title: vendor
        ? `${vendor.businessName} — MarketFolk`
        : "Vendor Not Found — MarketFolk",
    };
  });
}

export default async function VendorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const vendor = vendors.find((v) => v.id === id);

  if (!vendor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-brand-muted hover:text-brand-green"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to browse
      </Link>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Image
            src={vendor.photo}
            alt={vendor.businessName}
            width={96}
            height={96}
            className="h-24 w-24 rounded-xl bg-brand-cream"
            unoptimized
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-brand-dark">
              {vendor.businessName}
            </h1>
            <p className="mt-1 text-brand-muted">
              Owned by {vendor.ownerName}
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            About
          </h2>
          <p className="mt-2 leading-relaxed text-brand-dark">{vendor.bio}</p>
        </div>

        {/* Products */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Products
          </h2>
          <p className="mt-1 text-brand-dark">{vendor.products}</p>
        </div>

        {/* Markets */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Active Markets
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {vendor.marketsActive.map((market) => (
              <MarketTag key={market} name={market} />
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Contact
          </h2>
          <p className="mt-1 text-brand-dark">{vendor.ownerEmail}</p>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-lg bg-brand-green/5 p-6 text-center">
          <p className="text-brand-dark">
            Looking for reliable booth help for{" "}
            <span className="font-semibold">{vendor.businessName}</span>?
          </p>
          <Link
            href="/waitlist"
            className="mt-3 inline-block rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
          >
            Join the waitlist
          </Link>
        </div>
      </div>
    </div>
  );
}
