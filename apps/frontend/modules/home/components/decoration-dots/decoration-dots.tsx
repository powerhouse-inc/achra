import { cn } from '@achra/ui/lib/utils'

type FadeDirection =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'radial'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'

interface FadeConfig {
  /**
   * Edge, corner (for diagonals), or center (`radial`) where the gradient
   * starts at `from` opacity and travels toward the opposite side at `to`.
   */
  direction: FadeDirection
  /** Opacity at the starting edge / corner / center. Defaults to 0. */
  from?: number
  /** Opacity at the opposite edge / corner. Defaults to 1. */
  to?: number
}

interface DecorationDotsProps {
  rows: number
  columns: number
  /** Dot diameter in px. */
  dotSize?: number
  /** Distance between dot centers in px. */
  gap?: number
  /** Smooth fade applied to every dot not overridden by `pattern`. */
  fade?: FadeConfig
  /**
   * Per-cell override. `null` hides the dot, a number sets explicit opacity.
   * Cells outside the matrix bounds fall back to `fade` (or full opacity).
   */
  pattern?: ReadonlyArray<ReadonlyArray<number | null>>
  className?: string
}

function clamp01(value: number): number {
  if (value < 0) return 0
  if (value > 1) return 1
  return value
}

function cornerDistance(
  row: number,
  col: number,
  rows: number,
  columns: number,
  anchorRow: 0 | 1,
  anchorCol: 0 | 1,
): number {
  const hasMultipleRows = rows > 1
  const hasMultipleCols = columns > 1
  const nx = hasMultipleCols ? col / (columns - 1) : 0
  const ny = hasMultipleRows ? row / (rows - 1) : 0
  const dx = Math.abs(nx - anchorCol)
  const dy = Math.abs(ny - anchorRow)
  const maxDist = Math.hypot(hasMultipleCols ? 1 : 0, hasMultipleRows ? 1 : 0)
  return maxDist > 0 ? Math.hypot(dx, dy) / maxDist : 0
}

function computeFadeOpacity(
  row: number,
  col: number,
  rows: number,
  columns: number,
  fade: FadeConfig,
): number {
  const from = fade.from ?? 0
  const to = fade.to ?? 1
  let t: number
  switch (fade.direction) {
    case 'top':
      t = rows > 1 ? row / (rows - 1) : 0
      break
    case 'bottom':
      t = rows > 1 ? (rows - 1 - row) / (rows - 1) : 0
      break
    case 'left':
      t = columns > 1 ? col / (columns - 1) : 0
      break
    case 'right':
      t = columns > 1 ? (columns - 1 - col) / (columns - 1) : 0
      break
    case 'radial': {
      const cx = (columns - 1) / 2
      const cy = (rows - 1) / 2
      const maxDist = Math.hypot(cx, cy)
      t = maxDist > 0 ? Math.hypot(col - cx, row - cy) / maxDist : 0
      break
    }
    case 'top-left':
      t = cornerDistance(row, col, rows, columns, 0, 0)
      break
    case 'top-right':
      t = cornerDistance(row, col, rows, columns, 0, 1)
      break
    case 'bottom-left':
      t = cornerDistance(row, col, rows, columns, 1, 0)
      break
    case 'bottom-right':
      t = cornerDistance(row, col, rows, columns, 1, 1)
      break
  }
  return clamp01(from + (to - from) * t)
}

/**
 * Decorative grid of dots. Inherits its color from `currentColor` — set it
 * with semantic Tailwind utilities on `className` (e.g. `text-primary/40`).
 *
 * @example
 * <DecorationDots
 *   rows={5}
 *   columns={8}
 *   fade={{ direction: 'top', from: 0.2, to: 1 }}
 *   className="text-primary/40"
 * />
 */
function DecorationDots({
  rows,
  columns,
  dotSize = 3,
  gap = 16,
  fade,
  pattern,
  className,
}: DecorationDotsProps) {
  const safeRows = Math.max(0, Math.floor(rows))
  const safeColumns = Math.max(0, Math.floor(columns))
  const radius = dotSize / 2
  const width = safeColumns > 0 ? (safeColumns - 1) * gap + dotSize : 0
  const height = safeRows > 0 ? (safeRows - 1) * gap + dotSize : 0

  const circles = [] as Array<{ key: string; cx: number; cy: number; r: number; opacity: number }>

  for (let row = 0; row < safeRows; row++) {
    const patternRow = pattern?.[row]
    for (let col = 0; col < safeColumns; col++) {
      const hasPatternEntry = patternRow !== undefined && col < patternRow.length
      const patternValue = hasPatternEntry ? patternRow[col] : undefined

      if (hasPatternEntry && patternValue === null) continue

      let opacity: number
      if (typeof patternValue === 'number') {
        opacity = clamp01(patternValue)
      } else if (fade) {
        opacity = computeFadeOpacity(row, col, safeRows, safeColumns, fade)
      } else {
        opacity = 1
      }

      if (opacity <= 0) continue

      circles.push({
        key: `${row}-${col}`,
        cx: col * gap + radius,
        cy: row * gap + radius,
        r: radius,
        opacity,
      })
    }
  }

  if (width === 0 || height === 0 || circles.length === 0) return null

  return (
    <svg
      className={cn('block shrink-0', className)}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden
    >
      {circles.map((dot) => (
        <circle
          key={dot.key}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          opacity={dot.opacity === 1 ? undefined : dot.opacity}
        />
      ))}
    </svg>
  )
}

export { DecorationDots }
export type { DecorationDotsProps, FadeConfig, FadeDirection }
