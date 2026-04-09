import { BreadcrumbSkeleton, PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { MarkdownSkeleton } from '@/modules/shared/components/markdown'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { InitialProposalHeaderSkeleton } from '@/modules/workstream/components/initial-proposal-header'
import { ProposalCardsGridSkeleton } from '@/modules/workstream/components/workstream-card/proposal-cards-grid-skeleton'
import { StatCardsSkeleton } from '@/modules/workstream/components/workstream-card/stat-cards-skeleton'
import { WorkstreamStatsSkeleton } from '@/modules/workstream/components/workstream-stats'

export default function WorkstreamDetailsLoading() {
  return (
    <>
      <PageBreadcrumbContainer>
        <BreadcrumbSkeleton segments={2} />
      </PageBreadcrumbContainer>

      <PageContent className="gap-6" variant="with-breadcrumb">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <Skeleton className="h-6 w-48 sm:h-5.5 md:h-6 md:w-72 xl:h-7 xl:w-96" />
          <Skeleton className="h-6 w-20" />
        </div>

        <WorkstreamStatsSkeleton />

        <MarkdownSkeleton lines={4} />

        <div className="bg-accent flex flex-col gap-4 rounded-xl p-2 pb-4 shadow-sm sm:p-4 sm:pb-6">
          <InitialProposalHeaderSkeleton />

          <StatCardsSkeleton />

          {/* Mobile View Proposal link placeholder */}
          <Skeleton className="bg-border ml-auto h-9 w-32 sm:hidden" />

          <Separator />

          {/* Join proposal info placeholder */}
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
            <div className="flex w-full flex-col gap-2">
              {/* Join this proposal */}
              <Skeleton className="bg-border h-5.5 w-32 xl:h-6" />
              <div className="flex w-full items-center gap-2 sm:w-auto">
                {/* Application Deadline */}
                <Skeleton className="bg-border h-5.5 w-36 xl:h-6" />
                {/* Application Deadline value */}
                <div className="bg-background flex w-full items-center justify-center rounded-lg border px-3 py-1.5 sm:w-auto">
                  <Skeleton className="h-5.5 w-24 xl:h-6" />
                </div>
              </div>
            </div>

            {/* Create Alternative Proposal Button */}
            <Skeleton className="bg-border h-9 w-full max-w-58" />
          </div>

          {/* Description placeholder */}
          <div className="flex flex-col gap-0.5">
            <Skeleton className="bg-border h-4 w-full sm:h-5" />
            <Skeleton className="bg-border h-4 w-full sm:h-5" />
            <Skeleton className="bg-border h-4 w-5/6 sm:h-5" />
          </div>

          <ProposalCardsGridSkeleton />
        </div>
      </PageContent>
    </>
  )
}
