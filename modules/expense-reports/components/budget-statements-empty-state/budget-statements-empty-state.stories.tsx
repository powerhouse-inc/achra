import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BudgetStatementsEmptyState } from './budget-statements-empty-state'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/BudgetStatementsEmptyState',
  component: BudgetStatementsEmptyState,
  decorators: [withPortalFontStyles, withNextjsExtras],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof BudgetStatementsEmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
