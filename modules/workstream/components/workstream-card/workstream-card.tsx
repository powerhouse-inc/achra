import { ArrowRight, CalendarClock, FilePenLine, HandCoins, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { Streamdown } from 'streamdown'
import {
  ScopeOfWork_DeliverableSetStatus,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/modules/shared/components/ui/breadcrumb'
import { Button } from '@/modules/shared/components/ui/button'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import ProposalApplyCard from './proposal-apply-card'
import ProposalCardOutline from './proposal-card-outline'
import ProposalKeyValueElement from './proposal-key-value-element'

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
      <div className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Powerhouse</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Vetra Beta Launch</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
        </div>

        <div className="flex flex-wrap gap-4">
          <ProposalKeyValueElement
            keyValue="Issuer"
            keyIcon={UserCheck}
            value="Powerhouse RGH Team"
          />
          <ProposalKeyValueElement
            keyValue="Budget Range"
            keyIcon={HandCoins}
            value="10K - 25K USD"
          />
          <ProposalKeyValueElement
            keyValue="Submission Deadline"
            keyIcon={CalendarClock}
            value="12 SEP 2025 @ 12:00 CET"
          />
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <Streamdown className="line-clamp-4">{proposalDescriptionMarkdown}</Streamdown>
          </div>
          <Button variant="outline" className="group/rfp-details">
            RFP Details{' '}
            <ArrowRight className="transition-transform duration-200 group-hover/rfp-details:translate-x-1" />
          </Button>
        </div>
      </div>

      <div className="bg-accent flex flex-col gap-4 border-t border-b px-4 pt-4 pb-6">
        {/* Initial Proposal header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="text-lg font-bold">Initial Proposal</div>
              <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
            </div>

            <div className="text-foreground/50 flex items-center gap-2">
              <span>by</span>
              <UserCheck className="size-6" />
              <span>Powerhouse RGH Team</span>
            </div>
          </div>
          <Button variant="outline">
            View Proposal <ArrowRight />
          </Button>
        </div>

        {/* stat cards */}
        <div className="flex gap-6">
          <ProposalCardOutline title="Roadmap">
            <div className="flex gap-2 text-center">
              <div className="flex flex-1 flex-col">
                <div className="text-3xl font-bold">5</div>
                <div className="text-foreground/50">Milestones</div>
              </div>
              <div className="flex flex-1 flex-col">
                <div className="text-3xl font-bold">37</div>
                <div className="text-foreground/50">Deliverables</div>
              </div>
            </div>
          </ProposalCardOutline>
          <ProposalCardOutline title="Budget Estimate" className="pb-6">
            <div className="flex h-full gap-2 text-center">
              <div className="flex flex-1 items-end justify-center gap-2">
                <div className="text-3xl font-bold">18.2</div>
                <div className="text-foreground/50 text-left leading-4 uppercase">
                  <div>K</div>
                  <div>USD</div>
                </div>
              </div>
              <div className="flex flex-1 items-end justify-center gap-2">
                <div className="text-3xl font-bold">4.0</div>
                <div className="text-foreground/50 text-left leading-4 uppercase">
                  <div>K</div>
                  <div>POWTS</div>
                </div>
              </div>
            </div>
          </ProposalCardOutline>
          <ProposalCardOutline title="Payment Terms" className="gap-8">
            <div className="flex flex-wrap justify-between gap-2 gap-y-3 px-6 text-center text-sm/5.5 uppercase [&>div]:flex-1 [&>div]:whitespace-nowrap">
              <div>Retainer</div>
              <div>Monthly</div>
              <div>Cost & Materials</div>
            </div>
          </ProposalCardOutline>
        </div>

        <Separator />

        <div className="flex items-center justify-between gap-4">
          <div className="text-foreground/50 text-sm/5.5 font-semibold uppercase">
            Join this proposal
          </div>
          <div className="flex items-center gap-2 text-sm/5.5 font-semibold">
            <span>Application Deadline:</span>
            <div className="bg-background rounded-lg border px-3 py-1.5">31/12/2025</div>
          </div>
        </div>

        <p className="text-sm/5.5">
          Help us empower our community with data. This project involves creating a real-time
          GraphQL endpoing to provide powerful insight into network activity.
        </p>

        <div className="grid grid-cols-2 gap-6 xl:grid-cols-3">
          <ProposalApplyCard
            title="D1: Conduct Business Analysis"
            description="Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam."
            tags={['BA', 'Balsamiq', 'UI Design']}
          />
          <ProposalApplyCard
            title="D2: Deploy the smart contracts"
            description="Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam."
            tags={['GraphQL', 'JavaScript', 'UI Design', 'Smart Contracts', 'React']}
          />
          <ProposalApplyCard
            title="D3: Conduct Business Analysis"
            description="Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam."
            tags={['BA', 'Balsamiq', 'UI Design']}
          />
          <ProposalApplyCard
            title="D4: Conduct Business Analysis"
            description="Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam."
            tags={['BA', 'Balsamiq', 'UI Design', 'Smart Contracts']}
          />
          <ProposalApplyCard
            title="D5: Conduct Business Analysis"
            description="Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam."
            tags={['BA', 'Balsamiq', 'UI Design', 'Smart Contracts', 'React', 'Figma']}
          />
          <ProposalApplyCard
            title="D6: Conduct Business Analysis"
            description="Lorem ipsum dolor sit amet consectetur. Feugiat tellus consectetur nulla at nullam."
            tags={['BA', 'Balsamiq', 'UI Design', 'Smart Contracts', 'React', 'Figma']}
          />
        </div>
        <div className="flex justify-center pt-2">
          <Button variant="outline">Load More</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div className="text-lg leading-[120%] font-bold">Alternative Proposals</div>
        <Button className="w-fit">
          <span>Create Alternative Proposal</span>
          <FilePenLine className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
