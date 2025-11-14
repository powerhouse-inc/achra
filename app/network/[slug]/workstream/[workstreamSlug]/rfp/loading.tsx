import { BreadcrumbSkeleton } from '@/modules/shared/components/breadcrumb'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
export default function Loading() {
  return (
    <PageContent as="div">
      <BreadcrumbSkeleton segments={3} />
      <div className="mt-4 w-full">
        {/* Header Section */}
        <div className="border-border bg-accent border-b p-4 sm:p-6 md:p-8">
          <div className="mx-auto max-w-5xl space-y-4">
            {/* Title and Reference */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-5 w-32" />
              </div>
              <Skeleton className="h-10 w-32 md:w-40" />
            </div>

            {/* Status Badge and Deadline */}
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <Skeleton className="h-6 w-20" />
            </div>

            {/* Submission Info Grid */}
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-40" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-40" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6 p-4 sm:p-6 md:p-8">
          {/* Description */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
          </div>

          {/* Criteria Sections */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {/* Eligibility Criteria */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            </div>

            {/* Evaluation Criteria */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-3">
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>

          {/* Briefing Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Statement of Work Section */}
          <div className="bg-accent space-y-4 border-l-4 p-4 sm:p-5 md:p-6">
            <Skeleton className="h-6 w-48" />

            <div className="space-y-3">
              <div className="flex gap-3">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="flex gap-3">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                <Skeleton className="h-4 w-full" />
              </div>
              <div className="ml-0 space-y-2 sm:ml-6">
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content */}
          <div className="space-y-4 pt-4">
            <div className="space-y-3">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-5 w-4/5" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* List Section */}
          <div className="space-y-2 pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="mt-0.5 h-4 w-4 shrink-0" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageContent>
  )
}
