import { CalendarClock, HandCoins } from 'lucide-react'
import { ScopeOfWork_DeliverableSetStatus } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  BriefingMarkdown,
  CriteriaMarkdown,
  markdownEvaluation,
} from '@/modules/rfp/mocks/markdown'
import { Breadcrumb, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { ProposalKeyValueElement } from '@/modules/shared/components/proposal-key-value-element'
import { Card } from '@/modules/shared/components/ui/card'

import type { Route } from 'next'

interface RequesForProposalPageProps {
  params: Promise<{ slug: string }>
}

export default async function RequesForProposalPage({ params }: RequesForProposalPageProps) {
  const { slug } = await params

  const items = [
    { label: 'Powerhouse', href: `/network/${slug}` as Route },
    { label: 'Allocation System v1', href: '/networks/allocation-system-v1' as Route },
    { label: 'Request For Proposal', href: `/network/${slug}/rpf` as Route },
  ]

  return (
    <main>
      <PageBreadcrumbContainer>
        <Breadcrumb items={items} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <Card className="gap-0 p-0">
          <div className="flex flex-col gap-4 p-2 pb-4 sm:gap-4 sm:p-3 sm:pb-2 md:p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                  <div className="text-base/6 font-bold sm:text-lg sm:leading-[120%] sm:font-bold md:text-xl md:leading-[120%] xl:text-2xl xl:leading-[120%] xl:font-bold">
                    Building the Achra Front-end
                  </div>
                  <div className="text-foreground/50 hidden items-center justify-between text-xs/4.5 font-medium uppercase sm:flex sm:self-end md:text-sm/5.5 md:font-semibold xl:text-base/6 xl:font-semibold">
                    frp-ach-01
                  </div>
                </div>
                <div className="hidden md:flex">
                  <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
                </div>
              </div>
              <div className="text-foreground/50 flex items-center justify-between text-xs/4.5 font-medium uppercase md:text-sm/5.5 md:font-semibold xl:text-base/6 xl:font-semibold">
                <div className="flex sm:hidden">frp-ach-01</div>
                <div className="flex md:hidden">
                  <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
                </div>
                <div className="text-primary-foreground hidden md:flex">
                  <ConnectLink />
                </div>
              </div>
            </div>

            <div className="grid max-w-4xl grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
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

            <div className="text-primary-foreground sm:flex sm:justify-end md:hidden">
              <ConnectLink />
            </div>
          </div>

          <div className="bg-accent flex flex-col gap-4 border border-t border-b p-2 pb-3 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
            Creation of the roadmap proposal for the Start Teams onboarding to Achra platform,
            including full SoW and payment terms.
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="bg-background rounded-lg p-3 transition-all">
                <Markdown>{CriteriaMarkdown}</Markdown>
              </div>
              <div className="bg-background rounded-lg p-3 transition-all">
                <Markdown>{markdownEvaluation}</Markdown>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
            <div className="rounded-lg pb-2 transition-all">
              <Markdown>{BriefingMarkdown}</Markdown>
            </div>
          </div>
        </Card>
      </PageContent>
    </main>
  )
}
