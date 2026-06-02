import { format, parseISO } from 'date-fns'

/**
 * Formats an ISO date string to "MMM yyyy" with month in capitals (e.g. "JUL 2022").
 * Returns a fallback string for null/undefined/invalid input.
 */
export function formatMonthYear(isoDate: string | null | undefined, fallback = 'No data'): string {
  if (isoDate == null || isoDate === '') return fallback
  try {
    const date = parseISO(isoDate)
    if (Number.isNaN(date.getTime())) return fallback
    const formatted = format(date, 'MMM yyyy')
    return formatted.replace(/^\w+/, (m) => m.toUpperCase())
  } catch {
    return fallback
  }
}
