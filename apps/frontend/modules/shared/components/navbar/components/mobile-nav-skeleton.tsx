import { Skeleton } from '../../ui/skeleton'

/**
 * Skeleton for mobile navigation dropdown
 */
function MobileNavSkeleton() {
  return (
    <div className="h-9 w-37.5 xl:hidden">
      <Skeleton className="h-9 w-37.5" />
    </div>
  )
}
MobileNavSkeleton.displayName = 'MobileNavSkeleton'

export { MobileNavSkeleton }
