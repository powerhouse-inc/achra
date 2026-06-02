// indexes should not change, so we can use index as key
/* eslint-disable react/no-array-index-key */
import type { ReactNode } from 'react'

interface AdvancedInnerTableSkeletonProps {
  columnCount: number
  rowCount: number
  renderHeaderCell: (columnIndex: number) => ReactNode
  renderCell: (rowIndex: number, columnIndex: number) => ReactNode

  cardCountInMobile: number
  renderMobileCard: (cardIndex: number) => ReactNode
}

function AdvancedInnerTableSkeleton({
  columnCount,
  rowCount,
  renderHeaderCell,
  renderCell,
  cardCountInMobile,
  renderMobileCard,
}: AdvancedInnerTableSkeletonProps) {
  return (
    <>
      <div className="hidden overflow-hidden rounded-xl shadow-xs md:block">
        <div className="bg-popover max-w-full">
          <table className="w-full max-w-full flex-1 border-collapse">
            <thead className="border-b">
              <tr>
                {Array.from({ length: columnCount }).map((_, columnIndex) => (
                  <th key={columnIndex}>{renderHeaderCell(columnIndex)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {Array.from({ length: columnCount }).map((_, columnIndex) => (
                    <td key={columnIndex}>{renderCell(rowIndex, columnIndex)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {Array.from({ length: cardCountInMobile }).map((_, cardIndex) => (
          <div key={cardIndex}>{renderMobileCard(cardIndex)}</div>
        ))}
      </div>
    </>
  )
}

export { AdvancedInnerTableSkeleton }
