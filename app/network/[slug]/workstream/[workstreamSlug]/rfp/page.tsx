import { CalendarClock, HandCoins } from 'lucide-react'
import { Suspense } from 'react'
import {
  ScopeOfWork_DeliverableSetStatus,
  useRfpByWorkstreamQuery,
} from '@/modules/__generated__/graphql/switchboard-generated'
import { RfpEmpty } from '@/modules/rfp/rfp-empty/rfp-empty'
import { formatBudgetRange, formatDeadline } from '@/modules/rfp/utils'
import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import DeliverableSetStatusChip from '@/modules/shared/components/chips/deliverable-set-status-chip/deliverable-set-status-chip'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { ErrorBoundaryWithPresets } from '@/modules/shared/components/error-state'
import { Markdown } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { ProposalKeyValueElement } from '@/modules/shared/components/proposal-key-value-element'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { WorkstreamRfpBreadcrumb } from '@/modules/workstream/components/workstream-breadcrumb'

interface RequestForProposalPageProps {
  params: Promise<{ slug: string; workstreamSlug: string }>
}

export default async function RequestForProposalPage({ params }: RequestForProposalPageProps) {
  const { slug } = await params

  const data = await useRfpByWorkstreamQuery.fetcher({
    filter: {
      networkSlug: slug,
    },
  })()

  const rfpData = data.rfpByWorkstream

  if (rfpData.length === 0) {
    return <RfpEmpty />
  }

  const workstreamRfp = rfpData[0]
  const rfp = workstreamRfp.rfp

  return (
    <main>
      <PageBreadcrumbContainer>
        <Suspense fallback={<BreadcrumbSkeleton segments={3} />}>
          <WorkstreamRfpBreadcrumb params={params} />
        </Suspense>
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <ErrorBoundaryWithPresets>
          <Card className="gap-0 p-0">
            <div className="flex flex-col gap-4 p-2 pb-4 sm:gap-4 sm:p-3 sm:pb-2 md:p-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                    {rfp?.title && (
                      <div className="text-base/6 font-bold sm:text-lg sm:leading-[120%] sm:font-bold md:text-xl md:leading-[120%] xl:text-2xl xl:leading-[120%] xl:font-bold">
                        {rfp.title}
                      </div>
                    )}
                    {workstreamRfp.code && (
                      <div className="text-foreground/50 hidden items-center justify-between text-xs/4.5 font-medium uppercase sm:flex sm:self-end md:text-sm/5.5 md:font-semibold xl:text-base/6 xl:font-semibold">
                        {workstreamRfp.code}
                      </div>
                    )}
                  </div>
                  {workstreamRfp.status && (
                    <div className="hidden md:flex">
                      <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
                    </div>
                  )}
                </div>
                <div className="text-foreground/50 flex items-center justify-between text-xs/4.5 font-medium md:text-sm/5.5 md:font-semibold xl:text-base/6 xl:font-semibold">
                  {workstreamRfp.code && <div className="flex sm:hidden">{workstreamRfp.code}</div>}
                  {workstreamRfp.status && (
                    <div className="flex md:hidden">
                      <DeliverableSetStatusChip status={ScopeOfWork_DeliverableSetStatus.Draft} />
                    </div>
                  )}
                  <div className="text-primary-foreground hidden md:flex">
                    <ConnectLink
                      href="https://connect.achra.network"
                      action="edit"
                      driveName="Sky Network Admin"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 lg:grid-cols-[auto_1fr] lg:gap-4">
                <ProposalKeyValueElement
                  keyValue={
                    <div>
                      <span className="sm:hidden">Deadline</span>
                      <span className="hidden sm:block">Submission Deadline</span>
                    </div>
                  }
                  keyIcon={CalendarClock}
                  value={formatDeadline(rfp)}
                />
                <ProposalKeyValueElement
                  keyValue="Budget Range"
                  keyIcon={HandCoins}
                  value={formatBudgetRange(rfp)}
                  className="lg:max-w-85.5 xl:max-w-100"
                />
              </div>

              <div className="text-primary-foreground sm:flex sm:justify-end md:hidden">
                <ConnectLink
                  href="https://connect.achra.network"
                  action="edit"
                  driveName="Sky Network Admin"
                />
              </div>
            </div>

            <div className="border-input bg-accent flex flex-col gap-4 border-t border-b p-2 pb-3 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
              {rfp?.summary && (
                <p className="text-sm/5.5 font-normal xl:text-base/6">{rfp.summary}</p>
              )}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {rfp?.eligibilityCriteria && (
                  <div className="bg-background rounded-lg p-3 transition-all">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm/5.5 font-semibold xl:text-base/6">
                        Eligibility Criteria
                      </h2>
                      <Markdown>{rfp.eligibilityCriteria}</Markdown>
                    </div>
                  </div>
                )}
                {rfp?.evaluationCriteria && (
                  <div className="bg-background rounded-lg p-3 transition-all">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-sm/5.5 font-semibold xl:text-base/6">
                        Evaluation Criteria
                      </h2>
                      <Markdown>{rfp.evaluationCriteria}</Markdown>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {rfp?.briefing && (
              <div className="flex flex-col px-2 pt-2 pb-4 sm:px-3 sm:pt-3 sm:pb-4 md:p-4">
                <div className="flex flex-col rounded-lg transition-all">
                  <div className="text-sm/5.5 font-semibold xl:text-base/6">Briefing</div>
                  <Separator className="text-border mt-1" />
                  <div className="px-4 sm:px-3 md:px-2">
                    <Markdown>{rfp.briefing}</Markdown>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </ErrorBoundaryWithPresets>
      </PageContent>
    </main>
  )
}
