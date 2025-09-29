import { CalendarClock, FilePenLine, HandCoins, UserCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Streamdown } from 'streamdown'
import {
  ScopeOfWork_DeliverableSetStatus,
  WorkstreamStatus,
} from '@/modules/__generated__/graphql/switchboard-generated'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
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
import ProposalCardsGrid from './proposal-cards-grid'
import ProposalKeyValueElement from './proposal-key-value-element'
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/" className="relative flex h-4 items-center sm:h-4.5 md:h-6">
                    <Image
                      src="/networks/logos/powerhouse.png"
                      alt="Powerhouse"
                      // size workaround: https://github.com/vercel/next.js/discussions/18474#discussioncomment-5501724
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-foreground [&>svg]:size-4 md:[&>svg]:size-6" />
              <BreadcrumbItem>
                <BreadcrumbPage className="max-w-50 truncate text-sm/5.5 font-semibold sm:text-lg sm:leading-[120%] sm:font-bold md:max-w-100 md:text-2xl">
                  Vetra Beta Launch
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-x-6 xl:grid-cols-3 xl:grid-cols-[1fr_1fr_1.3fr] sm:[&>*:last-child]:col-span-2 lg:[&>*:last-child]:col-span-1">
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
            keyValue={
              <div>
                <span className="sm:hidden">Deadline</span>
                <span className="hidden sm:block">Submission Deadline</span>
              </div>
            }
            keyIcon={CalendarClock}
            value="12 SEP 2025 @ 12:00 CET"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <div className="w-full">
            {/* TODO: Replace it as we can't change the styles of the streamdown component */}
            <Streamdown className="line-clamp-6 text-xs/4.5 sm:line-clamp-4">
              {proposalDescriptionMarkdown}
            </Streamdown>
          </div>

          <InternalLink href="#" className="ml-auto max-w-fit" variant="outline">
            RFP Details
          </InternalLink>
        </div>
      </div>

      <div className="bg-accent flex flex-col gap-4 border-t border-b p-2 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
        {/* Initial Proposal header */}
        <div className="flex items-center justify-between">
          <div className="flex w-full flex-col items-center gap-1 sm:items-start sm:gap-2 md:flex-row md:gap-4">
            <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:gap-1 md:justify-start md:gap-2">
              <div className="text-sm/5.5 font-semibold sm:text-base/6 md:text-lg md:leading-[120%] lg:text-xl lg:font-bold">
                Initial Proposal
              </div>
              <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
            </div>

            <div className="text-foreground/50 flex w-full items-center gap-2 text-xs/4.5 font-medium sm:text-sm/5.5 sm:font-semibold md:w-auto md:text-base/6 md:font-normal">
              <span>by</span>
              <UserCheck className="size-4 sm:size-6" />
              <span>Powerhouse RGH Team</span>
            </div>
          </div>
          <InternalLink href="#" className="hidden sm:inline-flex sm:self-start" variant="outline">
            View Proposal
          </InternalLink>
        </div>

        {/* stat cards */}
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
