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
 * Normalizes a date to the first day of the month at midnight for accurate comparison
 */
export function normalizeMonth(date: Date): Date {
  const normalized = new Date(date)
  normalized.setDate(1)
  normalized.setHours(0, 0, 0, 0)
  return normalized
}

/**
 * Checks if two dates represent the same month (same year and month)
 */
export function isSameMonth(date1: Date, date2: Date): boolean {
  const normalized1 = normalizeMonth(date1)
  const normalized2 = normalizeMonth(date2)
  return (
    normalized1.getFullYear() === normalized2.getFullYear() &&
    normalized1.getMonth() === normalized2.getMonth()
  )
}

/**
 * Formats a Date to MMMyyyy format (e.g., "Nov2025")
 */
export function formatMonthString(date: Date): string {
  const month = MONTH_NAMES[date.getMonth()]
  const year = date.getFullYear()
  return `${month}${year}`
}

/**
 * Formats a Date for display (e.g., "NOV 2025")
 */
export function formatMonthDisplay(date: Date): string {
  const month = MONTH_NAMES[date.getMonth()].toUpperCase()
  const year = date.getFullYear()
  return `${month} ${year}`
}

/**
 * Parses a month string in MMMyyyy format (e.g., "Nov2025") to a Date
 * Returns null if parsing fails
 */
export function parseMonthString(monthString: string | null | undefined): Date | null {
  if (!monthString) {
    return null
  }

  try {
    return parse(monthString, 'MMMyyyy', new Date())
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
