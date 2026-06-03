import { mockBudgetStatements } from '@/modules/finances/mocks'
import { METRIC_OPTIONS, SortOptionValue } from '@/modules/finances/types'
import { withNuqsAdapter } from '@/modules/shared/lib/decorators'
import { BudgetStatementsItem } from './budget-statement-item'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementsSection/BudgetStatementsItem',
  component: BudgetStatementsItem,
  decorators: [withNuqsAdapter],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    budgetStatements: {
      control: false,
      description: 'List of budget statements to display',
    },
    budgetMetric: {
      control: 'select',
      options: Object.values(METRIC_OPTIONS),
      description: 'Selected metric for display',
    },
    sortOption: {
      control: 'select',
      options: Object.values(SortOptionValue),
      description: 'Sort order for budget statements',
    },
    asSectionContent: {
      control: 'boolean',
      description: 'Whether to render as section content',
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
