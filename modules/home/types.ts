import type { Route } from 'next'

export type BuildNetworkFeatureVariant = 'organizations' | 'builders' | 'operators'

export interface BuildNetworkFeatureColumn {
  variant: BuildNetworkFeatureVariant
  title: string
  description: string
  cta: { label: string; href: Route; tone: 'blue' | 'pink' }
  enabled?: boolean
}
