import { sortBy, sumBy } from 'lodash'
import { useQueryState } from 'nuqs'
import { useMemo, useRef } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import {
  getActualsBreakdownColumns,
  getActualsBreakdownItemsForWallet,
  replacePaymentTopup,
} from '../lib/actuals-table-helpers'
import {
  getWalletActual,
  getWalletDifference,
  getWalletForecast,
  getWalletMonthlyBudget,
  getWalletPayment,
  renderWallet,
} from '../lib/budget-statement-utils'
import { API_MONTH_TO_FORMAT } from '../lib/date'
import { actualAccountTabSearchParamParser } from '../lib/search-params-client'
import { capitalizeSentence, getWalletWidthForWallets, toKebabCase } from '../lib/strings'
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

  const currentBudgetStatement = useMemo(
    () => budgetStatements?.find((x) => x.month === currentMonth) ?? null,
    [budgetStatements, currentMonth],
  )

  const breakdownTabs = useMemo(() => wallets.map((wallet) => wallet.name), [wallets])

  const budgetTotalMonthlyBudget = useMemo(
    () =>
      sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item.budgetCap ?? 0,
        ),
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth],
  )

  const budgetTotalForecast = useMemo(
    () =>
      sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item.forecast ?? 0,
        ),
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth],
  )

  const budgetTotalActual = useMemo(
    () =>
      sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item.actual,
        ),
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth],
  )

  const budgetTotalPayment = useMemo(
    () =>
      sumBy(currentBudgetStatement?.budgetStatementWallet, (wallet) =>
        sumBy(
          wallet.budgetStatementLineItem.filter((item) => item.month === currentMonth),
          (item) => item.payment ?? 0,
        ),
      ),
    [currentBudgetStatement?.budgetStatementWallet, currentMonth],
  )

  const budgetTotalDifference = useMemo(
    () => budgetTotalForecast - budgetTotalActual,
    [budgetTotalForecast, budgetTotalActual],
  )

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

  const mainTableColumns = useMemo(() => {
    const mainTableColumns: InnerTableColumn[] = [
      {
        header: 'Wallet',
        align: 'left',
        type: 'custom',
        cellRender: renderWallet,
        isCardHeader: true,
        width: getWalletWidthForWallets(wallets, isTablet),
        minWidth: getWalletWidthForWallets(wallets, isTablet),
      },
      {
        header: 'Mthly Budget',
        align: 'right',
        type: 'number',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Forecast',
        align: 'right',
        type: 'incomeNumber',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Actuals',
        align: 'right',
        type: 'incomeNumber',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Difference',
        align: 'right',
        type: 'number',
        hasBorderBottomOnCard: true,
      },
      {
        header: 'Payments',
        align: 'right',
        type: 'number',
      },
    ]
    return mainTableColumns
  }, [wallets, isTablet])

  const mainTableItems = useMemo(() => {
    const result: InnerTableRow[] = []

    if (currentBudgetStatement) {
      wallets.forEach((wallet, i) => {
        const numberCellData = [
          getWalletMonthlyBudget(wallet, currentMonth),
          getWalletForecast(wallet, currentMonth),
          getWalletActual(wallet, currentMonth),
          getWalletDifference(wallet, currentMonth),
          getWalletPayment(wallet, currentMonth),
        ]

        if (numberCellData.some((n) => n !== 0)) {
          result.push({
            // Hidden the header for wallet
            showHeader: result[i]?.items[0].column.header === 'Wallet',
            type: 'normal',
            items: [
              {
                column: mainTableColumns[0],
                value: wallet,
              },
              {
                column: mainTableColumns[1],
                value: numberCellData[0],
              },
              {
                column: mainTableColumns[2],
                value: numberCellData[1],
              },
              {
                column: mainTableColumns[3],
                value: numberCellData[2],
              },
              {
                column: mainTableColumns[4],
                value: numberCellData[3],
              },
              {
                column: mainTableColumns[5],
                value: numberCellData[4],
              },
            ],
          })
        }
      })

      if (result.length > 0) {
        result.push({
          type: 'total',
          // Hidden the header for total
          showHeader: false,
          items: [
            {
              column: mainTableColumns[0],
              value: 'Total',
            },
            {
              column: mainTableColumns[1],
              value: budgetTotalMonthlyBudget,
            },
            {
              column: mainTableColumns[2],
              value: budgetTotalForecast,
            },
            {
              column: mainTableColumns[3],
              value: budgetTotalActual,
            },
            {
              column: mainTableColumns[4],
              value: budgetTotalDifference,
            },
            {
              column: mainTableColumns[5],
              value: budgetTotalPayment,
            },
          ],
          // Hidden the total mobile when there is only one wallet
          hideMobile: result.length < 2,
        })
      }
    }

    return result
  }, [
    budgetTotalActual,
    budgetTotalDifference,
    budgetTotalForecast,
    budgetTotalMonthlyBudget,
    budgetTotalPayment,
    currentBudgetStatement,
    currentMonth,
    mainTableColumns,
    wallets,
  ])

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
    mainTableColumns,
    mainTableItems,
    breakdownTabs,
    wallets,
    actualAccountTab,
    setActualAccountTab,
  }
}
