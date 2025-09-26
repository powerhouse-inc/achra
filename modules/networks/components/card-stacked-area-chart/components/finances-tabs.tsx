'use client'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { TABS_CONFIG } from '../constants'
import type { TabValue } from '../type'

interface FinancesTabsProps {
  activeTab: TabValue
  onTabChange: (tab: TabValue) => void
}

export function FinancesTabs({ activeTab, onTabChange }: FinancesTabsProps) {
  return (
    <div
      className={cn(
        'bg-background flex rounded-t-lg shadow-xs sm:bg-transparent sm:shadow-none',
        'sm:w-fit sm:gap-6 sm:rounded-none sm:bg-transparent',
        'leading-4.5 lg:w-full lg:justify-center lg:gap-8',
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
            'h-auto w-full flex-1 rounded-none border-none px-2 text-xs leading-4.5 font-medium shadow-none transition-colors duration-150 focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 sm:h-[22px] sm:w-auto sm:p-0 sm:text-sm sm:leading-5.5 sm:hover:bg-transparent lg:h-6 lg:text-base lg:leading-6',
            tab.className,
            activeTab === tab.id
              ? 'text-accent-foreground bg-accent border-foreground font-bold focus:ring-0 focus:ring-offset-0 focus:outline-none focus-visible:ring-0 sm:bg-transparent'
              : 'text-foreground/50 hover:text-foreground/50',
          )}
        >
          <span className="block sm:hidden lg:block">{tab.longName}</span>
          <span className="hidden sm:block lg:hidden">{tab.shortName}</span>
        </Button>
      ))}
    </div>
  )
}
