import { cn } from '@/modules/shared/lib/utils'

interface OperationalMetricProps {
  label: string
  value: string | React.ReactNode
  className?: string
}

function OperationalMetric({ label, value, className }: OperationalMetricProps) {
  return (
    <div
      className={cn(
        'bg-popover border-input flex w-full items-center justify-between rounded-xl border p-2 sm:gap-2',
        className,
      )}
    >
      <span className="text-foreground text-xs/4.5 font-medium">{label}</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{value}</span>
    </div>
  )
}

export { OperationalMetric }
