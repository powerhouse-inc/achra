'use client'
import { TABS_CONFIG } from '@/modules/networks/lib/constants'
import type { TabValue } from '@/modules/networks/types'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'

interface FinancesTabsProps {
  activeTab: TabValue
  onTabChange: (tab: TabValue) => void
}

function FinancesTabs({ activeTab, onTabChange }: FinancesTabsProps) {
  return (
    <div
      className={cn(
        'bg-background flex items-center overflow-hidden rounded-t-lg shadow-xs sm:overflow-visible sm:bg-transparent sm:shadow-none',
        'sm:w-fit sm:gap-6 sm:rounded-none sm:bg-transparent',
        'leading-4.5 lg:w-full lg:justify-center lg:gap-8 xl:pr-14 2xl:pr-0',
      )}
    >
      {TABS_CONFIG.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          onClick={() => {
            onTabChange(tab.id)
          }}
          className={cn(
            'h-auto flex-1 rounded-none border-none px-2 text-xs leading-4.5 font-medium shadow-none transition-colors duration-150 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 sm:h-[22px] sm:w-auto sm:flex-none sm:p-0 sm:text-sm sm:leading-5.5 sm:hover:bg-transparent lg:h-6 lg:text-base lg:leading-6',
            tab.className,
            activeTab === tab.id
              ? 'text-accent-foreground bg-accent border-foreground font-semibold focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 sm:!bg-transparent sm:hover:!bg-transparent'
              : 'text-foreground/50 hover:text-foreground sm:hover:!bg-transparent',
          )}
        >
          <span className="block sm:hidden md:block">{tab.longName}</span>
          <span className="hidden sm:block md:hidden">{tab.shortName}</span>
        </Button>
      ))}
    </div>
  )
}

export { FinancesTabs }
