import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface BuildersSkillsSkeletonProps {
  builderSkillsWidth: number
}

function BuildersSkillsSkeleton({ builderSkillsWidth }: BuildersSkillsSkeletonProps) {
  return <Skeleton className="h-6" style={{ width: `${builderSkillsWidth * 4}px` }} />
}

export { BuildersSkillsSkeleton }
