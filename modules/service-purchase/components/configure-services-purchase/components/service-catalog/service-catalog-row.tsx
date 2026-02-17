'use client'

import { FeatureRow } from './feature-row'
import type { FeatureValue } from '../types'

export interface ServiceCatalogRowProps {
  label: string
  sublabel?: string
  values: Record<string, FeatureValue>
}

export function ServiceCatalogRow({ label, sublabel, values }: Readonly<ServiceCatalogRowProps>) {
  return <FeatureRow label={label} sublabel={sublabel} values={values} />
}
