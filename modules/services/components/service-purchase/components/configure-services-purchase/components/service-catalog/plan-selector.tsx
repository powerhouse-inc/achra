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
    <label
      htmlFor={inputId}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center px-6"
    >
      <div className="flex cursor-pointer flex-col items-center gap-2">
        <RadioGroupItem
          value={value}
          id={inputId}
          className="border-foreground [&_svg]:fill-foreground text-foreground cursor-pointer"
        />
        <span className={cn('text-foreground text-sm/5.5 font-semibold transition-colors')}>
          {label}
        </span>
      </div>
      {description && (
        <span className={cn('text-foreground/50 text-xs/5.5 font-semibold transition-colors')}>
          {description}
        </span>
      )}
    </label>
  )
}
