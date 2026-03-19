import { withNuqsAdapter, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { BudgetStatementsPageHeader } from './budget-statements-page-header'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/BudgetStatementsPageHeader',
  component: BudgetStatementsPageHeader,
  decorators: [withNuqsAdapter, withPortalFontStyles],
  argTypes: {
    availableMonthsWithMetadata: {
      control: false,
      description: 'Months with status and last update metadata',
    },
    defaultMonthIso: {
      control: 'text',
      description: 'Fallback month when URL has no viewMonth',
    },
  },
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/network/powerhouse/builders/powerhouse-dashboard/budget-statements',
      },
    },
  },
} satisfies Meta<typeof BudgetStatementsPageHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    availableMonthsWithMetadata: [
      { month: '2024-01-01', status: 'Final', lastUpdate: '2024-02-05T10:00:00Z' },
      { month: '2024-02-01', status: 'Final', lastUpdate: '2024-03-04T10:00:00Z' },
      { month: '2024-03-01', status: 'Draft', lastUpdate: '2024-04-02T10:00:00Z' },
      { month: '2024-04-01', status: null, lastUpdate: null },
    ],
    defaultMonthIso: '2024-03-01',
  },
}

export const SingleMonth: Story = {
  args: {
    availableMonthsWithMetadata: [
      { month: '2024-06-01', status: 'Final', lastUpdate: '2024-07-01T09:00:00Z' },
    ],
    defaultMonthIso: '2024-06-01',
  },
}

export const NoStatus: Story = {
  args: {
    availableMonthsWithMetadata: [
      { month: '2024-01-01', status: null, lastUpdate: null },
      { month: '2024-02-01', status: null, lastUpdate: null },
    ],
    defaultMonthIso: '2024-01-01',
  },
}
