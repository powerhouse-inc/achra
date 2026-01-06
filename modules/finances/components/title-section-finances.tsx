'use client'

import { LinkIcon } from 'lucide-react'
import { CopySectionUrl } from '@/modules/networks/components/section-title/copy-section-url'
import { TooltipInfoIcon } from '@/modules/shared/components/tooltip-info-icon/tooltip-info-icon'
import { cn } from '@/modules/shared/lib/utils'

export interface TitleBreakdownChartProps {
  title: string
  hash: string
  className?: string
  tooltipContent: React.ReactNode
  range: string
}

export default function TitleSectionFinances({
  title,
  hash,
  className,
  tooltipContent,
  range,
}: Readonly<TitleBreakdownChartProps>) {
  return (
    <div className="flex flex-col">
      <div className={cn('flex w-fit items-center gap-2', className)}>
        <span className="text-base leading-[120%] font-bold lg:text-lg 2xl:text-xl">{title}</span>
        <TooltipInfoIcon tooltipContent={<div>{tooltipContent}</div>} />

        <CopySectionUrl hash={hash}>
          <LinkIcon className="size-4" />
        </CopySectionUrl>
      </div>
      <div className="text-base/6 font-semibold opacity-30">{range}</div>
    </div>
  )
}
