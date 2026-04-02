'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { RsServiceOffering } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  createStickyObserver,
  STICKY_HEADER_SM_BREAKPOINT,
} from '@/modules/service-purchase/lib/sticky-observer-utils'
import { useServicePurchaseActions } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { Button } from '@/modules/shared/components/ui/button'
import { RadioGroup } from '@/modules/shared/components/ui/radio-group'
import { cn } from '@/modules/shared/lib/utils'
import { PlanSelectorItem } from '../plan-selector'

interface HeaderCatalogPlanProps {
  selectedPlan?: string
  handlePlanChange: (plan: string) => void
  readOnly?: boolean
  mobilePlanIndex: number
  onPrevPlan: () => void
  onNextPlan: () => void
  servicesData: RsServiceOffering
}

function HeaderCatalogPlan({
  selectedPlan,
  handlePlanChange,
  readOnly = false,
  mobilePlanIndex,
  onPrevPlan,
  onNextPlan,
  servicesData,
}: Readonly<HeaderCatalogPlanProps>) {
  const { setHoveredTier } = useServicePurchaseActions()
  const tiers = servicesData.tiers
  const numTiers = tiers.length
  const currentMobileTier = tiers[mobilePlanIndex]

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
      <div ref={sentinelRef} className="h-0 w-full" aria-hidden="true" />
      <div
        style={
          {
            '--grid-cols-lg': `4fr repeat(${numTiers}, minmax(144px, 1fr))`,
            '--grid-cols-xl': `4fr repeat(${numTiers}, minmax(220px, 1fr))`,
          } as React.CSSProperties
        }
        className={cn(
          'bg-card sticky top-18 z-20 min-h-21 w-full items-center overflow-clip sm:top-27.5',
          'grid grid-cols-2 lg:grid-cols-(--grid-cols-lg) xl:grid-cols-(--grid-cols-xl)',
          'transition-all duration-500',
          isStuck
            ? 'border-primary/30 shadow-primary/20 rounded-xl border'
            : 'rounded-t-xl border shadow-[0_-1px_2px_0_rgb(0_0_0/0.05),-1px_0_2px_0_rgb(0_0_0/0.05),1px_0_2px_0_rgb(0_0_0/0.05)]',
        )}
      >
        {/* LABEL */}
        <div className="flex h-full items-center px-4 lg:px-6" />
        {/* MOBILE CAROUSEL */}
        <div
          className={cn(
            'flex h-full w-full items-center justify-between px-1 py-2 lg:hidden',
            currentMobileTier.mostPopular
              ? 'bg-primary/10 border-t-primary border-t-2'
              : 'bg-primary/10',
          )}
        >
          <Button variant="ghost" size="icon" onClick={onPrevPlan} className="size-8">
            <ChevronLeft className="size-5" />
          </Button>
          <div className="flex flex-col items-center justify-center">
            <RadioGroup value={selectedPlan} onValueChange={handlePlanChange} disabled={readOnly}>
              <PlanSelectorItem
                tier={currentMobileTier}
                isSelected={selectedPlan === currentMobileTier.id}
              />
            </RadioGroup>
          </div>
          <Button variant="ghost" size="icon" onClick={onNextPlan} className="size-8">
            <ChevronRight className="size-5" />
          </Button>
        </div>

        {/* DESKTOP - RADIO GROUP */}
        <RadioGroup
          value={selectedPlan}
          onValueChange={(val: string) => {
            handlePlanChange(val)
          }}
          disabled={readOnly}
          className="hidden lg:contents"
        >
          {tiers.map((tier) => {
            const isActive = selectedPlan === tier.id

            return (
              <div
                key={tier.id}
                className={cn(
                  'relative flex h-full min-w-0 items-center justify-center py-2 transition-colors',
                  isActive && 'bg-primary/10',
                  !isActive && 'hover:bg-accent/80',
                  tier.mostPopular && 'border-t-primary border-t-2',
                )}
                onMouseEnter={() => {
                  setHoveredTier(tier.id)
                }}
                onMouseLeave={() => {
                  setHoveredTier(null)
                }}
              >
                <PlanSelectorItem tier={tier} isSelected={isActive} />
              </div>
            )
          })}
        </RadioGroup>
      </div>
    </>
  )
}

export { HeaderCatalogPlan }
