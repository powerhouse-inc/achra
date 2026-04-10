import { Skeleton } from '@/modules/shared/components/ui/skeleton'

interface ItemLegendDeskProps {
  widthName: number
  widthValue: number
}

function ItemLegendDesk({ widthName, widthValue }: Readonly<ItemLegendDeskProps>) {
  return (
    <div className="flex h-fit w-full flex-row items-center gap-2">
      <Skeleton className="bg-border h-4 w-4 rounded-full" />
      <Skeleton className="bg-border h-6 rounded-md" style={{ width: widthName }} />
      <Skeleton className="bg-border h-6 rounded-md" style={{ width: widthValue }} />
    </div>
  )
}

export { ItemLegendDesk }
