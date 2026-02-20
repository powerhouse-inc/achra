import { ProductInfoSkeleton } from '@/modules/service-purchase/components/service-purchase-form/components/product-info/components/product-info-skeleton'
import ServiceInfoSkeleton from '@/modules/shared/components/service-info/service-info-skeleton'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ServiceProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Service info section */}
      <ServiceInfoSkeleton />

      {/* Product information section */}
      <ProductInfoSkeleton />

      {/* Purchase section */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-7 w-full max-w-24" />
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-xl p-3 shadow-lg">
            {/* Operator header */}
            <div className="flex items-center gap-2">
              <Skeleton className="size-12 rounded-full sm:size-10" />
              <Skeleton className="h-6 w-full max-w-48" />
            </div>

            {/* Operator description and key points */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4.5 w-full" />
                <Skeleton className="h-4.5 w-full max-w-[80%]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Skeleton className="h-15 w-full rounded-md" />
                <Skeleton className="h-15 w-full rounded-md" />
              </div>
              <Skeleton className="h-15 w-full rounded-md" />
            </div>

            {/* Action buttons */}
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      {/* FAQ section */}
      <section className="border-border w-full border-t pt-6">
        <div className="flex flex-col gap-6">
          <div className="flex justify-center">
            <Skeleton className="h-7 w-full max-w-24" />
          </div>
          <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-full max-w-[80%]" />
              <Skeleton className="h-4.5 w-full" />
              <Skeleton className="h-4.5 w-full max-w-[70%]" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-full max-w-[80%]" />
              <Skeleton className="h-4.5 w-full" />
              <Skeleton className="h-4.5 w-full max-w-[70%]" />
            </div>
            <div className="hidden flex-col gap-2 lg:flex">
              <Skeleton className="h-6 w-full max-w-[80%]" />
              <Skeleton className="h-4.5 w-full" />
              <Skeleton className="h-4.5 w-full max-w-[70%]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export { ServiceProfileSkeleton }
