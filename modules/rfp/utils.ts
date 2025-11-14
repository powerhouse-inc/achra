import { format } from 'date-fns'
import { formatValueScientificNotation } from '../shared/lib/humanization'
import type { Rfp } from '../__generated__/graphql/switchboard-generated'

// Format deadline
export const formatDeadline = (rfp?: Rfp | null) => {
  if (!rfp?.submissionDeadline) return 'Not specified'
  const date = new Date(rfp.submissionDeadline)
  return format(date, 'd MMM yyyy, hh:mm a zzz')
}

// Format budget range
export const formatBudgetRange = (rfp?: Rfp | null) => {
  if (!rfp?.submissionDeadline) return 'Not specified'
  if (!rfp.budgetMin && !rfp.budgetMax) return 'Not specified'
  const currency = rfp.budgetCurrency ?? 'USD'
  const min = rfp.budgetMin ? formatValueScientificNotation(rfp.budgetMin) : ''
  const max = rfp.budgetMax ? formatValueScientificNotation(rfp.budgetMax) : ''
  if (min && max) return `${min} - ${max} ${currency}`
  if (min) return `${min}+ ${currency}`
  if (max) return `Up to ${max} ${currency}`
  return 'Not specified'
}
