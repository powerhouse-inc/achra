import { RsBillingCycle } from '@/modules/__generated__/graphql/switchboard-generated'
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

export const BILLING_CYCLE_LABELS: Record<RsBillingCycle, string> = {
  [RsBillingCycle.Monthly]: 'Billed Monthly',
  [RsBillingCycle.Quarterly]: 'Billed Quarterly',
  [RsBillingCycle.SemiAnnual]: 'Billed Semi-Annually',
  [RsBillingCycle.Annual]: 'Billed Annually',
  [RsBillingCycle.OneTime]: 'One-time payment',
}

export const BILLING_CYCLE_SUFFIXES: Record<RsBillingCycle, string> = {
  [RsBillingCycle.Monthly]: '/mo',
  [RsBillingCycle.Quarterly]: '/qtr',
  [RsBillingCycle.SemiAnnual]: '/semi-annual',
  [RsBillingCycle.Annual]: '/year',
  [RsBillingCycle.OneTime]: '',
}
