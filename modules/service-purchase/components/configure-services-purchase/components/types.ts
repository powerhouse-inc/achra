export type FeatureValue = boolean | string | CatalogStatus

export enum CatalogStatus {
  Included = 'Included',
  Optional = 'Optional',
  Excluded = 'Excluded',
}

export interface ServiceMetric {
  metric: string
  values: Record<string, FeatureValue>
  isOneTime?: boolean
}
