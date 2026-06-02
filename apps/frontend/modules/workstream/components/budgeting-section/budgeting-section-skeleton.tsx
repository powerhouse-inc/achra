import { Skeleton } from '@/modules/shared/components/ui/skeleton'
import { BudgetProjectCardSkeleton } from './budget-project-card-skeleton'

function BudgetingSectionSkeleton() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <Skeleton className="h-8 w-40 md:h-9" />
        <div className="ml-auto flex items-center gap-4">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-36 rounded-md" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <BudgetProjectCardSkeleton />
        <BudgetProjectCardSkeleton />
      </div>
    </section>
  )
}

export { BudgetingSectionSkeleton }
