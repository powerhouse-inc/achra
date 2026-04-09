export interface BudgetStatementsTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
  isNumeric: boolean
}

export const BUDGET_STATEMENTS_TABLE_COLUMNS: BudgetStatementsTableColumn[] = [
  {
    header: 'Contributors',
    accessorKey: 'name',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Reporting Month',
    accessorKey: 'month',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Actuals',
    accessorKey: 'actuals',
    hasSort: false,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    hasSort: false,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Last Modified',
    accessorKey: 'lastModifiedAtUtcIso',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
]
