'use client'

import { Link } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { ProposalCard } from './components/proposal-card'
import { useProposalsSection } from './use-proposals-section'

export interface Proposal {
  id: string
  title: string
  budget: string
  deadlineDate: string
  experienceLevel: string
  detailsHref?: string
}

export interface ProposalsSectionProps {
  proposals: Proposal[]
  className?: string
}

export default function ProposalsSection({ proposals, className }: ProposalsSectionProps) {
  const { handleCopyUrl } = useProposalsSection()
  return (
    <section id="proposals" className={cn('flex w-full flex-col gap-6', className)}>
      <div className="flex flex-col">
        <div className="flex w-fit items-center gap-4">
          <span className="text-[32px] leading-[1.2] font-bold">Proposals</span>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-muted-foreground/50 !p-0 hover:bg-transparent"
            onClick={() => {
              void handleCopyUrl()
            }}
          >
            <Link className="size-6" />
          </Button>
        </div>
        <span className="text-foreground/50 text-base/6">
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
