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

// submit-request slice
export interface SubmitRequestSliceState {
  requestEntityData: ServiceRequestEntityData | null
}

export interface SubmitRequestSliceActions {
  setRequestEntityData: (requestEntityData: ServiceRequestEntityData) => void
}

export interface SubmitRequestSlice extends SubmitRequestSliceState {
  actions: SubmitRequestSliceActions
}

// store (composed from slices)
export type ServicePurchaseState = SubmitRequestSliceState // & otherSliceLater
export type ServicePurchaseActions = SubmitRequestSliceActions // & otherActionsSliceLater

export interface ServicePurchaseStore extends ServicePurchaseState {
  actions: ServicePurchaseActions
}
