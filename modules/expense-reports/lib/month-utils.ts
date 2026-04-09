import { parse } from 'date-fns'

/**
 * Month name abbreviations used for formatting dates
 */
export const MONTH_NAMES = [
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
] as const

/**
 * Normalizes a date to the first day of the month at 00:00 UTC for timezone-safe comparison
 */
export function normalizeMonth(date: Date): Date {
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth()
  return new Date(Date.UTC(year, month, 1, 0, 0, 0, 0))
}

/**
 * Checks if two dates represent the same month (same year and month, UTC)
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  const normalized1 = normalizeMonth(date1)
  const normalized2 = normalizeMonth(date2)
  return (
    normalized1.getUTCFullYear() === normalized2.getUTCFullYear() &&
    normalized1.getUTCMonth() === normalized2.getUTCMonth()
  )
}

/**
 * Formats a Date to MMMyyyy format (e.g., "Nov2025") using UTC month/year
 */
export function formatMonthString(date: Date): string {
  const month = MONTH_NAMES[date.getUTCMonth()]
  const year = date.getUTCFullYear()
  return `${month}${year}`
}

/**
 * Formats a Date for display (e.g., "NOV 2025") using UTC month/year
 */
export function formatMonthDisplay(date: Date): string {
  const month = MONTH_NAMES[date.getUTCMonth()].toUpperCase()
  const year = date.getUTCFullYear()
  return `${month} ${year}`
}

/**
 * Parses a month string in MMMyyyy format (e.g., "Nov2025") to a Date at 00:00 UTC
 * Returns null if parsing fails
 */
export function parseMonthString(monthString: string | null | undefined): Date | null {
  if (!monthString) {
    return null
  }

  try {
    const parsed = parse(monthString, 'MMMyyyy', new Date())
    return new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), 1, 0, 0, 0, 0))
  } catch {
    return null
  }
}

/**
 * Checks if a month exists in the available months array
 */
export function isMonthAvailable(month: Date, availableMonths: Date[]): boolean {
  const normalizedMonth = normalizeMonth(month)
  return availableMonths.some((available) => {
    return isSameMonth(normalizedMonth, available)
  })
}
