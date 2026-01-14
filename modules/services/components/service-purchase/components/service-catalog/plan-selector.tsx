'use client'
import { RadioGroupItem } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
interface PlanSelectorItemProps {
  value: string
  label: string
  description?: string
  id?: string
}

export function PlanSelectorItem({
  value,
  label,
  description,

  id,
}: Readonly<PlanSelectorItemProps>) {
  const inputId = id ?? value

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center gap-2">
        <RadioGroupItem
          value={value}
          id={inputId}
          className="[&_svg]:fill-foreground text-foreground"
        />
        <label
          htmlFor={inputId}
          className={cn(
            'text-foreground cursor-pointer text-sm/5.5 font-semibold transition-colors',
          )}
        >
          {label}
        </label>
      </div>
      {description && (
        <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
          {description}
        </span>
      )}
    </div>
  )
}
