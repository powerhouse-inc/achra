'use client'

import { parse } from 'date-fns'
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

  try {
    return parse(monthString, 'MMMyyyy', new Date())
  } catch {
    return new Date()
  }
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
    <nav className="flex items-center gap-2" aria-label="Month navigation">
      <div className="flex gap-2">
        <Button asChild variant="ghost" size="icon" aria-label="Previous month">
          <Link href={createUrl(formatMonthString(previousMonth))}>
            <ChevronLeft className="text-foreground size-4" />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon" aria-label="Next month">
          <Link href={createUrl(formatMonthString(nextMonth))}>
            <ChevronRight className="text-foreground size-4" />
          </Link>
        </Button>
      </div>

      <time
        className="text-foreground/50 text-xl leading-[120%] font-bold"
        dateTime={`${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`}
        aria-live="polite"
      >
        {formatMonthDisplay(currentMonth)}
      </time>
    </nav>
  )
}

export { MonthNavigation }
