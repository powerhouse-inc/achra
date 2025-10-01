'use client'

import { cva } from 'class-variance-authority'
import { OverflowList } from '@/modules/shared/components/overflow-list'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/modules/shared/components/ui/tooltip'
import { cn } from '@/modules/shared/lib/utils'

interface ProposalApplyCardProps {
  title: string
  description: string
  tags: string[]
}

const tagVariants = cva(
  'inline-flex items-center px-4 py-0 rounded-md text-sm font-semibold whitespace-nowrap border-2 text-foreground/50',
  {
    variants: {
      variant: {
        default: 'border-muted',
        yellow: 'border-[rgba(250,196,0,0.30)]',
        success: 'border-status-success/30',
        progress: 'border-status-progress/30',
        destructive: 'border-destructive/30',
        purple: 'border-purple/30',
        warning: 'border-status-warning/30',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const variants = ['yellow', 'success', 'progress', 'destructive', 'purple', 'warning'] as const
function getVariant(tag: string) {
  return variants[
    tag.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % variants.length
  ]
}

export default function ProposalApplyCard({ title, description, tags }: ProposalApplyCardProps) {
  return (
    <Card className="rounded-lg p-0 shadow-sm">
      <CardContent className="flex gap-4 p-2 sm:p-3">
        <div className="w-full max-w-[calc(100%-86px)]">
          <div className="mb-0.5 line-clamp-2 text-sm/5.5 font-semibold sm:truncate xl:text-base/6">
            {title}
          </div>
          <div className="line-clamp-2 text-sm/5.5">{description}</div>
          <div className="mt-3 flex flex-wrap gap-2 sm:mt-4">
            <OverflowList
              items={tags}
              // eslint-disable-next-line react/no-unstable-nested-components
              itemRenderer={(tag: string) => (
                <div
                  className={tagVariants({
                    variant: getVariant(tag),
                  })}
                  key={tag}
                >
                  {tag}
                </div>
              )}
              // eslint-disable-next-line react/no-unstable-nested-components
              overflowRenderer={(items) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(tagVariants({ variant: 'default' }), 'px-2')}>
                      +{items.length}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="start">
                    <div className="max-w-64 space-y-1">
                      <div className="flex flex-wrap gap-2">
                        {items.map((tag) => (
                          <div
                            key={tag}
                            className={cn(tagVariants({ variant: getVariant(tag) }), 'text-xs')}
                          >
                            {tag}
                          </div>
                        ))}
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            />
          </div>
        </div>
        <Button>Apply</Button>
      </CardContent>
    </Card>
  )
}
