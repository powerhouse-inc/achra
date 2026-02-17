import { HeaderTitleOperatorProfileSkeleton } from '@/modules/operator-profile/components/header-title-operator-profile'
import { OperationalMetricSkeleton } from '@/modules/operator-profile/components/operational-metric'
import ServicesCardSkeleton from '@/modules/services/components/service-skeleton/service-card-skeleton'
import { PageContent } from '@/modules/shared/components/page-containers'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export default function OperatorProfileLoading() {
  return (
    <PageContent className="mt-6 gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex w-full flex-col gap-4 lg:flex-row">
          <div className="flex flex-col gap-2 lg:flex-2">
            <HeaderTitleOperatorProfileSkeleton />

            {/* description */}
            <div className="flex flex-col gap-1 pl-16 md:hidden">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-full max-w-1/3" />
            </div>
            <Skeleton className="ml-16 hidden h-5.5 w-full max-w-100 md:block" />
          </div>

          {/* OperationalMetrics */}
          <div className="grid w-full grid-cols-1 gap-2 md:grid-cols-2 lg:w-86 lg:grid-cols-1 xl:w-108">
            <OperationalMetricSkeleton labelClassName="max-w-18" />
            <OperationalMetricSkeleton labelClassName="max-w-14" />
            <OperationalMetricSkeleton labelClassName="max-w-20" />
            <OperationalMetricSkeleton labelClassName="max-w-16" />
          </div>
        </div>

        {/* Who we are */}
        <div className="flex flex-col gap-2 lg:flex-1">
          <Skeleton className="h-5.5 w-full max-w-28" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full max-w-4/5" />
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:flex-1">
          <Skeleton className="h-5.5 w-full max-w-48" />

          <div className="flex flex-col gap-6">
            <ServicesCardSkeleton />
            <ServicesCardSkeleton />
          </div>
        </div>
      </div>
    </PageContent>
  )
}
