import { Avatar, AvatarFallback, AvatarImage } from '@achra/ui/avatar'
import { cn } from '@achra/ui/lib/utils'
import { Tooltip, TooltipContent, TooltipTrigger } from '@achra/ui/tooltip'
import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import OperatorSVG from '@/modules/shared/components/svgs/operator.svg'
import { formatAddress } from '@/modules/shared/lib/format-address'

export interface AccountBuilderProfileProps {
  name: Maybe<string> | undefined
  code: Maybe<string> | undefined
  address?: Maybe<string> | undefined
  image: string
  className?: string
  isOperator?: boolean
}

/**
 * Account-specific variant of the shared `BuilderProfile`: shows the signed-in
 * user's wallet address below the avatar instead of the builder status chip.
 */
function AccountBuilderProfile({
  name,
  code,
  address,
  image,
  isOperator,
  className,
}: AccountBuilderProfileProps) {
  const avatar = (
    <div className="relative">
      <Avatar className="mt-1 size-8">
        <AvatarImage src={image || undefined} alt={name ?? 'Wallet'} />
        <AvatarFallback className="text-xs font-semibold">
          {name?.charAt(0).toUpperCase() ?? 'U'}
        </AvatarFallback>
      </Avatar>
      {isOperator && <OperatorSVG className="absolute -bottom-2.5 left-1.5 z-20 size-11" />}
    </div>
  )

  return (
    <div className={cn('flex gap-4', className)}>
      {isOperator ? (
        <Tooltip>
          <TooltipTrigger asChild>{avatar}</TooltipTrigger>
          <TooltipContent>Operator</TooltipContent>
        </Tooltip>
      ) : (
        avatar
      )}
      <div className="flex flex-col">
        <p className="text-foreground/30 line-clamp-1 w-full text-sm/5.5 font-semibold">
          {code?.toUpperCase()} <span className="text-foreground">{name}</span>
        </p>
        {address && (
          <span className="text-muted-foreground font-mono text-sm">{formatAddress(address)}</span>
        )}
      </div>
    </div>
  )
}

export { AccountBuilderProfile }
