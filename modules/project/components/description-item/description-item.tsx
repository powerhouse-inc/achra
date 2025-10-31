import React from 'react'
import { cn } from '@/modules/shared/lib/utils'

export interface DescriptionItemProps {
  label: string
  value: string
  className?: string
}

export function DescriptionItem({ label, value, className }: DescriptionItemProps) {
  return (
    <div
      className={cn(
        'flex min-w-40 items-center justify-between px-2 sm:justify-start sm:gap-1 sm:p-0',

        className,
      )}
    >
      <span className="text-foreground/30 text-xs/4.5 font-medium">{label}:</span>
      <span className="text-foreground text-sm/5.5 font-semibold">{value}</span>
    </div>
  )
}
