export function AvailabilityBadge({ availability }: { availability: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-amber/10 px-3 py-1 text-xs font-medium text-brand-amber">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" />
      {availability}
    </span>
  );
}
