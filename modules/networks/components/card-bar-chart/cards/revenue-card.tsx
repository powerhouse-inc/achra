import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { ItemLegend } from './legend-item'

function RevenueCard() {
  return (
    <div className="flex w-full flex-col gap-2 lg:h-32 xl:h-36">
      <div
        className={cn(
          'sm:bg-accent relative flex flex-col items-center rounded-xl px-4 py-1 sm:items-start',
          // border
          'border-border border sm:rounded-xl sm:border-none',
          // padding
          'h-full sm:p-4 md:py-4 md:pr-4 md:pl-8 xl:h-full xl:px-6 xl:py-4',
        )}
      >
        <span
          className={cn(
            'text-muted-foreground sm:text-popover-foreground sm:bg-popover font-medium sm:rounded-lg',
            // position
            'sm:absolute sm:-top-2.5 sm:left-8 xl:-top-3.5 xl:left-4',
            // padding
            'sm:px-2 sm:py-0',
            // text
            'text-xs leading-6 md:text-sm md:leading-5 md:font-semibold xl:text-base xl:leading-6',
          )}
        >
          Revenue
        </span>
        <div className="flex gap-6 sm:flex-col sm:items-start sm:gap-2 xl:h-full xl:justify-center">
          <ItemLegend color="fill-status-success/30 text-transparent">Fees</ItemLegend>
          <ItemLegend color="fill-status-success/50 text-transparent">
            Liquidation Income
          </ItemLegend>
          <ItemLegend color="fill-status-success/70 text-transparent">PSM</ItemLegend>
        </div>
      </div>
    </div>
  )
}

export { RevenueCard }
