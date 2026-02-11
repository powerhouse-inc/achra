import { DateTime } from 'luxon'
import type { BreadcrumbItemNavigation } from '@/modules/shared/components/breadcrumb'
import { BUDGETS } from '../mocks'
import { MOCK_BUDGETS_ANALYTICS } from '../mocks/analytics'
import { ATLAS_BUDGETS } from '../mocks/group-wallets'
import type {
  AnalyticMetric,
  BreakdownBudgetAnalytic,
  Budget,
  BudgetMetric,
  FiancesNavigationCard,
  ValueAndUnit,
  WalletGroup,
} from '../types'
import type { Route } from 'next'

export function calculateTotalBalance(
  walletGroups: WalletGroup[],
  balanceKey: 'usdsBalance' | 'skyBalance',
): number {
  return walletGroups.reduce((acc, group) => {
    const groupTotal = group.wallets.reduce((groupAcc, wallet) => {
      return groupAcc + wallet[balanceKey]
    }, 0)
    return acc + groupTotal
  }, 0)
}

export const formatBudgetName = (name: string) => {
  const newName = name ? name.replace(/^End-game\s*/i, '') : 'No-Name'

  switch (newName) {
    case 'Atlas Immutable':
      return 'Atlas Immutable Budget'
    case 'Alignment Scope Budgets':
      return 'Scope Frameworks Budget'
    case 'MakerDAO Legacy Budgets':
      return 'MakerDAO Legacy Budget'
    default:
      return newName
  }
}

/**
 * Calculates level number and level of detail from route params
 */
export function getLevelOfDetail(financeSlug?: string | string[]) {
  const urlPath = Array.isArray(financeSlug) ? financeSlug.join('/') : financeSlug
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas'
  const levelNumber = codePath.split('/').length
  const levelOfDetail = levelNumber + 1

  return {
    levelNumber,
    levelOfDetail,
  }
}

/**
 * Calculates title component data from route params (server-side compatible)
 */
export function getTitleComponentData(slug: string, financeSlug?: string | string[]) {
  // path of the budget
  const urlPath = Array.isArray(financeSlug) ? financeSlug.join('/') : financeSlug
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas'
  const currentBudget = BUDGETS.find((budget) => budget.codePath === codePath)
  const title = formatBudgetName(currentBudget?.name ?? codePath)
  const description = currentBudget?.description
  const icon = currentBudget?.image
  const code = currentBudget?.code ?? ''
  const levelNumber = codePath.split('/').length
  const networkName = slug.charAt(0).toUpperCase() + slug.slice(1)

  return {
    title,
    description,
    icon,
    code,
    levelNumber,
    networkName,
  }
}

/**
 * Generates breadcrumb items from route params (server-side compatible)
 */
export function getBreadcrumbItems(
  slug: string,
  financeSlug?: string | string[],
  year = 2025,
): BreadcrumbItemNavigation[] {
  const networkName = slug.charAt(0).toUpperCase() + slug.slice(1)
  const urlPath = Array.isArray(financeSlug) ? financeSlug.join('/') : financeSlug
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas'
  const allBudgets = ATLAS_BUDGETS

  const items: BreadcrumbItemNavigation[] = []
  const segmentedCodePath = codePath.split('/')

  // Add network name first
  items.push({
    label: networkName,
    href: `/network/${slug}` as Route,
  })

  // Add Finances after network name (only once)
  items.push({
    label: 'Finances',
    href: `/network/${slug}/finances` as Route,
  })

  // Add budget items (skip 'atlas' as it's already handled)
  segmentedCodePath.forEach((item, index) => {
    if (item !== 'atlas') {
      // it is a deeper level
      items.push({
        label: formatBudgetName(
          allBudgets.find(
            (budget) => budget.codePath === segmentedCodePath.slice(0, index + 1).join('/'),
          )?.name ?? codePath,
        ),
        href: `/network/${slug}/finances/${segmentedCodePath.slice(1, index + 1).join('/')}?year=${year}` as Route,
      })
    }
  })

  return items
}

/**
 * Sets the metric value and unit
 */

export const setMetric = (value: number, unit: string) =>
  ({
    value,
    unit,
  }) as ValueAndUnit

/**
 * Creates a new budget metric with default values
 */

export const newBudgetMetric = () =>
  ({
    actuals: setMetric(0, ''),
    budget: setMetric(0, ''),
    forecast: setMetric(0, ''),
    paymentsOnChain: setMetric(0, ''),
    paymentsOffChainIncluded: setMetric(0, ''),
  }) as BudgetMetric

/**
 * Gets the total all metrics budget
 */

export const getTotalAllMetricsBudget = (budgetsAnalytics: BreakdownBudgetAnalytic | undefined) => {
  const metric = {
    actuals: 0,
    forecast: 0,
    budget: 0,
    paymentsOnChain: 0,
    paymentsOffChainIncluded: 0,
  }

  if (budgetsAnalytics !== undefined) {
    for (const budgetMetricKey of Object.keys(budgetsAnalytics)) {
      const budgetMetric = budgetsAnalytics[budgetMetricKey]
      metric.actuals += budgetMetric[0].actuals.value || 0
      metric.forecast += budgetMetric[0].forecast.value || 0
      metric.budget += budgetMetric[0].budget.value || 0
      metric.paymentsOnChain += budgetMetric[0].paymentsOnChain.value || 0
    }
  }
  return metric
}

