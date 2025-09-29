import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { ItemLegend } from './legend-item'
import { SpendingItem } from './spending-item'

export function SpendingCard() {
  return (
    <div
      className={cn(
        'sm:bg-accent xl:h-full  relative flex w-full flex-col gap-2 sm:gap-4 sm:rounded-xl lg:h-32 lg:flex-row xl:flex-col',
        // padding
        'sm:px-2 sm:pt-4 sm:pb-2 xl:pt-4 xl:pb-1',
      )}
    >
      <span className="text-muted-foreground sm:text-popover-foreground sm:bg-popover w-full justify-center text-center text-xs/5 font-medium sm:absolute sm:-top-2 sm:left-6 sm:w-fit sm:rounded-lg sm:px-2 sm:py-0 md:text-sm md:leading-5 md:font-semibold xl:text-base xl:leading-5">
        Spending
      </span>
      <div className="flex w-full flex-col gap-2 sm:mt-2 sm:gap-4 md:mt-1.5 lg:flex-row xl:flex-col">
        <SpendingItem title="Oper Expenses" mobileTitle="Operational Expenses">
          <ItemLegend color="fill-destructive/70 text-transparent">USDS Expensed</ItemLegend>
          <ItemLegend color="fill-destructive text-transparent">SKY Vesting</ItemLegend>
        </SpendingItem>
        <SpendingItem title="Protocol Costs">
          <ItemLegend color="fill-status-warning text-transparent">DSR Cost</ItemLegend>
        </SpendingItem>
      </div>
    </div>
  )
}
