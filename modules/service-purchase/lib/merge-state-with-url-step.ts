import { applyStepTransition } from '../stores/slices/step-slice'
import { readPurchaseStepFromUrl } from './read-purchase-step-from-url'
import type { ServicePurchaseStore } from '../types'

/** Applies valid `?step=` from the URL after rehydrate/merge so deep links override persisted step. */
export function mergeStateWithUrlStepIfPresent(state: ServicePurchaseStore): ServicePurchaseStore {
  const urlStep = readPurchaseStepFromUrl()
  if (urlStep == null) return state
  const stepPatch = applyStepTransition(
    {
      activeStep: state.activeStep,
      visitedSteps: state.visitedSteps,
      disabledSteps: state.disabledSteps,
    },
    urlStep,
  )
  return { ...state, ...stepPatch }
}
