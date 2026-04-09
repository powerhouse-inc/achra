import {
  SERVICE_PURCHASE_DEFAULT_STEP,
  SERVICE_PURCHASE_STEPS_ENTRIES,
} from '../../config/constants'
import {
  ServicePurchaseStep,
  type ServicePurchaseStoreGet,
  type ServicePurchaseStoreSet,
  type StepSlice,
  type StepSliceState,
} from '../../types'

const getStepIndex = (step: ServicePurchaseStep) =>
  SERVICE_PURCHASE_STEPS_ENTRIES.findIndex((item) => item.value === step)

const getStepsUpTo = (step: ServicePurchaseStep): ServicePurchaseStep[] => {
  const index = getStepIndex(step)
  return SERVICE_PURCHASE_STEPS_ENTRIES.slice(0, index + 1).map((s) => s.value)
}

function applyStepTransition(
  state: StepSliceState,
  newStep: ServicePurchaseStep,
): Partial<StepSliceState> {
  const stepsUpTo = getStepsUpTo(newStep)
  const visitedSteps = Array.from(new Set([...state.visitedSteps, ...stepsUpTo]))
  const disabledSteps = state.disabledSteps.filter((s) => s !== newStep)
  return { activeStep: newStep, visitedSteps, disabledSteps }
}

function createStepSlice(set: ServicePurchaseStoreSet, _get: ServicePurchaseStoreGet): StepSlice {
  return {
    activeStep: SERVICE_PURCHASE_DEFAULT_STEP,
    visitedSteps: [SERVICE_PURCHASE_DEFAULT_STEP],
    disabledSteps: [ServicePurchaseStep.Summary, ServicePurchaseStep.Confirmation],

    actions: {
      goToStep: (step: ServicePurchaseStep) => {
        set((state) => applyStepTransition(state, step))
      },

      goBack: () => {
        set((state) => {
          const currentIndex = getStepIndex(state.activeStep)
          if (currentIndex <= 0) return state
          const prevStep = SERVICE_PURCHASE_STEPS_ENTRIES[currentIndex - 1].value
          return applyStepTransition(state, prevStep)
        })
      },

      resetPostConfigureSteps: () => {
        set((state) => ({
          disabledSteps: [ServicePurchaseStep.Summary, ServicePurchaseStep.Confirmation],
          visitedSteps: state.visitedSteps.filter(
            (step) =>
              step !== ServicePurchaseStep.Summary && step !== ServicePurchaseStep.Confirmation,
          ),
        }))
      },
    },
  }
}

export { createStepSlice, applyStepTransition }
