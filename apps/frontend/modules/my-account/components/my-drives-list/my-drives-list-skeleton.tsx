import { Skeleton } from '@achra/ui/skeleton'

function MyDrivesListSkeleton() {
  return (
    <ul
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3"
      aria-busy="true"
      aria-label="Loading your drives"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <li key={index}>
          {/* drive card */}
          <Skeleton className="h-[52px] w-full rounded-xl" />
        </li>
      ))}
    </ul>
  )
}

export { MyDrivesListSkeleton }
