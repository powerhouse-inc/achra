'use client'

import { useMemo } from 'react'
import {
  useServicePurchaseActions,
  useServicePurchaseState,
} from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { FacetSelect } from './facet-select'

function FacetSelectionSection() {
  const { facets } = useServicePurchaseState()
  const { selectedFacetOption } = useServicePurchaseActions()

  const visibleFacets = useMemo(
    () => facets.filter((facet) => facet.originalFacet.selectedOptions.length > 1),
    [facets],
  )

  if (visibleFacets.length === 0) return null

  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
      {visibleFacets.map((facet) => (
        <FacetSelect
          key={facet.originalFacet.categoryKey}
          categoryLabel={facet.originalFacet.categoryLabel}
          value={facet.selectedOption}
          onValueChange={(value) => {
            selectedFacetOption(facet.originalFacet.categoryKey, value)
          }}
          options={facet.originalFacet.selectedOptions}
        />
      ))}
    </div>
  )
}

export { FacetSelectionSection }
