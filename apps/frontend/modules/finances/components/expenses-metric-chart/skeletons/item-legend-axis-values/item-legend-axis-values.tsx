import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface ItemLegendAxisValuesProps {
  width: number
}

function ItemLegendAxisValues({ width }: Readonly<ItemLegendAxisValuesProps>) {
  return (
    <div className="flex flex-row items-center gap-1">
      <Skeleton className="h-3 w-3 rounded-full md:h-4 md:w-4" />
      <Skeleton className="h-[10.5px] rounded-md md:h-3.5" style={{ width }} />
    </div>
  )
}

export { ItemLegendAxisValues }
