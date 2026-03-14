'use client'

import Link from 'next/link'
import type { AnalyticGranularity, MetricValues, TableFinances } from '@/modules/finances/types'
import { useMediaQuery } from '@/modules/shared/hooks/use-media-query'
import { usLocalizedNumber } from '@/modules/shared/lib/humanization'
import { cn } from '@/modules/shared/lib/utils'
import { getKeyMetric } from '../table-header/cell-semi-annually'
import { defaultOrder, orderMetrics } from '../table-header/header-semi-annually'
import { LinkCell } from './link-cell'
import { RowHeader } from './row-header'
import { TableCell } from './table-cell'
import type { Route } from 'next'

const EMPTY_METRIC_VALUE: MetricValues = {
  Actuals: 0,
  Budget: 0,
  Forecast: 0,
  PaymentsOnChain: 0,
  ProtocolNetOutflow: 0,
}

interface TableBodyProps {
  tableBody: TableFinances[]
  activeMetrics: string[]
  granularity: AnalyticGranularity
}

function TableBody({ tableBody, activeMetrics, granularity }: TableBodyProps) {
  const isMobile = useMediaQuery({ to: 'md' })

  const isAnnual = granularity === 'annual'
  const isSemiAnnual = isMobile && granularity === 'semiAnnual'
  const isQuarterly = !isMobile && granularity === 'quarterly'
  const isMonthly = granularity === 'monthly'

  const iteration = isAnnual ? 1 : isSemiAnnual ? 3 : isQuarterly ? 5 : isMonthly ? 13 : 1

  const orderedMetrics = orderMetrics(defaultOrder, activeMetrics)
  const metricKeys = orderedMetrics.map((m) => getKeyMetric(m))

  return (
    <>
      {tableBody.map((table, tableIndex) => (
        <div key={tableIndex} className="bg-background w-full overflow-hidden rounded-xl shadow-sm">
          <table className="w-full table-fixed border-collapse">
            <tbody
              className={cn(
                '[&_tr:first-of-type]:bg-muted',
                '[&_tr:nth-of-type(odd):not(:first-of-type)]:bg-muted/50',
                '[&_tr:nth-of-type(even):not(:first-of-type)]:bg-background',
                !isAnnual && '[&_tr:nth-of-type(odd):not(:first-of-type)_td:last-of-type]:bg-muted',
                !isAnnual &&
                  '[&_tr:nth-of-type(even):not(:first-of-type)_td:last-of-type]:bg-muted/70',
              )}
            >
              {table.rows.map((row, rowIndex) => {
                // TODO: Replace with dynamic link using network slug from params.
                // Pattern: /network/${slug}/finances/${pathWithoutAtlas}?${searchParams}
                // Preserve year and other query params when building links.
                const href = '/network/sky/finances'

                const isSummaryOrUncategorized =
                  !!row.isSummaryRow || (row.isUncategorized && !row.isMain)

                return (
                  <tr
                    key={rowIndex}
                    className={cn(
                      row.isMain && 'font-medium',
                      '[&_th:first-of-type]:text-left',
                      '[&_td:last-of-type]:border-r-0',
                      row.isMain && '[&_th:first-of-type]:rounded-l-xl',
                      row.isMain && '[&_td:last-of-type]:rounded-r-xl',
                      row.isMain && '[&_td:last-of-type]:font-semibold',
                    )}
                  >
                    <RowHeader
                      granularity={granularity}
                      isHeader={!!row.isMain}
                      isUncategorized={!!row.isUncategorized}
                    >
                      {isSummaryOrUncategorized ? (
                        row.name
                      ) : (
                        <Link
                          href={href as Route}
                          scroll={false}
                          className="text-inherit no-underline"
                        >
                          {row.name}
                        </Link>
                      )}
                    </RowHeader>

                    {isAnnual &&
                      metricKeys.map((metricKey, metricIndex) => {
                        const value =
                          row.columns.length > 0
                            ? row.columns[0][metricKey as keyof MetricValues]
                            : 0
                        return (
                          <td
                            key={metricIndex}
                            className="border-border relative border-r px-2 py-4 text-center text-xs xl:px-5"
                          >
                            <LinkCell href={href} isSummaryRow={isSummaryOrUncategorized}>
                              {usLocalizedNumber(value, 0)}
                            </LinkCell>
                          </td>
                        )
                      })}

                    {isQuarterly &&
                      Array.from({ length: iteration }).map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          metrics={orderedMetrics}
                          value={row.columns[colIndex] ?? EMPTY_METRIC_VALUE}
                          href={href}
                          isSummaryRow={isSummaryOrUncategorized}
                        />
                      ))}

                    {isSemiAnnual &&
                      Array.from({ length: iteration }).map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          metrics={orderedMetrics}
                          value={row.columns[colIndex] ?? EMPTY_METRIC_VALUE}
                          href={href}
                          isSummaryRow={isSummaryOrUncategorized}
                        />
                      ))}

                    {isMonthly &&
                      Array.from({ length: iteration }).map((_, colIndex) => (
                        <TableCell
                          key={colIndex}
                          metrics={orderedMetrics}
                          value={row.columns[colIndex] ?? EMPTY_METRIC_VALUE}
                          href={href}
                          isSummaryRow={isSummaryOrUncategorized}
                        />
                      ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ))}
    </>
  )
}

export { TableBody }
