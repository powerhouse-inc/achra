'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { useCallback, useMemo } from 'react'
import {
  findNextAvailableMonth,
  findPreviousAvailableMonth,
} from '../../lib/month-navigation-utils'
import {
  formatMonthDisplay,
  formatMonthString,
  isMonthAvailable,
  isSameMonth,
  normalizeMonth,
  parseMonthString,
} from '../../lib/month-utils'
import { viewMonthSearchParamParser } from '../../lib/search-params-client'
import type { Route } from 'next'

interface UseMonthNavigationProps {
  availableMonths: Date[]
  defaultMonth: Date
}

function useMonthNavigation({ availableMonths, defaultMonth }: UseMonthNavigationProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [viewMonth] = useQueryState('viewMonth', viewMonthSearchParamParser)

  // Determine the selected month
  const selectedMonth = useMemo(() => {
    const parsedMonth = parseMonthString(viewMonth)

    // If no query param or parsing failed, use default
    if (!parsedMonth) {
      return defaultMonth
    }

    // Check if parsed month is in available months
    if (isMonthAvailable(parsedMonth, availableMonths)) {
      return normalizeMonth(parsedMonth)
    }

    // If not available, use default
    return defaultMonth
  }, [viewMonth, availableMonths, defaultMonth])

  // Find navigation months
  const previousMonth = useMemo(
    () => findPreviousAvailableMonth(selectedMonth, availableMonths),
    [selectedMonth, availableMonths],
  )

  const nextMonth = useMemo(
    () => findNextAvailableMonth(selectedMonth, availableMonths),
    [selectedMonth, availableMonths],
  )

  // Create URL helper for Link components
  const createUrl = useCallback(
    (month: Date | null): Route => {
      const params = new URLSearchParams(searchParams.toString())

      if (month === null || isSameMonth(month, defaultMonth)) {
        // Remove viewMonth param if it's the default month
        params.delete('viewMonth')
      } else {
        params.set('viewMonth', formatMonthString(month))
      }

      const queryString = params.toString()
      return (queryString ? `${pathname}?${queryString}` : pathname) as Route
    },
    [pathname, searchParams, defaultMonth],
  )

  return {
    selectedMonth,
    selectedMonthDisplay: formatMonthDisplay(selectedMonth),
    previousMonth,
    nextMonth,
    createUrl,
  }
}

export { useMonthNavigation }
