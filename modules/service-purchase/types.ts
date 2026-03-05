import type { submitRequestSchema } from './lib/submit-request-schema'
import type {
  RsBillingCycle,
  RsDiscountType,
  RsGroupCostType,
  RsOfferingFacetTarget,
  RsServiceOffering,
  RsServiceSubscriptionTier,
} from '../__generated__/graphql/switchboard-generated'
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

// ─── tiers slice ─
export interface TiersSliceState {
  tiers: RsServiceSubscriptionTier[]
  selectedTier: RsServiceSubscriptionTier
  selectedBillingCycle: RsBillingCycle
}

export interface TiersSliceActions {
  setSelectedTier: (id: string) => void
  setSelectedBillingCycle: (cycle: RsBillingCycle) => void
}

export interface TiersSlice extends TiersSliceState {
  actions: TiersSliceActions
}

// ─── option groups slice ─
export interface PurchaseOptionGroupServiceMetric {
  label: string
  value: string
}

export interface PurchaseOptionGroupService {
  id: string
  title: string
  resolvedValue: string | null
  metrics: PurchaseOptionGroupServiceMetric[]
}

export interface PurchaseOptionGroup {
  id: string
  name: string
  costType: RsGroupCostType | null
  isAddOn: boolean
  isSelected: boolean
  originalPrice: number
  resolvedPrice: number
  services: PurchaseOptionGroupService[]
}

export interface OptionGroupsSliceState {
  optionGroups: PurchaseOptionGroup[]
}

export interface OptionGroupsSliceActions {
  setOptionGroupSelected: (id: string, isSelected: boolean) => void
  recomputeOptionGroups: () => void
}

export interface OptionGroupsSlice extends OptionGroupsSliceState {
  actions: OptionGroupsSliceActions
}

// ─── step slice ───────────────────────────────────────────────────────────────

export interface StepSliceState {
  activeStep: ServicePurchaseStep
  visitedSteps: ServicePurchaseStep[]
  disabledSteps: ServicePurchaseStep[]
}

export interface StepSliceActions {
  goToStep: (step: ServicePurchaseStep) => void
  goBack: () => void
  resetPostConfigureSteps: () => void
}

export interface StepSlice extends StepSliceState {
  actions: StepSliceActions
}

// ─── totals slice ─────────────────────────────────────────────────────────────

export interface PurchaseTotals {
  /** Monthly equivalent of (tier + active recurring groups + active add-ons) after discounts */
  recurringTotal: number
  /** Sum of all active SETUP fees */
  setupTotal: number
}

export interface GroupPriceFromBreakdown {
  amount: number
  isRecurring: boolean
}

export interface TotalsSliceState {
  totals: PurchaseTotals
}

export interface TotalsSliceActions {
  recomputeTotals: () => void
}

export interface TotalsSlice extends TotalsSliceState {
  actions: TotalsSliceActions
}

export interface PersistedServicePurchaseState {
  apiChecksum: string
  selectedTierId: string
  selectedBillingCycle: RsBillingCycle
  selectedFacetOptions: Record<string, string>
  optionGroupSelections: Record<string, boolean>
  requestEntityData: ServiceRequestEntityData | null
  activeStep: ServicePurchaseStep
  visitedSteps: ServicePurchaseStep[]
  disabledSteps: ServicePurchaseStep[]
}

// ─── store composition
// store init props (for dependency injection from page)
export interface ServicePurchaseStoreProps {
  services: RsServiceOffering
}

export type ServicePurchaseState = SubmitRequestSliceState &
  FacetsSliceState &
  TiersSliceState &
  OptionGroupsSliceState &
  TotalsSliceState &
  StepSliceState
export type ServicePurchaseActions = SubmitRequestSliceActions &
  FacetsSliceActions &
  TiersSliceActions &
  OptionGroupsSliceActions &
  TotalsSliceActions &
  StepSliceActions

export interface ServicePurchaseStore extends ServicePurchaseState {
  /** Raw service offering data — static, set once at store initialization */
  services: RsServiceOffering
  actions: ServicePurchaseActions
}

export type ServicePurchaseStoreSet = StoreApi<ServicePurchaseStore>['setState']
export type ServicePurchaseStoreGet = StoreApi<ServicePurchaseStore>['getState']

// ─── service catalog types ─────────────────────────────────────────────────────

export type FeatureValue = boolean | string | CatalogStatus

export enum CatalogStatus {
  Included = 'Included',
  Optional = 'Optional',
  Excluded = 'Excluded',
}

export interface ServiceMetric {
  metric: string
  values: Record<string, FeatureValue>
  isOneTime?: boolean
}

export interface AppliedDiscount {
  sourceId: string
  sourceName: string
  source: 'tier' | 'option-group'
  discountType: RsDiscountType
  discountValue: number
  savedAmount: number
}

export interface CalculateTotalsResult {
  recurringSubtotal: number
  recurringTotal: number
  setupTotal: number
  appliedDiscounts: AppliedDiscount[]
  isPending: boolean
  currency: string
}

export interface CalculateTotalsInput {
  offering: RsServiceOffering
  selectedTierId: string
  selectedBillingCycle: RsBillingCycle
  activeGroupIds: Set<string>
}

export interface OptionGroupSortable {
  costType?: string | null
  isAddOn: boolean
}
