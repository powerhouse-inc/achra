'use client'

import { cva } from 'class-variance-authority'
import { useMemo } from 'react'
import { useServicePurchaseState } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import { KeyValueCard } from './key-value-card'

const facetsGridVariants = cva('bg-accent grid grid-cols-1 gap-2 px-3 py-3 lg:px-6 lg:py-4', {
  variants: {
    variant: {
      one: '', // 1 column always, we use the default styles only
      two: 'sm:grid-cols-2',
      three:
        'sm:grid-cols-2 md:grid-cols-3 [&>*:nth-child(3)]:sm:col-span-2 [&>*:nth-child(3)]:md:col-span-1',
      fourOrMore: 'sm:grid-cols-2 md:grid-cols-4',
    },
  },
})

function SelectedFacets() {
  const { facets } = useServicePurchaseState()

  const facetVariant = useMemo(() => {
    if (facets.length === 1) return 'one'
    if (facets.length === 2) return 'two'
    if (facets.length === 3) return 'three'
    return 'fourOrMore'
  }, [facets.length])

  return (
    <div className={facetsGridVariants({ variant: facetVariant })}>
      {facets.map((facet) => (
        <KeyValueCard
          key={facet.originalFacet.id}
          label={facet.originalFacet.categoryLabel}
          value={facet.selectedOption}
        />
      ))}
    </div>
  )
}

export { SelectedFacets }
