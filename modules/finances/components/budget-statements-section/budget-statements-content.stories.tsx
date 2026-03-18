import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { METRIC_OPTIONS } from '../../types'
import { BudgetStatementsItem } from './budget-statement-item/budget-statement-item'
import { mockBudgetStatements } from './mock/budget-statement-mock'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/BudgetStatementsSection/BudgetStatementsItem',
  component: BudgetStatementsItem,
  decorators: [withNuqsAdapter],
  parameters: {
    layout: 'padded',
    date: new Date('2026-01-06T04:14:00.000Z'),
    docs: {
      description: {
        component: 'Displays a placeholder list for Builder Teams within the Builders section.',
      },
    },
  },
} satisfies Meta<typeof BudgetStatementsItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    budgetStatements: mockBudgetStatements,
    budgetMetric: METRIC_OPTIONS.Actuals,
  },
}
