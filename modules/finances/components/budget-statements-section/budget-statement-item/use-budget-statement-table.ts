import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import type { BudgetStatement, MetricWithoutBudget } from '@/modules/finances/types'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { compareMonth, getMetricLabel } from '../lib/utils'
import type { BudgetStatementsTableColumn } from '../const'
import type SimpleBar from 'simplebar-react'

interface UseBudgetStatementTableProps {
  budgetStatements: BudgetStatement[]
  budgetMetric: MetricWithoutBudget
  asSectionContent?: boolean
}

export enum SortEnum {
  Neutral = 'neutral',
  Asc = 'asc',
  Desc = 'desc',
  Disabled = 'disabled',
}

export function useBudgetStatementTable({
  budgetStatements,
  budgetMetric,
  asSectionContent = false,
}: UseBudgetStatementTableProps) {
  const isDesktopLg = useMediaQuery({ from: 'lg', to: 'xl' })
  const isDesktop = useMediaQuery({ from: 'lg' })
  const simpleBarRef = useRef<React.ComponentRef<typeof SimpleBar>>(null)
  const cardContentRef = useRef<HTMLDivElement>(null)
  const itemsWrapperRef = useRef<HTMLDivElement>(null)

  const BUDGET_STATEMENTS_TABLE_COLUMNS: BudgetStatementsTableColumn[] = useMemo(() => {
    return [
      {
        header: 'Builders',
        accessorKey: 'owner.name',
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
        accessorKey: 'lastModifiedAtUtcIso',
        hasSort: true,
        sortReverse: true,
        isNumeric: false,
      },
    ]
  }, [budgetMetric, isDesktopLg])

  useEffect(() => {
    if (!asSectionContent) return

    const simpleBarEl = simpleBarRef.current?.el
    const cardContentEl = cardContentRef.current
    const itemsWrapperEl = itemsWrapperRef.current

    if (!simpleBarEl || !cardContentEl || !itemsWrapperEl) return

    const teamsCount = budgetStatements.length

    let config: { maxHeight: string; maxItems: number } | null = null
    if (isDesktop) {
      config = { maxHeight: '630px', maxItems: 9 }
    }

    if (!config) {
      simpleBarEl.style.maxHeight = ''
      cardContentEl.style.paddingRight = ''
      itemsWrapperEl.style.paddingRight = ''
      itemsWrapperEl.style.paddingLeft = ''
      itemsWrapperEl.style.paddingBottom = ''
      return
    }

    if (teamsCount > config.maxItems) {
      simpleBarEl.style.maxHeight = config.maxHeight
      cardContentEl.style.paddingRight = '4px'
      itemsWrapperEl.style.paddingRight = '12px'
    }
  }, [isDesktop, budgetStatements.length, asSectionContent])

  const [headersSort, setHeadersSort] = useState<SortEnum[]>(
    BUDGET_STATEMENTS_TABLE_COLUMNS.map((column: BudgetStatementsTableColumn) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
    ),
  )
  const [sortColumn, setSortColumn] = useState<number>(-1)
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

  const sortBudgetStatements = useCallback(
    (statements: BudgetStatement[]) => {
      if (sortColumn === -1) return statements

      const column = BUDGET_STATEMENTS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]
      const effectiveSortDirection =
        column.sortReverse &&
        sortDirection !== SortEnum.Neutral &&
        sortDirection !== SortEnum.Disabled
          ? sortDirection === SortEnum.Asc
            ? SortEnum.Desc
            : SortEnum.Asc
          : sortDirection

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return statements
      }

      return [...statements].sort((a, b) => {
        const getSortableValue = (statement: BudgetStatement): string | number => {
          if (column.accessorKey === 'lastModifiedAtUtcIso') {
            if (!statement.lastModifiedAtUtcIso) return -1

            const timestamp = new Date(statement.lastModifiedAtUtcIso).getTime()
            return Number.isNaN(timestamp) ? -1 : timestamp
          }

          const value = getNestedValue(statement, column.accessorKey)

          if (value === null) {
            return ''
          }
          if (typeof value === 'string') {
            return value.toLowerCase()
          }

          return value
        }

        if (column.accessorKey === 'month') {
          const result = compareMonth(a.month, b.month)
          return effectiveSortDirection === SortEnum.Asc ? result : -result
        }

        const aValue = getSortableValue(a)
        const bValue = getSortableValue(b)

        if (aValue < bValue) {
          return effectiveSortDirection === SortEnum.Asc ? -1 : 1
        }
        if (aValue > bValue) {
          return effectiveSortDirection === SortEnum.Asc ? 1 : -1
        }
        return 0
      })
    },
    [sortColumn, BUDGET_STATEMENTS_TABLE_COLUMNS, headersSort],
  )

  const sortedBudgetStatements = useMemo(
    () => sortBudgetStatements(budgetStatements),
    [budgetStatements, sortBudgetStatements],
  )

  const handleSortClickHeader = (index: number) => {
    if (proccesedBudgetStatementsTableColumns[index].hasSort) {
      handleSortClick(index)
    }
  }

  return {
    proccesedBudgetStatementsTableColumns,
    headersSort,
    sortedBudgetStatements,
    simpleBarRef,
    cardContentRef,
    itemsWrapperRef,
    handleSortClickHeader,
  }
}
