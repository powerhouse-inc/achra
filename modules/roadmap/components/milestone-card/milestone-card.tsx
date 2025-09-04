'use client'

import { ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardContent, CardFooter } from '@/shared/components/ui/card'
import { Progress } from '@/shared/components/ui/progress'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { formatDateStringToQuarter, getStatusColor } from './utils'
import type { Milestone } from './types'

interface MilestoneCardProps {
  milestone: Milestone
  className?: string
}

export default function MilestoneCard({ milestone, className }: MilestoneCardProps) {
  return (
    <Card
      className={cn(
        'h-full w-full gap-0 overflow-hidden rounded-xl border-gray-200 bg-white py-0 shadow-sm',
        className,
      )}
    >
      <CardHeader className="flex auto-rows-auto grid-rows-none flex-row items-center justify-between gap-0 border-b border-gray-100 bg-gray-50 px-2 py-1">
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold text-gray-400">{milestone.sequenceCode}</span>
          <span className="text-sm font-semibold text-gray-900">{milestone.code}</span>
        </div>
        <div className="rounded px-1 py-0.5">
          <span className="text-sm font-semibold text-gray-400">
            {formatDateStringToQuarter(milestone.targetDate)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-2">
        <div className="mb-2 flex flex-1 flex-col rounded-lg border border-gray-200 bg-gray-50 p-2">
          <h4 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900">
            {milestone.title}
          </h4>
          {milestone.abstract && (
            <p className="flex-1 overflow-hidden text-xs text-ellipsis text-gray-600">
              {milestone.abstract}
            </p>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-2">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-gray-600">Status</span>
            <span
              className={cn(
                'rounded-full px-2 py-0.5 text-xs font-medium',
                getStatusColor(milestone.status),
              )}
            >
              {milestone.status}
            </span>
          </div>
          <div className="relative">
            <Progress
              value={milestone.progress}
              className={cn(
                'h-6 bg-gray-200',
                milestone.status === 'Delivered' && '[&>div]:bg-green-600',
                milestone.status === 'In Progress' && '[&>div]:bg-blue-600',
                milestone.status === 'To do' && '[&>div]:bg-orange-600',
              )}
            />
            <div
              className="absolute inset-0 flex items-center justify-end pr-2 text-xs font-medium text-white"
              style={{ zIndex: 10 }}
            >
              {milestone.progress}%
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="h-7 w-full justify-center gap-1 text-xs"
          asChild
        >
          <a href={`#${milestone.code}`}>
            View
            <ArrowRight className="h-3 w-3" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
