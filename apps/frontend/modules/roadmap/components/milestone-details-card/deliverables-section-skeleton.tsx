import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

function DeliverablesSectionSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between self-stretch">
        <div className={cn('flex-start flex gap-3.5', 'text-lg font-bold lg:text-xl lg:font-bold')}>
          <Skeleton className="h-6 w-32 lg:h-7" />
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col gap-4 md:flex-row md:flex-wrap md:gap-6 xl:gap-8',
          'md:[&>*]:w-full md:[&>*]:max-w-[calc(50%-12px)]',
          'xl:gap-7 xl:[&>*]:max-w-[calc(50%-16px)]',
        )}
      >
        <Skeleton className="h-48 w-full md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]" />
        <Skeleton className="h-48 w-full md:w-[calc(50%-12px)] xl:w-[calc(50%-16px)]" />
      </div>
    </div>
  )
}

export { DeliverablesSectionSkeleton }
