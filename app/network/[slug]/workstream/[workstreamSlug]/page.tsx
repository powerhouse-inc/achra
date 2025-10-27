import { FilePenLine } from 'lucide-react'
import { Streamdown } from 'streamdown'
import { WorkstreamStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import WorkstreamStatusChip from '@/modules/shared/components/chips/workstream-status-chip'
import { InternalLink } from '@/modules/shared/components/internal-link'
import { PageBackground, PageContent } from '@/modules/shared/components/page-containers'
import { Button } from '@/modules/shared/components/ui/button'
import { Separator } from '@/modules/shared/components/ui/separator'
import InitialProposalHeader from '@/modules/workstream/components/initial-proposal-header/initial-proposal-header'
import ProposalCardsGrid from '@/modules/workstream/components/workstream-card/proposal-cards-grid'
import StatCards from '@/modules/workstream/components/workstream-card/stat-cards'
import WorkstreamStats from '@/modules/workstream/components/workstream-stats/workstream-stats'
import type { Route } from 'next'

// TODO: remove this once the component is integrated with the API
const proposalDescriptionMarkdown = `
The Powerhouse Network is currently overseeing the "Vetra Beta Launch" project, which aims to enhance community engagement through innovative digital solutions. Key milestones include:

1. **Project Kickoff**: Scheduled for January 15, 2025, where team roles and responsibilities will be defined.
2. **Phase 1 - Research & Development**: From February to April 2025, focusing on user feedback and prototype testing.
3. **Phase 2 - Implementation**: Expected to begin in May 2025, where the developed solutions will be integrated into the existing platform.
4. **Final Review & Launch**: Set for September 12, 2025, culminating in a community event to showcase the new features and gather further input.

This project not only aims to improve user experience but also includes smaller initiatives like workshops and training sessions for contributors to maximize their impact.
`

interface Props {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function WorkstreamDetailsPage({ params }: Props) {
  const { slug, workstreamSlug } = await params

  return (
    <PageBackground>
      <PageBreadcrumbContainer>
        <Breadcrumb
          items={[
            { label: 'Powerhouse', href: '/network/powerhouse' },
            {
              label: 'Vetra Beta Launch',
              href: `/network/${slug}/workstream/${workstreamSlug}` as Route,
            },
          ]}
        />
      </PageBreadcrumbContainer>
      <PageContent className="gap-6" variant="with-breadcrumb">
        <div className="flex justify-between gap-2 md:items-start">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <h1 className="leading-6 font-semibold sm:text-lg sm:leading-[120%] sm:font-bold md:text-xl xl:text-2xl">
              Vetra Beta Launch
            </h1>
            <WorkstreamStatusChip status={WorkstreamStatus.OpenForProposals} />
          </div>
          <InternalLink
            href={`/network/${slug}/workstream/${workstreamSlug}/rfp` as Route}
            variant="outline"
          >
            RFP Details
          </InternalLink>
        </div>

        <WorkstreamStats />

        <Streamdown className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">
          {proposalDescriptionMarkdown}
        </Streamdown>

        <div className="bg-accent flex flex-col gap-4 rounded-xl p-2 pb-4 shadow-sm sm:p-4 sm:pb-6">
          <InitialProposalHeader />

          <StatCards />

          <InternalLink href="#" className="ml-auto max-w-fit sm:hidden" variant="outline">
            View Proposal
          </InternalLink>

          <Separator />

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
            <div className="flex w-full flex-col gap-2">
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

            <Button>
              Create Alternative Proposal <FilePenLine className="size-4" />
            </Button>
          </div>

          <p className="text-xs/4.5 sm:text-sm/5.5 xl:text-base/6">
            Help us empower our community with data. This project involves creating a real-time
            GraphQL endpoing to provide powerful insight into network activity.
          </p>

          <ProposalCardsGrid />
        </div>
      </PageContent>
    </PageBackground>
  )
}
