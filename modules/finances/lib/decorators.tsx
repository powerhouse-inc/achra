import { FinancesYearProvider } from '@/modules/finances/providers/finances-year-provider'
import type { ComponentType } from 'react'

/**
 * Storybook decorator for components that depend on {@link FinancesYearProvider}.
 */
export const withFinancesYearProvider = (Story: ComponentType) => (
  <FinancesYearProvider>
    <Story />
  </FinancesYearProvider>
)
