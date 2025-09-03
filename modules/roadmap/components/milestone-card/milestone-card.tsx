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
    <Card className={cn(
      'w-full h-full bg-white rounded-xl border-gray-200 shadow-sm overflow-hidden gap-0 py-0',
      className
    )}>
      <CardHeader className="flex flex-row justify-between items-center px-2 py-1 bg-gray-50 border-b border-gray-100 gap-0 grid-rows-none auto-rows-auto">
        <div className="flex items-center gap-1">
          <span className="text-gray-400 font-semibold text-sm">{milestone.sequenceCode}</span>
          <span className="text-gray-900 font-semibold text-sm">{milestone.code}</span>
        </div>
        <div className="px-1 py-0.5 rounded">
          <span className="text-gray-400 font-semibold text-sm">
            {formatDateStringToQuarter(milestone.targetDate)}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-2 flex-1 flex flex-col">
        <div className="mb-2 p-2 bg-gray-50 border border-gray-200 rounded-lg flex-1 flex flex-col">
          <h4 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
            {milestone.title}
          </h4>
          {milestone.abstract && (
            <p className="text-xs text-gray-600 flex-1 overflow-hidden text-ellipsis">
              {milestone.abstract}
            </p>
          )}
        </div>

        <div className="p-2 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">
              Status
            </span>
            <span className={cn(
              'px-2 py-0.5 rounded-full text-xs font-medium',
              getStatusColor(milestone.status)
            )}>
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
                milestone.status === 'To do' && '[&>div]:bg-orange-600'
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
          className="w-full justify-center gap-1 text-xs h-7"
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
