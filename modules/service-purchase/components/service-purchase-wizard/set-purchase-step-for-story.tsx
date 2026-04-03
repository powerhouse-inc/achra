'use client'

import { type ReactNode, useEffect } from 'react'
import { useServicePurchaseStep } from '@/modules/service-purchase/providers/service-purchase-store-provider'
import type { ServicePurchaseStep } from '@/modules/service-purchase/types'

interface SetPurchaseStepForStoryProps {
  step: ServicePurchaseStep
  children: ReactNode
}

/** Storybook-only: syncs the purchase store to a step so Chromatic captures non-default wizard chrome. */
function SetPurchaseStepForStory({
  step,
  children,
}: Readonly<SetPurchaseStepForStoryProps>): ReactNode {
  const { goToStep } = useServicePurchaseStep()

  useEffect(() => {
    goToStep(step)
  }, [goToStep, step])

  return children
}

export { SetPurchaseStepForStory }
