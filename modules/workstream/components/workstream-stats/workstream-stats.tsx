import { format } from 'date-fns'
import { CalendarClock, HandCoins, UserCheck } from 'lucide-react'
import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import { ProposalKeyValueElement } from '@/modules/shared/components/proposal-key-value-element'
import { threeDigitsPrecisionHumanization } from '@/modules/shared/lib/humanization'

interface WorkstreamStatsProps {
  issuer?: Maybe<string>
  budgetMin?: Maybe<number>
  budgetMax?: Maybe<number>
  budgetCurrency?: Maybe<string>
  submissionDeadline?: Maybe<string>
}

function formatDeadline(submissionDeadline?: Maybe<string>) {
  let deadline = 'Not specified'
  if (submissionDeadline) {
    const deadlineDate = new Date(submissionDeadline)
    deadline = format(deadlineDate, 'd MMM yyyy @ HH:mm zzz').toUpperCase()
  }
  return deadline
}

const formatValue = (value: number) => {
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

  const min = budgetMin ? formatValue(budgetMin) : '0'
  const max = budgetMax ? formatValue(budgetMax) : ''

  if (min && max) return `${min} - ${max} ${currency}`
  if (min) return `${min}  ${currency}`
  if (max) return `Up to ${max} ${currency}`

  return 'Not specified'
}

export default function WorkstreamStats({
  issuer,
  budgetMin,
  budgetMax,
  budgetCurrency,
  submissionDeadline, // "12 SEP 2025 @ 12:00 CET"
}: WorkstreamStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-x-6 xl:grid-cols-3 xl:grid-cols-[1fr_1fr_1.3fr] sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
      <ProposalKeyValueElement keyValue="Issuer" keyIcon={UserCheck} value={issuer} />
      <ProposalKeyValueElement
        keyValue="Budget Range"
        keyIcon={HandCoins}
        value={formatBudgetRange(budgetMin, budgetMax, budgetCurrency)}
      />
      <ProposalKeyValueElement
        keyValue={
          <div>
            <span className="sm:hidden">Deadline</span>
            <span className="hidden sm:block">Submission Deadline</span>
          </div>
        }
        keyIcon={CalendarClock}
        value={formatDeadline(submissionDeadline)}
      />
    </div>
  )
}
