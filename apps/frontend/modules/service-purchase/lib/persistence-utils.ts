import { ServicePurchaseStep, type StepSliceState } from '../types'

function getServicePurchaseStorageKey(serviceId: string) {
  return `service-${serviceId}`
}

function clearServicePurchasePersistedState(serviceId: string) {
  if (typeof window === 'undefined') return
  localStorage.removeItem(getServicePurchaseStorageKey(serviceId))
}

function hasReachedConfirmationStep(state: Pick<StepSliceState, 'visitedSteps' | 'disabledSteps'>) {
  return (
    state.visitedSteps.includes(ServicePurchaseStep.Confirmation) &&
    !state.disabledSteps.includes(ServicePurchaseStep.Confirmation)
  )
}

export {
  clearServicePurchasePersistedState,
  getServicePurchaseStorageKey,
  hasReachedConfirmationStep,
}
