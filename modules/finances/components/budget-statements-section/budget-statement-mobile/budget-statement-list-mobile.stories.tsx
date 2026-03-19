import { mockBudgetStatements } from '@/modules/finances/mocks'
import { METRIC_OPTIONS } from '@/modules/finances/types'
import {
  withNextjsExtras,
  withNuqsAdapter,
  withPortalFontStyles,
} from '@/modules/shared/lib/decorators'
import { BudgetStatementListMobile } from './budget-statement-list-mobile'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Finances/Components/BudgetStatementListMobile',
  component: BudgetStatementListMobile,
  decorators: [withNextjsExtras, withNuqsAdapter, withPortalFontStyles],
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
