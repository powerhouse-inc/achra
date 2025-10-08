import { FilePenLine } from 'lucide-react'
import { Streamdown } from 'streamdown'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { Button } from '@/modules/shared/components/ui/button'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import InitialProposalHeader from '../initial-proposal-header/initial-proposal-header'
import WorkstreamStats from '../workstream-stats/workstream-stats'
import { NavigationHeader } from './navigation-header'
import ProposalCardsGrid from './proposal-cards-grid'
import StatCards from './stat-cards'

// TODO: remove this once the component is integrated with the API
const proposalDescriptionMarkdown = `
The Powerhouse Network is currently overseeing the "Vetra Beta Launch" project, which aims to enhance community engagement through innovative digital solutions. Key milestones include:

1. **Project Kickoff**: Scheduled for January 15, 2025, where team roles and responsibilities will be defined.
2. **Phase 1 - Research & Development**: From February to April 2025, focusing on user feedback and prototype testing.
3. **Phase 2 - Implementation**: Expected to begin in May 2025, where the developed solutions will be integrated into the existing platform.
4. **Final Review & Launch**: Set for September 12, 2025, culminating in a community event to showcase the new features and gather further input.

This project not only aims to improve user experience but also includes smaller initiatives like workshops and training sessions for contributors to maximize their impact.
`
export default function WorkstreamCard() {
  return (
    <Card className="gap-0 p-0">
      <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-3 sm:pb-2 md:p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <NavigationHeader />
          <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
        </div>

        <WorkstreamStats />

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div className="w-full">
            {/* TODO: Replace it as we can't change the styles of the streamdown component */}
            <Streamdown className="line-clamp-6 text-xs/4.5 sm:line-clamp-4 sm:text-sm/5.5 xl:text-base/6">
              {proposalDescriptionMarkdown}
            </Streamdown>
          </div>

          <InternalLink href="#" className="ml-auto max-w-fit" variant="outline">
            RFP Details
          </InternalLink>
        </div>
      </div>

      <div className="bg-accent flex flex-col gap-4 border-t border-b p-2 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
        <InitialProposalHeader />

        <StatCards />

        <InternalLink href="#" className="ml-auto max-w-fit sm:hidden" variant="outline">
          View Proposal
        </InternalLink>

        <Separator />

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-foreground/50 text-sm/5.5 font-semibold uppercase xl:text-base/6">
            Join this proposal
          </div>
          <div className="flex w-full items-center gap-2 text-sm/5.5 font-semibold sm:w-auto xl:text-base/6">
            <span className="whitespace-nowrap">Application Deadline:</span>
            <div className="bg-background w-full rounded-lg border px-3 py-1.5 text-center sm:w-auto">
              31 SEP 2025
            </div>
          </div>
        </div>

        <p className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">
          Help us empower our community with data. This project involves creating a real-time
          GraphQL endpoing to provide powerful insight into network activity.
        </p>

        <ProposalCardsGrid />
      </div>

      <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
        <div className="text-sm/5.5 font-semibold sm:text-lg sm:leading-[120%] xl:text-xl xl:font-bold">
          Alternative Proposals
        </div>
        <Button className="w-fit">
          <span>Create Alternative Proposal</span>
          <FilePenLine className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
