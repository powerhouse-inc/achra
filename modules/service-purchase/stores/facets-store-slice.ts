import type { RsOfferingFacetTarget } from '@/modules/__generated__/graphql/switchboard-generated'
import type { FacetsSlice, ServicePurchaseStoreSet } from '../types'

function createFacetsSlice(
  set: ServicePurchaseStoreSet,
  initialFacets?: RsOfferingFacetTarget[],
): FacetsSlice {
  const facets =
    initialFacets?.map((ft) => ({
      originalFacet: ft,
      selectedOption: ft.selectedOptions[0] ?? null,
    })) ?? []

  return {
    facets,

    actions: {
      selectedFacetOption: (categoryKey, selectedOption) => {
        set((state) => ({
          facets: state.facets.map((facet) =>
            facet.originalFacet.categoryKey === categoryKey ? { ...facet, selectedOption } : facet,
          ),
        }))
      },
    },
  }
}

export { createFacetsSlice }
