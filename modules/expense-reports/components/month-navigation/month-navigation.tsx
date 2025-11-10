'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { Button } from '@/modules/shared/components/ui/button'
import { viewMonthSearchParamParser } from '../../lib/search-params-client'
import type { Route } from 'next'

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

function parseMonthString(monthString: string | null): Date {
  if (!monthString) {
    return new Date()
  }

  // Parse format: MonYear (e.g., "Jan2025", "Feb2024")
  const match = monthString.match(/^([A-Za-z]{3})(\d{4})$/)
  if (!match) {
    return new Date()
  }

  const [, monthName, yearStr] = match
  const monthIndex = MONTH_NAMES.findIndex((m) => m.toLowerCase() === monthName.toLowerCase())
  const year = parseInt(yearStr, 10)

  if (monthIndex === -1 || isNaN(year)) {
    return new Date()
  }

  return new Date(year, monthIndex, 1)
}

function formatMonthString(date: Date): string {
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  return `${month}${year}`
}

function formatMonthDisplay(date: Date): string {
  const month = MONTH_NAMES[date.getMonth()].toUpperCase()
  const year = date.getFullYear()
  return `${month} ${year}`
}

function getPreviousMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() - 1)
  return newDate
}

function getNextMonth(date: Date): Date {
  const newDate = new Date(date)
  newDate.setMonth(newDate.getMonth() + 1)
  return newDate
}

function MonthNavigation() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [viewMonth] = useQueryState('viewMonth', viewMonthSearchParamParser)

  const currentMonth = parseMonthString(viewMonth)

  const createUrl = (monthString: string): Route => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('viewMonth', monthString)
    return `${pathname}?${params.toString()}` as Route
  }

  const previousMonth = getPreviousMonth(currentMonth)
  const nextMonth = getNextMonth(currentMonth)

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="outline" size="icon" aria-label="Previous month">
        <Link href={createUrl(formatMonthString(previousMonth))}>
          <ChevronLeft className="size-4" />
        </Link>
      </Button>
      <Button asChild variant="outline" size="icon" aria-label="Next month">
        <Link href={createUrl(formatMonthString(nextMonth))}>
          <ChevronRight className="size-4" />
        </Link>
      </Button>

      <div>{formatMonthDisplay(currentMonth)}</div>
    </div>
  )
}

export { MonthNavigation }
