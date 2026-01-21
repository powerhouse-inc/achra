'use client'

import { cn } from '@/modules/shared/lib/utils'

interface LabeledTextFieldProps {
  label: string
  value: string
  className?: string
}

export function LabeledTextField({ label, value, className }: Readonly<LabeledTextFieldProps>) {
  return (
    <div className={cn('flex w-full flex-col gap-3', className)}>
      <label className="text-foreground text-sm font-medium">{label}</label>
      <div className="bg-background text-foreground border-input flex h-9 w-full items-center rounded-md border px-3 py-2 text-base">
        {value}
      </div>
    </div>
  )
}
