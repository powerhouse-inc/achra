'use client'

import { Link } from 'lucide-react'
import { cn } from '@/modules/shared/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { useSectionTitle } from './use-section-title'

export interface SectionTitleProps {
  title: string
  hash: string
  className?: string
}

export default function SectionTitle({ title, hash, className }: SectionTitleProps) {
  const { handleCopyUrl, handleLinkMouseEnter, handleLinkMouseLeave, tooltip } = useSectionTitle()

  return (
    <div className={cn('flex w-fit items-center gap-4', className)} data-hash={hash}>
      <span className="text-[32px] leading-[120%] font-bold">{title}</span>
      <Tooltip open={!!tooltip}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-muted-foreground/50 h-fit !p-0 hover:bg-transparent"
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
            onClick={() => {
              void handleCopyUrl(hash)
            }}
          >
            <Link className="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          className="pointer-events-none max-w-66"
          side="bottom"
          align="start"
          arrowPadding={16}
        >
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
