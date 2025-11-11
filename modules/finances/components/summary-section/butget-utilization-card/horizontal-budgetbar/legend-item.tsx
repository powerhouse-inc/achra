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
        'text-foreground relative flex h-fit items-start pl-3 text-xs leading-[18px] font-bold',
        'xl:text-sm xl:leading-[22px] xl:font-semibold',
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
