export type FeatureValue = boolean | string | CatalogStatus

export enum CatalogStatus {
  Included = 'Included',
  Optional = 'Optional',
  Excluded = 'Excluded',
}
