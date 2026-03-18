import type { VerificationLevel } from "@/data/workers";

const config = {
  verified: {
    label: "Verified",
    bg: "bg-brand-green/10",
    text: "text-brand-green",
    fill: "#2D6A4F",
  },
  "id-confirmed": {
    label: "ID Confirmed",
    bg: "bg-brand-amber/10",
    text: "text-brand-amber",
    fill: "#F4A228",
  },
  none: {
    label: "Yet to be Verified",
    bg: "bg-brand-red/10",
    text: "text-brand-red",
    fill: "#C1534A",
  },
};

export function VerifiedBadge({
  level,
  size = "sm",
}: {
  level: VerificationLevel;
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
        <circle cx="10" cy="10" r="10" fill={c.fill} />
        {level === "none" ? (
          <path
            d="M7 7L13 13M13 7L7 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ) : (
          <path
            d="M6 10.5L8.5 13L14 7.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <span className={c.text}>{c.label}</span>
    </span>
  );
}
