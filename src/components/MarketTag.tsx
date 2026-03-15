export function MarketTag({ name }: { name: string }) {
  return (
    <span className="inline-block rounded-full bg-brand-green/10 px-3 py-1 text-xs font-medium text-brand-green">
      {name}
    </span>
  );
}
