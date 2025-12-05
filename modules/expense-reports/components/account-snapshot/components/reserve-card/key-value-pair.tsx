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
        'md:items-normal flex items-center justify-between md:flex-col md:justify-normal',
        variant === 'outline' && 'bg-background -mx-4 rounded-lg border px-4 py-2 md:mx-0',
        className,
      )}
    >
      <div className="text-foreground/50 text-xs/4.5">{label}</div>
      <div className="text-popover-foreground text-sm/5.5 font-semibold">
        {usLocalizedNumber(value)}{' '}
        <span className="text-foreground/30 text-xs/4.5 font-medium">{currency}</span>
      </div>
    </div>
  )
}

export { KeyValuePair }
