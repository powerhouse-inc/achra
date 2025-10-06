'use client'

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
      <span className="text-muted-foreground sm:text-popover-foreground sm:bg-popover mb-2 w-full justify-center text-center text-xs/5 font-medium sm:absolute sm:-top-2 sm:left-6 sm:mb-0 sm:w-fit sm:rounded-lg sm:px-2 sm:py-0 md:text-sm md:leading-5 md:font-semibold xl:-mt-2 xl:text-base/6">
        Spending
      </span>
      <div className="flex w-full flex-col gap-2.5 sm:mt-2 sm:gap-4 md:mt-1.5 lg:flex-row lg:gap-2 xl:flex-col xl:gap-4">
        <SpendingItem
          shortTitle="Oper Expenses"
          title="Operational Expenses"
          tooltipContent={
            <div>
              <div className="mb-1">
                <span className="text-foreground font-bold">USDS/DAI</span>
                <p>
                  Operational costs such as salaries, services, and other day-to-day expenses
                  necessary for the running of the Sky Ecosystem.
                </p>
              </div>

              <div>
                <span className="text-foreground font-bold">MKR</span>
                <p>
                  Governance tokens are allocated to Sky Ecosystem Contributors as a long-term
                  incentive.
                </p>
              </div>
            </div>
          }
        >
          <ItemLegend color="fill-destructive/70 text-transparent">USDS Expensed</ItemLegend>
          <ItemLegend color="fill-destructive text-transparent">SKY Vesting</ItemLegend>
        </SpendingItem>
        <SpendingItem
          title="Protocol Costs"
          tooltipContent={
            <div>
              <p className="text-sm">
                <span>
                  Represents the total interest paid to USDS holders for locking their USDS in the
                  USDS Savings Rate module.
                </span>
              </p>
            </div>
          }
        >
          <ItemLegend color="fill-status-warning text-transparent">DSR Cost</ItemLegend>
        </SpendingItem>
      </div>
    </div>
  )
}
