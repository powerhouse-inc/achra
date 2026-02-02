import { sortBy } from 'lodash'
import { useQueryState } from 'nuqs'
import { useMemo, useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import {
  getActualsBreakdownColumns,
  getActualsBreakdownItemsForWallet,
  replacePaymentTopup,
} from '../lib/actuals-table-helpers'
import { API_MONTH_TO_FORMAT } from '../lib/date'
import { actualAccountTabSearchParamParser } from '../lib/search-params-client'
import { capitalizeSentence, toKebabCase } from '../lib/strings'
import type { InnerTableColumn, InnerTableRow } from '../components/advanced-inner-table/types'
import type { BudgetStatement, BudgetStatementWallet } from '../types'
import type { DateTime } from 'luxon'

export const useBudgetStatementActuals = (
  propsCurrentMonth: DateTime,
  budgetStatements: BudgetStatement[] | undefined,
) => {
  const currentMonth = useMemo(
    () => propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT),
    [propsCurrentMonth],
  )

  // URL-synced actual account tab selection
  const [actualAccountTab, setActualAccountTab] = useQueryState(
    'actual-account',
    actualAccountTabSearchParamParser,
  )

  const wallets: BudgetStatementWallet[] = useMemo(() => {
    const dict: Record<string, BudgetStatementWallet> = {}

    const budgetStatement = budgetStatements?.find(
      (bs) => bs.month === propsCurrentMonth.toFormat(API_MONTH_TO_FORMAT),
    )

    if (!budgetStatement?.budgetStatementWallet) return []

    budgetStatement.budgetStatementWallet.forEach((wallet) => {
      // could be multiple wallets with the same address, we need to keep only the first one
      const savedWallet = dict[wallet.address.toLowerCase()] as BudgetStatementWallet | undefined

      if (wallet.address && !savedWallet) {
        wallet.name = capitalizeSentence(wallet.name) // Modify wallet name to be capitalized
        dict[wallet.address.toLowerCase()] = wallet
      }
    })

    return sortBy(Object.values(dict), 'id')
  }, [propsCurrentMonth, budgetStatements])

  const breakdownTabs = useMemo(() => wallets.map((wallet) => wallet.name), [wallets])

  const headerIds = useMemo(
    () => breakdownTabs.map((header: string) => toKebabCase(header)),
    [breakdownTabs],
  )

  const thirdIndex = useMemo(
    () =>
      typeof actualAccountTab === 'string' ? Math.max(headerIds.indexOf(actualAccountTab), 0) : 0,
    [headerIds, actualAccountTab],
  )

  const currentWallet = useMemo(() => wallets[thirdIndex], [thirdIndex, wallets])

  const breakdownTitleRef = useRef<HTMLDivElement>(null)

  const isTablet = useMediaQuery({ from: 'md', to: 'lg' })

  const [breakdownColumnsForActiveTab, allBreakdownColumns] = useMemo(() => {
    const allBreakdownColumns: Record<string, InnerTableColumn[]> = {}
    for (const wallet of wallets) {
      allBreakdownColumns[wallet.name] = getActualsBreakdownColumns(wallet, isTablet)
    }

    return [allBreakdownColumns[currentWallet.name], allBreakdownColumns]
  }, [currentWallet.name, wallets, isTablet])

  const allBreakdownItems = useMemo(() => {
    const result: Record<string, InnerTableRow[]> = {}

    for (const wallet of wallets) {
      result[wallet.name] = replacePaymentTopup(
        getActualsBreakdownItemsForWallet(wallet, allBreakdownColumns[wallet.name], currentMonth),
      )
    }

    return result
  }, [allBreakdownColumns, currentMonth, wallets])

  const breakdownItemsForActiveTab = useMemo(
    () => allBreakdownItems[currentWallet.name],
    [allBreakdownItems, currentWallet],
  )

  return {
    headerIds,
    breakdownTitleRef,
    breakdownColumnsForActiveTab,
    allBreakdownColumns,
    breakdownItemsForActiveTab,
    allBreakdownItems,
    breakdownTabs,
    wallets,
    actualAccountTab,
    setActualAccountTab,
  }
}
