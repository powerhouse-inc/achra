import type { submitRequestSchema } from './lib/submit-request-schema'
import type { z } from 'zod'

export enum ServicePurchaseStep {
  ProductInfo = 'product-info',
  SelectOperator = 'select-operator',
  ConfigureServices = 'configure-services',
  Summary = 'summary',
  Confirmation = 'confirmation',
}

export interface CreateResourceInstancesResult {
  name: string
  teamName: string
  email: string
  driveUrl: string | null
}

export interface SubmitRequestFormState {
  success: boolean
  error?: string
  data?: CreateResourceInstancesResult
}

export type SubmitRequestFormValues = z.infer<typeof submitRequestSchema>

// store types
export interface ServiceRequestEntityData {
  name: string
  teamName: string
  email: string
  driveUrl: string | null
}

export interface ServicePurchaseState {
  requestEntityData: ServiceRequestEntityData | null
}

export interface ServicePurchaseActions {
  setRequestEntityData: (requestEntityData: ServiceRequestEntityData) => void
}

export interface ServicePurchaseStore extends ServicePurchaseState {
  actions: ServicePurchaseActions
}
