import { LinkIcon } from 'lucide-react'
import { CopySectionUrl } from '@/modules/networks/components/section-title/copy-section-url'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { TooltipInfoIcon } from './tooltip-info-icon'

export interface TitleBreakdownChartProps {
  title: string
  hash: string
  className?: string
}

const TOOLTIP_CONTENT =
  "Explore MakerDAO's financial distribution across the 'MakerDAO Legacy', 'Atlas Immutable', and 'Scope Framework' budgets from 2021-2024. This tool helps track allocation efficiency, identify funding fluctuations, and pinpoint transitions between legacy and endgame budgets."

export default function TitleBreakdownChart({ title, hash, className }: TitleBreakdownChartProps) {
  return (
    <div className="flex flex-col">
      <div className={cn('flex w-fit items-center gap-2', className)}>
        <span className="text-xl leading-[120%] font-bold">{title}</span>
        <TooltipInfoIcon tooltipContent={<div>{TOOLTIP_CONTENT}</div>} />

        <CopySectionUrl hash={hash}>
          <LinkIcon className="size-4" />
        </CopySectionUrl>
      </div>
      <div className="text-base/6 font-semibold opacity-30">Jan - Dec 2023</div>
    </div>
  )
}
