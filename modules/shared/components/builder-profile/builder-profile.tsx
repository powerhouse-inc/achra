import type { BuilderStatus, Maybe } from '@/modules/__generated__/graphql/switchboard-generated'
import OperatorSVG from '@/modules/shared/components/svgs/operator.svg'
import { Avatar, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'
import { BuildersStatusChip } from '../chips/builders-status-chip'

export interface BuilderProfileProps {
  name: Maybe<string> | undefined
  code: Maybe<string> | undefined
  status: Maybe<BuilderStatus> | undefined
  image: string
  className?: string
  isOperator?: boolean
}

export default function BuilderProfile({
  name,
  code,
  status,
  image,
  isOperator,
  className,
}: BuilderProfileProps) {
  const avatar = (
    <div className="relative">
      <Avatar className="mt-1 size-8">
        <AvatarImage src={image} alt={name ?? 'Wallet'} />
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
        <BuildersStatusChip status={status} />
      </div>
    </div>
  )
}
