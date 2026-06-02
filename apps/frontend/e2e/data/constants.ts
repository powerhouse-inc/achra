/**
 * Pinned staging Switchboard identifiers used across the suite. The
 * data-validity smoke test pins these values and fails loudly if the
 * referenced entity disappears from staging — update here when that happens.
 */
export const NETWORK_SLUG = 'powerhouse'
export const SERVICE_SLUG = 'c5e444aa-0f16-4e7a-87f9-e860b1643eed'
export const OPERATOR_SLUG = 'powerhouse-rgh'
export const BUILDER_SLUG = 'business-analysis-and-integrations'

/**
 * Step query-param values for /services/[slug]/purchase. Mirrors the
 * StepUrlSync contract in modules/service-purchase.
 */
export const PURCHASE_STEP = {
  productInfo: 'product-info',
  selectOperator: 'select-operator',
  configureServices: 'configure-services',
  summary: 'summary',
  confirmation: 'confirmation',
} as const

export type PurchaseStepValue = (typeof PURCHASE_STEP)[keyof typeof PURCHASE_STEP]

/**
 * Known dashboard section ids on /network/[slug] (rendered as
 * `id="___SECTION___<name>"`). Which of these actually appear depends on the
 * network's data and feature flags. Only RELIABLE_DASHBOARD_SECTIONS are
 * guaranteed across networks; the rest are conditional.
 */
export const NETWORK_DASHBOARD_SECTIONS = [
  'details',
  'finances',
  'governance',
  'proposals',
  'wallets',
  'builders',
  'roadmap',
] as const

export type NetworkDashboardSection = (typeof NETWORK_DASHBOARD_SECTIONS)[number]

/**
 * Sections we assert always render. Verified against the powerhouse network
 * on 2026-05-04 — both sections were present.
 */
export const RELIABLE_DASHBOARD_SECTIONS: readonly NetworkDashboardSection[] = [
  'builders',
  'finances',
]
