import { useCallback, useMemo, useState } from 'react'

import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { getMetricLabel } from '../utils'
import type { BudgetStatementsTableColumn } from '../const'
import type { BudgetStatementExpenseReport, MetricWithoutBudget } from '../type'

interface UseBudgetStamentTableProps {
  builders: BudgetStatementExpenseReport[]
  budgetMetric: MetricWithoutBudget
}

export enum SortEnum {
  Neutral = 'neutral',
  Asc = 'asc',
  Desc = 'desc',
  Disabled = 'disabled',
}

export function useBudgetStamentTable({ builders, budgetMetric }: UseBudgetStamentTableProps) {
  const isDesktopLg = useMediaQuery({ from: 'lg', to: 'xl' })
  const BUDGET_STATEMENTS_TABLE_COLUMNS: BudgetStatementsTableColumn[] = useMemo(() => {
    return [
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
        header: getMetricLabel(budgetMetric, isDesktopLg),
        accessorKey: '',
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
        accessorKey: 'lastModified',
        hasSort: true,
        sortReverse: false,
        isNumeric: false,
      },
    ]
  }, [budgetMetric, isDesktopLg])

  const [headersSort, setHeadersSort] = useState<SortEnum[]>(
    BUDGET_STATEMENTS_TABLE_COLUMNS.map((column: BudgetStatementsTableColumn) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
    ),
  )
  const [sortColumn, setSortColumn] = useState<number>(-1)
  const isDesktop = useMediaQuery({ from: 'lg' })
  const proccesedBudgetStatementsTableColumns: Array<
    Omit<BudgetStatementsTableColumn, 'shortHeader'>
  > = useMemo(() => {
    return BUDGET_STATEMENTS_TABLE_COLUMNS.map((column) => ({
      accessorKey: column.accessorKey,
      hasSort: column.hasSort,
      sortReverse: column.sortReverse,
      isNumeric: column.isNumeric,
      header: !isDesktop && column.shortHeader ? column.shortHeader : column.header,
    }))
  }, [BUDGET_STATEMENTS_TABLE_COLUMNS, isDesktop])

  const handleSortClick = useCallback(
    (index: number) => {
      const sortNeutralState = BUDGET_STATEMENTS_TABLE_COLUMNS.map((column) =>
        column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
      ) as SortEnum[]

      if (headersSort[index] === SortEnum.Neutral) {
        if (BUDGET_STATEMENTS_TABLE_COLUMNS[index].sortReverse) {
          sortNeutralState[index] = SortEnum.Desc
        } else {
          sortNeutralState[index] = SortEnum.Asc
        }
      } else {
        sortNeutralState[index] = headersSort[index] === SortEnum.Asc ? SortEnum.Desc : SortEnum.Asc
      }

      setHeadersSort(sortNeutralState)
      setSortColumn(index)
    },
    [BUDGET_STATEMENTS_TABLE_COLUMNS, headersSort],
  )

  const sortBuilders = useCallback(
    (builders: BudgetStatementExpenseReport[]) => {
      if (sortColumn === -1) return builders

      const column = BUDGET_STATEMENTS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return builders
      }

      const getSortableValue = (
        value: BudgetStatementExpenseReport[keyof BudgetStatementExpenseReport],
      ): string | number => {
        if (value === null) {
          return ''
        }
        if (typeof value === 'string' || typeof value === 'number') {
          return value
        }
        if (Array.isArray(value)) {
          return value.length
        }
        if (value instanceof Date) {
          return value.getTime()
        }
        return ''
      }

      return [...builders].sort((a, b) => {
        const aValue = getSortableValue(a[column.accessorKey as keyof BudgetStatementExpenseReport])
        const bValue = getSortableValue(b[column.accessorKey as keyof BudgetStatementExpenseReport])

        if (aValue < bValue) {
          return sortDirection === SortEnum.Asc ? -1 : 1
        }
        if (aValue > bValue) {
          return sortDirection === SortEnum.Asc ? 1 : -1
        }
        return 0
      })
    },
    [sortColumn, BUDGET_STATEMENTS_TABLE_COLUMNS, headersSort],
  )

  const sortedBuilders = useMemo(() => sortBuilders(builders), [builders, sortBuilders])

  const handleSortClickHeader = (index: number) => {
    if (proccesedBudgetStatementsTableColumns[index].hasSort) {
      handleSortClick(index)
    }
  }

  return {
    proccesedBudgetStatementsTableColumns,
    headersSort,
    sortedBuilders,
    handleSortClickHeader,
  }
}
