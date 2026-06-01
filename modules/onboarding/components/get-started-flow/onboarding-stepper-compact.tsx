'use client'

import { Check } from 'lucide-react'
import { ONBOARDING_STEPS, TOTAL_STEPS } from '@/modules/onboarding/lib/constants'
import { Spinner } from '@/modules/shared/components/ui/spinner'
import { cn } from '@/modules/shared/lib/utils'

interface OnboardingStepperCompactProps {
  currentStep: number
  // When the active step's work is in progress, its node shows a spinner.
  loading?: boolean
}

function OnboardingStepperCompact({ currentStep, loading = false }: OnboardingStepperCompactProps) {
  return (
    <nav aria-label="Onboarding progress">
      <ol className="flex items-center">
        {ONBOARDING_STEPS.map((step, index) => {
          const isDone = step.id < currentStep
          const isActive = step.id === currentStep
          const isLoading = isActive && loading
          const isLast = index === TOTAL_STEPS - 1

          return (
            <li
              key={step.id}
              aria-current={isActive ? 'step' : undefined}
              className={cn('flex items-center', !isLast && 'flex-1')}
            >
              <span
                aria-hidden="true"
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold transition-colors',
                  isDone && 'border-status-success bg-status-success text-white',
                  isActive && 'border-primary bg-primary text-primary-foreground',
                  !isDone && !isActive && 'border-input text-muted-foreground',
                )}
              >
                {isDone ? (
                  <Check className="size-4" />
                ) : isLoading ? (
                  <Spinner className="size-4" />
                ) : (
                  step.id
                )}
              </span>
              <span className="sr-only">
                {step.title}
                {isDone ? ' (completed)' : ''}
                {isLoading ? ' (in progress)' : ''}
              </span>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn('mx-2 h-px flex-1', isDone ? 'bg-status-success' : 'bg-border')}
                />
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { OnboardingStepperCompact }
