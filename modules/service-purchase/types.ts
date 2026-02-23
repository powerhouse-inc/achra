import type { submitRequestSchema } from './lib/submit-request-schema'
import type { RsOfferingFacetTarget } from '../__generated__/graphql/switchboard-generated'
import type { z } from 'zod'
import type { StoreApi } from 'zustand'

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

// facets slice
export interface FacetsSliceState {
  facets: Array<{
    originalFacet: RsOfferingFacetTarget
    selectedOption: string
  }>
}

export interface FacetsSliceActions {
  selectedFacetOption: (categoryKey: string, selectedOption: string) => void
}

export interface FacetsSlice extends FacetsSliceState {
  actions: FacetsSliceActions
}

// store init props (for dependency injection from page)
export interface ServicePurchaseStoreProps {
  facets?: RsOfferingFacetTarget[]
}

// store (composed from slices)
export type ServicePurchaseState = SubmitRequestSliceState & FacetsSliceState
export type ServicePurchaseActions = SubmitRequestSliceActions & FacetsSliceActions // & otherActionsSliceLater

export interface ServicePurchaseStore extends ServicePurchaseState {
  actions: ServicePurchaseActions
}

export type ServicePurchaseStoreSet = StoreApi<ServicePurchaseStore>['setState']
