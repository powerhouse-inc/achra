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
    accessorKey: 'name',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Skills',
    accessorKey: 'skilss',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Scope',
    accessorKey: 'scopes',
    hasSort: true,
    sortReverse: false,
    isNumeric: false,
  },
  {
    header: 'Last Modified',
    accessorKey: 'lastModified',
    hasSort: true,
    sortReverse: true,
    isNumeric: false,
  },
]
