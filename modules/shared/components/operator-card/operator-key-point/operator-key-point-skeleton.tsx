import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function OperatorKeyPointSkeleton() {
  return (
    <div className="border-border bg-popover flex flex-col gap-2 rounded-lg border p-2">
      {/* label */}
      <Skeleton className="h-4.5 w-full max-w-16" />
      {/* value */}
      <Skeleton className="h-5.5 w-full max-w-24" />
    </div>
  )
}

export { OperatorKeyPointSkeleton }
