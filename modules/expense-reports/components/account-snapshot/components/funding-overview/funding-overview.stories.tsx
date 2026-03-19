import { mockTransactions } from '@/modules/expense-reports/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { FundingOverview } from './funding-overview'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/AccountSnapshot/FundingOverview',
  component: FundingOverview,
  decorators: [withPortalFontStyles],
  argTypes: {
    builderName: {
      control: 'text',
      description: 'Builder name for display',
    },
    startDate: {
      control: 'text',
      description: 'Period start date',
    },
    endDate: {
      control: 'text',
      description: 'Period end date',
    },
    balance: {
      control: false,
      description: 'Calculated balance (starting, ending, inflow, outflow)',
    },
    transactionHistory: {
      control: false,
      description: 'List of transactions',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof FundingOverview>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    builderName: 'Powerhouse',
    startDate: '2025-07-01',
    endDate: '2025-08-31',
    balance: {
      startingBalance: 500000,
      endingBalance: 420000,
      inflow: 100000,
      outflow: 180000,
    },
    transactionHistory: mockTransactions,
  },
}

export const EmptyTransactions: Story = {
  args: {
    builderName: 'Core Dev',
    startDate: '2025-07-01',
    endDate: '2025-07-31',
    balance: {
      startingBalance: 100000,
      endingBalance: 100000,
      inflow: 0,
      outflow: 0,
    },
    transactionHistory: [],
  },
}
