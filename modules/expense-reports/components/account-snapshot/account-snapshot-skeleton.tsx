import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function AccountSnapshotSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="border-border align-center flex justify-between rounded-xl border p-8">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  )
}

export { AccountSnapshotSkeleton }
