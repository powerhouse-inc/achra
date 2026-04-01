import { mockCategoriesTree } from '@/modules/expense-reports/mocks'
import { ModalCategoriesProvider } from '@/modules/expense-reports/providers/categories-provider'
import type { ComponentType } from 'react'

/**
 * Storybook decorator wrapping stories with {@link ModalCategoriesProvider} and the shared mock category tree.
 */
export const withModalCategoriesMockProvider = (Story: ComponentType) => (
  <ModalCategoriesProvider categoriesTree={mockCategoriesTree}>
    <Story />
  </ModalCategoriesProvider>
)
