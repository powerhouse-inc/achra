import { mockBudgetStatements } from '@/modules/finances/mocks'
import { METRIC_OPTIONS } from '@/modules/finances/types'
import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BudgetStatementListMobile } from './budget-statement-list-mobile'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementListMobile',
  component: BudgetStatementListMobile,
  decorators: [withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    budgetStatements: {
      control: false,
      description: 'List of budget statements to display',
    },
    selectedMetric: {
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
} satisfies Meta<typeof BudgetStatementListMobile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    budgetStatements: mockBudgetStatements,
    selectedMetric: METRIC_OPTIONS.Actuals,
  },
}
