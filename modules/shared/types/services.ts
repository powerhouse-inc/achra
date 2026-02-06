export enum ServiceEntityEnum {
  Builders = 'Builders',
  Networks = 'Networks',
  Operators = 'Operators',
  Founders = 'Founders',
  'SNO Governors' = 'SNO Governors',
}

/**
 * Service status from API
 */
export type ServiceStatus = 'AVAILABLE' | 'COMING_SOON'

/**
 * Target audience from API
 */
export interface TargetAudience {
  id: string
  label: string
  color: string
}

/**
 * Service interface matching the API resourceTemplates response
 */
export interface Service {
  id: string
  title: string
  summary: string
  description: string | null
  thumbnailUrl: string | null
  status: ServiceStatus
  targetAudiences: TargetAudience[]
  setupServices: string[]
  recurringServices: string[]
  // Optional extended fields from API
  contentSections?: Array<{
    id: string
    title: string
    content: string
    displayOrder: number
  }>
  faqFields?: Array<{
    id: string
    question: string
    answer: string
    displayOrder: number
  }>
  facetTargets?: Array<{
    id: string
    categoryKey: string
    categoryLabel: string
    selectedOptions: string[]
  }>
  infoLink?: string | null
  lastModified?: string
  operatorId?: string
}

/**
 * Helper to check if a service targets builders
 */
export function isBuilderService(service: Service): boolean {
  return service.targetAudiences.some((audience) => audience.label === 'Builders')
}

/**
 * Helper to check if a service targets networks
 */
export function isNetworkService(service: Service): boolean {
  return service.targetAudiences.some((audience) => audience.label === 'Networks')
}
