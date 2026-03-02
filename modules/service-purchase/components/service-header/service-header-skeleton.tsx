import { ServicePurchaseStep } from '@/modules/service-purchase/types'
import { ServiceInfoSkeleton } from '@/modules/services/components/service-info'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface ServiceHeaderSkeletonProps {
  step: ServicePurchaseStep
}

function ServiceHeaderSkeleton({ step }: Readonly<ServiceHeaderSkeletonProps>) {
  const isProductInfo = step === ServicePurchaseStep.ProductInfo
  const isConfigureServices = step === ServicePurchaseStep.ConfigureServices

  return (
    <>
      {/* Select an operator button (ProductInfo only) */}
      <div className={cn('flex w-full justify-end', !isProductInfo && 'hidden')}>
        <Skeleton className="h-9 w-40 rounded-md" />
      </div>
      <div className={cn('flex flex-col gap-8', isProductInfo && 'gap-0')}>
        <div className="flex">
          {/* Back button (hidden on ProductInfo) */}
          <Skeleton className={cn('h-9 w-16 rounded-md', isProductInfo && 'hidden')} />

          {/* Continue button (ConfigureServices only) */}
          <div
            className={cn('flex w-full items-start justify-end', !isConfigureServices && 'hidden')}
          >
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>
        </div>
        <ServiceInfoSkeleton light={!isProductInfo} />
      </div>
    </>
  )
}

export { ServiceHeaderSkeleton }
