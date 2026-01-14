import { PowerhouseLogoIsotype, PowerhouseLogotype } from '@/modules/shared/components/svgs'
import { Separator } from '@/modules/shared/components/ui/separator'

function MarketplaceHeader() {
  return (
    <div className="border-border flex items-center gap-3 border-b pb-2">
      <div className="flex items-center gap-1.5">
        <PowerhouseLogoIsotype className="text-foreground h-4 w-4" />
        <PowerhouseLogotype className="text-foreground h-2.75 w-auto" />
      </div>
      <Separator className="bg-border h-4! w-px" orientation="vertical" />
      <span className="text-foreground/50 text-sm font-medium">MARKETPLACE</span>
    </div>
  )
}

export { MarketplaceHeader }
