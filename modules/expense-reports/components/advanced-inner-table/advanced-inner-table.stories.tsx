import { makeBudgetRow, mockBudgetColumns, mockBudgetRows } from '@/modules/expense-reports/mocks'
import { withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { AdvancedInnerTable } from './advanced-inner-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/ExpenseReports/Components/AdvancedInnerTable',
  component: AdvancedInnerTable,
  decorators: [withPortalFontStyles],
  argTypes: {
    longCode: {
      control: 'text',
      description: 'Actor/project code for empty placeholder',
    },
    columns: {
      control: false,
      description: 'Column definitions for the table',
    },
    items: {
      control: false,
      description: 'Table row data',
    },
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AdvancedInnerTable>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    longCode: 'PWR-001',
    columns: mockBudgetColumns,
    items: mockBudgetRows,
  },
}

export const Empty: Story = {
  args: {
    longCode: 'PWR-001',
    columns: mockBudgetColumns,
    items: [makeBudgetRow('Totals', 0, 0, 0, 0, 'total')],
  },
}
