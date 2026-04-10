/**
 * Service filter tabs
 */
export type ServiceTab = 'all' | 'builders' | 'networks'

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
  teamName: string
  email: string
  selectedPlan: string
  enabledSections: Record<string, boolean>
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
    teamName?: string
    email?: string
  }
}
