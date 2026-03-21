"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MarketTag } from "./MarketTag";

interface VendorData {
  email: string;
  website: string;
  businessName: string;
  description: string;
  headings?: string[];
  image: string;
}

function generateProfile(data: VendorData) {
  // Use crawled business name, or derive from email domain
  const name =
    data.businessName ||
    data.email.split("@")[1]?.split(".")[0]?.replace(/-/g, " ") ||
    "My Business";

  // Capitalize each word
  const displayName = name
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const initials = displayName
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Build description from all available data
  const allText = [
    data.description || "",
    ...(data.headings || []),
    displayName,
  ].join(" ").toLowerCase();

  // Use crawled description as bio, enrich if too short
  let bio: string;
  if (data.description && data.description.length > 40) {
    bio = data.description;
  } else if (data.description) {
    bio = `${data.description} ${displayName} is a local business proudly serving the Northern Colorado farmers market community.`;
  } else if (data.website) {
    bio = `${displayName} is a local business serving the Northern Colorado farmers market community.`;
  } else {
    bio = `${displayName} is a local business serving the Northern Colorado farmers market community.`;
  }

  // Infer products from all crawled text (description + headings + name)
  const productMatches: string[] = [];
  const productMap: [RegExp, string][] = [
    [/honey|bee|hive|nectar|pollen|propolis/, "Raw honey and bee products"],
    [/bake|bread|pastry|sourdough|cookie|cake|pie/, "Baked goods and pastries"],
    [/vegetable|produce|farm|organic|greens|lettuce/, "Fresh produce and vegetables"],
    [/craft|pottery|ceramic|art|handmade|handcraft/, "Handmade crafts and artisan goods"],
    [/salsa|sauce|spice|pepper|hot sauce/, "Salsas, sauces, and spices"],
    [/ice cream|gelato|dessert|sweet|candy|chocolate/, "Ice cream, desserts, and treats"],
    [/coffee|tea|brew|roast|espresso/, "Coffee, tea, and beverages"],
    [/meat|jerky|ranch|beef|pork|sausage|bacon/, "Locally raised meats"],
    [/flower|plant|garden|bouquet|floral/, "Fresh flowers and plants"],
    [/soap|lotion|skin|balm|candle|wax/, "Soaps, candles, and skincare"],
    [/jam|jelly|preserve|marmalade|canned/, "Jams, preserves, and canned goods"],
    [/cheese|dairy|milk|yogurt|butter/, "Artisan dairy and cheese"],
    [/wine|cider|mead|kombucha|ferment/, "Beverages and fermented goods"],
    [/olive|oil|vinegar/, "Oils and vinegars"],
    [/herb|lavender|mint|basil/, "Fresh herbs and botanicals"],
  ];

  for (const [pattern, label] of productMap) {
    if (pattern.test(allText)) {
      productMatches.push(label);
    }
  }

  // Use headings as additional product hints
  const meaningfulHeadings = (data.headings || [])
    .filter((h) => h.length > 3 && h.length < 60)
    .slice(0, 4);

  const products = productMatches.length > 0
    ? productMatches.slice(0, 3).join(", ")
    : meaningfulHeadings.length > 0
      ? meaningfulHeadings.join(", ")
      : "Local goods and products";

  // Use crawled OG image or generate initials avatar
  const photo =
    data.image ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=2D6A4F`;

  return {
    businessName: displayName,
    email: data.email,
    initials,
    bio,
    products,
    website: data.website,
    markets: ["Fort Collins Farmers Market"],
    photo,
  };
}

export function VendorDemoProfile() {
  const [profile, setProfile] = useState<ReturnType<typeof generateProfile> | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("vendor-demo");
    if (!stored) {
      router.push("/vendor-signup");
      return;
    }

    // Simulate profile generation delay for the demo
    setTimeout(() => {
      const data: VendorData = JSON.parse(stored);
      setProfile(generateProfile(data));
      setLoading(false);
    }, 1200);
  }, [router]);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-brand-green/20 border-t-brand-green" />
        <h2 className="text-xl font-semibold text-brand-dark">
          Generating your profile...
        </h2>
        <p className="mt-2 text-brand-muted">
          Setting up your vendor page on MarketFolk
        </p>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* Success banner */}
      <div className="mb-6 rounded-xl bg-brand-green/10 p-4 text-center">
        <p className="text-sm font-medium text-brand-green">
          Your vendor profile is live! Here&apos;s how it looks to helpers.
        </p>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Image
            src={profile.photo}
            alt={profile.businessName}
            width={96}
            height={96}
            className="h-24 w-24 rounded-xl bg-brand-cream object-cover"
            unoptimized
          />
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-brand-dark">
              {profile.businessName}
            </h1>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-brand-green/10 px-2.5 py-0.5 text-xs font-medium text-brand-green">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="10" fill="#2D6A4F" />
                <path d="M6 10.5L8.5 13L14 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Verified Vendor
            </span>
            <p className="mt-1 text-sm text-brand-muted">{profile.email}</p>
          </div>
        </div>

        {/* About */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            About
          </h2>
          <p className="mt-2 leading-relaxed text-brand-dark">{profile.bio}</p>
        </div>

        {/* Products */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Products
          </h2>
          <p className="mt-1 text-brand-dark">{profile.products}</p>
        </div>

        {/* Markets */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
            Active Markets
          </h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {profile.markets.map((market) => (
              <MarketTag key={market} name={market} />
            ))}
          </div>
        </div>

        {/* Website */}
        {profile.website && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-brand-muted">
              Website
            </h2>
            <p className="mt-1 text-brand-green">{profile.website}</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 rounded-lg bg-brand-amber/10 p-6 text-center">
          <h3 className="font-semibold text-brand-dark">
            Ready to find helpers for your booth?
          </h3>
          <p className="mt-1 text-sm text-brand-muted">
            Browse verified helpers or post that you&apos;re looking for help.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/#workers"
              className="rounded-full bg-brand-green px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-green-light"
            >
              Browse Helpers
            </Link>
            <Link
              href="/waitlist"
              className="rounded-full border border-brand-green/20 px-6 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-green/5"
            >
              Join Waitlist for Updates
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
