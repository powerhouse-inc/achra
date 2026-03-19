import { mockTransactions } from '@/modules/expense-reports/mocks'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { FundingOverview } from './funding-overview'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/FundingOverview',
  component: FundingOverview,
  decorators: [withPortalFontStyles, withNextjsExtras],
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
