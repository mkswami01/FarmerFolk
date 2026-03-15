import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-green/10 bg-brand-cream">
      <div className="mx-auto max-w-6xl px-4 py-8 text-center">
        <p className="text-sm text-brand-muted">
          <span className="font-semibold text-brand-green">Market</span>
          <span className="font-semibold text-brand-amber">Folk</span>
          {" "}&copy; 2026 &mdash; Connecting farmers market vendors with verified workers.
        </p>
        <Link
          href="/waitlist"
          className="mt-2 inline-block text-sm font-medium text-brand-green hover:underline"
        >
          Join the waitlist &rarr;
        </Link>
      </div>
    </footer>
  );
}
