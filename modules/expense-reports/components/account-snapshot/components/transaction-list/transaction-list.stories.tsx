import { mockTransactions } from '@/modules/expense-reports/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { TransactionList } from './transaction-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/AccountSnapshot/TransactionList',
  component: TransactionList,
  decorators: [withPortalFontStyles],
  argTypes: {
    items: {
      control: false,
      description: 'Transactions or snapshot accounts to display',
    },
    highlightPositiveAmounts: {
      control: 'boolean',
      description: 'Whether to highlight positive amounts in green',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TransactionList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: mockTransactions,
  },
}

export const Empty: Story = {
  args: {
    items: [],
  },
}
