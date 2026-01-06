import { METRIC_OPTIONS } from '../../types'
import { BudgetStatementsItem } from './budget-stament-item/budget-staments-item'
import { mockBudgetStatements } from './mock/budget-stament-mock'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  title: 'Modules/Finances/BudgetStatementsSection/BudgetStatementsItem',
  component: BudgetStatementsItem,
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
    builders: mockBudgetStatements,
    budgetMetric: METRIC_OPTIONS.Actuals,
  },
}
