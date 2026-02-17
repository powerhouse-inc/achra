'use client'

import { Lock } from 'lucide-react'
import { Switch } from '@/modules/shared/components/ui/switch'
import { cn } from '@/modules/shared/lib/utils'
import ServiceCatalogStatus from '../../service-catalog-status/service-catalog-status'
import { type CatalogStatus, type Plan, PRICING_PLANS } from '../../types'
import { PRICING_GRID, usePricingCalculatorContext } from '../pricing-calculator-context'

interface SectionHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  oneTimeFee?: string
  oneTimeFeeVariant?: 'primary' | 'muted'
  activePlan?: Plan
}

export function SectionHeader({
  title,
  badge,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
  oneTimeFee,
  oneTimeFeeVariant = 'muted',
  activePlan,
}: Readonly<SectionHeaderProps>) {
  const { currentMobilePlan } = usePricingCalculatorContext()

  return (
    <div className={cn('grid items-center', PRICING_GRID.responsive)}>
      {/* Label column - sticky on mobile */}
      <div
        className={cn(
          'border-input bg-accent flex min-h-14 items-center gap-2 border-b px-4 lg:px-6',
          // Sticky positioning for mobile
          'sticky left-0 z-10 lg:static',
        )}
      >
        {hasToggle ? (
          <div className="flex items-center gap-2">
            <Switch
              checked={toggleEnabled}
              onCheckedChange={onToggleChange}
              id={`toggle-${title}`}
              className="data-[state=checked]:bg-status-progress"
            />
            <label
              htmlFor={`toggle-${title}`}
              className="text-foreground cursor-pointer text-xs font-semibold lg:text-sm"
            >
              {toggleLabel ?? title}
            </label>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Lock className="text-muted-foreground size-4 shrink-0" />
            <div className="text-foreground text-xs font-semibold lg:flex lg:items-center lg:gap-2 lg:text-sm">
              <span>{title}</span>
              {badge && (
                <span className="ml-1 inline-block align-middle lg:hidden">
                  <ServiceCatalogStatus catalogStatus={badge} />
                </span>
              )}
            </div>
          </div>
        )}

        {badge && (
          <div className="hidden lg:block">
            <ServiceCatalogStatus catalogStatus={badge} />
          </div>
        )}
      </div>

      {/* Mobile: Show only current plan column */}
      <div
        className={cn(
          'border-input pointer-events-none flex h-full min-h-14 min-w-0 items-center justify-center border-b px-4 transition-colors lg:hidden',
          activePlan === currentMobilePlan ? 'bg-primary/30' : 'bg-accent',
          currentMobilePlan === 'enterprise' && oneTimeFee && 'relative',
        )}
      >
        {currentMobilePlan === 'enterprise' && oneTimeFee && (
          <span
            className={cn(
              'min-w-0 text-xs font-medium whitespace-nowrap',
              oneTimeFeeVariant === 'primary' ? 'text-primary' : 'text-muted-foreground',
            )}
          >
            {oneTimeFee}
          </span>
        )}
      </div>

      {/* Desktop: Show all plan columns */}
      {PRICING_PLANS.map((plan) => (
        <div
          key={plan}
          className={cn(
            'border-input pointer-events-none hidden min-h-14 min-w-0 items-center justify-center border-b px-6 transition-colors lg:flex',
            activePlan === plan ? 'bg-primary/30' : 'bg-accent',
            plan === 'enterprise' && oneTimeFee && 'relative',
          )}
        >
          {plan === 'enterprise' && oneTimeFee && (
            <span
              className={cn(
                'absolute right-6 min-w-0 text-xs font-medium whitespace-nowrap',
                oneTimeFeeVariant === 'primary' ? 'text-primary' : 'text-muted-foreground',
              )}
            >
              {oneTimeFee}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
