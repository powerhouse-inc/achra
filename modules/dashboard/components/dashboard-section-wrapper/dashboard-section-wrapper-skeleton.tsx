import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface DashboardSectionWrapperSkeletonProps {
  children: React.ReactNode
}

export function DashboardSectionWrapperSkeleton({
  children,
}: DashboardSectionWrapperSkeletonProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl py-2 shadow-lg md:py-4">
      <div className="grid grid-cols-[1fr_auto] items-center gap-2 px-4">
        <Skeleton className="h-6 w-full max-w-160" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="flex flex-col gap-4 px-2 md:px-4">{children}</div>
    </div>
  )
}
