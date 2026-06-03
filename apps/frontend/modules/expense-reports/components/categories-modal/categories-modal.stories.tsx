import { useEffect } from 'react'
import { mockCategoriesTree } from '@/modules/expense-reports/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { ModalCategoriesProvider, useModalCategories } from '../../providers/categories-provider'
import { CategoriesModal } from './categories-modal'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

function AutoOpenModal() {
  const { openModal } = useModalCategories()
  useEffect(() => {
    openModal()
  }, [openModal])
  return null
}

const meta = {
  title: 'Modules/ExpenseReports/Components/CategoriesModal',
  component: CategoriesModal,
  decorators: [withPortalFontStyles],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CategoriesModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <ModalCategoriesProvider categoriesTree={mockCategoriesTree}>
      <AutoOpenModal />
    </ModalCategoriesProvider>
  ),
}

export const Empty: Story = {
  render: () => (
    <ModalCategoriesProvider categoriesTree={{ headcount: [], nonHeadcount: [] }}>
      <AutoOpenModal />
    </ModalCategoriesProvider>
  ),
}
