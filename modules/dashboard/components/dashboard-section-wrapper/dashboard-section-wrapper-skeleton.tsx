import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { SCROLL_MT_CLASSES } from '@/modules/shared/config/constants'
import { cn } from '@/modules/shared/lib/utils'

interface DashboardSectionWrapperSkeletonProps {
  children: React.ReactNode
}

export function DashboardSectionWrapperSkeleton({
  children,
}: DashboardSectionWrapperSkeletonProps) {
  return (
    <div className={cn('flex w-full flex-col gap-6', SCROLL_MT_CLASSES)}>
      <Skeleton className="h-[38px] w-48" />
      <div className="bg-card flex w-full flex-col gap-4 overflow-visible rounded-xl shadow-sm">
        <div className="bg-accent flex items-center justify-between gap-x-2 rounded-ss-xl rounded-se-xl p-2 px-4">
          <Skeleton className="bg-border h-6 w-full max-w-160" />
          <Skeleton className="bg-border h-10 w-24" />
        </div>
        {children}
      </div>
    </div>
  )
}
