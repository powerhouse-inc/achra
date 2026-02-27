import { ServicePurchaseStep } from '../types'

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
