'use client'

import type { FeatureValue, ServiceMetric } from '@/modules/service-purchase/types'
import { FeatureRow } from './feature-row'

export interface ServiceCatalogRowProps {
  label: string
  sublabel?: string
  values: Record<string, FeatureValue>
  metrics?: ServiceMetric[]
}

function ServiceCatalogRow({ label, sublabel, values, metrics }: Readonly<ServiceCatalogRowProps>) {
  return <FeatureRow label={label} sublabel={sublabel} values={values} metrics={metrics} />
}

export { ServiceCatalogRow }
