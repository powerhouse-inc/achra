import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BudgetStatementFilters } from './budget-statement-filters'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementFilters',
  component: BudgetStatementFilters,
  decorators: [withNuqsAdapter, withPortalFontStyles],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/finances',
      },
    },
  },
} satisfies Meta<typeof BudgetStatementFilters>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
