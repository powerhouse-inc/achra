import React, { useId } from 'react'
// import { OpenModalTransparency } from '@/views/CoreUnitBudgetStatement/BudgetStatementtUtils'
// import { TransparencyEmptyTable } from '@/views/CoreUnitBudgetStatement/components/Placeholders/TransparencyEmptyTable'
import { cn } from '@/modules/shared/lib/utils'
import { OpenModalTransparency } from '../open-modal-transparency'
import { NumberCell } from './number-cell'
import { TextCell } from './text-cell'
import { TransparencyCard } from './transparency-card/transparency-card'
import type { AdvancedInnerTableProps, Alignment, InnerTableColumn, RowType } from './types'

export function AdvancedInnerTable({
  cardsTotalPosition = 'bottom',
  columns,
  items,
  longCode,
  style,
  className,
  tablePlaceholder,
  cardSpacingSize = 'large',
  spaceEachCards,
}: AdvancedInnerTableProps) {
  const id = useId()

  const getCell = (column: InnerTableColumn, rowType: RowType, value: unknown) => {
    if (value !== 0 && !value) {
      return null
    }
    const isBold = rowType === 'total' || rowType === 'section' || rowType === 'groupTitle'
    const isSection = rowType === 'section'
    const columnType = rowType === 'total' && column.type === 'custom' ? 'text' : column.type
    switch (columnType) {
      case 'number':
        return <NumberCell key={id} value={Number(value)} bold={isBold} rowType={rowType} />
      case 'incomeNumber':
        return (
          <NumberCell
            key={id}
            value={Number(value)}
            bold={isBold}
            isIncome={true}
            rowType={rowType}
          />
        )
      case 'text':
        return rowType === 'groupTitle' ? (
          <TextCell key={id} isHeader={true}>
            {/* Group title cell */}
            <div className={cn('table-groupTitle', 'text-base/6 font-semibold')}>
              {value as string}
            </div>
          </TextCell>
        ) : rowType === 'category' ? (
          <OpenModalTransparency
            handleOpenModal={column.handleOpenModal}
            name={value as string}
            className={cn(
              'justify-between gap-0 px-6 py-2 text-base/6 font-semibold',
              'md:py-0 md:pr-0 md:pl-4 md:text-xs/4.5 md:font-normal [&_svg]:hidden',
              'lg:text-base/6',
              value === 'Total' || value === 'Subtotal'
                ? ['advanced-table__cell-row--category', '[&_svg]:hidden']
                : column.header === 'Comments' || column.header === 'Reason(s)'
                  ? [
                      'advanced-table__cell-row--category--comments',
                      'py-0 text-xs/4.5 font-normal md:pl-4 md:text-base/6 md:font-semibold [&_svg]:hidden',
                    ]
                  : '',
            )}
          />
        ) : (
          <TextCell
            key={id}
            bold={isBold || rowType === 'subTotal'}
            isHeader={column.isCardHeader}
            isSection={isSection}
          >
            {value as string}
          </TextCell>
        )
      case 'custom':
        if (column.cellRender) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return column.cellRender(value as any)
        }
        break
      case undefined: {
        throw new Error('Not implemented yet: undefined case')
      }
    }

    return (
      <TextCell key={id} bold={isBold} isHeader={column.isCardHeader} isSection={isSection}>
        {value as string}
      </TextCell>
    )
  }

  let cardItems =
    cardsTotalPosition === 'top' && items.length > 0
      ? [items[items.length - 1], ...items.slice(0, items.length - 1)]
      : items

  cardItems = cardItems.filter((x) => !x.hideMobile)

  return items.length > 0 ? (
    <>
      <div className="hidden md:block">
        <div
          style={style}
          className={cn(
            'bg-card scrollbar-thin overflow-x-auto rounded-xl border shadow-sm',
            className,
          )}
        >
          <table className="w-full flex-1 border-collapse">
            <thead className="text-semibold border-b text-xs/4.5 whitespace-nowrap">
              <tr>
                {columns
                  .filter((x) => !x.hidden)
                  .map((column, i) => (
                    <th
                      key={`header-${i}`}
                      className={cn('px-4 py-2 text-base/6 font-semibold', {
                        'border-r': column.hasBorderRight,
                      })}
                      style={{
                        textAlign: (column.headerAlign ?? column.align ?? 'left') as Alignment,
                        width: column.width ?? '120px',
                        minWidth: column.minWidth ?? 'unset',
                        overflow: 'hidden',
                      }}
                    >
                      {column.header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {items.map((row, i) => (
                <tr
                  key={i}
                  className={cn('border-t border-b', {
                    'border-t': row.borderTop ?? row.type === 'total',
                    'border-b': row.borderBottom,
                  })}
                >
                  {row.items
                    .filter((x) => !x.column.hidden)
                    .map((item, j) => (
                      <td
                        key={`${i}-${j}`}
                        className={cn({
                          'border-r': item.column.hasBorderRight,
                          'text-left': item.column.align === 'left',
                          'text-center': item.column.align === 'center',
                          'text-right': item.column.align === 'right',
                        })}
                      >
                        {getCell(item.column, row.type, item.value)}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div
        className={cn(
          'block md:hidden',
          '[&_.advance-table--transparency\\_item_.advance-table--transparency-card\\_icon\\_hidden]:hidden',
        )}
      >
        {cardItems.map((item, i) => {
          if (item.type === 'groupTitle') {
            return null
          }

          return (
            <TransparencyCard
              spaceEachCards={spaceEachCards}
              category={item.category}
              showSubHeader={cardItems[i].showHeader ?? false}
              itemType={item.type}
              subHeader={item.subHeader ?? ''}
              key={`item-${i}`}
              cardSpacingSize={cardSpacingSize}
              separators={item.items
                .filter((x) => !x.column.hidden && !x.column.isCardHeader && !x.column.isCardFooter)
                .map((x) => !!x.column.hasBorderBottomOnCard)}
              header={
                <>
                  {item.items
                    .filter((x) => x.column.isCardHeader && x.value && !x.column.hidden)
                    .map((x) => getCell(x.column, item.type, x.value))}
                </>
              }
              headers={columns
                .filter((x) => !x.hidden && !x.isCardHeader && !x.isCardFooter)
                .map((x) => x.header)}
              items={
                item.items
                  .filter(
                    (x) => !x.column.hidden && !x.column.isCardFooter && !x.column.isCardHeader,
                  )
                  .map((x) => getCell(x.column, item.type, x.value)) as React.ReactElement[]
              }
              footer={
                item.items.filter((x) => x.column.isCardFooter).length ? (
                  <>
                    {item.items
                      .filter((x) => x.column.isCardFooter)
                      .map((x) => getCell(x.column, 'normal', x.value))}
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
