import { parse } from 'date-fns'
import { formatMonthString, isMonthAvailable, normalizeMonth } from './month-utils'

export function getSelectedMonth(
  availableMonths: Date[],
  viewMonthParam: string | undefined | null,
) {
  if (availableMonths.length === 0) {
    return normalizeMonth(new Date())
  }

  if (
    (typeof viewMonthParam === 'string' && viewMonthParam.trim() !== '') ||
    (viewMonthParam !== null && viewMonthParam !== undefined)
  ) {
    const parsedMonth = parse(viewMonthParam, 'MMMyyyy', new Date())
    const normalizedMonth = normalizeMonth(parsedMonth)

    if (isMonthAvailable(normalizedMonth, availableMonths)) {
      return normalizedMonth
    }

    // otherwise the viewMonth param is invalid
  }

  // return more recent month in the available months
  const currentMonth = normalizeMonth(new Date())
  const closestMonth = availableMonths.reduce((closest, month) => {
    return Math.abs(month.getTime() - currentMonth.getTime()) <
      Math.abs(closest.getTime() - currentMonth.getTime())
      ? month
      : closest
  }, availableMonths[0])
  return closestMonth
}

export function shouldRedirectToCleanUrl(
  selectedMonth: Date,
  currentViewMonthParam: string | null,
) {
  if (currentViewMonthParam === null) {
    return false // no viewMonth param, default selected month was taken
  }

  const formattedSelectedMonth = formatMonthString(selectedMonth)

  // if the formatted selected month is different from the current viewMonth param
  // we need to redirect to update the view month param as it was provided but invalid
  return formattedSelectedMonth !== currentViewMonthParam
}

/**
 * Finds the previous available month from the current month
 */
export function findPreviousAvailableMonth(
  currentMonth: Date,
  availableMonths: Date[],
): Date | null {
  const normalizedCurrent = normalizeMonth(currentMonth)
  const normalizedAvailable = availableMonths
    .map(normalizeMonth)
    .sort((a, b) => b.getTime() - a.getTime())

  for (const available of normalizedAvailable) {
    if (available.getTime() < normalizedCurrent.getTime()) {
      return available
    }
  }

  return null
}

/**
 * Finds the next available month from the current month
 */
export function findNextAvailableMonth(currentMonth: Date, availableMonths: Date[]): Date | null {
  const normalizedCurrent = normalizeMonth(currentMonth)
  const normalizedAvailable = availableMonths
    .map(normalizeMonth)
    .sort((a, b) => a.getTime() - b.getTime())

  for (const available of normalizedAvailable) {
    if (available.getTime() > normalizedCurrent.getTime()) {
      return available
    }
  }

  return null
}
