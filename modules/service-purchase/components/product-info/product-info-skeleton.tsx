import { DescriptionSkeleton } from './description-skeleton'
import { ExpandableInfoSkeleton } from './expandable-info-skeleton'

function ProductInfoSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <DescriptionSkeleton />
      <div className="flex w-full flex-col gap-4">
        <ExpandableInfoSkeleton isFirst />
        <ExpandableInfoSkeleton />
      </div>
    </div>
  )
}

export { ProductInfoSkeleton }
