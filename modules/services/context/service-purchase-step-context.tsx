'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const STEP_VALUES = [
  'product-info',
  'select-operator',
  'configure-services',
  'summary',
  'confirmation',
] as const

export type StepValue = (typeof STEP_VALUES)[number]

const DEFAULT_STEP = STEP_VALUES[0]

export const STEPS: ReadonlyArray<{ value: StepValue; label: string }> = [
  { value: 'product-info', label: 'Product Info' },
  { value: 'select-operator', label: 'Select Operator' },
  { value: 'configure-services', label: 'Configure Services' },
  { value: 'summary', label: 'Summary' },
  { value: 'confirmation', label: 'Confirmation' },
]

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

export function ServicePurchaseStepProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [activeStep, setActiveStep] = useQueryState(
    'step',
    parseAsStringLiteral(STEP_VALUES).withDefault(DEFAULT_STEP),
  )
  const [visitedSteps, setVisitedSteps] = useState<StepValue[]>(() => [activeStep])

  const goToStep = useCallback(
    (step: StepValue) => {
      void setActiveStep(step)
      setVisitedSteps((previousSteps) =>
        previousSteps.includes(step) ? previousSteps : [...previousSteps, step],
      )
    },
    [setActiveStep],
  )

  const goBack = useCallback(() => {
    void setActiveStep((prev) => {
      const currentIndex = getStepIndex(prev)
      if (currentIndex <= 0) {
        return prev
      }
      return STEPS[currentIndex - 1].value
    })
  }, [setActiveStep])

  const goNext = useCallback(() => {
    void setActiveStep((prev) => {
      const currentIndex = getStepIndex(prev)
      if (currentIndex === -1 || currentIndex >= STEPS.length - 1) {
        return prev
      }
      return STEPS[currentIndex + 1].value
    })
  }, [setActiveStep])

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
