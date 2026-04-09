'use client'

import { RsGroupCostType } from '@/modules/__generated__/graphql/switchboard-generated'
import { getPriceLabel } from '@/modules/service-purchase/lib/utils'
import { usePricingCalculatorContext } from '@/modules/service-purchase/providers/pricing-calculator-provider'
import { useHoveredTier } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { CatalogStatus } from '@/modules/service-purchase/types'
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
  isAddOn?: boolean
  groupSetupPrice?: number | null
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
  isAddOn,
  groupSetupPrice,
}: Readonly<SectionHeaderProps>) {
  const { tierNames } = usePricingCalculatorContext()
  const hoveredPlan = useHoveredTier()
  const isOneTime = groupCostType === RsGroupCostType.Setup
  const isRecurring = groupCostType === RsGroupCostType.Recurring
  const setupPriceLabel =
    isAddOn && groupSetupPrice
      ? getPriceLabel(RsGroupCostType.Setup, groupSetupPrice, groupCurrency)
      : null
  const priceLabel = getPriceLabel(groupCostType, groupPrice, groupCurrency, isAddOn)
  const discountedPriceLabel = getPriceLabel(
    groupCostType,
    groupDiscountedPrice,
    groupCurrency,
    isAddOn,
  )

  return (
    <div
      className={cn(
        'text-foreground items-center',
        'grid grid-cols-2 lg:grid-cols-(--grid-cols-lg) xl:grid-cols-(--grid-cols-xl)',
        hasToggle && 'group/addon cursor-pointer transition-colors',
      )}
      onClick={hasToggle ? () => onToggleChange?.(!toggleEnabled) : undefined}
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
          hasToggle && 'group-hover/addon:bg-accent/60 transition-colors',
        )}
      >
        {/* Title row */}
        <div className="flex items-center gap-2">
          {hasToggle ? (
            <div className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={toggleEnabled}
                  onCheckedChange={onToggleChange}
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  id={`toggle-${title}`}
                  className="data-[state=checked]:bg-status-progress data-[state=unchecked]:bg-foreground/70"
                />
                <label
                  htmlFor={`toggle-${title}`}
                  className="text-foreground cursor-pointer text-base font-bold"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                >
                  {toggleLabel ?? title}
                </label>
              </div>
              {badge === CatalogStatus.Optional && <ServiceCatalogStatus catalogStatus={badge} />}
            </div>
          ) : (
            <div className="text-foreground flex items-center gap-2 text-base font-bold">
              <span>{title}</span>
              {badge === CatalogStatus.Optional && <ServiceCatalogStatus catalogStatus={badge} />}
            </div>
          )}
        </div>
      </div>

      {/* Mobile: show active plan price */}
      <div
        className={cn(
          'border-input pointer-events-none relative flex h-full min-h-14 min-w-0 items-center justify-center border-b px-4 transition-colors lg:hidden',
          activePlan ? 'bg-primary/30' : 'bg-accent',
          hasToggle &&
            (activePlan ? 'group-hover/addon:bg-primary/20' : 'group-hover/addon:bg-accent/60'),
        )}
      >
        {!isAddOn && isOneTime && perTierPrices && activePlan && perTierPrices[activePlan] && (
          <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap">
            {perTierPrices[activePlan]}
          </span>
        )}
        {!isAddOn && isRecurring && perTierPrices && activePlan && perTierPrices[activePlan] && (
          <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap uppercase">
            {perTierPrices[activePlan]}
          </span>
        )}
        {isOneTime && !perTierPrices && priceLabel && !discountedPriceLabel && (
          <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap uppercase">
            {priceLabel}
          </span>
        )}
        {isOneTime && !perTierPrices && priceLabel && discountedPriceLabel && (
          <span className="flex min-w-0 flex-col items-center gap-0.5">
            <span className="text-foreground/60 min-w-0 text-xs whitespace-nowrap uppercase line-through">
              {priceLabel}
            </span>
            <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap uppercase">
              {discountedPriceLabel}
            </span>
          </span>
        )}
        {isAddOn && priceLabel && !discountedPriceLabel && (
          <span className="flex items-center gap-2">
            {setupPriceLabel && (
              <>
                <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap">
                  {setupPriceLabel}
                </span>
                <span className="text-foreground/40 text-xs">|</span>
              </>
            )}
            <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap">
              {priceLabel}
            </span>
          </span>
        )}
        {isAddOn && priceLabel && discountedPriceLabel && (
          <span className="flex min-w-0 flex-col items-center gap-0.5">
            <span className="text-foreground/60 min-w-0 text-xs whitespace-nowrap line-through">
              {priceLabel}
            </span>
            <span className="text-primary dark:text-primary-foreground min-w-0 text-xs font-bold whitespace-nowrap">
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
            'border-input pointer-events-none relative hidden h-full min-h-14 min-w-0 items-center justify-center border-b px-6 transition-colors lg:flex',
            activePlan === plan ? 'bg-primary/30' : 'bg-accent',
            hoveredPlan === plan && activePlan !== plan && 'bg-accent/70',
            hasToggle &&
              (activePlan === plan
                ? 'group-hover/addon:bg-primary/20'
                : 'group-hover/addon:bg-accent/60'),
          )}
        >
          {!isAddOn && isOneTime && perTierPrices?.[plan] && (
            <span
              className={cn(
                'min-w-0 text-xs font-bold whitespace-nowrap uppercase',
                activePlan === plan
                  ? 'text-primary dark:text-primary-foreground'
                  : 'text-foreground/70',
              )}
            >
              {perTierPrices[plan]}
            </span>
          )}
          {!isAddOn && isRecurring && perTierPrices?.[plan] && (
            <span
              className={cn(
                'min-w-0 text-xs font-bold whitespace-nowrap uppercase',
                activePlan === plan
                  ? 'text-primary dark:text-primary-foreground'
                  : 'text-foreground/70',
              )}
            >
              {perTierPrices[plan]}
            </span>
          )}
          {isOneTime &&
            !perTierPrices &&
            plan === activePlan &&
            priceLabel &&
            !discountedPriceLabel && (
              <span className="text-primary dark:text-primary-foreground min-w-0 text-center text-xs font-bold uppercase">
                {priceLabel}
              </span>
            )}
          {isOneTime &&
            !perTierPrices &&
            plan === activePlan &&
            priceLabel &&
            discountedPriceLabel && (
              <span className="flex min-w-0 flex-col items-center gap-0.5">
                <span className="text-foreground/60 min-w-0 text-center text-xs line-through">
                  {priceLabel}
                </span>
                <span className="text-primary dark:text-primary-foreground min-w-0 text-center text-xs font-bold uppercase">
                  {discountedPriceLabel}
                </span>
              </span>
            )}
          {isAddOn && plan === activePlan && priceLabel && !discountedPriceLabel && (
            <span className="flex min-w-0 flex-col items-center gap-0.5">
              {setupPriceLabel && (
                <span className="text-primary dark:text-primary-foreground min-w-0 text-center text-xs font-bold">
                  {setupPriceLabel}
                </span>
              )}
              <span className="text-primary dark:text-primary-foreground min-w-0 text-center text-xs font-bold">
                {priceLabel}
              </span>
            </span>
          )}
          {isAddOn && plan === activePlan && priceLabel && discountedPriceLabel && (
            <span className="flex min-w-0 flex-col items-center gap-0.5">
              <span className="text-foreground/60 min-w-0 text-center text-xs line-through">
                {priceLabel}
              </span>
              <span className="text-primary dark:text-primary-foreground min-w-0 text-center text-xs font-bold">
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
