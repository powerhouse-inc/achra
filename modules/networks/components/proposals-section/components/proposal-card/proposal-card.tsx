import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import type { Proposal } from '../../proposals-section'

export interface ProposalCardProps extends Proposal {
  className?: string
}

export function ProposalCard({
  title,
  budget,
  deadlineDate,
  experienceLevel,
  detailsHref,
  className,
}: ProposalCardProps) {
  return (
    <div
      className={cn(
        'bg-card flex w-full flex-col gap-2 rounded-xl pb-6 shadow-lg sm:w-72 md:w-85 lg:w-76 xl:w-72 2xl:w-79',
        className,
      )}
    >
      <div className="bg-accent flex items-center justify-between px-2 py-2">
        <span className="text-lg leading-6 font-bold text-gray-900">{title}</span>
        <Link
          href={detailsHref}
          className="flex items-center gap-1 text-gray-700 transition-colors hover:text-gray-900"
        >
          <span className="text-secondary-foreground text-sm leading-5 font-medium">Details</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="flex flex-col gap-2 px-2 text-sm leading-5.5 font-semibold">
        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Budget</span>
          <span className="text-foreground">{budget}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Deadline Date</span>
          <span className="text-foreground">{deadlineDate}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-foreground/50">Experience Level</span>
          <span className="text-destructive">{experienceLevel}</span>
        </div>
      </div>
    </div>
  )
}
