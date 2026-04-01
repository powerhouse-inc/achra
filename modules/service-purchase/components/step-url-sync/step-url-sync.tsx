'use client'

import { parseAsStringEnum, useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'
import { SERVICE_PURCHASE_STEP_VALUES } from '../../config/constants'
import { useServicePurchaseStep } from '../../providers/service-purchase-store-provider'

function StepUrlSync() {
  const { activeStep, goToStep } = useServicePurchaseStep()
  const [stepFromUrl, setStepFromUrl] = useQueryState(
    'step',
    // no default value here to avoid overwriting the step from the URL
    // if no step is provided in the URL, the step will be set to the persisted step
    // or the default step if no step is persisted
    parseAsStringEnum(SERVICE_PURCHASE_STEP_VALUES),
  )
  const prevStepFromUrlRef = useRef(stepFromUrl)
  const isSyncingFromUrlRef = useRef<boolean>(false)

  // URL -> Store: when URL has explicit step param, sync to store (only when URL changed)
  useEffect(() => {
    if (stepFromUrl !== null && stepFromUrl !== prevStepFromUrlRef.current) {
      prevStepFromUrlRef.current = stepFromUrl
      isSyncingFromUrlRef.current = true
      goToStep(stepFromUrl)
      queueMicrotask(() => {
        isSyncingFromUrlRef.current = false
      })
    }
  }, [stepFromUrl, goToStep])

  // Store -> URL: when store changed (user nav, hydration), sync to URL
  useEffect(() => {
    if (isSyncingFromUrlRef.current || stepFromUrl === activeStep) return
    // On first write when there is no ?step= param yet, use 'replace'
    // to avoid creating an extra history entry.
    // Use 'push' on step changes so that the browser back button
    // walks the wizard steps correctly.
    void setStepFromUrl(activeStep, {
      history: stepFromUrl === null ? 'replace' : 'push',
    })
  }, [activeStep, stepFromUrl, setStepFromUrl])

  return null
}

export { StepUrlSync }
