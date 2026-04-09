import type { InnerTableColumn } from '@/modules/expense-reports/types'
import { CategoryTableHeader } from '../../category-table-header'

export const BREAKDOWN_COLUMNS: InnerTableColumn[] = [
  {
    header: <CategoryTableHeader />,
    align: 'left',
    type: 'text',
    isCardHeader: true,
    width: '240px',
  },
  {
    header: (
      <div className="inline">
        <span className="lg:hidden">Budget Alloc.</span>
        <span className="hidden lg:inline">Budget Allocation</span>
      </div>
    ),
    align: 'right',
    type: 'number',
    hasBorderBottomOnCard: true,
  },
  {
    header: 'Forecast',
    align: 'right',
    type: 'incomeNumber',
    hasBorderBottomOnCard: true,
  },
  {
    header: 'Actuals',
    align: 'right',
    type: 'incomeNumber',
    hasBorderBottomOnCard: true,
  },
  {
    header: (
      <div className="inline">
        <span className="lg:hidden">Diff.</span>
        <span className="hidden lg:inline">Difference</span>
      </div>
    ),
    align: 'right',
    type: 'number',
    hasBorderBottomOnCard: true,
  },
  {
    header: 'Comments',
    align: 'left',
    type: 'text',
    width: '300px',
    hasBorderBottomOnCard: true,
  },
  {
    header: 'Payments',
    align: 'right',
    type: 'number',
  },
]
