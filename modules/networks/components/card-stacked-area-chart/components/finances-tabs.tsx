'use client'
import { useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'

const TABS = {
  REALIZED_EXPENSES: 'Realized Expenses',
  OPERATIONAL_RESERVES: 'Operational Reserves',
  FORECAST: 'Forecast',
}

export function FinancesTabs() {
  const [activeTab, setActiveTab] = useState(TABS.REALIZED_EXPENSES)

  const baseButtonStyles =
    'w-full py-2 flex-1 rounded-none border-none text-xs font-medium leading-4.5 shadow-none transition-colors duration-150 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 sm:h-[22px] sm:w-auto sm:p-0 sm:text-sm sm:leading-5.5 sm:hover:bg-transparent lg:h-6 lg:text-base lg:leading-6'

  const activeStyles =
    'font-bold text-accent-foreground bg-accent sm:bg-transparent border-b-2 border-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0'

  const inactiveStyles = 'text-foreground/50 hover:text-foreground/50'

  return (
    <div
      className={cn(
        'bg-background flex rounded-t-lg shadow-xs sm:shadow-none',

        'sm:shadow- sm:w-fit sm:gap-6 sm:rounded-none sm:bg-transparent',
        'leading-4.5 lg:w-full lg:justify-center lg:gap-8',
      )}
    >
      <Button
        variant="ghost"
        onClick={() => {
          setActiveTab(TABS.REALIZED_EXPENSES)
        }}
        className={cn(
          baseButtonStyles,
          'rounded-tl-lg sm:rounded-none',
          activeTab === TABS.REALIZED_EXPENSES ? activeStyles : inactiveStyles,
        )}
      >
        <span className="block sm:hidden lg:block">Realized Expenses</span>

        <span className="hidden sm:block lg:hidden">Realized Exp.</span>
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          setActiveTab(TABS.OPERATIONAL_RESERVES)
        }}
        className={cn(
          baseButtonStyles,
          activeTab === TABS.OPERATIONAL_RESERVES ? activeStyles : inactiveStyles,
        )}
      >
        <span className="block sm:hidden lg:block">Operational Reserves</span>

        <span className="hidden sm:block lg:hidden">Op. Reserves</span>
      </Button>

      <Button
        variant="ghost"
        onClick={() => {
          setActiveTab(TABS.FORECAST)
        }}
        className={cn(
          baseButtonStyles,
          'rounded-tr-lg sm:rounded-none',
          activeTab === TABS.FORECAST ? activeStyles : inactiveStyles,
        )}
      >
        Forecast
      </Button>
    </div>
  )
}
