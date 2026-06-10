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
      ? "text-status-success"
      : deltaType === "negative"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <div className="flex flex-col justify-between rounded-xl bg-card p-5 shadow-sm border border-border min-h-[120px]">
      <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
      </div>
      {(subtitle ?? delta) ? (
        <div className="mt-1.5 text-xs">
          {delta ? <span className={deltaColor}>{delta}</span> : null}
          {subtitle ? (
            <span className="text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
