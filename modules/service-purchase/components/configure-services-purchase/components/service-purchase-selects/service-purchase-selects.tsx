'use client'

import { parseAsString, useQueryState } from 'nuqs'
import type { RsOfferingFacetTarget } from '@/modules/__generated__/graphql/switchboard-generated'
import { LabeledSelect } from '@/modules/service-purchase/components/configure-services-purchase/components/labeled-select'

interface FacetSelectProps {
  facet: RsOfferingFacetTarget
}

function FacetSelect({ facet }: Readonly<FacetSelectProps>) {
  const defaultValue = facet.selectedOptions[0] ?? ''
  const [value, setValue] = useQueryState(
    facet.categoryKey,
    parseAsString.withDefault(defaultValue),
  )

  return (
    <LabeledSelect
      label={facet.categoryLabel}
      value={value}
      onValueChange={(val) => {
        void setValue(val)
      }}
      options={facet.selectedOptions}
      placeholder={facet.categoryLabel}
      className="w-full"
      matchTriggerWidth={true}
    />
  )
}

interface ServicePurchaseSelectsProps {
  facetTargets: RsOfferingFacetTarget[]
}

function ServicePurchaseSelects({ facetTargets }: Readonly<ServicePurchaseSelectsProps>) {
  return (
    <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
      {facetTargets.map((facet) => (
        <FacetSelect key={facet.categoryKey} facet={facet} />
      ))}
    </div>
  )
}

export { ServicePurchaseSelects }
