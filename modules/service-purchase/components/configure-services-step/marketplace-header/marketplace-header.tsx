import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'

interface MarketplaceHeaderProps {
  operator: BuilderProfileState
}

function MarketplaceHeader({ operator }: MarketplaceHeaderProps) {
  return (
    <div className="border-border flex items-center gap-3 border-b pb-2">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Avatar className="size-12 sm:size-10">
            <AvatarImage src={operator.icon} alt={operator.name ?? ''} />
            <AvatarFallback>{operator.name?.charAt(0).toUpperCase() ?? 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex gap-1 text-base/6 font-semibold">
            <span className="text-foreground/30">{operator.code}</span>
            <span className="text-foreground">{operator.name}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export { MarketplaceHeader }
