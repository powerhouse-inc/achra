import { useEffect, useMemo, useReducer, useRef } from 'react'

export interface PaginationOptions {
  /**
   * The number of items to show in the first page (in case it is different from the `pageSize`)
   */
  firstPageSize?: number
  /**
   * The number of items to show in each page
   */
  pageSize?: number
  /**
   * Whether the pagination is enabled. If it is disabled, it will return the original array without pagination
   */
  enabled?: boolean
}

export interface InfinitePaginationReturn<T> {
  /**
   * The index of the current page
   */
  currentPageIndex: number
  /**
   * The items in the current page
   */
  currentPage: T[]
  /**
   * Array of items in all pages
   */
  pages: T[][]
  /**
   * The items that are currently visible. Items from page 0 to `currentPageIndex`
   */
  visibleItems: T[]
  /**
   * Whether there are more items to load
   */
  hasMore: boolean
  /**
   * Load the next page
   */
  loadMore: () => void
}

type PageAction = { type: 'LOAD_MORE' } | { type: 'RESET' }

function pageReducer(state: number, action: PageAction): number {
  switch (action.type) {
    case 'LOAD_MORE':
      return state + 1
    case 'RESET':
      return 0
    default:
      return state
  }
}

/**
 * Hook for paginating an array with infinite scroll functionality.
 *
 * Splits an array into pages and provides methods to progressively load more items.
 * Automatically resets to the first page when the input array changes.\
 *
 * @returns An object containing pagination state and controls:
 * - `currentPageIndex` - The current page index (0-based)
 * - `currentPage` - Items in the current page only
 * - `pages` - All pages as a 2D array
 * - `visibleItems` - All items from page 0 to the current page (accumulated)
 * - `hasMore` - Whether there are more pages to load
 * - `loadMore` - Function to load the next page
 *
 * @example
 * ```tsx
 * const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * const { visibleItems, hasMore, loadMore } = useInfiniteArray(items, { pageSize: 3 })
 *
 * // Initially shows: [1, 2, 3]
 * // After loadMore(): [1, 2, 3, 4, 5, 6]
 * // After loadMore() again: [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 */
export function useInfiniteArray<T>(
  array: T[],
  { firstPageSize, pageSize = 9, enabled = true }: PaginationOptions,
): InfinitePaginationReturn<T> {
  const arrayRef = useRef(array)
  const [currentPageIndex, dispatch] = useReducer(pageReducer, 0)

  // Reset page index when array reference changes
  // Using useEffect is necessary here to reset pagination when the source array changes
  useEffect(() => {
    if (arrayRef.current !== array) {
      arrayRef.current = array
      dispatch({ type: 'RESET' })
    }
  }, [array])

  // Split array into pages
  const pages = useMemo(() => {
    if (!enabled || array.length === 0) {
      return [array]
    }

    const result: T[][] = []
    const firstSize = firstPageSize ?? pageSize
    let startIndex = 0

    // First page
    if (array.length > 0) {
      result.push(array.slice(0, firstSize))
      startIndex = firstSize
    }

    // Subsequent pages
    while (startIndex < array.length) {
      result.push(array.slice(startIndex, startIndex + pageSize))
      startIndex += pageSize
    }

    return result
  }, [array, firstPageSize, pageSize, enabled])

  const currentPage = useMemo(() => {
    if (!enabled) {
      return array
    }
    return pages[currentPageIndex] ?? []
  }, [pages, currentPageIndex, enabled, array])

  const visibleItems = useMemo(() => {
    if (!enabled) {
      return array
    }
    return pages.slice(0, currentPageIndex + 1).flat()
  }, [pages, currentPageIndex, enabled, array])

  const hasMore = useMemo(() => {
    if (!enabled) {
      return false
    }
    return currentPageIndex < pages.length - 1
  }, [currentPageIndex, pages.length, enabled])

  const loadMore = () => {
    if (hasMore) {
      dispatch({ type: 'LOAD_MORE' })
    }
  }

  return {
    currentPageIndex,
    currentPage,
    pages,
    visibleItems,
    hasMore,
    loadMore,
  }
}
