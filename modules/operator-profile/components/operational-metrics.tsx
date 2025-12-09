interface OperationalMetricsProps {
  label: string
  value: string
}

export function OperationalMetrics({ label, value }: OperationalMetricsProps) {
  return (
    <div className="bg-popover border-input flex w-full items-center justify-between rounded-xl border p-2 sm:gap-2">
      <span className="text-foreground text-xs/4.5 font-medium">{label}</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{value}</span>
    </div>
  )
}
