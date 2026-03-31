import { useCallback, useMemo, useState } from 'react'
import {
  WALLETS_TABLE_COLUMNS,
  type WalletsTableColumn,
} from '@/modules/networks/components/wallets-section/components/wallets-card/components/wallets-table/constants'
import type { ProccesedWallets } from '@/modules/networks/hooks/use-wallets-card'
import { SortEnum } from '@/modules/networks/types'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'

interface UseWalletsTableProps {
  wallets: ProccesedWallets[]
}

export function useWalletsTable({ wallets }: UseWalletsTableProps) {
  const [headersSort, setHeadersSort] = useState<SortEnum[]>(
    WALLETS_TABLE_COLUMNS.map((column: WalletsTableColumn) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
    ),
  )
  const [sortColumn, setSortColumn] = useState<number>(-1)
  const isDesktop = useMediaQuery({ from: 'lg' })

  const proccesedWalletsTableColumns: Array<Omit<WalletsTableColumn, 'shortHeader'>> =
    useMemo(() => {
      return WALLETS_TABLE_COLUMNS.map((column) => ({
        accessorKey: column.accessorKey,
        hasSort: column.hasSort,
        sortReverse: column.sortReverse,
        isNumeric: column.isNumeric,
        header: !isDesktop && column.shortHeader ? column.shortHeader : column.header,
      }))
    }, [isDesktop])

  const handleSortClick = useCallback(
    (index: number) => {
      const sortNeutralState = WALLETS_TABLE_COLUMNS.map((column) =>
        column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
      ) as SortEnum[]

      if (headersSort[index] === SortEnum.Neutral) {
        if (WALLETS_TABLE_COLUMNS[index].sortReverse) {
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

  const handleRowClick = (event: React.MouseEvent<HTMLTableRowElement>, address: string) => {
    if (!(event.target instanceof HTMLAnchorElement)) {
      window.open(`https://etherscan.io/address/${address}`, '_blank')
    }
  }

  const sortWallets = useCallback(
    (wallets: ProccesedWallets[]) => {
      if (sortColumn === -1) return wallets

      const column = WALLETS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return wallets
      }

      return [...wallets].sort((a, b) => {
        const aValue: string | number = a[column.accessorKey as keyof ProccesedWallets]
        const bValue: string | number = b[column.accessorKey as keyof ProccesedWallets]

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

  const sortedWallets = useMemo(() => sortWallets(wallets), [wallets, sortWallets])

  return {
    proccesedWalletsTableColumns,
    headersSort,
    sortedWallets,
    handleSortClick,
    handleRowClick,
  }
}
