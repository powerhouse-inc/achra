import { ServicePurchaseStep } from '../types'

/**
 * Whether to enable the leave page guard on the service purchase flow.
 * Enabled by default; set NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED=false to disable.
 */
export const LEAVE_PAGE_GUARD_ENABLED = process.env.NEXT_PUBLIC_LEAVE_PAGE_GUARD_ENABLED !== 'false'

/**
 * Whether to persist the service purchase store to localStorage.
 * Enabled by default; set NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE=false to disable.
 */
export const ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE =
  process.env.NEXT_PUBLIC_ENABLE_SERVICE_PURCHASE_STORE_PERSISTENCE !== 'false'

export const SERVICE_PURCHASE_STEP_VALUES = Object.values(ServicePurchaseStep)

export const SERVICE_PURCHASE_DEFAULT_STEP = SERVICE_PURCHASE_STEP_VALUES[0]

export const DEFAULT_PLAN_INDEX = 1

export const SERVICE_PURCHASE_STEPS_ENTRIES: ReadonlyArray<{
  value: ServicePurchaseStep
  label: string
}> = [
  { value: ServicePurchaseStep.ProductInfo, label: 'Product Info' },
  { value: ServicePurchaseStep.SelectOperator, label: 'Select Operator' },
  { value: ServicePurchaseStep.ConfigureServices, label: 'Configure Services' },
  { value: ServicePurchaseStep.Summary, label: 'Summary' },
  { value: ServicePurchaseStep.Confirmation, label: 'Confirmation' },
]
