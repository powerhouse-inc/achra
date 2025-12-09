'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { ScopeOfWork_Deliverable } from '@/modules/__generated__/graphql/switchboard-generated'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { KeyResultsModal } from '../key-results-modal/key-results-modal'
import { MetricCard, MetricCardLabel } from '../metric-card/metric-card'

interface KeyResultsMetricCardProps {
  completed: number
  total: number
  deliverables: ScopeOfWork_Deliverable[]
}

function KeyResultsMetricCard({ completed, total, deliverables }: KeyResultsMetricCardProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <MetricCard
        className="group/metric-card hover:bg-accent cursor-pointer transition-colors"
        onClick={handleOpen}
      >
        <div className="flex w-full items-start justify-between gap-2">
          <div className="w-full space-y-1">
            <MetricCardLabel>Key Results</MetricCardLabel>
            <div className="flex w-full justify-between">
              <div className="flex items-baseline gap-2">
                <div className={cn('text-base font-semibold tracking-tight')}>
                  <span>{completed}</span>
                  <span className="text-foreground/50"> / {total}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex self-center">
            <Button
              variant="outline"
              size="icon"
              aria-label="View key results"
              aria-expanded={isOpen}
              className="group-hover/metric-card:bg-accent"
            >
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </MetricCard>

      <KeyResultsModal deliverables={deliverables} isOpen={isOpen} onClose={handleClose} />
    </>
  )
}

export { KeyResultsMetricCard }
