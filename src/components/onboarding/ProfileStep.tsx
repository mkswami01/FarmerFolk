"use client";

import { useState } from "react";

const MARKETS = [
  "Fort Collins Farmers Market",
  "Old Town Saturday Market",
  "Larimer County Farmers Market",
  "Windsor Farmers Market",
  "Loveland Farmers Market",
  "Fort Collins Winter Market",
];

const SKILLS = [
  "Cash handling",
  "Customer service",
  "Setup/teardown",
  "Inventory management",
  "Food handling",
  "POS systems",
  "Sales",
  "Bilingual",
  "Product knowledge",
  "Photography",
  "Social media",
];

const AVAILABILITY_OPTIONS = [
  "Weekends",
  "Saturdays",
  "Sundays",
  "Weekend mornings",
  "Saturdays & Sundays",
  "Flexible",
];

interface ProfileData {
  fullName: string;
  bio: string;
  availability: string;
  marketsWorked: string[];
  skills: string[];
}

export function ProfileStep({
  onNext,
}: {
  onNext: (data: ProfileData) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [availability, setAvailability] = useState("");
  const [marketsWorked, setMarketsWorked] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

  function toggleItem(list: string[], item: string): string[] {
    return list.includes(item)
      ? list.filter((i) => i !== item)
      : [...list, item];
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext({ fullName, bio, availability, marketsWorked, skills });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-brand-dark">
          Full Name *
        </label>
        <input
          id="fullName"
          type="text"
          required
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Your full name"
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div>
        <label htmlFor="bio" className="block text-sm font-medium text-brand-dark">
          Bio
        </label>
        <textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          placeholder="Tell vendors about yourself — your experience, what you're good at, why you enjoy working at farmers markets..."
          rows={4}
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark placeholder:text-brand-muted/50 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        />
      </div>

      <div>
        <label htmlFor="availability" className="block text-sm font-medium text-brand-dark">
          Availability *
        </label>
        <select
          id="availability"
          required
          value={availability}
          onChange={(e) => setAvailability(e.target.value)}
          className="mt-1 w-full rounded-lg border border-brand-green/20 bg-white px-4 py-3 text-brand-dark focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
        >
          <option value="">Select your availability</option>
          {AVAILABILITY_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-sm font-medium text-brand-dark">Markets You Can Work</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {MARKETS.map((market) => (
            <button
              key={market}
              type="button"
              onClick={() => setMarketsWorked(toggleItem(marketsWorked, market))}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                marketsWorked.includes(market)
                  ? "bg-brand-green text-white"
                  : "bg-brand-green/10 text-brand-green hover:bg-brand-green/20"
              }`}
            >
              {market}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm font-medium text-brand-dark">Skills</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => setSkills(toggleItem(skills, skill))}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                skills.includes(skill)
                  ? "bg-brand-amber text-brand-dark"
                  : "bg-brand-amber/10 text-brand-amber hover:bg-brand-amber/20"
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-brand-green py-3 text-base font-semibold text-white transition-colors hover:bg-brand-green-light"
      >
        Next: ID Verification
      </button>
    </form>
  );
}
