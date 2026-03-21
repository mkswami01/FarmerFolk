"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MarketTag } from "./MarketTag";

interface VendorData {
  businessName: string;
  website: string;
  description: string;
}

function generateProfile(data: VendorData) {
  const name = data.businessName;
  const initials = name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Generate bio from description or website
  let bio: string;
  if (data.description) {
    bio = data.description;
  } else if (data.website) {
    bio = `Visit us at ${data.website} to learn more about ${name}. We're proud to be part of the local farmers market community.`;
  } else {
    bio = `${name} is a local business serving the Northern Colorado farmers market community.`;
  }

  // Infer products from description
  const desc = (data.description || data.businessName).toLowerCase();
  let products = "Local goods and products";
  if (desc.includes("bake") || desc.includes("bread") || desc.includes("pastry")) {
    products = "Baked goods, bread, pastries";
  } else if (desc.includes("honey") || desc.includes("bee")) {
    products = "Raw honey, beeswax products";
  } else if (desc.includes("vegetable") || desc.includes("produce") || desc.includes("farm")) {
    products = "Fresh produce, seasonal vegetables";
  } else if (desc.includes("craft") || desc.includes("pottery") || desc.includes("art")) {
    products = "Handmade crafts and artisan goods";
  } else if (desc.includes("salsa") || desc.includes("sauce") || desc.includes("spice")) {
    products = "Salsas, sauces, and spices";
  } else if (desc.includes("ice cream") || desc.includes("dessert") || desc.includes("sweet")) {
    products = "Ice cream, desserts, and sweet treats";
  } else if (desc.includes("coffee") || desc.includes("tea")) {
    products = "Coffee, tea, and beverages";
  } else if (desc.includes("meat") || desc.includes("jerky") || desc.includes("ranch")) {
    products = "Locally raised meats and ranch products";
  } else if (desc.includes("flower") || desc.includes("plant") || desc.includes("garden")) {
    products = "Fresh flowers, plants, and garden goods";
  } else if (desc.includes("soap") || desc.includes("lotion") || desc.includes("skin")) {
    products = "Handmade soaps and skincare products";
  } else if (data.description && data.description.length > 10) {
    products = data.description.slice(0, 80);
  }

  return {
    businessName: name,
    initials,
    bio,
    products,
    website: data.website,
    markets: ["Fort Collins Farmers Market"],
    photo: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(initials)}&backgroundColor=2D6A4F`,
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
            className="h-24 w-24 rounded-xl bg-brand-cream"
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
