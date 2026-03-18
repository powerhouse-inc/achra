'use client'

import {
  RsGroupCostType,
  type RsOfferingOptionGroup,
} from '@/modules/__generated__/graphql/switchboard-generated'
import {
  buildServiceMetrics,
  buildServiceValues,
  computeOptionGroupHeaderPrices,
  getBillingCycleValue,
  getCostType,
  getCurrency,
  resolveAddOnDisplayPrice,
} from '@/modules/service-purchase/lib/utils'
import {
  useAllOptionGroups,
  useComputedTiers,
  useSelectedTier,
  useServiceOffering,
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { CatalogStatus } from '@/modules/service-purchase/types'
import {
  ServiceCatalogBody,
  ServiceCatalogHeader,
  ServiceCatalogRoot,
  ServiceCatalogRow,
} from '../..'

interface OptionGroupSectionProps {
  section: RsOfferingOptionGroup
  setupDiscountedPrices: Record<string, number | null>
}

function OptionGroupSection({ section, setupDiscountedPrices }: OptionGroupSectionProps) {
  const servicesData = useServiceOffering()
  const tier = useSelectedTier()
  const tiers = useComputedTiers()
  const { setOptionGroupSelected } = useServicePurchaseActions()
  const storeOptionGroups = useAllOptionGroups()
  const { selectedBillingCycle: billingPeriod } = useServicePurchaseState()

  const rowBody = servicesData.services.filter((s) => s.optionGroupId === section.id)

  const addOnDisplayPrice = section.isAddOn
    ? resolveAddOnDisplayPrice(section, tier.id, billingPeriod)
    : null

  const perTierPrices = computeOptionGroupHeaderPrices(section, tiers, billingPeriod)

  const isAddOnSelected = storeOptionGroups.find((og) => og.id === section.id)?.isSelected ?? false

  const groupSetupPrice =
    section.isAddOn && section.standalonePricing?.setupCost?.amount != null
      ? Number(section.standalonePricing.setupCost.amount)
      : undefined

  return (
    <ServiceCatalogRoot isEnabled={!section.isAddOn || isAddOnSelected}>
      <ServiceCatalogHeader
        title={section.name}
        badge={section.isAddOn ? CatalogStatus.Optional : undefined}
        hasToggle={section.isAddOn}
        toggleLabel={section.name}
        toggleEnabled={isAddOnSelected}
        onToggleChange={
          section.isAddOn
            ? (enabled: boolean) => {
                setOptionGroupSelected(section.id, enabled)
              }
            : undefined
        }
        groupPrice={section.isAddOn ? addOnDisplayPrice?.basePrice : getBillingCycleValue(section)}
        groupDiscountedPrice={
          section.isAddOn
            ? addOnDisplayPrice?.discountedPrice
            : section.costType === RsGroupCostType.Setup &&
                setupDiscountedPrices[section.id] != null &&
                setupDiscountedPrices[section.id] !== section.price
              ? setupDiscountedPrices[section.id]
              : undefined
        }
        groupCurrency={getCurrency(section)}
        groupCostType={getCostType(section)}
        perTierPrices={perTierPrices}
        isAddOn={section.isAddOn}
        groupSetupPrice={groupSetupPrice}
      />

      <ServiceCatalogBody>
        {rowBody.map((row) => (
          <ServiceCatalogRow
            key={row.id}
            label={row.title}
            sublabel={row.description ?? undefined}
            values={buildServiceValues(row.id, tiers)}
            metrics={buildServiceMetrics(row.id, tiers)}
          />
        ))}
      </ServiceCatalogBody>
    </ServiceCatalogRoot>
  )
}

export { OptionGroupSection }
