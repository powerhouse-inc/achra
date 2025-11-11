import React from 'react'
import { cn } from '@/modules/shared/lib/utils'

interface LegendItemProps {
  children: React.ReactNode
  color: string
  className?: string
}
export function LegendItem({ children, color = 'bg-status-success', className }: LegendItemProps) {
  return (
    <div
      data-slot="legend-item"
      className={cn(
        'text-foreground relative flex h-fit items-start pl-3 text-xs/4.5 font-bold',
        'xl:text-sm/5.5 xl:font-semibold',
        className,
      )}
    >
      <div
        data-slot="legend-dot"
        className={cn('absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full', color)}
      />
      {children}
    </div>
  )
}
