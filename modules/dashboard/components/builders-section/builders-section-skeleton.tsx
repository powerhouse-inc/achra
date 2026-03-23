import { BuildersSkeleton } from '@/modules/builders/components/builders/builders-skeleton'
import BuildersFiltersSkeleton from '@/modules/builders/components/builders-filters/builders-filters-skeleton'
import { DashboardSectionWrapperSkeleton } from '../dashboard-section-wrapper'

export function BuildersSectionSkeleton() {
  return (
    <DashboardSectionWrapperSkeleton>
      <BuildersFiltersSkeleton />
      <BuildersSkeleton />
    </DashboardSectionWrapperSkeleton>
  )
}
