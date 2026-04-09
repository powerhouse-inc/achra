import { Card } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface SummarySectionSkeletonProps {
  hasTotal?: boolean
}

function SummarySectionSkeleton({ hasTotal = false }: SummarySectionSkeletonProps) {
  return (
    <Card className="gap-0 overflow-hidden p-0">
      <header
        className="bg-accent flex items-center justify-between px-4 py-2 lg:px-6"
        data-slot="summary-section-header"
      >
        <Skeleton className="bg-border h-4 w-28" />
        <Skeleton className="bg-border h-4 w-20" />
      </header>
      <div className="flex flex-col gap-0 px-4 py-3 lg:px-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border-border flex items-center justify-between border-b py-3 last:border-b-0"
          >
            <Skeleton className="bg-border h-4 w-32" />
            <Skeleton className="bg-border h-4 w-16" />
          </div>
        ))}
      </div>
      {hasTotal && (
        <footer
          className="bg-accent flex items-center justify-between px-4 py-2 lg:px-6"
          data-slot="summary-section-footer"
        >
          <Skeleton className="bg-border h-4 w-24" />
          <Skeleton className="bg-border h-4 w-16" />
        </footer>
      )}
    </Card>
  )
}

export { SummarySectionSkeleton }
