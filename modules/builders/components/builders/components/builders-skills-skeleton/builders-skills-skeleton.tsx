import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface BuildersSkillsSkeletonProps {
  builderSkillsWidth: number
}

export function BuildersSkillsSkeleton({ builderSkillsWidth }: BuildersSkillsSkeletonProps) {
  return <Skeleton className="h-6" style={{ width: `${builderSkillsWidth * 4}px` }} />
}
