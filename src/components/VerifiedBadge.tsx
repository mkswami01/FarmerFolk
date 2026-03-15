export function VerifiedBadge({ size = "sm" }: { size?: "sm" | "lg" }) {
  const isLarge = size === "lg";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-brand-green/10 font-medium text-brand-green ${
        isLarge ? "px-3 py-1.5 text-sm" : "px-2 py-0.5 text-xs"
      }`}
    >
      <svg
        className={isLarge ? "h-5 w-5" : "h-3.5 w-3.5"}
        viewBox="0 0 20 20"
        fill="none"
      >
        <circle cx="10" cy="10" r="10" fill="#2D6A4F" />
        <path
          d="M6 10.5L8.5 13L14 7.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-brand-green">ID Verified</span>
    </span>
  );
}
