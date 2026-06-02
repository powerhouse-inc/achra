'use client'

import { Card, CardContent } from '@/modules/shared/components/ui/card'
import { OnboardingStepper } from './onboarding-stepper'
import { OnboardingStepperCompact } from './onboarding-stepper-compact'
import { SupportCallout } from './support-callout'
import type { ReactNode } from 'react'

interface OnboardingShellProps {
  currentStep: number
  // Forwarded to the stepper so the active step shows a spinner while its work runs.
  loading?: boolean
  children: ReactNode
}

// `children` (the step content) holds form state, so it is rendered exactly
// once. The stepper and support callout are stateless, so each layout renders
// its own copy and the unused one is hidden via `lg:` visibility — this keeps a
// single grid that reflows instead of swapping trees at the breakpoint.
function OnboardingShell({ currentStep, loading = false, children }: OnboardingShellProps) {
  return (
    <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 lg:max-w-6xl lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-8">
      {/* Desktop: a single sidebar card with the labelled vertical stepper + support. */}
      <Card className="hidden lg:block">
        <CardContent className="flex flex-col gap-6">
          <OnboardingStepper currentStep={currentStep} loading={loading} />
          <SupportCallout className="border-border border-t pt-6" />
        </CardContent>
      </Card>

      {/* Single column: a compact horizontal stepper without labels. */}
      <Card className="lg:hidden">
        <CardContent>
          <OnboardingStepperCompact currentStep={currentStep} loading={loading} />
        </CardContent>
      </Card>

      <div className="min-w-0">{children}</div>

      {/* Single column: support drops to its own card below the step content. */}
      <Card className="lg:hidden">
        <CardContent>
          <SupportCallout />
        </CardContent>
      </Card>
    </div>
  )
}

export { OnboardingShell }
