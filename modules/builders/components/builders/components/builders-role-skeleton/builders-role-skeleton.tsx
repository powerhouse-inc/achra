import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface BuildersRoleSkeletonProps {
  builderRoleWidth: number
}

export function BuildersRoleSkeleton({ builderRoleWidth }: BuildersRoleSkeletonProps) {
  return <Skeleton className="h-6" style={{ width: `${builderRoleWidth * 4}px` }} />
}
