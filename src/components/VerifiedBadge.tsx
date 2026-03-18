import type { VerificationLevel } from "@/data/workers";

const config = {
  "id-confirmed": {
    label: "ID Confirmed",
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    circleFill: "none",
    circleStroke: "#2D6A4F",
  },
  verified: {
    label: "Verified",
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    circleFill: "#2D6A4F",
    circleStroke: "none",
  },
  "background-checked": {
    label: "Background Checked",
    bg: "bg-brand-amber/10",
    text: "text-brand-amber",
    circleFill: "#F4A228",
    circleStroke: "none",
  },
};

export function VerifiedBadge({
  level,
  size = "sm",
}: {
  level: Exclude<VerificationLevel, "none">;
  size?: "sm" | "lg";
}) {
  const isLarge = size === "lg";
  const c = config[level];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${c.bg} ${
        isLarge ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-xs"
      }`}
    >
      <svg
        className={isLarge ? "h-5 w-5" : "h-3.5 w-3.5"}
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle
          cx="10"
          cy="10"
          r={c.circleFill === "none" ? "9" : "10"}
          fill={c.circleFill}
          stroke={c.circleStroke}
          strokeWidth={c.circleFill === "none" ? "2" : "0"}
        />
        <path
          d="M6 10.5L8.5 13L14 7.5"
          stroke={c.circleFill === "none" ? c.circleStroke : "white"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={c.text}>{c.label}</span>
    </span>
  );
}
