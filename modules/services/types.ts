import type { Service } from '@/modules/shared/types/services'

/**
 * Badge types displayed on service cards.
 * Only one badge is shown per card, selected by priority order.
 */
export type ServiceBadge =
  | 'coming-soon'
  | 'recommended'
  | 'most-popular'
  | 'new'
  | 'free-tier'
  | 'pro-only'

/**
 * Offering pricing summary for a single resource template,
 * used to derive Free tier / Pro only badges on the listing page.
 */
export interface OfferingPricingSummary {
  hasFreeTier: boolean
  tierCount: number
}

/**
 * Service enriched with badge, offering, and operator data for the marketplace listing.
 */
export interface EnrichedService {
  service: Service
  badge: ServiceBadge | null
  offeringSummary: OfferingPricingSummary | null
  operatorName: string | null
}

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
