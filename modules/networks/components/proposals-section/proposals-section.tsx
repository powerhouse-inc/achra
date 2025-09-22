'use client'

import { cn } from '@/shared/lib/utils'
import type { RouteWithDynamicPages } from '@/shared/types/routes'
import SectionTitle from '../section-title/section-title'
import { ProposalCard } from './components/proposal-card'

export interface Proposal {
  id: string
  title: string
  budget: string
  deadlineDate: string
  experienceLevel: string
  detailsHref: RouteWithDynamicPages
}

export interface ProposalsSectionProps {
  proposals: Proposal[]
  className?: string
}

export default function ProposalsSection({ proposals, className }: ProposalsSectionProps) {
  return (
    <section id="proposals" className={cn('flex w-full flex-col gap-6', className)}>
      <div className="flex flex-col">
        <SectionTitle title="Proposals" hash="proposals" />
        <span className="text-foreground/50 text-base/6 font-semibold">
          Powerhouse has 1 active Request for Proposal
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {/* Note: Temporary implemenation of proposals */}
        {proposals.map((proposal) => (
          <ProposalCard key={proposal.id} {...proposal} />
        ))}
      </div>
    </section>
  )
}
