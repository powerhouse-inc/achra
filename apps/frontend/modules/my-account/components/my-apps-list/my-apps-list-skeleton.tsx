import { Skeleton } from '@achra/ui/skeleton'

function MyAppsListSkeleton() {
  return (
    <ul
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      aria-busy="true"
      aria-label="Loading your apps"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <li key={index}>
          {/* app card */}
          <Skeleton className="h-[52px] w-full rounded-xl" />
        </li>
      ))}
    </ul>
  )
}

export { MyAppsListSkeleton }
