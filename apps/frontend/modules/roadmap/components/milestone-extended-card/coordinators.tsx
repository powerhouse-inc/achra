import { UserRound } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/modules/shared/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/shared/lib/utils'
import { CoordinatorItem } from './coordinator-item'

interface CoordinatorsProps {
  coordinators: string[]
}

function Coordinators({ coordinators }: CoordinatorsProps) {
  const displayCoordinators = coordinators.slice(0, 2)
  const remainingCoordinators = coordinators.slice(2)

  return (
    <div className="bg-popover flex flex-col gap-2 rounded-xl border p-2">
      <div className="text-card-foreground text-xs/4.5 font-medium">Coordinators</div>

      <div className="flex gap-4">
        {displayCoordinators.map((coordinator) => (
          <CoordinatorItem
            key={coordinator}
            name={coordinator}
            className={cn(
              coordinators.length === 1 && 'max-w-full',
              coordinators.length === 2 && 'max-w-[calc(50%-8px)]',
              coordinators.length > 2 && 'max-w-[calc((100%-50px-32px)/2)]',
            )}
          />
        ))}

        {remainingCoordinators.length > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex w-12.5 min-w-0 cursor-default items-center gap-1">
                <Avatar className="size-6 flex-shrink-0">
                  <AvatarFallback className="bg-border">
                    <UserRound className="size-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="overflow-hidden text-sm/5.5 font-semibold">
                  +{remainingCoordinators.length}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start">
              <div className="flex flex-col gap-2">
                {remainingCoordinators.map((coordinator) => (
                  <CoordinatorItem key={coordinator} name={coordinator} />
                ))}
              </div>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export { Coordinators }
