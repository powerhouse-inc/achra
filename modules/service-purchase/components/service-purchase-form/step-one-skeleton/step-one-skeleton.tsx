import { ServiceInfoSkeleton } from '@/modules/services/components/service-info'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { ProductInfoSkeleton } from '../../product-info/product-info-skeleton'
import { StepsTriggerListSkeleton } from '../steps-trigger/steps-trigger-list-skeleton'

function StepOneSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full justify-end">
        <div className="bg-accent flex h-9 w-40 items-center justify-center rounded-md px-4 py-2">
          <Skeleton className="bg-border h-5 w-full" />
        </div>
      </div>
      <ServiceInfoSkeleton />
      <StepsTriggerListSkeleton />
      <ProductInfoSkeleton />
    </div>
  )
}

export { StepOneSkeleton }
