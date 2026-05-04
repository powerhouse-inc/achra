/**
 * Hardcoded fallback identifiers for staging Switchboard data. Override per
 * environment via the corresponding E2E_* env var (see e2e/env.e2e.example).
 * The data-validity smoke test pins these values and fails loudly if the
 * referenced entity disappears from staging.
 */
export const FALLBACK_NETWORK_SLUG = 'powerhouse'
export const FALLBACK_SERVICE_SLUG = '56dce7ce-e65d-4fd6-b3d8-7a8506528aa9'
export const FALLBACK_OPERATOR_SLUG = 'powerhouse-rgh'
export const FALLBACK_BUILDER_SLUG = 'business-analysis-and-integrations'

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
