import { mockBudgetStatements } from '@/modules/finances/mocks'
import { METRIC_OPTIONS } from '@/modules/finances/types'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BudgetStatementTable } from './budget-statement-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementTable',
  component: BudgetStatementTable,
  decorators: [withNuqsAdapter, withPortalFontStyles],
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
  },
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/finances',
      },
    },
  },
} satisfies Meta<typeof BudgetStatementTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    budgetStatements: mockBudgetStatements,
    budgetMetric: METRIC_OPTIONS.Actuals,
  },
}
