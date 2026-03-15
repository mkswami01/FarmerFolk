import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { workers } from "@/data/workers";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import { MarketTag } from "@/components/MarketTag";
import { AvailabilityBadge } from "@/components/AvailabilityBadge";

export function generateStaticParams() {
  return workers.map((w) => ({ id: w.id }));
}

export function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  return params.then(({ id }) => {
    const worker = workers.find((w) => w.id === id);
    return {
      title: worker
        ? `${worker.fullName} — MarketFolk`
        : "Worker Not Found — MarketFolk",
    };
  });
}

export default async function WorkerProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const worker = workers.find((w) => w.id === id);

  if (!worker) {
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
        Back to all workers
      </Link>

      <div className="mt-6 rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Image
            src={worker.photo}
            alt={worker.fullName}
            width={96}
            height={96}
            className="h-24 w-24 rounded-full bg-brand-cream"
            unoptimized
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-brand-dark">
              {worker.fullName}
            </h1>
            {worker.verified && (
              <div className="mt-2">
                <VerifiedBadge size="lg" />
              </div>
            )}
            <div className="mt-2">
              <AvailabilityBadge availability={worker.availability} />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            About
          </h2>
          <p className="mt-2 leading-relaxed text-brand-dark">{worker.bio}</p>
        </div>

        {/* Details grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              Experience
            </h2>
            <p className="mt-1 text-brand-dark">
              {worker.yearsExperience}{" "}
              {worker.yearsExperience === 1 ? "year" : "years"} at farmers
              markets
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              Skills
            </h2>
            <div className="mt-2 flex flex-wrap gap-2">
              {worker.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-dark"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Markets */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Markets Worked
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {worker.marketsWorked.map((market) => (
              <MarketTag key={market} name={market} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-lg bg-brand-green/5 p-6 text-center">
          <p className="text-brand-dark">
            Interested in hiring{" "}
            <span className="font-semibold">{worker.fullName}</span>?
          </p>
          <Link
            href="/waitlist"
            className="mt-3 inline-block rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
          >
            Join the waitlist to connect
          </Link>
        </div>
      </div>
    </div>
  );
}
