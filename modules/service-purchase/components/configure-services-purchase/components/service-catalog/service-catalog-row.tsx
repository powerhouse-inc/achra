'use client'

import { FeatureRow } from './feature-row'
import type { FeatureValue, ServiceMetric } from '../types'

export interface ServiceCatalogRowProps {
  label: string
  sublabel?: string
  values: Record<string, FeatureValue>
  metrics?: ServiceMetric[]
}

export function ServiceCatalogRow({
  label,
  sublabel,
  values,
  metrics,
}: Readonly<ServiceCatalogRowProps>) {
  return <FeatureRow label={label} sublabel={sublabel} values={values} metrics={metrics} />
}
