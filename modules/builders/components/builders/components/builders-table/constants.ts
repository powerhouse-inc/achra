export interface BuildersTableColumn {
  header: string
  shortHeader?: string
  accessorKey: string
  hasSort: boolean
  sortReverse: boolean
  isNumeric: boolean
}

export const BUILDERS_TABLE_COLUMNS: BuildersTableColumn[] = [
  {
    header: 'Builders',
    accessorKey: 'builders',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Skills',
    accessorKey: 'skills',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Scope',
    accessorKey: 'scope',
    hasSort: true,
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
