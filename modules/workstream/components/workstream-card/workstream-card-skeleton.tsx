import { MarkdownSkeleton } from '@/modules/shared/components/markdown'
import { NavigationHeaderSkeleton } from '@/modules/shared/components/navigation-header'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { InitialProposalHeaderSkeleton } from '@/modules/workstream/components/initial-proposal-header'
import { WorkstreamStatsSkeleton } from '@/modules/workstream/components/workstream-stats'
import { ProposalCardsGridSkeleton } from './proposal-cards-grid-skeleton'
import { StatCardsSkeleton } from './stat-cards-skeleton'

function WorkstreamCardSkeleton() {
  return (
    <Card className="gap-0 p-0">
      <div className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-3 sm:pb-2 md:p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <NavigationHeaderSkeleton />
          {/* Workstream status chip placeholder */}
          <Skeleton className="h-6 w-28" />
        </div>

        <WorkstreamStatsSkeleton />

        {/* Summary & RFP link placeholder */}
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <MarkdownSkeleton lines={4} />
          <Skeleton className="ml-auto h-9 w-32" />
        </div>
      </div>

      <div className="bg-accent flex flex-col gap-4 border-t border-b p-2 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
        <InitialProposalHeaderSkeleton />

        <StatCardsSkeleton />

        {/* Mobile View Proposal link placeholder */}
        <Skeleton className="bg-border ml-auto h-9 w-32 sm:hidden" />

        <Separator />

        {/* Join proposal info placeholder */}
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
          {/* Join this proposal */}
          <Skeleton className="bg-border h-5.5 w-40 sm:w-42 xl:h-6" />
          <div className="flex w-full items-center gap-2 sm:w-auto">
            {/* Application Deadline */}
            <Skeleton className="bg-border h-5.5 w-40 xl:h-6" />
            {/* Application Deadline value */}
            <div className="bg-background flex w-full items-center justify-center rounded-lg border px-3 py-1.5 text-center sm:w-auto">
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>

        {/* Description placeholder */}
        <div className="flex flex-col gap-0.5">
          <Skeleton className="bg-border h-4 w-full sm:h-5" />
          <Skeleton className="bg-border h-4 w-full sm:h-5" />
          <Skeleton className="bg-border h-4 w-5/6 sm:h-5" />
        </div>

        <ProposalCardsGridSkeleton />
      </div>

      <div className="flex flex-col gap-2 p-2 sm:gap-4 sm:p-4">
        <Skeleton className="h-5.5 w-38 sm:w-52 xl:h-6" />
        <Skeleton className="h-9 w-58" />
      </div>
    </Card>
  )
}

export { WorkstreamCardSkeleton }
