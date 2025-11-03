import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function TargetDataSkeleton() {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border px-4 py-2 lg:p-4">
      <div className="flex items-center justify-between gap-4 self-stretch">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  )
}

export { TargetDataSkeleton }
