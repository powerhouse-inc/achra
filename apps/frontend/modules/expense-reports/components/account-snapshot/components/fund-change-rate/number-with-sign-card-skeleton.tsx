import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface NumberWithSignCardProps {
  sign: 'positive' | 'negative'
}

function NumberWithSignCardSkeleton({ sign }: NumberWithSignCardProps) {
  return (
    <div className="flex w-full">
      {/* Sign Container */}
      <div className="mr-1 flex items-center md:mr-4 lg:mr-2">
        {sign === 'positive' ? (
          <svg
            className="size-4 lg:size-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="10" width="4" height="24" rx="2" className="fill-border" />
            <rect
              y="14"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 14)"
              className="fill-border"
            />
          </svg>
        ) : (
          <svg
            className="h-1 w-4 lg:h-1 lg:w-6"
            viewBox="0 0 24 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              y="4"
              width="4"
              height="24"
              rx="2"
              transform="rotate(-90 0 4)"
              className="fill-border"
            />
          </svg>
        )}
      </div>

      {/* Card */}
      <div
        className={cn(
          'flex w-full flex-col items-start gap-1 rounded-xl border px-1.75 pt-0.75 pb-1.75',
          'border-border bg-background',
          'lg:min-w-44 lg:gap-2 xl:px-3.75 xl:py-0.75 xl:pb-1.75',
        )}
      >
        {/* Text */}
        <Skeleton data-slot={`text-${sign}`} className="h-4 w-full max-w-32 lg:h-4.5" />

        {/* Value */}
        <div className={cn('flex items-baseline gap-1 text-center text-base/6 xl:text-lg/6')}>
          <Skeleton className="h-5.5 w-20 lg:h-6" data-slot={`value-${sign}`} />
          <Skeleton className="h-5.5 w-7.5 xl:h-6" data-slot={`currency-${sign}`} />
        </div>
      </div>
    </div>
  )
}

export { NumberWithSignCardSkeleton }
