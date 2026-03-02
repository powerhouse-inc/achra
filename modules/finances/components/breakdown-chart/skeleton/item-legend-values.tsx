import { Skeleton } from '@/modules/shared/components/ui/skeleton'

export function ItemLegendValues() {
  return (
    <div className="flex flex-row items-center gap-1">
      <Skeleton className="bg-input h-3 w-3 rounded-full md:h-4 md:w-4" />
      <Skeleton className="bg-input h-[10.5px] w-[85px] rounded-md md:h-3.5 md:w-[109px] lg:w-[106px]" />
      <Skeleton className="bg-input h-[10.5px] w-[15px] rounded-md" />
    </div>
  )
}
