'use client'

import { parseAsStringLiteral, useQueryState } from 'nuqs'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import {
  SERVICE_PURCHASE_DEFAULT_STEP,
  SERVICE_PURCHASE_STEP_VALUES,
  SERVICE_PURCHASE_STEPS_ENTRIES,
} from '../config/constants'
import type { ServicePurchaseStep } from '../types'

interface ServicePurchaseStepContextValues {
  activeStep: ServicePurchaseStep
  visitedSteps: ServicePurchaseStep[]
  goToStep: (step: ServicePurchaseStep) => void
  goBack: () => void
  goNext: () => void
}

const ServicePurchaseStepContext = createContext<ServicePurchaseStepContextValues | undefined>(
  undefined,
)

const getStepIndex = (step: ServicePurchaseStep) =>
  SERVICE_PURCHASE_STEPS_ENTRIES.findIndex((item) => item.value === step)

const getStepsUpTo = (step: ServicePurchaseStep): ServicePurchaseStep[] => {
  const index = getStepIndex(step)
  return SERVICE_PURCHASE_STEPS_ENTRIES.slice(0, index + 1).map((s) => s.value)
}

export function ServicePurchaseStepProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [activeStep, setActiveStep] = useQueryState(
    'step',
    parseAsStringLiteral(SERVICE_PURCHASE_STEP_VALUES).withDefault(SERVICE_PURCHASE_DEFAULT_STEP),
  )
  const [visitedSteps, setVisitedSteps] = useState<ServicePurchaseStep[]>(() =>
    getStepsUpTo(activeStep),
  )

  const goToStep = useCallback(
    (step: ServicePurchaseStep) => {
      if (step !== activeStep) {
        void setActiveStep(step)
      }
      setVisitedSteps((prev) => {
        const stepsUpTo = getStepsUpTo(step)
        return Array.from(new Set([...prev, ...stepsUpTo]))
      })
    },
    [activeStep, setActiveStep],
  )

  const goBack = useCallback(() => {
    void setActiveStep((prev) => {
      const currentIndex = getStepIndex(prev)
      if (currentIndex <= 0) {
        return prev
      }
      return SERVICE_PURCHASE_STEPS_ENTRIES[currentIndex - 1].value
    })
  }, [setActiveStep])

  const goNext = useCallback(() => {
    void setActiveStep((prev) => {
      const currentIndex = getStepIndex(prev)
      if (currentIndex === -1 || currentIndex >= SERVICE_PURCHASE_STEPS_ENTRIES.length - 1) {
        return prev
      }
      return SERVICE_PURCHASE_STEPS_ENTRIES[currentIndex + 1].value
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
