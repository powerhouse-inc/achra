'use client'

import { Landmark } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BILLING_CYCLE_LABELS } from '@/modules/service-purchase/config/constants'
import {
  createStickyObserver,
  STICKY_HEADER_SM_BREAKPOINT,
} from '@/modules/service-purchase/lib/sticky-observer-utils'
import { formatPrice, formatSummaryPrice } from '@/modules/service-purchase/lib/utils'
import {
  usePurchaseTotals,
  useSelectedBillingCycle,
  useSelectedTier,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { CardHeader } from '@/modules/shared/components/ui/card'
import { cn } from '@/modules/shared/lib/utils'

interface SummaryCardHeaderProps {
  templateTitle?: string
}

function SummaryCardHeader({ templateTitle }: SummaryCardHeaderProps) {
  const totals = usePurchaseTotals()
  const selectedTier = useSelectedTier()
  const selectedBillingCycle = useSelectedBillingCycle()

  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isStuck, setIsStuck] = useState(false)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    let observer = createStickyObserver(sentinel, setIsStuck)
    const mql = window.matchMedia(STICKY_HEADER_SM_BREAKPOINT)

    const handleBreakpointChange = () => {
      observer.disconnect()
      observer = createStickyObserver(sentinel, setIsStuck)
    }

    mql.addEventListener('change', handleBreakpointChange)
    return () => {
      mql.removeEventListener('change', handleBreakpointChange)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={sentinelRef} className="-mb-6 h-0 w-full" aria-hidden="true" />
      <CardHeader
        className={cn(
          'sticky top-18 z-20 flex flex-row items-start justify-between gap-4 px-3 pt-3 sm:top-27.5 lg:px-6 lg:pt-6',
          'bg-card rounded-t-xl transition-shadow',
          isStuck &&
            'border-primary/30 shadow-primary/20 items-center rounded-xl border py-2 transition-all duration-500 lg:py-3',
        )}
      >
        <div className="flex items-start gap-2">
          <div className="bg-primary flex size-12 shrink-0 items-center justify-center rounded-2xl">
            <Landmark className="text-primary-foreground size-6" strokeWidth={1.5} />
          </div>
          <div className="flex flex-col justify-center gap-1 self-stretch">
            <h2 className="text-foreground text-sm/5.5 leading-tight font-bold lg:text-lg lg:leading-[120%]">
              {templateTitle}
            </h2>
            <span className="text-foreground/70 text-xs font-medium uppercase lg:text-sm/5.5">
              Resource Template
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex flex-col items-end sm:flex-row sm:items-baseline sm:gap-2">
            {!(selectedTier.name === 'Custom' && selectedTier.isCustomPricing) && (
              <span className="text-foreground text-sm/5.5 font-bold lg:text-base/6">
                {selectedTier.name}
              </span>
            )}
            <span className="text-primary text-base/6 font-semibold lg:leading-7">
              {formatSummaryPrice({
                amount: totals.recurringTotal,
                isRecurring: true,
                suffix: '/mo',
                isCustomPricing: selectedTier.isCustomPricing,
                currency: selectedTier.pricing.currency,
              })}
            </span>
          </div>
          <span className="text-foreground text-xs/4.5 font-medium">
            {BILLING_CYCLE_LABELS[selectedBillingCycle]}
          </span>
          {totals.setupTotal > 0 && (
            <span className="text-foreground/70 text-xs/4.5 font-medium">
              + {formatPrice(totals.setupTotal, selectedTier.pricing.currency)} Setup
            </span>
          )}
        </div>
      </CardHeader>
    </>
  )
}

export { SummaryCardHeader }
