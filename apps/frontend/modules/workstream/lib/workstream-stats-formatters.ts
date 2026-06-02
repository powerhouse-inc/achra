import { format } from 'date-fns'
import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import { threeDigitsPrecisionHumanization } from '@/modules/shared/lib/humanization'

function formatDeadline(submissionDeadline?: Maybe<string>) {
  let deadline = 'Not specified'
  if (submissionDeadline) {
    const deadlineDate = new Date(submissionDeadline)
    deadline = format(deadlineDate, 'd MMM yyyy @ HH:mm zzz').toUpperCase()
  }
  return deadline
}

function formatBudgetValue(value: number) {
  const { value: formatted, suffix } = threeDigitsPrecisionHumanization(value)
  const cleanedValue = formatted.replace(/\.0+$/, '')
  return `${cleanedValue}${suffix}`
}

function formatBudgetRange(
  budgetMin?: Maybe<number>,
  budgetMax?: Maybe<number>,
  budgetCurrency?: Maybe<string>,
) {
  if (!budgetMin && !budgetMax) return 'Not specified'
  const currency = budgetCurrency ?? 'USD'

  const min = budgetMin ? formatBudgetValue(budgetMin) : '0'
  const max = budgetMax ? formatBudgetValue(budgetMax) : ''

  if (min && max) return `${min} - ${max} ${currency}`
  if (min) return `${min}  ${currency}`
  if (max) return `Up to ${max} ${currency}`

  return 'Not specified'
}

export { formatDeadline, formatBudgetRange }
