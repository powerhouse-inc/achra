import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'

export interface ProposalCardProps {
  id: string
  title: string
  budget: string
  deadlineDate: string
  experienceLevel: string
  detailsHref?: string
  className?: string
}

export function ProposalCard({
  title,
  budget,
  deadlineDate,
  experienceLevel,
  detailsHref = '#',
  className,
}: ProposalCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md',
        className,
      )}
    >
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <Link
          href={detailsHref as any}
          className="flex items-center gap-1 text-gray-700 transition-colors hover:text-gray-900"
        >
          <span className="text-sm font-medium">Details</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Budget</span>
          <span className="text-sm font-medium text-gray-900">{budget}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Deadline Date</span>
          <span className="text-sm font-medium text-gray-900">{deadlineDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Experience Level</span>
          <span className="text-sm font-medium text-red-600">{experienceLevel}</span>
        </div>
      </div>
    </div>
  )
}
