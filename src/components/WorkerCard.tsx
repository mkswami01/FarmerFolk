import Image from "next/image";
import Link from "next/link";
import { VerifiedBadge } from "./VerifiedBadge";
import { MarketTag } from "./MarketTag";
import { AvailabilityBadge } from "./AvailabilityBadge";
import type { Worker } from "@/data/workers";

export function WorkerCard({ worker }: { worker: Worker }) {
  return (
    <Link
      href={`/workers/${worker.id}`}
      className="group block rounded-xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <Image
          src={worker.photo}
          alt={worker.fullName}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full bg-brand-cream"
          unoptimized
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-brand-dark group-hover:text-brand-green">
              {worker.fullName}
            </h3>
          </div>
          <div className="mt-1">
            <VerifiedBadge level={worker.verification} />
          </div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-brand-muted">
        {worker.bio}
      </p>

      <div className="mt-3">
        <AvailabilityBadge availability={worker.availability} />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {worker.marketsWorked.slice(0, 2).map((market) => (
          <MarketTag key={market} name={market} />
        ))}
        {worker.marketsWorked.length > 2 && (
          <span className="inline-block rounded-full bg-brand-green/5 px-3 py-1 text-xs text-brand-muted">
            +{worker.marketsWorked.length - 2} more
          </span>
        )}
      </div>
    </Link>
  );
}
