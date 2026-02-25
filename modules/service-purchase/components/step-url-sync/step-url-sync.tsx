'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'
import { SERVICE_PURCHASE_DEFAULT_STEP, SERVICE_PURCHASE_STEP_VALUES } from '../../config/constants'
import { useServicePurchaseStep } from '../../providers/service-purchase-store-provider'

function StepUrlSync({ children }: React.PropsWithChildren) {
  const { activeStep, goToStep } = useServicePurchaseStep()
  const [stepFromUrl, setStepFromUrl] = useQueryState(
    'step',
    parseAsStringEnum(SERVICE_PURCHASE_STEP_VALUES).withDefault(SERVICE_PURCHASE_DEFAULT_STEP),
  )
  const prevStepFromUrlRef = useRef(stepFromUrl)

  // URL -> Store: when URL has explicit step param, sync to store (only when URL changed)
  useEffect(() => {
    if (stepFromUrl !== prevStepFromUrlRef.current) {
      prevStepFromUrlRef.current = stepFromUrl
      goToStep(stepFromUrl)
    }
  }, [stepFromUrl, goToStep])

  // Store -> URL: when store changed (user nav, hydration), sync to URL
  useEffect(() => {
    if (stepFromUrl !== activeStep) {
      // Mismatch: store is source (user clicked or hydration updated)
      void setStepFromUrl(activeStep)
    }
  }, [activeStep, stepFromUrl, setStepFromUrl])

  return <>{children}</>
}

export { StepUrlSync }
