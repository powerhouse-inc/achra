import { useCallback, useMemo, useState } from 'react'
import type { Builder } from '@/modules/__generated__/graphql/switchboard-generated'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { BUDGET_STATEMENTS_TABLE_COLUMNS, type BudgetStatementsTableColumn } from '../const'

interface UseBudgetStamentTableProps {
  builders: Builder[]
}

export enum SortEnum {
  Neutral = 'neutral',
  Asc = 'asc',
  Desc = 'desc',
  Disabled = 'disabled',
}

export function useBudgetStamentTable({ builders }: UseBudgetStamentTableProps) {
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
  }, [isDesktop])

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
    [headersSort],
  )

  const sortBuilders = useCallback(
    (builders: Builder[]) => {
      if (sortColumn === -1) return builders

      const column = BUDGET_STATEMENTS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return builders
      }

      const getSortableValue = (value: Builder[keyof Builder]): string | number => {
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
        const aValue = getSortableValue(a[column.accessorKey as keyof Builder])
        const bValue = getSortableValue(b[column.accessorKey as keyof Builder])

        if (aValue < bValue) {
          return sortDirection === SortEnum.Asc ? -1 : 1
        }
        if (aValue > bValue) {
          return sortDirection === SortEnum.Asc ? 1 : -1
        }
        return 0
      })
    },
    [sortColumn, headersSort],
  )

  const sortedBuilders = useMemo(() => sortBuilders(builders), [builders, sortBuilders])

  return {
    proccesedBudgetStatementsTableColumns,
    headersSort,
    sortedBuilders,
    handleSortClick,
  }
}
