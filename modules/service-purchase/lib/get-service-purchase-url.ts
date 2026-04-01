import { type GetServicePurchaseUrlOptions, ServicePurchaseStep } from '../types'
import type { Route } from 'next'

/**
 * Entry URL for the service purchase flow from marketing surfaces (listing, profile, etc.).
 * Today always deep-links to Configure Services; later this may branch (e.g. purchase root vs step).
 */
export function getServicePurchaseUrl(
  serviceId: string,
  options?: GetServicePurchaseUrlOptions,
): Route {
  const params = new URLSearchParams({ step: ServicePurchaseStep.ConfigureServices })
  const operatorId = options?.operatorId
  if (operatorId != null && String(operatorId).trim()) {
    params.set('operatorId', String(operatorId).trim())
  }
  return `/services/${serviceId}/purchase?${params}` as Route
}
