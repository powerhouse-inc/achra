import { mockCategoriesTree } from '@/modules/expense-reports/mocks'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ModalCategoriesProvider } from '../../providers/categories-provider'
import { CategoriesModal } from './categories-modal'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/CategoriesModal',
  component: CategoriesModal,
  decorators: [withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CategoriesModal>

export default meta
type Story = StoryObj<typeof meta>

/**
 * The CategoriesModal requires ModalCategoriesProvider context.
 * This story wraps the modal in the provider and renders a button to open it.
 */
export const Default: Story = {
  render: () => (
    <ModalCategoriesProvider categoriesTree={mockCategoriesTree}>
      <CategoriesModal />
    </ModalCategoriesProvider>
  ),
}

export const Empty: Story = {
  render: () => (
    <ModalCategoriesProvider categoriesTree={{ headcount: [], nonHeadcount: [] }}>
      <CategoriesModal />
    </ModalCategoriesProvider>
  ),
}
