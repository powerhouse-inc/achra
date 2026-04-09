import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { cn } from '@/modules/shared/lib/utils'

interface MilestoneExtendedCardSkeletonProps {
  className?: string
}

export function MilestoneExtendedCardSkeleton({ className }: MilestoneExtendedCardSkeletonProps) {
  return (
    <div
      className={cn(
        'bg-background flex w-full flex-col gap-2 overflow-hidden rounded-xl shadow-lg',
        className,
      )}
    >
      <div className="bg-accent flex items-center justify-between p-2">
        <div className="flex gap-1">
          <Skeleton className="bg-border h-6 w-10.25" />
          <Skeleton className="bg-border h-6 w-25.75" />
        </div>
        <Skeleton className="bg-border h-9 w-25.5" />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <div className="border-border bg-popover flex flex-col gap-1 rounded-xl border px-2 pt-1 pb-6.25">
          <Skeleton className="h-5.5 w-full" />
          <Skeleton className="h-3.75 w-[91%]" />
          <Skeleton className="h-3.75 w-full" />
          <Skeleton className="h-3.75 w-[81%]" />
          <Skeleton className="h-3.75 w-[96%]" />
          <Skeleton className="h-3.75 w-[58%]" />
        </div>
        <div className="border-border bg-popover flex flex-col gap-2 rounded-xl border p-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4.5 w-9.5" />
            <Skeleton className="h-6 w-22.5" />
          </div>
          <div className="flex items-center">
            <Skeleton className="bg-border h-4 w-[44%] rounded-r-none" />
            <Skeleton className="h-4 w-[56%] rounded-l-none" />
          </div>
        </div>
        <div className="border-border bg-popover flex flex-col gap-2 rounded-xl border p-2">
          <Skeleton className="h-4.5 w-[26%]" />
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5.5 w-10" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-5.5 w-25.75" />
            </div>
          </div>
        </div>
        <div className="border-border bg-popover flex flex-col gap-2 rounded-xl border p-2">
          <Skeleton className="h-4.5 w-[40%]" />
          <div className="flex items-center gap-1">
            <Skeleton className="mr-1 h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-5.5 w-[46%]" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="mr-1 h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-5.5 w-[67%]" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="mr-1 h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-5.5 w-[82%]" />
            <Skeleton className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
