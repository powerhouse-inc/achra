import { useCallback, useMemo, useState } from 'react'
import { SortEnum, WALLETS_TABLE_COLUMNS } from './constants'
import type { Wallet } from '../../../../wallets-section'

interface UseWalletsTableProps {
  wallets: Wallet[]
}

export function useWalletsTable({ wallets }: UseWalletsTableProps) {
  const [headersSort, setHeadersSort] = useState<SortEnum[]>(
    WALLETS_TABLE_COLUMNS.map((column) => (column.hasSort ? SortEnum.Neutral : SortEnum.Disabled)),
  )
  const [sortColumn, setSortColumn] = useState<number>(-1)

  const handleCopyAddress = async (address: string) => {
    await navigator.clipboard.writeText(address)
  }

  const onSortClick = useCallback(
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

  const sortWallets = useCallback(
    (wallets: Wallet[]) => {
      if (sortColumn === -1) return wallets

      const column = WALLETS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return wallets
      }

      return [...wallets].sort((a, b) => {
        let aValue: string | number = a[column.accessorKey as keyof Wallet]
        let bValue: string | number = b[column.accessorKey as keyof Wallet]

        // Handle numeric sorting for balance columns
        if (column.accessorKey === 'usdsBalance' || column.accessorKey === 'skyBalance') {
          aValue = parseFloat(aValue.toString().replace(/,/g, ''))
          bValue = parseFloat(bValue.toString().replace(/,/g, ''))
        }

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
    handleCopyAddress,
    onSortClick,
    headersSort,
    sortedWallets,
  }
}
