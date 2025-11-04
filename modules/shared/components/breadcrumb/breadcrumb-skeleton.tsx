import { ChevronRight } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'

interface BreadcrumbSkeletonProps {
  segments: number
}

function Separator() {
  return <ChevronRight className="text-foreground/30 size-6 pr-1" />
}
function Segment({ width = 'w-20' }: { width?: string }) {
  return <Skeleton className={`h-6 ${width}`} />
}

function MobileSkeleton({ segments }: BreadcrumbSkeletonProps) {
  if (segments > 1) {
    return (
      <>
        <Segment width="w-8" />
        <Separator />
        <Segment />
      </>
    )
  }

  return <Segment />
}

function DesktopSkeleton({ segments }: BreadcrumbSkeletonProps) {
  if (segments === 1) return <Segment />
  if (segments === 2) {
    return (
      <>
        <Segment />
        <Separator />
        <Segment />
      </>
    )
  }
  if (segments === 3) {
    return (
      <>
        <Segment />
        <Separator />
        <Segment />
        <Separator />
        <Segment />
      </>
    )
  }
  return (
    <>
      <Segment />
      <Separator />
      <Segment width="w-8" />
      <Separator />
      <Segment />
      <Separator />
      <Segment />
    </>
  )
}

function BreadcrumbSkeleton({ segments }: BreadcrumbSkeletonProps) {
  return (
    <div>
      {/* Mobile */}
      <div className="flex items-center gap-2.5 lg:hidden">
        <MobileSkeleton segments={segments} />
      </div>

      {/* Desktop */}
      <div className="hidden items-center gap-2.5 lg:flex">
        <DesktopSkeleton segments={segments} />
      </div>
    </div>
  )
}

export { BreadcrumbSkeleton }
