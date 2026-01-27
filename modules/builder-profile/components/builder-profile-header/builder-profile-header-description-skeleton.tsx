'use client'

import { usePathname } from 'next/navigation'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'

function BuilderHeaderDescriptionSkeleton() {
  const pathname = usePathname()
  const isBudgetStatements = pathname.includes('budget-statements')

  if (isBudgetStatements) {
    return null
  }

  return (
    <div className="flex flex-col gap-1 pl-18">
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-5 w-1/3" />
    </div>
  )
}

export { BuilderHeaderDescriptionSkeleton }
