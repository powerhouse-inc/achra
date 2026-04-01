import { BuildersFiltersProvider } from '@/modules/builders/components/builders-filters/builders-filters-context'
import type { ComponentType } from 'react'

/**
 * Storybook decorator for components that require BuildersFiltersProvider context
 */
export const withBuildersFiltersProvider = (Story: ComponentType) => (
  <BuildersFiltersProvider>
    <Story />
  </BuildersFiltersProvider>
)