/**
 * Generates cards navigation data from route params (server-side compatible)
 */

export function getCardsNavigationData(
  slug: string,
  financeSlug?: string | string[],
  year = 2025,
): FiancesNavigationCard[] {
  const codePath = getCodePathFromParams(financeSlug)
  const allBudgets = ATLAS_BUDGETS

  // Get budgets for current level
  let budgets
  if (codePath === 'atlas') {
    // it is the first level so we need to get the budgets that have no parent
    budgets = allBudgets.filter((budget) => budget.parentId === null)
  } else {
    // we're on a deeper level so we need to get the budgets that have the parent id of the current level
    const levelBudget = allBudgets.find((budget) => budget.codePath === codePath)
    budgets = allBudgets.filter((budget) => budget.parentId === levelBudget?.id)
  }
  const allMetrics = getTotalAllMetricsBudget(MOCK_BUDGETS_ANALYTICS)
  // // All the logic required by the CardNavigation section

  const cardsNavigation = budgets
    .map((item, index) => {
      // TODO: When api is ready, check for undefined and return a default value newBudgetMetric
      const budgetMetric = MOCK_BUDGETS_ANALYTICS[item.codePath] ?? [newBudgetMetric()]

      return {
        image: item.image || '/default-icon-cards-budget.svg',
        codePath: item.codePath,
        title: formatBudgetName(item.name),
        description: item.description,
        href: `/network/${slug}/finances/${item.codePath.replace('atlas/', '')}?year=${year}`,
        valueDai: budgetMetric[0].paymentsOnChain.value,
        totalDai: allMetrics.paymentsOnChain,
        budgetCapValue: budgetMetric[0].budget.value,
        code: item.code,
        color: existingColors[index],
        percent: percentageRespectTo(
          budgetMetric[0].paymentsOnChain.value,
          budgetMetric[0].budget.value,
        ),
      }
    })
    .sort((a, b) => b.percent - a.percent)

  return cardsNavigation
}

export const hasSubLevels = (codePath: string, budgets: Budget[]) => {
  const normalizedCodePath = codePath.endsWith('/') ? codePath : `${codePath}/`
  return budgets.some((item) => {
    const normalizedItemCodePath = item.codePath.endsWith('/') ? item.codePath : `${item.codePath}/`
    return (
      normalizedItemCodePath.startsWith(normalizedCodePath) &&
      normalizedItemCodePath.length > normalizedCodePath.length
    )
  })
}

export const transformPathToName = (path: string) => {
  if (!path) return ''
  const transformedPath = path.replaceAll('/*', '')
  const segments = transformedPath.split('/')

  if (segments.length === 0) {
    return ''
  }

  return segments[segments.length - 1] || ''
}

export const removePatternAfterSlash = (input: string) => input.replace(/\/\*.*$/, '')

// Colors for the first level in Finances Charts OverView
export const existingColors: string[] = ['#F99374', '#447AFB', '#2DC1B1']

export const getCorrectMetricValuesOverViewChart = (metric: AnalyticMetric) => {
  if (metric === 'Forecast' || metric === 'Actuals' || metric === 'Budget')
    return metric.toLocaleLowerCase()

  switch (metric) {
    case 'PaymentsOnChain':
      return 'paymentsOnChain'
    case 'ProtocolNetOutflow':
      return 'protocolNetOutflow'
    default:
      return 'budget'
  }
}

export const removeBudgetWord = (name: string) => {
  const wordToRemove = /Budget\s*$/i

  return name.replace(wordToRemove, '')
}

export const percentageRespectTo = (a: number, b: number): number => {
  if (!a || !b) return 0
  return (a / b) * 100
}

/**
 * Gets the code path from financeSlug params
 */
export function getCodePathFromParams(financeSlug?: string[] | string): string {
  const urlPath = Array.isArray(financeSlug) ? financeSlug.join('/') : financeSlug
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas'
  return codePath
}

/**
 * Gets all the budgets by code path for the current level
 */
export function getBudgetsByCodePath(codePath: string, budgets: Budget[]): Budget[] {
  if (codePath === 'atlas') {
    // it is the first level so we need to get the budgets that have no parent
    return budgets.filter((budget) => budget.parentId === null)
  } else {
    // we're on a deeper level so we need to get the budgets that have the parent id of the current level
    const levelBudget = BUDGETS.find((budget) => budget.codePath === codePath)
    return BUDGETS.filter((budget) => budget.parentId === levelBudget?.id)
  }
}

export const getYearsRange = () => {
  const year = DateTime.utc().year
  const yearsRange = Array(1 + year - 2021)
    .fill('')
    .map((_, i) => (year - i).toString())
  return yearsRange
}
