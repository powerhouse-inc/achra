export enum SortEnum {
  Neutral = 'neutral',
  Asc = 'asc',
  Desc = 'desc',
  Disabled = 'disabled',
}

export const WALLETS_TABLE_COLUMNS = [
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
    accessorKey: 'usdsBalance',
    hasSort: true,
    sortReverse: false,
  },
  {
    header: 'Balance (SKY)',
    accessorKey: 'skyBalance',
    hasSort: true,
    sortReverse: false,
  },
]
