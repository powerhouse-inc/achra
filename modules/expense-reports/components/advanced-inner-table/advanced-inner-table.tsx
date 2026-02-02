import React, { useMemo } from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { DEFAULT_COLUMN_WIDTH, DEFAULT_MIN_WIDTH } from './constants'
import { generateCellKey, renderCell, transformCardItems } from './helpers'
import { TransparencyCard } from './transparency-card/transparency-card'
import type { AdvancedInnerTableProps, Alignment } from './types'

export function AdvancedInnerTable({
  cardsTotalPosition = 'bottom',
  columns,
  items,
  longCode,
  style,
  className,
  tablePlaceholder,
  cardSpacingSize = 'large',
}: AdvancedInnerTableProps) {
  const visibleColumns = useMemo(() => columns.filter((x) => !x.hidden), [columns])

  const cardItems = useMemo(
    () => transformCardItems(items, cardsTotalPosition),
    [items, cardsTotalPosition],
  )

  const cardHeaderColumns = useMemo(
    () => columns.filter((x) => !x.hidden && !x.isCardHeader && !x.isCardFooter),
    [columns],
  )

  const getRenderedCell = (
    column: (typeof columns)[number],
    rowType: (typeof items)[number]['type'],
    value: unknown,
    rowIndex: number,
    columnIndex: number,
  ) => {
    const cellKey = generateCellKey(rowIndex, columnIndex)
    return renderCell(column, rowType, value, cellKey)
  }

  return items.length > 0 ? (
    <>
      <div className="hidden overflow-hidden rounded-xl shadow-xs md:block">
        <div style={style} className={cn('bg-popover scrollbar-thin overflow-x-auto', className)}>
          <table className="w-full flex-1 border-collapse">
            <thead className="text-semibold border-b text-xs/4.5 whitespace-nowrap">
              <tr>
                {visibleColumns.map((column, columnIndex) => (
                  <th
                    // columns order does not change, so we can use index as key
                    // eslint-disable-next-line react/no-array-index-key
                    key={`header-${columnIndex}`}
                    className={cn(
                      'text-foreground/30 overflow-hidden px-2 py-2 text-base/6 font-semibold lg:px-4',
                      {
                        'border-r': column.hasBorderRight,
                      },
                      column.className,
                    )}
                    style={{
                      textAlign: (column.headerAlign ?? column.align ?? 'left') as Alignment,
                      width: column.width ?? DEFAULT_COLUMN_WIDTH,
                      minWidth: column.minWidth ?? DEFAULT_MIN_WIDTH,
                    }}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row, rowIndex) => {
                // Filter row items once per row
                const visibleRowItems = row.items.filter((x) => !x.column.hidden)

                return (
                  <tr
                    // rows order does not change, so we can use index as key
                    // eslint-disable-next-line react/no-array-index-key
                    key={`row-${rowIndex}`}
                    className={cn({
                      'border-t': row.borderTop ?? row.type === 'total',
                      'not-last-of-type:border-b': row.borderBottom,
                    })}
                  >
                    {visibleRowItems.map((item, columnIndex) => (
                      <td
                        // columns order does not change, so we can use row/column indexes as key
                        // eslint-disable-next-line react/no-array-index-key
                        key={`row-${rowIndex}-column-${columnIndex}`}
                        colSpan={
                          row.type === 'groupTitle' || row.type === 'section' ? 3 : undefined
                        }
                        className={cn(
                          {
                            'border-r': item.column.hasBorderRight,
                            'text-left': item.column.align === 'left',
                            'text-center': item.column.align === 'center',
                            'text-right': item.column.align === 'right',
                          },
                          item.column.className,
                        )}
                      >
                        {getRenderedCell(item.column, row.type, item.value, rowIndex, columnIndex)}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={cn(
          'flex flex-col gap-4 md:hidden',
          '[&_.advance-table--transparency\\_item_.advance-table--transparency-card\\_icon\\_hidden]:hidden',
        )}
      >
        {cardItems.map((item, cardIndex) => {
          if (item.type === 'groupTitle') {
            return null
          }

          const cardHeaderItems = item.items.filter(
            (x) => x.column.isCardHeader && x.value && !x.column.hidden,
          )
          const cardBodyItems = item.items.filter(
            (x) => !x.column.hidden && !x.column.isCardFooter && !x.column.isCardHeader,
          )
          const cardFooterItems = item.items.filter((x) => x.column.isCardFooter)
          const separatorItems = item.items.filter(
            (x) => !x.column.hidden && !x.column.isCardHeader && !x.column.isCardFooter,
          )

          return (
            <TransparencyCard
              category={item.category}
              showSubHeader={item.showHeader ?? false}
              itemType={item.type}
              subHeader={item.subHeader ?? ''}
              // cards order does not change, so we can use index as key
              // eslint-disable-next-line react/no-array-index-key
              key={`item-${cardIndex}`}
              cardSpacingSize={cardSpacingSize}
              separators={separatorItems.map((x) => !!x.column.hasBorderBottomOnCard)}
              header={
                <>
                  {cardHeaderItems.map((x, headerIndex) =>
                    getRenderedCell(x.column, item.type, x.value, cardIndex, headerIndex),
                  )}
                </>
              }
              headers={cardHeaderColumns.map((x) => x.header)}
              items={
                cardBodyItems.map((x, bodyIndex) =>
                  getRenderedCell(x.column, item.type, x.value, cardIndex, bodyIndex),
                ) as React.ReactElement[]
              }
              footer={
                cardFooterItems.length > 0 ? (
                  <>
                    {cardFooterItems.map((x, footerIndex) =>
                      getRenderedCell(x.column, 'normal', x.value, cardIndex, footerIndex),
                    )}
                  </>
                ) : undefined
              }
            />
          )
        })}
      </div>
    </>
  ) : (
    // (tablePlaceholder ?? <TransparencyEmptyTable longCode={longCode} shortCode={longCode} />)
    (tablePlaceholder ?? <div>No data - Empty table state here (TBD) - {longCode}</div>)
  )
}
