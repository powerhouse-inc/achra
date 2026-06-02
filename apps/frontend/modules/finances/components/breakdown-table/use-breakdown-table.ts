// TODO: remove the eslint-disable comments in order to complete the migration
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import groupBy from 'lodash/groupBy'
import { useMemo } from 'react'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { useFinancesYear } from '../../hooks/use-finances-year'
import { BUDGETS, FIRST_LEVEL_BUDGETS } from '../../mocks'
import {
  ANNUAL_ANALYTICS_MOCK,
  MONTHLY_ANALYTICS_MOCK,
  QUARTERLY_ANALYTICS_MOCK,
} from '../../mocks/breakdown-table-analytics'
import {
  type Analytic,
  type AnalyticGranularity,
  GRANULARITY_OPTIONS,
  type ItemRow,
  type MetricValues,
  type TableData,
  type TableFinances,
} from '../../types'
import { useBreakdownTableFilters } from './breakdown-table-filters/use-breakdown-table-filters'

const granularityToAnalytic: Record<GRANULARITY_OPTIONS, AnalyticGranularity> = {
  [GRANULARITY_OPTIONS.Monthly]: 'monthly',
  [GRANULARITY_OPTIONS.Quarterly]: 'quarterly',
  [GRANULARITY_OPTIONS.Annually]: 'annual',
}

const EMPTY_METRIC_VALUE = {
  Actuals: 0,
  Budget: 0,
  PaymentsOnChain: 0,
  Forecast: 0,
  ProtocolNetOutflow: 0,
} as MetricValues

// TODO: move to utils file
function removePatternAfterSlash(input: string) {
  return input.replace(/\/\*.*$/, '')
}

