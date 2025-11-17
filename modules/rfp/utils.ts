import { format } from 'date-fns'
import { threeDigitsPrecisionHumanization } from '../shared/lib/humanization'
import type { Rfp } from '../__generated__/graphql/switchboard-generated'

export const formatDeadline = (rfp?: Rfp | null) => {
  if (!rfp?.submissionDeadline) return 'Not specified'
  const date = new Date(rfp.submissionDeadline)
  const formatted = format(date, 'd MMM yyyy @ HH:mm zzz')

  return formatted.toLocaleUpperCase()
}

const formatValue = (value: number) => {
  const { value: formatted, suffix } = threeDigitsPrecisionHumanization(value)
  const cleanedValue = formatted.replace(/\.0+$/, '')
  return `${cleanedValue}${suffix}`
}
// Format budget range
export const formatBudgetRange = (rfp?: Rfp | null) => {
  if (!rfp?.budgetMin && !rfp?.budgetMax) return 'Not specified'
  const currency = rfp.budgetCurrency ?? 'USD'

  const minFormatted = rfp.budgetMin ? formatValue(rfp.budgetMin) : '0'
  const maxFormatted = rfp.budgetMax ? formatValue(rfp.budgetMax) : ''

  if (minFormatted && maxFormatted) return `${minFormatted} - ${maxFormatted} ${currency}`
  if (minFormatted) return `${minFormatted}  ${currency}`
  if (maxFormatted) return `Up to ${maxFormatted} ${currency}`
  return 'Not specified'
}
