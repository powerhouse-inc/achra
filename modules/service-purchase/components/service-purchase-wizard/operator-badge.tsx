import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'

interface OperatorBadgeProps {
  operator: BuilderProfileState
}

function OperatorBadge({ operator }: Readonly<OperatorBadgeProps>) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
      <span className="text-muted-foreground text-sm/5">Offered by:</span>
      <Avatar className="size-6">
        <AvatarImage src={operator.icon} alt={operator.name ?? ''} />
        <AvatarFallback className="text-xs">
          {operator.name?.charAt(0).toUpperCase() ?? 'U'}
        </AvatarFallback>
      </Avatar>
      <div className="flex gap-1 text-sm/5 font-semibold">
        <span className="text-foreground/30">{operator.code}</span>
        <span className="text-foreground">{operator.name}</span>
      </div>
    </div>
  )
}

export { OperatorBadge }
