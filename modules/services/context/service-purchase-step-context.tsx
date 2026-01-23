'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const STEPS = [
  { value: 'product-info', label: 'Product Info' },
  { value: 'select-operator', label: 'Select Operator' },
  { value: 'select-services', label: 'Select Services' },
  { value: 'summary', label: 'Summary' },
  { value: 'confirmation', label: 'Confirmation' },
] as const

export type StepValue = (typeof STEPS)[number]['value']

interface ServicePurchaseStepContextValues {
  activeStep: StepValue
  goToStep: (step: StepValue) => void
  goBack: () => void
  goNext: () => void
}

const ServicePurchaseStepContext = createContext<ServicePurchaseStepContextValues | undefined>(
  undefined,
)

const getStepIndex = (step: StepValue) => STEPS.findIndex((item) => item.value === step)

export function ServicePurchaseStepProvider({ children }: { children: React.ReactNode }) {
  const [activeStep, setActiveStep] = useState<StepValue>(STEPS[0].value)

  const goToStep = useCallback((step: StepValue) => {
    setActiveStep(step)
  }, [])

  const goBack = useCallback(() => {
    setActiveStep((prev) => {
      const currentIndex = getStepIndex(prev)
      if (currentIndex <= 0) {
        return prev
      }
      return STEPS[currentIndex - 1].value
    })
  }, [])

  const goNext = useCallback(() => {
    setActiveStep((prev) => {
      const currentIndex = getStepIndex(prev)
      if (currentIndex === -1 || currentIndex >= STEPS.length - 1) {
        return prev
      }
      return STEPS[currentIndex + 1].value
    })
  }, [])

  const values = useMemo(
    () => ({
      activeStep,
      goToStep,
      goBack,
      goNext,
    }),
    [activeStep, goBack, goNext, goToStep],
  )

  return (
    <ServicePurchaseStepContext.Provider value={values}>
      {children}
    </ServicePurchaseStepContext.Provider>
  )
}

export function useServicePurchaseStep() {
  const context = useContext(ServicePurchaseStepContext)
  if (!context) {
    throw new Error('useServicePurchaseStep must be used within a ServicePurchaseStepProvider')
  }
  return context
}
