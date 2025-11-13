import type { BreadcrumbItemNavigation } from '@/modules/shared/components/breadcrumb'
import { BUDGETS } from '../mocks'
import { ATLAS_BUDGETS } from '../mocks/group-wallets'
import type { FiancesNavigationCard, WalletGroup } from '../types'
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

export function percentageRespectTo(value: number, total: number): number {
  if (total === 0) return 0
  return (value / total) * 100
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

  return {
    title,
    description,
    icon,
    code,
    levelNumber,
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

  segmentedCodePath.forEach((item, index) => {
    if (item === 'atlas') {
      // it is the first level
      items.push({
        label: networkName,
        href: `/network/${slug}/finances?year=${year}` as Route,
      })
    } else {
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
 * Generates cards navigation data from route params (server-side compatible)
 */
export function getCardsNavigationData(
  slug: string,
  financeSlug?: string | string[],
  year = 2025,
): FiancesNavigationCard[] {
  const urlPath = Array.isArray(financeSlug) ? financeSlug.join('/') : financeSlug
  const codePath = urlPath ? `atlas/${urlPath}` : 'atlas'
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

  // All the logic required by the CardNavigation section
  const cardsNavigation: FiancesNavigationCard[] = budgets.map((item) => {
    return {
      id: item.id,
      image: item.image || '/assets/img/default-icon-cards-budget.svg',
      codePath: item.codePath,
      name: formatBudgetName(item.name),
      description: item.description,
      href: `/network/${slug}/finances/${item.codePath.replace('atlas/', '')}?year=${year}`,
      budgetCapValue: 1000000,
      code: item.code,
      percent: 80,
    }
  })

  return cardsNavigation
}
