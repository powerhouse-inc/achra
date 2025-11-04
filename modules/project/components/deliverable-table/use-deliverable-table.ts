import { useCallback, useMemo, useState } from 'react'
import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { SortEnum } from '@/modules/shared/types'
import { DELIVERABLES_TABLE_COLUMNS, type DeliverableTableColumn } from './constants'
interface UseDeliverableTableProps {
  deliverables: ScopeOfWork_Deliverable[]
}

export function useDeliverableTable({ deliverables = [] }: UseDeliverableTableProps) {
  const [headersSort, setHeadersSort] = useState<SortEnum[]>(
    DELIVERABLES_TABLE_COLUMNS.map((column: DeliverableTableColumn) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
    ),
  )
  const [sortColumn, setSortColumn] = useState<number>(-1)
  const isDesktop = useMediaQuery({ from: 'lg', to: 'xl' })

  const proccesedDeliverablesTableColumns = useMemo(
    () =>
      DELIVERABLES_TABLE_COLUMNS.map((column) => ({
        accessorKey: column.accessorKey,
        hasSort: column.hasSort,
        sortReverse: column.sortReverse,
        isNumeric: column.isNumeric,
        header: isDesktop && column.shortHeader ? column.shortHeader : column.header,
      })),
    [isDesktop],
  )

  const handleSortClick = useCallback(
    (index: number) => {
      const sortNeutralState = DELIVERABLES_TABLE_COLUMNS.map((column) =>
        column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
      ) as SortEnum[]

      if (headersSort[index] === SortEnum.Neutral) {
        if (DELIVERABLES_TABLE_COLUMNS[index].sortReverse) {
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

  const sortDeliverables = useCallback(
    (deliverables: ScopeOfWork_Deliverable[]) => {
      if (sortColumn === -1) return deliverables

      const column = DELIVERABLES_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return deliverables
      }

      return [...deliverables].sort((a, b) => {
        const aValue = column.getValue(a)
        const bValue = column.getValue(b)

        if (aValue == null && bValue == null) return 0
        if (aValue == null) return 1
        if (bValue == null) return -1

        // Compare values
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

  const sortedDeliverables = useMemo(
    () => sortDeliverables(deliverables),
    [deliverables, sortDeliverables],
  )

  return {
    proccesedDeliverablesTableColumns,
    headersSort,
    sortedDeliverables,
    handleSortClick,
  }
}
