import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'

interface KeyValuePairProps {
  label: string
  value: number
  currency?: string
  className?: string
  variant?: 'default' | 'outline'
}

function KeyValuePair({
  label,
  value,
  currency,
  className,
  variant = 'default',
}: KeyValuePairProps) {
  return (
    <div
      className={cn(
        'md:items-normal flex items-center justify-between md:flex-col md:items-start md:justify-center lg:gap-0.5',
        variant === 'outline'
          ? 'bg-background -mx-4 rounded-lg border px-4 py-1.75 md:mx-2 md:p-2 md:pt-1 lg:mx-4'
          : 'md:px-2 lg:px-4',
        className,
      )}
    >
      <div className="text-foreground/50 text-xs/4.5">{label}</div>
      <div className="text-popover-foreground flex items-baseline gap-1 text-sm/5.5 font-semibold lg:text-base/6">
        <span className="lining-nums tabular-nums">{usLocalizedNumber(value)}</span>
        <span className="text-foreground/30 text-xs/4.5 font-medium lg:text-sm/5.5 lg:font-normal">
          {currency}
        </span>
      </div>
    </div>
  )
}

export { KeyValuePair }
