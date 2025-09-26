export interface WalletsTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
}

export const WALLETS_TABLE_COLUMNS: WalletsTableColumn[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    hasSort: true,
    sortReverse: false,
  },
  {
    header: 'Address',
    accessorKey: 'address',
    hasSort: true,
    sortReverse: false,
  },
  {
    header: 'Balance (USDS)',
    shortHeader: '(USDS)',
    accessorKey: 'usdsBalance',
    hasSort: true,
    sortReverse: false,
  },
  {
    header: 'Balance (SKY)',
    shortHeader: '(SKY)',
    accessorKey: 'skyBalance',
    hasSort: true,
    sortReverse: false,
  },
]
