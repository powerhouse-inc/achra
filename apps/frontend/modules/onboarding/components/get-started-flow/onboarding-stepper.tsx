'use client'

import { Check } from 'lucide-react'
import { ONBOARDING_STEPS, TOTAL_STEPS } from '@/modules/onboarding/lib/constants'
import { Spinner } from '@/modules/shared/components/ui/spinner'
import { cn } from '@/modules/shared/lib/utils'

interface OnboardingStepperProps {
  currentStep: number
  // When the active step's work is in progress, its node shows a spinner.
  loading?: boolean
}

function OnboardingStepper({ currentStep, loading = false }: OnboardingStepperProps) {
  return (
    <nav aria-label="Onboarding progress">
      <ol className="flex flex-col">
        {ONBOARDING_STEPS.map((step, index) => {
          const isDone = step.id < currentStep
          const isActive = step.id === currentStep
          const isLoading = isActive && loading
          const isLast = index === TOTAL_STEPS - 1

          return (
            <li key={step.id} aria-current={isActive ? 'step' : undefined} className="flex gap-4">
              <div className="flex flex-col items-center">
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
                {!isLast ? (
                  <span
                    aria-hidden="true"
                    className={cn('my-1 w-px flex-1', isDone ? 'bg-status-success' : 'bg-border')}
                  />
                ) : null}
              </div>

              <div className={cn('pb-8', isLast && 'pb-0')}>
                <p
                  className={cn(
                    'text-sm leading-none font-semibold',
                    isActive || isDone ? 'text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {step.title}
                  {isDone ? <span className="sr-only"> (completed)</span> : null}
                  {isLoading ? <span className="sr-only"> (in progress)</span> : null}
                </p>
                <p className="text-muted-foreground mt-1.5 text-sm">{step.description}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export { OnboardingStepper }
