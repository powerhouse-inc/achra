import { makeBudgetRow, mockBudgetColumns, mockBudgetRows } from '@/modules/expense-reports/mocks'
import { withNextjsExtras, withPortalFontStyles } from '@/modules/shared/lib/decorators'
import { AdvancedInnerTable } from './advanced-inner-table'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Modules/Expense Reports/Components/AdvancedInnerTable',
  component: AdvancedInnerTable,
  decorators: [withPortalFontStyles, withNextjsExtras],
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
