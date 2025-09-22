'use client'

import { Link } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Info } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/shared/components/ui/tooltip'
import { useSectionTitle } from './use-section-title'

export interface SectionTitleProps {
  title: string
  hash: string
}

export default function SectionTitle({ title, hash }: SectionTitleProps) {
  const { handleCopyUrl, handleLinkMouseEnter, handleLinkMouseLeave, tooltip } = useSectionTitle()

  return (
    <div className="flex w-fit items-center gap-4">
      <span className="text-[32px] leading-[1.2] font-bold">{title}</span>
      <Tooltip open={!!tooltip}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-muted-foreground/50 !p-0 hover:bg-transparent"
            onMouseEnter={handleLinkMouseEnter}
            onMouseLeave={handleLinkMouseLeave}
            onClick={() => {
              void handleCopyUrl(hash)
            }}
          >
            <Link className="size-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-66" side="bottom" align="start" arrowPadding={16}>
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
