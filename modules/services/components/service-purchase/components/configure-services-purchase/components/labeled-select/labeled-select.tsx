'use client'

import { BasicSelect } from '@/modules/shared/components/basic-select/basic-select'
import { cn } from '@/modules/shared/lib/utils'

interface LabeledSelectProps {
  label: string
  value?: string
  onValueChange: (value: string) => void
  options: string[]
  placeholder?: string
  className?: string
  'aria-label'?: string
  matchTriggerWidth?: boolean
}

export function LabeledSelect({
  label,
  value,
  onValueChange,
  options,
  placeholder,
  className,
  'aria-label': ariaLabel,
  matchTriggerWidth,
}: Readonly<LabeledSelectProps>) {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <label className="text-foreground text-sm font-medium">{label}</label>
      <BasicSelect
        value={value}
        onValueChange={onValueChange}
        options={options}
        placeholder={placeholder}
        className={className}
        aria-label={ariaLabel ?? label}
        matchTriggerWidth={matchTriggerWidth}
      />
    </div>
  )
}
