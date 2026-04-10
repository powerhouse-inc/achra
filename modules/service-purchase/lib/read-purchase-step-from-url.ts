import { SERVICE_PURCHASE_STEP_VALUES } from './constants'
import type { ServicePurchaseStep } from '../types'

/** Reads `?step=` from the current URL when valid for the purchase wizard (client-only; uses `window`). */
export function readPurchaseStepFromUrl(): ServicePurchaseStep | null {
  if (typeof window === 'undefined') return null
  const raw = new URLSearchParams(window.location.search).get('step')
  if (raw != null && SERVICE_PURCHASE_STEP_VALUES.includes(raw as ServicePurchaseStep)) {
    return raw as ServicePurchaseStep
  }
  return null
}
