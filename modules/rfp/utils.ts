import { format } from 'date-fns'
import type { Rfp } from '../__generated__/graphql/switchboard-generated'

// Format deadline
export const formatDeadline = (rfp?: Rfp | null) => {
  if (!rfp) return 'Not specified'
  if (!rfp.submissionDeadline) return 'Not specified'
  const date = new Date(rfp.submissionDeadline)
  return format(date, 'd MMM yyyy, hh:mm a zzz')
}

// Format budget range
export const formatBudgetRange = (rfp?: Rfp | null) => {
  if (!rfp) return 'Not specified'
  if (!rfp.budgetMin && !rfp.budgetMax) return 'Not specified'
  const currency = rfp.budgetCurrency ?? 'USD'
  const min = rfp.budgetMin ? `${(rfp.budgetMin / 1000).toFixed(0)}K` : ''
  const max = rfp.budgetMax ? `${(rfp.budgetMax / 1000).toFixed(0)}K` : ''
  if (min && max) return `${min} - ${max} ${currency}`
  if (min) return `${min}+ ${currency}`
  if (max) return `Up to ${max} ${currency}`
  return 'Not specified'
}
