import React from 'react'
import { cn } from '@/modules/shared/lib/utils'
import { OpenModalTransparency } from '../open-modal-transparency'
import { CELL_VALUES, COLUMN_HEADERS } from './constants'
import { NumberCell } from './number-cell'
import { TextCell } from './text-cell'
import type { InnerTableColumn, RowType } from './types'

/**
 * Checks if a value should be considered empty (excluding 0)
 */
export function isValueEmpty(value: unknown): boolean {
  return value !== 0 && !value
}

/**
 * Determines the effective column type based on row type and column type
 */
export function getColumnType(
  rowType: RowType,
  columnType: InnerTableColumn['type'],
): InnerTableColumn['type'] {
  if (rowType === 'total' && columnType === 'custom') {
    return 'text'
  }
  return columnType
}

/**
 * Determines the TextCell variant based on rowType, value, and column
 */
export function getTextCellVariant(
  rowType: RowType,
  value: unknown,
  column: InnerTableColumn,
): 'text' | 'comment' | 'header' | 'sectionHeader' {
  if (rowType === 'groupTitle') {
    return 'header'
  }

  if (rowType === 'category') {
    const stringValue = String(value)
    if (stringValue === CELL_VALUES.TOTAL || stringValue === CELL_VALUES.SUBTOTAL) {
      return 'header'
    }
    const headerString = typeof column.header === 'string' ? column.header : ''
    if (headerString === COLUMN_HEADERS.COMMENTS || headerString === COLUMN_HEADERS.REASONS) {
      return 'comment'
    }
    return 'text'
  }

  if (rowType === 'section') {
    return 'sectionHeader'
  }

  if (rowType === 'subTotal' || rowType === 'total') {
    return 'header'
  }

  return 'text'
}

/**
 * Transforms card items based on cardsTotalPosition and filters out hidden items
 */
export function transformCardItems<T extends { hideMobile?: boolean }>(
  items: T[],
  cardsTotalPosition: 'top' | 'bottom',
): T[] {
  const transformedItems =
    cardsTotalPosition === 'top' && items.length > 0
      ? [items[items.length - 1], ...items.slice(0, items.length - 1)]
      : items

  return transformedItems.filter((x) => !x.hideMobile)
}

/**
 * Generates a unique key for a cell based on row and column indices
 */
export function generateCellKey(rowIndex: number, columnIndex: number): string {
  return `cell-${rowIndex}-${columnIndex}`
}

/**
 * Renders a cell based on column type, row type, and value
 */
export function renderCell(
  column: InnerTableColumn,
  rowType: RowType,
  value: unknown,
  cellKey: string,
): React.ReactElement | null {
  if (isValueEmpty(value)) {
    return null
  }

  const columnType = getColumnType(rowType, column.type)

  switch (columnType) {
    case 'number':
      return <NumberCell key={cellKey} value={Number(value)} rowType={rowType} />
    case 'incomeNumber':
      return <NumberCell key={cellKey} value={Number(value)} isIncome={true} rowType={rowType} />
    case 'text':
      return renderTextCell(column, rowType, value, cellKey)
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

  // Fallback to TextCell
  return <TextCell key={cellKey}>{String(value)}</TextCell>
}

/**
 * Renders a TextCell with appropriate variant
 */
function renderTextCell(
  column: InnerTableColumn,
  rowType: RowType,
  value: unknown,
  cellKey: string,
): React.ReactElement {
  const variant = getTextCellVariant(rowType, value, column)
  const stringValue = String(value)

  if (rowType === 'groupTitle') {
    return (
      <TextCell data-type="text-groupTitle" key={cellKey} variant="header">
        <div className={cn('table-groupTitle')}>{stringValue}</div>
      </TextCell>
    )
  }

  if (column.header === COLUMN_HEADERS.COMMENTS) {
    return (
      <TextCell data-type="text-category" key={cellKey} variant="comment">
        {stringValue}
      </TextCell>
    )
  }

  if (variant === 'header') {
    return (
      <TextCell data-type="text-header" key={cellKey} variant="header">
        {stringValue}
      </TextCell>
    )
  }

  if (rowType === 'category') {
    return (
      <div key={cellKey}>
        <div className="block px-6 pt-2 pb-4 md:hidden">
          <OpenModalTransparency
            name={stringValue}
            className="font-base/6 w-full justify-between font-semibold"
          />
        </div>
        <TextCell data-type="text-cell" variant={variant} className="hidden md:block">
          {stringValue}
        </TextCell>
      </div>
    )
  }

  return (
    <TextCell data-type="text-cell" key={cellKey} variant={variant}>
      {stringValue}
    </TextCell>
  )
}
