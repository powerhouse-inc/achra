import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function FaqSectionSkeleton() {
  return (
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
  )
}

export { FaqSectionSkeleton }
