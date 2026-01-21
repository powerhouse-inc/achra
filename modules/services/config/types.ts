import type { PricingPlan } from '../components/service-purchase/components/select-services-purchase/types'
import type { SectionId } from '../components/service-purchase/components/service-purchase-form/service-purchase-form'

/**
 * Configuration data for service purchase
 */
export interface ServiceConfiguration {
  legalEntity: string
  teamStructure: string
  anonymityLevel: string
}

/**
 * Complete data for a service request submission
 */
export interface ServiceRequestData {
  name: string
  email: string
  selectedPlan: PricingPlan
  enabledSections: Record<SectionId, boolean>
  configuration: ServiceConfiguration
}

/**
 * State returned from the service request server action
 */
export interface ServiceRequestFormState {
  success: boolean
  message?: string
  error?: string
  fieldErrors?: {
    name?: string
    email?: string
  }
}
