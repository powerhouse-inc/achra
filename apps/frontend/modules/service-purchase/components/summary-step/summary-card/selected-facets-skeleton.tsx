import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function SelectedFacetsSkeleton() {
  return (
    <div className="bg-accent grid grid-cols-1 gap-2 px-3 py-3 sm:grid-cols-2 md:grid-cols-4 lg:px-6 lg:py-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-background border-border flex min-w-0 flex-1 flex-col gap-1 rounded-lg border px-4 py-3"
        >
          <Skeleton className="bg-border h-3 w-full max-w-20" />
          <Skeleton className="bg-border h-4 w-full max-w-24" />
        </div>
      ))}
    </div>
  )
}

export { SelectedFacetsSkeleton }
