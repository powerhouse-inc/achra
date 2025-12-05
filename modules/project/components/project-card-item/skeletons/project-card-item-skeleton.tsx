import { Card } from '@/modules/shared/components/ui/card'
import { ProjectCardDeliverablesSkeleton } from './project-card-deliverables-skeleton'
import { ProjectCardFooterSkeleton } from './project-card-footer-skeleton'
import { ProjectCardHeaderSkeleton } from './project-card-header-skeleton'

export function ProjectCardItemSkeleton() {
  return (
    <Card className="bg-background gap-0 border-none p-0 sm:mt-2.25 md:-mt-2.75">
      <ProjectCardHeaderSkeleton />
      <ProjectCardDeliverablesSkeleton />
      <ProjectCardFooterSkeleton />
    </Card>
  )
}
