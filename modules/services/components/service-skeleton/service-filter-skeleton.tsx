import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ServicesFiltersSkeleton() {
  return (
    <div className="grid grid-cols-1 grid-rows-2 gap-4 md:grid-cols-[auto_1fr] md:grid-rows-1 md:items-center lg:gap-6">
      {/* Search input */}
      <Skeleton className="h-7 w-full rounded-md md:order-2 md:max-w-63.25 md:justify-self-end lg:max-w-80" />
      {/* Tabs */}
      <div className="flex gap-1 md:order-1">
        <Skeleton className="h-8 w-12 rounded-md" />
        <Skeleton className="h-8 w-18 rounded-md" />
        <Skeleton className="h-8 w-20 rounded-md" />
      </div>
    </div>
  )
}

export default ServicesFiltersSkeleton
