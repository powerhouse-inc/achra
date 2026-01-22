'use client'

import { FeatureRow } from './feature-row'
import { useServiceCatalogContext } from './service-catalog-root'
import type { FeatureValue, PricingPlan } from '../types'

export interface ServiceCatalogRowProps {
  id: string
  label: string
  sublabel?: string
  values: Record<PricingPlan, FeatureValue>
}

export function ServiceCatalogRow({
  id,
  label,
  sublabel,
  values,
}: Readonly<ServiceCatalogRowProps>) {
  const { activePlan } = useServiceCatalogContext()

  return (
    <FeatureRow
      key={id}
      label={label}
      sublabel={sublabel}
      values={values}
      activePlan={activePlan}
    />
  )
}
