import { mockTransactions } from '@/modules/expense-reports/mocks'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { TransactionList } from './transaction-list'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/TransactionList',
  component: TransactionList,
  decorators: [withPortalFontStyles, withNextjsExtras],
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

export const WithHighlightedPositiveAmounts: Story = {
  args: {
    ...Default.args,
    highlightPositiveAmounts: true,
  },
}
