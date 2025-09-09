import { InfoIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { formatDateStringToQuarter } from '../../lib/date'

interface TargetDataProps {
  targetDate: string
}

export default function TargetData({ targetDate }: TargetDataProps) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-xl border px-4 py-2 lg:p-4">
      <div className="flex items-center justify-between gap-4 self-stretch">
        <div className="flex items-center gap-1 text-xs font-medium">
          Target Date
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoIcon className="text-foreground/30 size-4" />
            </TooltipTrigger>
            <TooltipContent side="bottom" align="start" arrowPadding={8}>
              <div className="max-w-66">
                Target dates are meant as internal project management indicators. They are subject
                to change without notice and offer no guarantee for the delivery time of the
                milestone
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-nowrap items-center font-bold">
          {formatDateStringToQuarter(targetDate, true)}
        </div>
      </div>
    </div>
  )
}
