'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { useMonthNavigation } from './use-month-navigation'

interface MonthNavigationProps {
  availableMonths: Date[]
  defaultMonth: Date
}

function MonthNavigation({ availableMonths, defaultMonth }: MonthNavigationProps) {
  const { selectedMonth, selectedMonthDisplay, previousMonth, nextMonth, createUrl } =
    useMonthNavigation({ availableMonths, defaultMonth })

  return (
    <nav className="flex items-center gap-2" aria-label="Month navigation">
      <div className="flex gap-2">
        {previousMonth ? (
          <Button asChild variant="ghost" size="icon" aria-label="Previous month">
            <Link href={createUrl(previousMonth)}>
              <ChevronLeft className="text-foreground size-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" aria-label="Previous month" disabled>
            <ChevronLeft className="text-foreground size-4" />
          </Button>
        )}
        {nextMonth ? (
          <Button asChild variant="ghost" size="icon" aria-label="Next month">
            <Link href={createUrl(nextMonth)}>
              <ChevronRight className="text-foreground size-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" aria-label="Next month" disabled>
            <ChevronRight className="text-foreground size-4" />
          </Button>
        )}
      </div>

      <time
        className="text-foreground/50 text-base/6 font-semibold sm:text-xl/[120%] sm:font-bold"
        dateTime={`${selectedMonth.getUTCFullYear()}-${String(selectedMonth.getUTCMonth() + 1).padStart(2, '0')}`}
        aria-live="polite"
      >
        {selectedMonthDisplay}
      </time>
    </nav>
  )
}

export { MonthNavigation }
