import { Separator } from '@/modules/shared/components/ui/separator'

interface PriceIncludesRowProps {
  price: string
}

export function PriceIncludesRow({ price }: Readonly<PriceIncludesRowProps>) {
  return (
    <div className="flex flex-col">
      <div className="text-foreground/50 flex items-center justify-between px-3 lg:px-6">
        <span className="text-xs/4.5 font-medium tracking-wider uppercase lg:text-sm/5.5">
          Price Includes
        </span>
        <span className="text-primary text-sm font-semibold">{price}</span>
      </div>
      <div className="px-3 lg:px-6">
        <Separator />
      </div>
    </div>
  )
}
