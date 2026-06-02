import { CardFooter } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function ProjectCardFooterSkeleton() {
  return (
    <CardFooter className="flex w-full items-end justify-end gap-4 px-4 pt-4 pb-3 sm:pb-4">
      <div className="flex min-w-fit flex-col gap-2">
        <Skeleton className="h-3 w-20 rounded" />
        <Skeleton className="h-6 w-32 rounded" />
      </div>
    </CardFooter>
  )
}

export { ProjectCardFooterSkeleton }
