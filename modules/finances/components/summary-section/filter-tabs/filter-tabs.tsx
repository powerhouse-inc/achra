'use client'

import { useEffect, useId, useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

export type AnalyticMetric =
  | 'Budget'
  | 'Forecast'
  | 'ProtocolNetOutflow'
  | 'PaymentsOnChain'
  | 'Actuals'

const FILTERS: Array<{
  label: string
  value: AnalyticMetric
}> = [
  {
    label: 'Budget',
    value: 'Budget',
  },
  {
    label: 'Forecast',
    value: 'Forecast',
  },
  {
    label: 'Net Protocol Outflow',
    value: 'ProtocolNetOutflow',
  },
  {
    label: 'Net Expenses On-Chain',
    value: 'PaymentsOnChain',
  },
  {
    label: 'Actuals',
    value: 'Actuals',
  },
]

interface FilterTabsProps {
  selectedMetric: AnalyticMetric
  onChangeTab: (metric: AnalyticMetric) => void
}

export function FilterTabs({ selectedMetric, onChangeTab }: FilterTabsProps) {
  const id = useId()
  const [hasSmoke, setHasSmoke] = useState<[boolean, boolean]>([false, false])

  useEffect(() => {
    const tab = document.getElementById(id)
    if (!tab) return

    const handleScroll = () => {
      const hasLeft = tab.scrollLeft > 8
      const hasRight = tab.scrollWidth - tab.scrollLeft - tab.clientWidth > 8

      setHasSmoke([hasLeft, hasRight])
    }

    tab.onscroll = handleScroll
    handleScroll()

    return () => {
      tab.onscroll = null
    }
  }, [id])

  return (
    <div
      data-slot="filter-tabs-wrapper"
      className={cn(
        // Base styles
        'bg-background/25 relative max-w-full overflow-hidden rounded-t-xl shadow-xs',
        // Responsive styles
        'md:min-w-48 md:rounded-l-xl md:rounded-tr-none',

        // Left smoke gradient
        hasSmoke[0] &&
          "from-muted before:to-muted/0 before:pointer-events-none before:absolute before:top-0 before:left-0 before:h-full before:w-15 before:touch-none before:bg-linear-to-r before:content-['']",
        // Right smoke gradient
        hasSmoke[1] &&
          "after:from-muted after:to-muted/0 after:pointer-events-none after:absolute after:top-0 after:right-0 after:h-full after:w-15 after:touch-none after:bg-linear-to-l after:content-['']",
      )}
    >
      <div
        id={id}
        data-slot="filter-tabs-container"
        className={cn(
          // Base styles
          'no-scrollbar flex h-fit w-full min-w-48 overflow-x-scroll',
          // Responsive styles
          'md:flex-col md:gap-2 md:py-4.5',
          'xl:min-w-51.25 xl:gap-2',
        )}
      >
        {FILTERS.map((tab) => {
          const isActive = tab.value === selectedMetric
          return (
            <Button
              key={tab.value}
              variant="ghost"
              data-slot="filter-tab"
              onClick={() => {
                onChangeTab(tab.value)
              }}
              className={cn(
                // Base styles
                'h-5.5 cursor-pointer justify-start pl-6 text-left text-xs whitespace-nowrap transition-colors md:text-sm',
                // Active state (mobile)
                isActive
                  ? 'bg-accent text-foreground rounded-r-none py-2 leading-4.5 font-bold'
                  : 'text-muted-foreground py-1 leading-5.5 font-medium',
                // Tablet and up base styles
                'relative rounded-r-none md:py-0 md:leading-5.5',
                'md:before:absolute md:before:top-0 md:before:left-0 md:before:h-full md:before:w-1 md:before:rounded-r md:before:content-[""]',
                // Active state (tablet and up)
                isActive
                  ? 'md:bg-accent md:text-foreground md:before:bg-foreground'
                  : 'md:bg-transparent md:before:bg-transparent',
                // Hover state (tablet and up, only when not active)
                !isActive &&
                  'md:hover:text-muted-foreground md:hover:bg-accent md:hover:before:bg-muted-foreground/50',
              )}
            >
              {tab.label}
            </Button>
          )
        })}
      </div>
    </div>
  )
}
