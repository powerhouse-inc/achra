import { FileText } from 'lucide-react'
import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { PricingCatalogSubtotalSkeleton } from '../../pricing-catalog-subtotal'
import { FeatureRowSkeleton } from '../feature-row'
import { GrandTotalRowCatalogSkeleton } from '../grand-total-row-catalog'
import { HeaderCatalogPlanSkeleton } from '../header-catalog-plan'
import { SectionHeaderSkeleton } from '../section-header'

/** Full skeleton for the PricingCalculator service catalog table */
function PricingCalculatorSkeleton() {
  return (
    <div className="mt-6 flex flex-col gap-6">
      {/* Marketplace Header */}
      <div className="border-border flex items-center gap-3 border-b pb-2">
        <FileText className="text-muted-foreground size-6" />
        <Skeleton className="bg-border h-5 w-52" />
      </div>

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
                <PricingCatalogSubtotalSkeleton />
              </div>

              {/* Section 2: Core Tools & Documentation */}
              <div>
                <SectionHeaderSkeleton hasOneTimeFee oneTimeFeeSkeletonClassName="w-24" />
                <FeatureRowSkeleton labelWidth="w-32" />
                <FeatureRowSkeleton labelWidth="w-44" />
                <PricingCatalogSubtotalSkeleton />
              </div>

              {/* Section 3: Advanced & Scale */}
              <div>
                <SectionHeaderSkeleton />
                <FeatureRowSkeleton labelWidth="w-32" />
                <FeatureRowSkeleton labelWidth="w-48" />
                <FeatureRowSkeleton labelWidth="w-24" />
                <FeatureRowSkeleton labelWidth="w-52" />
                <PricingCatalogSubtotalSkeleton />
              </div>

              {/* Section 4: Operational Services */}
              <div>
                <SectionHeaderSkeleton hasToggle />
                <FeatureRowSkeleton labelWidth="w-56" />
                <FeatureRowSkeleton labelWidth="w-44" />
                <PricingCatalogSubtotalSkeleton />
              </div>
            </div>

            {/* Grand Total */}
            <GrandTotalRowCatalogSkeleton />
          </div>
        </Card>
      </div>
    </div>
  )
}

export { PricingCalculatorSkeleton }
