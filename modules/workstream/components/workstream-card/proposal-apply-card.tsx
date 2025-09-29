'use client'

import { cva } from 'class-variance-authority'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/modules/shared/components/ui/button'
import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { Skeleton } from '@/modules/shared/components/ui/skeleton'
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
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState(-1)
  const [containerWidth, setContainerWidth] = useState(0)

  useEffect(() => {
    if (!containerRef.current || !measureRef.current) return

    const measureBadgeWidths = () => {
      const container = containerRef.current!
      const measurer = measureRef.current!

      const containerWidth = container.offsetWidth
      setContainerWidth(containerWidth)

      let totalWidth = 0
      let count = 0
      const gap = 8 // Gap between badges
      const overflowBadgeWidth = 40 // Approximate width of "+N" badge

      // Clear measurer and add badges one by one to measure
      measurer.innerHTML = ''

      for (let i = 0; i < tags.length; i++) {
        const badgeElement = document.createElement('span')
        badgeElement.className = tagVariants()
        badgeElement.textContent = tags[i]
        measurer.appendChild(badgeElement)

        const badgeWidth = badgeElement.offsetWidth
        const nextTotalWidth = totalWidth + badgeWidth + (count > 0 ? gap : 0)

        // If this badge would overflow and there are more badges after it
        if (
          nextTotalWidth >
          containerWidth - (i < tags.length - 1 ? overflowBadgeWidth + gap : 0)
        ) {
          break
        }

        totalWidth = nextTotalWidth
        count++
      }

      setVisibleCount(count)
    }

    measureBadgeWidths()

    const resizeObserver = new ResizeObserver(measureBadgeWidths)
    resizeObserver.observe(containerRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [tags])

  const visibleTags = tags.slice(0, visibleCount)
  const hiddenCount = tags.length - visibleCount

  return (
    <Card className="rounded-lg p-0 shadow-sm">
      <CardContent className="flex gap-4 p-2 sm:p-3">
        <div className="w-full">
          <div className="mb-0.5 line-clamp-2 text-sm/5.5 font-semibold sm:truncate xl:text-base/6">
            {title}
          </div>
          <div className="line-clamp-2 text-sm/5.5">{description}</div>
          <div ref={containerRef} className="mt-3 flex flex-wrap gap-2 sm:mt-4">
            {visibleCount === -1 ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              <>
                {visibleTags.map((tag) => (
                  <div
                    className={tagVariants({
                      variant: getVariant(tag),
                    })}
                    key={tag}
                  >
                    {tag}
                  </div>
                ))}
                {hiddenCount > 0 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className={cn(tagVariants({ variant: 'default' }), 'px-2')}>
                        +{hiddenCount}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" align="start">
                      <div className="max-w-64 space-y-1">
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(visibleCount).map((tag) => (
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
              </>
            )}
          </div>
        </div>
        <Button>Apply</Button>
      </CardContent>

      {/* Hidden measurer element */}
      <div
        ref={measureRef}
        className="invisible absolute top-0 left-0 -z-1 flex items-center gap-2"
        style={{ width: containerWidth }}
      />
    </Card>
  )
}
