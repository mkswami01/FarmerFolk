import Image from "next/image";
import Link from "next/link";
import { MarketTag } from "./MarketTag";
import type { Vendor } from "@/data/vendors";

export function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="group block rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <Image
          src={vendor.photo}
          alt={vendor.businessName}
          width={64}
          height={64}
          className="h-16 w-16 rounded-xl bg-brand-cream"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold text-brand-dark group-hover:text-brand-green">
            {vendor.businessName}
          </h3>
          <p className="text-sm text-brand-muted">{vendor.ownerName}</p>
        </div>
      </div>

      <p className="mt-3 text-sm text-brand-muted">
        {vendor.products}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {vendor.marketsActive.slice(0, 2).map((market) => (
          <MarketTag key={market} name={market} />
        ))}
        {vendor.marketsActive.length > 2 && (
          <span className="inline-block rounded-full bg-brand-green/5 px-3 py-1 text-xs text-brand-muted">
            +{vendor.marketsActive.length - 2} more
          </span>
        )}
      </div>
    </Link>
  );
}
