export interface WalletsTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
  isNumeric: boolean
}

export const WALLETS_TABLE_COLUMNS: WalletsTableColumn[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Address',
    accessorKey: 'address',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Balance (USDS)',
    shortHeader: '(USDS)',
    accessorKey: 'usdsBalance',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
  },
  {
    header: 'Balance (SKY)',
    shortHeader: '(SKY)',
    accessorKey: 'skyBalance',
    hasSort: true,
    sortReverse: false,
    isNumeric: true,
  },
]
