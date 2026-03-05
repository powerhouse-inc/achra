import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { MarketplaceHeaderSkeleton } from '../marketplace-header/marketplace-header-skeleton'
import { FeatureRowSkeleton } from '../service-catalog/feature-row'
import { HeaderCatalogPlanSkeleton } from '../service-catalog/header-catalog-plan'
import { SectionHeaderSkeleton } from '../service-catalog/section-header'

/** Full skeleton for the ConfigureServices step (Suspense fallback) */
function ConfigureServicesSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <MarketplaceHeaderSkeleton />

      {/* Select filters */}
      <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          // It is okay to use index as key here because the skeleton is static
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="flex w-full flex-col gap-3">
            <Skeleton className="bg-border h-4 w-24" />
            <Skeleton className="bg-border h-8 w-full rounded-md" />
          </div>
        ))}
      </div>

      {/* Billing Period Selector */}
      <div className="flex justify-center">
        <div className="flex gap-1">
          <div className="border-border flex h-9.5 items-center gap-2 rounded-md border px-3 py-2">
            <Skeleton className="bg-border h-3.5 w-14" />
            <Skeleton className="bg-border h-5 w-14 rounded-full" />
          </div>
          <div className="border-border flex h-9.5 items-center gap-2 rounded-md border px-3 py-2">
            <Skeleton className="bg-border h-3.5 w-16" />
            <Skeleton className="bg-border h-5 w-14 rounded-full" />
          </div>
          <div className="border-border flex h-9.5 items-center gap-2 rounded-md border px-3 py-2">
            <Skeleton className="bg-border h-3.5 w-20" />
            <Skeleton className="bg-border h-5 w-14 rounded-full" />
          </div>
          <div className="border-border flex h-9.5 items-center gap-2 rounded-md border px-3 py-2">
            <Skeleton className="bg-border h-3.5 w-12" />
            <Skeleton className="bg-border h-5 w-14 rounded-full" />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start">
        <Card className="flex w-full flex-col gap-6 border-none! py-0!">
          <div className="overflow-hidden rounded-xl">
            {/* Header with plan columns */}
            <HeaderCatalogPlanSkeleton />

            <div className="flex flex-col">
              {/* Section 1: Legal Setup */}
              <div>
                <SectionHeaderSkeleton hasOneTimeFee oneTimeFeeSkeletonClassName="w-62!" />
                <FeatureRowSkeleton labelWidth="w-36" />
                <FeatureRowSkeleton labelWidth="w-48" />
                <FeatureRowSkeleton labelWidth="w-28" />
              </div>

              {/* Section 2: Core Tools & Documentation */}
              <div>
                <SectionHeaderSkeleton hasOneTimeFee oneTimeFeeSkeletonClassName="w-24" />
                <FeatureRowSkeleton labelWidth="w-32" />
                <FeatureRowSkeleton labelWidth="w-44" />
              </div>

              {/* Section 3: Advanced & Scale */}
              <div>
                <SectionHeaderSkeleton />
                <FeatureRowSkeleton labelWidth="w-32" />
                <FeatureRowSkeleton labelWidth="w-48" />
                <FeatureRowSkeleton labelWidth="w-24" />
                <FeatureRowSkeleton labelWidth="w-52" />
              </div>

              {/* Section 4: Operational Services */}
              <div>
                <SectionHeaderSkeleton hasToggle />
                <FeatureRowSkeleton labelWidth="w-56" />
                <FeatureRowSkeleton labelWidth="w-44" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export { ConfigureServicesSkeleton }
