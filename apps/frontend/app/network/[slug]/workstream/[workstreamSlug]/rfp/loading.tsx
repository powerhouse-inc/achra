import { ProposalKeyValueElementSkeleton } from '@/modules/rfp/components/rfp-skeleton/proposal-key-value-skeleton'
import { PageBreadcrumbContainer } from '@/modules/shared/components/breadcrumb'
import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb/breadcrumb-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Card } from '@/modules/shared/components/ui/card'
import { Separator } from '@/modules/shared/components/ui/separator'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export default function RfpLoading() {
  return (
    <main>
      <PageBreadcrumbContainer className="**:data-[slot='page-breadcrumb-container-wrapper']:bg-secondary/20 sm:**:data-[slot='page-breadcrumb-container-wrapper']:bg-background">
        <BreadcrumbSkeleton segments={3} />
      </PageBreadcrumbContainer>
      {/* Page Content */}
      <PageContent className="gap-6" as="div" variant="with-breadcrumb">
        <Card className="border-input gap-0 overflow-hidden border p-0 sm:mt-4 md:mt-0">
          {/* Header Section - Title, Code, Status, Button */}
          <div className="border-input flex flex-col gap-4 p-2 pb-4 sm:gap-4 sm:p-3 sm:pb-2 md:p-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
              {/* Left: Title and Code */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                  {/* Title */}
                  <Skeleton className="h-5.5 w-56" />
                  {/* Code - visible on sm and up */}
                  <div className="flex flex-row items-center justify-between">
                    <Skeleton className="h-3 w-16 sm:block" />
                    {/* Status Badge - visible on md and up */}
                    <Skeleton className="h-6 w-16 rounded-sm sm:hidden" />
                  </div>
                </div>
                {/* Status Badge - visible on md and up */}
                <Skeleton className="hidden h-6 w-16 rounded-sm md:block" />
              </div>

              {/* Right: Code (mobile), Status Badge (mobile), Button */}
              <div className="hidden flex-col items-start gap-2 sm:flex sm:items-end">
                {/* Code - visible on mobile */}
                <Skeleton className="h-3 w-16 sm:hidden" />
                {/* Status Badge - visible on mobile */}
                <Skeleton className="h-6 w-16 rounded-sm md:hidden" />
                {/* Edit Button */}
                <Skeleton className="hidden h-10 w-48 rounded-lg md:flex" />
              </div>
            </div>
          </div>

          {/* Metadata Section - Deadline and Budget */}
          <div className="mt-2 grid w-full grid-cols-1 gap-2 px-2 pb-4 sm:mt-0 sm:gap-4 sm:p-3 sm:pb-2 md:p-4 lg:grid-cols-2 lg:gap-4">
            {/* Submission Deadline */}
            <ProposalKeyValueElementSkeleton />

            {/* Budget Range */}
            <ProposalKeyValueElementSkeleton className="lg:max-w-85.5 xl:max-w-100" />
            <Skeleton className="flex h-10 rounded-lg sm:w-64 sm:justify-self-end md:hidden" />
          </div>

          {/* Summary and Criteria Section - Accent Background */}
          <div className="border-input bg-accent space-y-4 border-t p-2 pb-3 sm:p-3 sm:pb-4 md:p-4 md:pb-6">
            {/* Two Column Criteria */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Eligibility Criteria */}
              <div className="bg-background space-y-3 rounded-lg p-3">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>

              {/* Evaluation Criteria */}
              <div className="bg-background space-y-3 rounded-lg p-3">
                <Skeleton className="h-5 w-32" />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Briefing Section */}
          <div className="border-input flex flex-col px-2 pt-2 pb-4 sm:px-3 sm:pt-3 sm:pb-4 md:p-4">
            <div className="flex flex-col rounded-lg">
              <Skeleton className="h-5 w-24" />
              <Separator className="text-border mt-1" />
              <div className="space-y-2 px-4 pt-3 sm:px-3 md:px-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          {/* Statement of Work Section */}
          <div className="p-4 md:p-6">
            <div className="space-y-4">
              <Skeleton className="h-6 w-48" />

              {/* Work Item 1 */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-56" />
                <div className="space-y-2 pl-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>

              {/* Work Item 2 */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-56" />
                <div className="space-y-2 pl-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Work Item 3 */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-56" />
                <div className="space-y-2 pl-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>

              {/* Long paragraph */}
              <div className="space-y-2 pt-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
          </div>
        </Card>
      </PageContent>
    </main>
  )
}