// TODO: move to utils file
// ASK: is this function needed in Achra?
function formatBudgetName(name: string) {
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

// TODO: move to utils file
function isHeaderValuesZero(header: ItemRow): boolean {
  if (header.columns.length === 0) return true
  return header.columns.some(
    (column) =>
      column.Actuals !== 1 ||
      column.Budget !== 0 ||
      column.PaymentsOnChain !== 0 ||
      column.Forecast !== 0 ||
      column.ProtocolNetOutflow !== 0,
  )
}

function useBreakdownTable() {
  const { year } = useFinancesYear()

  const filters = useBreakdownTableFilters()

  const allBudgets = BUDGETS // TODO: fetch budgets from the API
  const budgets = FIRST_LEVEL_BUDGETS // TODO: fetch budgets from the API

  // breakpoints
  const isMobile = useMediaQuery({ to: 'md' })
  const isTablet = useMediaQuery({ from: 'md', to: 'lg' })
  const isDesk1024 = useMediaQuery({ from: 'lg', to: 'xl' })
  const isDesk1280 = useMediaQuery({ from: 'xl', to: '2xl' })
  const isDesk1920 = useMediaQuery({ from: '2xl' })
  const isUpDesk2400 = useMediaQuery({ from: 2400 })
  const isUpDesk3000 = useMediaQuery({ from: 3000 })

  const lod = 3 as number // FIXME: hardcoded for now
  const codePath = 'atlas' as string // FIXME: hardcoded for now

  const granularityOptions = isMobile
    ? ['Annually']
    : isTablet || isDesk1024 || isDesk1280
      ? ['Annually', 'Quarterly']
      : ['Annually', 'Quarterly', 'Monthly']

  const selectedGranularity = granularityToAnalytic[filters.granularity]
  const activeMetrics = filters.metrics // FIXME: hardcoded for now

  const maxAmountOfActiveMetrics = 2 // TODO: implement the max amount of active metrics depending on the breakpoint

  // TODO: implement the data fetching, hardcoded for now to simulate the data fetching response
  const error = null as Error | null
  const analytics = useMemo(() => {
    if (selectedGranularity === 'annual') {
      return ANNUAL_ANALYTICS_MOCK
    } else if (selectedGranularity === 'quarterly') {
      return QUARTERLY_ANALYTICS_MOCK
    } else {
      return MONTHLY_ANALYTICS_MOCK
    }
  }, [selectedGranularity])

  const [tableHeader, tableBody] = useMemo(() => {
    // occurred an error or the data is loading
    if (error || !analytics) {
      return [null, null]
    }

    const data = {} as TableData
    const columnsCount =
      selectedGranularity === 'annual'
        ? 1
        : selectedGranularity === 'semiAnnual'
          ? 3
          : selectedGranularity === 'quarterly'
            ? 5
            : 13
    // group data in an easier structure to manage
    analytics.series.forEach((series) => {
      series.rows.forEach((row) => {
        const path = row.dimensions[0].path

        if (!data[path]) {
          // create the path as it does not exist
          data[path] = {}
        }
        if (!data[path][series.period]) {
          // create the period as it does not exist
          data[path][series.period] = { ...EMPTY_METRIC_VALUE }
        }

        // add the metric value to the period
        data[path][series.period][row.metric as keyof MetricValues] += row.value
      })
    })

    // create a sub-table for each budget that has * in the path
    // this sub-table will be used as the uncategorized table
    const uncategorizedSubTables: TableFinances[] = []
    Object.keys(data)
      .filter(
        // if the path is uncategorized and it is not in the budgets list
        // (if it is in the budget list then it should be in the sub-tables as uncategorized)
        (path) =>
          path.includes('*') &&
          !budgets.some((budget) => budget.codePath === removePatternAfterSlash(path)),
      )
      .forEach((path) => {
        const columns = Object.values(data[path])
        // this path can not be used for other sub tables
        delete data[path]

        if (selectedGranularity !== 'annual') {
          // annual does not have totals
          const total = columns.reduce(
            (acc, current) => {
              acc.Actuals += current.Actuals
              acc.Budget += current.Budget
              acc.PaymentsOnChain += current.PaymentsOnChain
              acc.Forecast += current.Forecast
              acc.ProtocolNetOutflow += current.ProtocolNetOutflow
              return acc
            },
            { ...EMPTY_METRIC_VALUE },
          )

          columns.push(total)
        }

        const name = removePatternAfterSlash(path).substring(
          removePatternAfterSlash(path).lastIndexOf('/') + 1,
        )
        const subTable = {
          tableName: name,
          rows: [
            {
              name,
              codePath: path,
              isMain: true,
              isUncategorized: true,
              columns,
            },
          ],
        } as TableFinances
        uncategorizedSubTables.push(subTable)
      })

    // create a table for each budget for the current level
    let tables = [...uncategorizedSubTables]

    // a sub-table should be created for each budget available in the current level
    budgets.forEach((budget) => {
      const table = {
        tableName: budget.name,
        rows: [],
      } as TableFinances
      // sub-table rows
      const rows = Object.keys(data)
        .filter((path) => path.startsWith(budget.codePath))
        .map(
          (path) => {
            const columns = Object.values(data[path])
            delete data[path] // remove the path from the data as it was added

            if (selectedGranularity !== 'annual') {
              // annual does not have totals
              const total = columns.reduce(
                (acc, current) => {
                  acc.Actuals += current.Actuals
                  acc.Budget += current.Budget
                  acc.PaymentsOnChain += current.PaymentsOnChain
                  acc.Forecast += current.Forecast
                  acc.ProtocolNetOutflow += current.ProtocolNetOutflow
                  return acc
                },
                { ...EMPTY_METRIC_VALUE },
              )

              columns.push(total)
            }

            const isUncategorized = path.includes('*')
            return {
              name: isUncategorized ? 'Uncategorized' : path,
              codePath: path,
              columns,
              isUncategorized,
            } as ItemRow
          },
          //
        )

      // complete sub-table rows with missing sub-budgets
      // Note that will be some budgets that don't have subBudget
      const subBudgets = allBudgets.filter((item) => item.parentId === budget.id)
      subBudgets.forEach((subBudget) => {
        if (!rows.some((row) => row.codePath === subBudget.codePath)) {
          if (subBudget.code === 'uncategorized') {
            return // all the values are 0 so we don't need to add it
          }
          rows.push({
            name: isMobile ? subBudget.code : subBudget.codePath,
            codePath: subBudget.codePath,
            columns: Array.from({ length: columnsCount }, () => ({ ...EMPTY_METRIC_VALUE })),
          })
        }
      })
      // add correct rows name
      rows.forEach((row) => {
        const nameOrCode = subBudgets.filter((item) => item.codePath === row.codePath)[0]
        if (!nameOrCode) {
          if (row.name.includes('*')) {
            // it is an uncategorized budget
            row.name = 'Uncategorized'
            row.isUncategorized = true
          }
        } else {
          row.name = isMobile ? nameOrCode.code : nameOrCode.name
        }
      })

      // sub-table header
      const header: ItemRow = {
        name: isMobile
          ? lod === 3
            ? formatBudgetName(budget.name)
            : budget.code
          : formatBudgetName(budget.name),

        isMain: true,
        isUncategorized: rows.every((row) => row.isUncategorized),
        codePath: budget.codePath,
        columns: rows
          .reduce((acc, current) => {
            current.columns.forEach((row, index) => {
              if (!acc[index]) {
                acc[index] = { ...EMPTY_METRIC_VALUE }
              }

              acc[index].Actuals += row.Actuals
              acc[index].Budget += row.Budget
              acc[index].PaymentsOnChain += row.PaymentsOnChain
              acc[index].Forecast += row.Forecast
              acc[index].ProtocolNetOutflow += row.ProtocolNetOutflow
            })

            return acc
          }, Array(rows?.[0]?.columns?.length).fill(null))
          .filter((item) => item !== null),
      }
      // Check if only one element is only the header so don't need rows
      if (!(header.name === 'Uncategorized' && isHeaderValuesZero(header))) {
        if (rows.length === 1) {
          table.rows = [header]
        } else {
          // There are its header and rows
          table.rows = [header, ...rows]
        }
      }

      tables.push(table)
    })

    // group the remaining paths that are not in the tables
    const groups = groupBy(
      Object.keys(data)
        // remaining paths that are not in the tables
        .filter((path) => !tables.some((table) => table.rows.some((row) => row.codePath === path))),
      (path) => path.replace(`${codePath}/`, '').split('/')[0],
    )
    // create a sub-table for each group
    Object.keys(groups).forEach((groupKey) => {
      const table = {
        tableName: groupKey,
        rows: [],
      } as TableFinances

      groups[groupKey].forEach((path) => {
        const columns = Object.values(data[path])

        if (selectedGranularity !== 'annual') {
          // annual does not have totals
          const total = columns.reduce(
            (acc, current) => {
              acc.Actuals += current.Actuals
              acc.Budget += current.Budget
              acc.PaymentsOnChain += current.PaymentsOnChain
              acc.Forecast += current.Forecast
              acc.ProtocolNetOutflow += current.ProtocolNetOutflow
              return acc
            },
            { ...EMPTY_METRIC_VALUE },
          )

          columns.push(total)
        }

        table.rows.push({
          name: path,
          codePath: path,
          columns,
        } as ItemRow)
      })

      const header: ItemRow = {
        name: groupKey,
        isMain: true,
        codePath: groupKey,
        columns: table.rows
          .reduce((acc, current) => {
            current.columns.forEach((row, index) => {
              if (!acc[index]) {
                acc[index] = { ...EMPTY_METRIC_VALUE }
              }

              acc[index].Actuals += row.Actuals
              acc[index].Budget += row.Budget
              acc[index].PaymentsOnChain += row.PaymentsOnChain
              acc[index].Forecast += row.Forecast
              acc[index].ProtocolNetOutflow += row.ProtocolNetOutflow
            })

            return acc
          }, Array(table.rows?.[0]?.columns?.length).fill(null))
          .filter((item) => item !== null),
      }
      table.rows.unshift(header)

      tables.push(table)
    })

    // now we create the main table header
    // it is guaranteed below that all the sub-tables have a header
    const subTableHeaders = tables.map((table) => {
      const mainRow = table.rows.find((column) => column.isMain || column.isUncategorized)
      return mainRow ? mainRow.columns : []
    })

    const tableHeader = subTableHeaders.reduce<MetricValues[]>(
      (acc, current) => {
        for (let i = 0; i < acc.length; i++) {
          acc[i].Actuals += current[i]?.Actuals ?? 0
          acc[i].Budget += current[i]?.Budget ?? 0
          acc[i].PaymentsOnChain += current[i]?.PaymentsOnChain ?? 0
          acc[i].Forecast += current[i]?.Forecast ?? 0
          acc[i].ProtocolNetOutflow += current[i]?.ProtocolNetOutflow ?? 0
        }
        return acc
      },
      Array.from({ length: columnsCount }, () => ({ ...EMPTY_METRIC_VALUE })),
    )

    // limit sub-tables up to 13 rows maximum
    tables.forEach((table) => {
      if (table.rows.length > 12) {
        const rows = table.rows.slice(0, 12)
        const others = table.rows.slice(12)
        const othersTotal = others.reduce<ItemRow>(
          (acc, current) => {
            for (let index = 0; index < current.columns.length; index++) {
              Object.keys(acc.columns[0]).forEach((key) => {
                acc.columns[index][key as keyof MetricValues] +=
                  current.columns[index][key as keyof MetricValues]
              })
            }
            return acc
          },
          {
            name: 'Others',
            isSummaryRow: true,
            columns: table.rows[0].columns.map(() => ({
              Actuals: 0,
              Budget: 0,
              Forecast: 0,
              PaymentsOnChain: 0,
              ProtocolNetOutflow: 0,
            })),
          },
        )

        // check if the others total has any non-zero value to hide it if it is all zeros
        const isOthersNonZero = othersTotal.columns.some((column) =>
          activeMetrics.some((metric) => column[metric as keyof MetricValues] !== 0),
        )

        table.rows = [...rows, ...(isOthersNonZero ? [othersTotal] : [])]
      }
    })

    // "hide"/remove the uncategorized table if it is the only one (it will be included just in the header)
    if (tables.length === 1 && tables[0].rows[0]?.isUncategorized) {
      tables = []
    }

    // hide/remove uncategorized sub-tables that where all the values for the selected metrics are zero
    const activeMetricsKeys = activeMetrics.map(
      (metric) =>
        // translate the selected metrics to columns keys
        (metric === 'Net Expenses On-Chain'
          ? 'PaymentsOnChain'
          : metric === 'Net Protocol Outflow'
            ? 'ProtocolNetOutflow'
            : metric) as keyof MetricValues,
    )
    tables = tables.filter((table) => {
      if (table.rows[0]?.isUncategorized) {
        return table.rows[0].columns.some((column) =>
          activeMetricsKeys.some((metric) => column[metric] !== 0),
        )
      } else {
        // it's not uncategorized but may have uncategorized rows
        table.rows = table.rows.filter((row) => {
          if (row.isUncategorized) {
            // uncategorized only
            return row.columns.some((column) =>
              activeMetricsKeys.some((metric) => column[metric] !== 0),
            )
          }
          return true
        })
      }

      return true // it's not uncategorized so should be included
    })

    // sort final tables by the amount of rows
    const sortedTables = tables.sort((a, b) => {
      // uncategorized should be the first
      if (b.rows[0]?.isUncategorized || a.rows[0]?.isUncategorized) return 1

      return b.rows.length - a.rows.length
    })
    return [tableHeader, sortedTables]
  }, [
    activeMetrics,
    allBudgets,
    analytics,
    budgets,
    codePath,
    error,
    isMobile,
    lod,
    selectedGranularity,
  ])

  const isLoading = !analytics && !error && (tableHeader === null || tableBody === null)

  return {
    filters,
    isMobile,
    isLoading,
    activeMetrics,
    selectedGranularity,
    maxAmountOfActiveMetrics,
    tableHeader,
    tableBody,
  }
}

export { useBreakdownTable }
