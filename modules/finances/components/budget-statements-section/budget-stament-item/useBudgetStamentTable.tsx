import { useCallback, useMemo, useState } from 'react'

import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { getMetricLabel } from '../utils'
import type { BudgetStatementsTableColumn } from '../const'
import type { BudgetStatement, MetricWithoutBudget } from '../type'

interface UseBudgetStamentTableProps {
  builders: BudgetStatement[]
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
        // Disabled until API provides lastModified field
        hasSort: false,
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

  const getNestedValue = (obj: BudgetStatement, path: string): string | number | null => {
    const keys = path.split('.')
    let result: unknown = obj
    for (const key of keys) {
      if (result === null || result === undefined) return null
      result = (result as Record<string, unknown>)[key]
    }
    if (typeof result === 'string' || typeof result === 'number') {
      return result
    }
    return null
  }

  const sortBuilders = useCallback(
    (builders: BudgetStatement[]) => {
      if (sortColumn === -1) return builders

      const column = BUDGET_STATEMENTS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return builders
      }

      return [...builders].sort((a, b) => {
        const aValue = getNestedValue(a, column.accessorKey) ?? ''
        const bValue = getNestedValue(b, column.accessorKey) ?? ''

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
