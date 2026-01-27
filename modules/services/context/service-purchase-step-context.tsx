'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export const STEPS = [
  { value: 'product-info', label: 'Product Info' },
  { value: 'select-operator', label: 'Select Operator' },
  { value: 'configure-services', label: 'Configure Services' },
  { value: 'summary', label: 'Summary' },
  { value: 'confirmation', label: 'Confirmation' },
] as const

export type StepValue = (typeof STEPS)[number]['value']

interface ServicePurchaseStepContextValues {
  activeStep: StepValue
  visitedSteps: StepValue[]
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
  const [visitedSteps, setVisitedSteps] = useState<StepValue[]>(() => [activeStep])

  const goToStep = useCallback((step: StepValue) => {
    setActiveStep(step)
    setVisitedSteps((previousSteps) =>
      previousSteps.includes(step) ? previousSteps : [...previousSteps, step],
    )
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
      visitedSteps,
      goToStep,
      goBack,
      goNext,
    }),
    [activeStep, visitedSteps, goBack, goNext, goToStep],
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
