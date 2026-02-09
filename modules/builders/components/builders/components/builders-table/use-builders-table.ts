import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { useBuildersFiltersContext } from '../../../builders-filters/builders-filters-context'
import { BUILDERS_TABLE_COLUMNS, type BuildersTableColumn } from './constants'
import type SimpleBar from 'simplebar-react'

interface UseBuildersTableProps {
  builders: BuilderProfileState[]
  asSectionContent?: boolean
}

export enum SortEnum {
  Neutral = 'neutral',
  Asc = 'asc',
  Desc = 'desc',
  Disabled = 'disabled',
}

export function useBuildersTable({ builders, asSectionContent = false }: UseBuildersTableProps) {
  const [headersSort, setHeadersSort] = useState<SortEnum[]>(
    BUILDERS_TABLE_COLUMNS.map((column: BuildersTableColumn) =>
      column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
    ),
  )
  const [sortColumn, setSortColumn] = useState<number>(-1)
  const { isResetPending } = useBuildersFiltersContext()

  const simpleBarRef = useRef<React.ComponentRef<typeof SimpleBar>>(null)
  const cardContentRef = useRef<HTMLDivElement>(null)
  const itemsWrapperRef = useRef<HTMLDivElement>(null)

  const isDesktop = useMediaQuery({ from: 'lg' })

  const proccesedBuildersTableColumns: Array<Omit<BuildersTableColumn, 'shortHeader'>> =
    useMemo(() => {
      return BUILDERS_TABLE_COLUMNS.map((column) => ({
        accessorKey: column.accessorKey,
        hasSort: column.hasSort,
        sortReverse: column.sortReverse,
        isNumeric: column.isNumeric,
        header: !isDesktop && column.shortHeader ? column.shortHeader : column.header,
      }))
    }, [isDesktop])

  const handleSortClick = useCallback(
    (index: number) => {
      const sortNeutralState = BUILDERS_TABLE_COLUMNS.map((column) =>
        column.hasSort ? SortEnum.Neutral : SortEnum.Disabled,
      ) as SortEnum[]

      if (headersSort[index] === SortEnum.Neutral) {
        if (BUILDERS_TABLE_COLUMNS[index].sortReverse) {
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
    (builders: BuilderProfileState[]) => {
      if (sortColumn === -1) return builders

      const column = BUILDERS_TABLE_COLUMNS[sortColumn]
      const sortDirection = headersSort[sortColumn]

      if (sortDirection === SortEnum.Neutral || sortDirection === SortEnum.Disabled) {
        return builders
      }

      return [...builders].sort((a, b) => {
        const getSortableValue = (builder: BuilderProfileState): string | number => {
          const value = builder[column.accessorKey as keyof BuilderProfileState]
          if (column.accessorKey === 'lastModified') {
            if (typeof value === 'string') {
              const timestamp = new Date(value).getTime()
              return Number.isNaN(timestamp) ? 0 : timestamp
            }
            return 0
          }

          if (value === null) {
            return ''
          }
          if (typeof value === 'string') {
            return value.toLowerCase()
          }
          if (typeof value === 'number') {
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

        const aValue = getSortableValue(a)
        const bValue = getSortableValue(b)

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

  useEffect(() => {
    if (!asSectionContent) return

    const simpleBarEl = simpleBarRef.current?.el
    const cardContentEl = cardContentRef.current
    const itemsWrapperEl = itemsWrapperRef.current

    if (!simpleBarEl || !cardContentEl || !itemsWrapperEl) return

    const teamsCount = builders.length

    let config: { maxHeight: string; maxItems: number } | null = null
    if (isDesktop) {
      config = { maxHeight: '630px', maxItems: 7 }
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
  }, [isDesktop, builders.length, asSectionContent])

  return {
    proccesedBuildersTableColumns,
    headersSort,
    sortedBuilders,
    isResetPending,
    simpleBarRef,
    cardContentRef,
    itemsWrapperRef,
    handleSortClick,
  }
}
