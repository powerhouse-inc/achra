import type { BuilderProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'

interface OperatorBadgeProps {
  operator: BuilderProfileState
}

function OperatorBadge({ operator }: Readonly<OperatorBadgeProps>) {
  return (
    <div className="flex items-center gap-2">
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
