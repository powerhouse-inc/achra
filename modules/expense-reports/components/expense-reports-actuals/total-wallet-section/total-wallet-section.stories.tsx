import { makeBudgetRow, mockBudgetColumns, mockBudgetRows } from '@/modules/expense-reports/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { TotalWalletSection } from './total-wallet-section'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/ExpenseReportsActuals/TotalWalletSection',
  component: TotalWalletSection,
  decorators: [withPortalFontStyles],
  argTypes: {
    currentMonth: {
      control: 'date',
      description: 'Month to display totals for',
    },
    mainTableColumns: {
      control: false,
      description: 'Column definitions for the main table',
    },
    mainTableItems: {
      control: false,
      description: 'Table row data',
    },
    builderLabel: {
      control: 'text',
      description: 'Builder label for empty placeholder',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof TotalWalletSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentMonth: new Date('2025-08-01'),
    mainTableColumns: mockBudgetColumns,
    mainTableItems: mockBudgetRows,
    builderLabel: 'Powerhouse',
  },
}

export const Empty: Story = {
  args: {
    currentMonth: new Date('2025-08-01'),
    mainTableColumns: mockBudgetColumns,
    mainTableItems: [makeBudgetRow('Totals', 0, 0, 0, 0, 'total')],
    builderLabel: 'Powerhouse',
  },
}
