'use client'
import { motion } from 'motion/react'
import { useMemo } from 'react'
import type { HorizontalBudgetBarProps } from '@/modules/finances/types'
import { cn } from '@/modules/shared/lib/utils'

export function HorizontalBudgetBar({
  actuals,
  prediction,
  budgetCap,
  className,
  maxPercentage = 87,
}: HorizontalBudgetBarProps) {
  const dimensions = useMemo(() => {
    const maxValue = Math.max(actuals, prediction, budgetCap) || 1

    return {
      actualsWidth: (actuals / maxValue) * maxPercentage,
      predictionWidth: (prediction / maxValue) * maxPercentage,
      budgetCapPosition: (budgetCap / maxValue) * maxPercentage,
    }
  }, [actuals, prediction, budgetCap, maxPercentage])

  return (
    <div
      data-slot="budget-bar"
      className={cn('bg-muted relative h-4 w-full overflow-hidden rounded-lg', className)}
    >
      {prediction > 0 && (
        <div
          data-slot="prediction-bar"
          data-type="prediction"
          className={cn('bg-chart-2 absolute top-0 left-0 h-full rounded-lg')}
          style={{ width: `${dimensions.predictionWidth}%` }}
        />
      )}
      {actuals > 0 && (
        <motion.div
          data-slot="actuals-bar"
          data-type="actuals"
          className={cn('bg-status-success absolute top-0 left-0 h-full rounded-lg')}
          initial={{ width: 0 }}
          animate={{ width: `${dimensions.actualsWidth}%` }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
        />
      )}
      {budgetCap > 0 && (
        <div
          data-slot="budget-cap-line"
          data-type="budget"
          className={cn('bg-destructive absolute top-0 h-full w-px')}
          style={{ left: `${dimensions.budgetCapPosition}%` }}
        />
      )}
    </div>
  )
}
