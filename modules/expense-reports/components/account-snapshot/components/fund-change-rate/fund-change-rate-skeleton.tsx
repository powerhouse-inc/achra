import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { NumberWithSignCardSkeleton } from './number-with-sign-card-skeleton'

function FundChangeRateSkeleton() {
  return (
    <Card className="bg-popover w-full gap-0 border-none p-2 md:px-4 md:pt-2 md:pb-4 xl:px-8">
      {/* Change Container with Arrows */}
      <div className="flex w-full">
        {/* Left Arrow Container */}
        <div className="flex w-full md:mr-2">
          <div className="min-w-[85px] md:min-w-[85px] lg:min-w-[118px] 2xl:min-w-[155px]" />
          <div className="border-border relative mt-6 h-[calc(100%-24px)] w-full rounded-tl-[20px] border-t-2 border-l-2">
            <div className="border-border absolute bottom-px left-[-7.4px] size-3.25 rotate-225 rounded-tl border-t-2 border-l-2" />
            <div className="bg-border absolute top-[-8px] right-0 h-3.5 w-0.5 rounded-sm" />
          </div>
        </div>

        {/* Center Net Change Content */}
        <div className="flex flex-col items-center gap-1 px-2 pb-2 md:px-0 md:pb-2">
          <div className="flex items-baseline gap-1 lg:leading-4.5">
            <Skeleton className="h-6 w-20 lg:h-4.5" data-slot="value" />
            <Skeleton className="h-5.5 w-6 lg:h-4.5" data-slot="currency" />
          </div>
          <Skeleton className="h-4.5 w-17" />
        </div>

        {/* Right Arrow Container */}
        <div className="flex w-full md:ml-2">
          <div className="border-border relative mt-6 h-[calc(100%-24px)] w-full rounded-tr-[20px] border-t-2 border-r-2">
            <div className="border-border absolute right-[-7.4px] bottom-px size-3.25 rotate-225 rounded-tl border-t-2 border-l-2" />
            <div className="bg-border absolute top-[-8px] left-0 h-3.5 w-0.5 rounded-sm" />
          </div>
          <div className="min-w-[65px] md:min-w-[65px] lg:min-w-[85px] 2xl:min-w-[120px]" />
        </div>
      </div>

      {/* Values Container */}
      <div className="mt-2 flex w-full flex-row gap-2 md:gap-8 lg:gap-6 xl:gap-8">
        <NumberWithSignCardSkeleton sign="positive" />
        <NumberWithSignCardSkeleton sign="negative" />
      </div>
    </Card>
  )
}

export { FundChangeRateSkeleton }
