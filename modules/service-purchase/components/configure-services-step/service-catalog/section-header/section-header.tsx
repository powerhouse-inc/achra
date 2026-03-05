'use client'

import { Lock } from 'lucide-react'
import { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { getPriceLabel } from '@/modules/service-purchase/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import type { CatalogStatus } from '@/modules/service-purchase/types'
import { Switch } from '@/modules/shared/components/ui/switch'
import { cn } from '@/modules/shared/lib/utils'
import { ServiceCatalogStatus } from '../../service-catalog-status'

interface SectionHeaderProps {
  title: string
  badge?: CatalogStatus
  hasToggle?: boolean
  toggleLabel?: string
  toggleEnabled?: boolean
  onToggleChange?: (enabled: boolean) => void
  activePlan?: string
  groupPrice?: number | null
  groupDiscountedPrice?: number | null
  groupCurrency?: string | null
  groupCostType?: RsGroupCostType | null
  perTierPrices?: Record<string, string | null> | null
}

function SectionHeader({
  title,
  badge,
  hasToggle,
  toggleLabel,
  toggleEnabled = false,
  onToggleChange,
  activePlan,
  groupPrice,
  groupDiscountedPrice,
  groupCurrency,
  groupCostType,
  perTierPrices,
}: Readonly<SectionHeaderProps>) {
  const { tierNames } = usePricingCalculatorContext()
  const lastTierName = tierNames[tierNames.length - 1]

  const isOneTime = groupCostType === RsGroupCostType.Setup
  const isRecurring = groupCostType === RsGroupCostType.Recurring
  const priceLabel = getPriceLabel(groupCostType, groupPrice, groupCurrency)
  const discountedPriceLabel = getPriceLabel(groupCostType, groupDiscountedPrice, groupCurrency)

  return (
    <div
      className={cn(
        'text-foreground items-center',
        'grid grid-cols-2 lg:grid-cols-[var(--grid-cols-lg)] xl:grid-cols-[var(--grid-cols-xl)]',
      )}
      style={
        {
          '--grid-cols-lg': `4fr repeat(${tierNames.length}, minmax(144px, 1fr))`,
          '--grid-cols-xl': `4fr repeat(${tierNames.length}, minmax(220px, 1fr))`,
        } as React.CSSProperties
      }
    >
      {/* Label column - sticky on mobile */}
      <div
        className={cn(
          'border-input bg-accent flex min-h-14 flex-col justify-center gap-1.5 border-b px-4 lg:px-6',
          'sticky left-0 z-10 lg:static',
        )}
      >
        {/* Title row */}
        <div className="flex items-center gap-2">
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
      </div>

      {/* Mobile: show active plan price */}
      <div
        className={cn(
          'border-input pointer-events-none relative flex h-full min-h-14 min-w-0 items-center justify-center border-b px-4 transition-colors lg:hidden',
          activePlan ? 'bg-primary/30' : 'bg-accent',
        )}
      >
        {isOneTime && perTierPrices && activePlan && perTierPrices[activePlan] && (
          <span className="text-primary min-w-0 text-xs font-bold whitespace-nowrap uppercase">
            {perTierPrices[activePlan]}
          </span>
        )}
        {isRecurring && perTierPrices && activePlan && perTierPrices[activePlan] && (
          <span className="text-primary min-w-0 text-xs font-bold whitespace-nowrap uppercase">
            {perTierPrices[activePlan]}
          </span>
        )}
        {isOneTime && !perTierPrices && priceLabel && !discountedPriceLabel && (
          <span className="text-primary min-w-0 text-xs font-bold whitespace-nowrap uppercase">
            {priceLabel}
          </span>
        )}
        {isOneTime && !perTierPrices && priceLabel && discountedPriceLabel && (
          <span className="flex min-w-0 flex-col items-center gap-0.5">
            <span className="text-muted-foreground min-w-0 text-xs whitespace-nowrap uppercase line-through">
              {priceLabel}
            </span>
            <span className="text-primary min-w-0 text-xs font-bold whitespace-nowrap uppercase">
              {discountedPriceLabel}
            </span>
          </span>
        )}
      </div>

      {/* Desktop: one cell per plan */}
      {tierNames.map((plan) => (
        <div
          key={plan}
          className={cn(
            'border-input pointer-events-none relative hidden min-h-14 min-w-0 items-center justify-center border-b px-6 transition-colors lg:flex',
            activePlan === plan ? 'bg-primary/30' : 'bg-accent',
          )}
        >
          {isOneTime && perTierPrices?.[plan] && (
            <span
              className={cn(
                'min-w-0 text-xs font-bold whitespace-nowrap uppercase',
                activePlan === plan ? 'text-primary' : 'text-foreground/50',
              )}
            >
              {perTierPrices[plan]}
            </span>
          )}
          {isRecurring && perTierPrices?.[plan] && (
            <span
              className={cn(
                'min-w-0 text-xs font-bold whitespace-nowrap uppercase',
                activePlan === plan ? 'text-primary' : 'text-foreground/50',
              )}
            >
              {perTierPrices[plan]}
            </span>
          )}
          {isOneTime &&
            !perTierPrices &&
            plan === lastTierName &&
            priceLabel &&
            !discountedPriceLabel && (
              <span className="text-primary absolute right-6 min-w-0 text-xs font-bold whitespace-nowrap uppercase">
                {priceLabel}
              </span>
            )}
          {isOneTime &&
            !perTierPrices &&
            plan === lastTierName &&
            priceLabel &&
            discountedPriceLabel && (
              <span className="absolute right-6 flex min-w-0 flex-col items-end gap-0.5">
                <span className="text-muted-foreground min-w-0 text-xs whitespace-nowrap uppercase line-through">
                  {priceLabel}
                </span>
                <span className="text-primary min-w-0 text-xs font-bold whitespace-nowrap uppercase">
                  {discountedPriceLabel}
                </span>
              </span>
            )}
        </div>
      ))}
    </div>
  )
}

export { SectionHeader }
