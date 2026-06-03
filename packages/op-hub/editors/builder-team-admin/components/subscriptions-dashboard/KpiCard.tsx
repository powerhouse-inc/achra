interface KpiCardProps {
  label: string;
  value: string;
  subtitle?: string;
  delta?: string;
  deltaType?: "positive" | "negative" | "neutral";
}

export function KpiCard({
  label,
  value,
  subtitle,
  delta,
  deltaType = "neutral",
}: KpiCardProps) {
  const deltaColor =
    deltaType === "positive"
      ? "text-emerald-500"
      : deltaType === "negative"
        ? "text-red-400"
        : "text-stone-400";

  return (
    <div className="flex flex-col justify-between rounded-xl bg-stone-50 p-5 shadow-sm border border-stone-200/60 min-h-[120px]">
      <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
        {label}
      </span>
      <div className="mt-2">
        <span className="text-3xl font-bold text-stone-800">{value}</span>
      </div>
      {(subtitle ?? delta) ? (
        <div className="mt-1.5 text-xs">
          {delta ? <span className={deltaColor}>{delta}</span> : null}
          {subtitle ? <span className="text-stone-400">{subtitle}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
