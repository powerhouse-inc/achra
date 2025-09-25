'use client'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { TABS_CONFIG, type TabValue } from '../type'

interface FinancesTabsProps {
  activeTab: TabValue
  onTabChange: (tab: TabValue) => void
}

export function FinancesTabs({ activeTab, onTabChange }: FinancesTabsProps) {
  const baseButtonStyles =
    'w-full px-2 h-auto flex-1 rounded-none border-none text-xs font-medium leading-4.5 shadow-none transition-colors duration-150 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 sm:h-[22px] sm:w-auto sm:p-0 sm:text-sm sm:leading-5.5 sm:hover:bg-transparent lg:h-6 lg:text-base lg:leading-6'

  const activeStyles =
    'font-bold text-accent-foreground bg-accent sm:bg-transparent border-foreground focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0'

  const inactiveStyles = 'text-foreground/50 hover:text-foreground/50'

  return (
    <div
      className={cn(
        'bg-background flex rounded-t-lg shadow-xs sm:shadow-none',
        'sm:shadow- sm:w-fit sm:gap-6 sm:rounded-none sm:bg-transparent',
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
            baseButtonStyles,
            tab.className,
            activeTab === tab.id ? activeStyles : inactiveStyles,
          )}
        >
          <span className="block sm:hidden lg:block">{tab.longName}</span>
          <span className="hidden sm:block lg:hidden">{tab.shortName}</span>
        </Button>
      ))}
    </div>
  )
}
