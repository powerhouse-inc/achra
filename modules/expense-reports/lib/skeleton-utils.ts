/**
 * Deterministic hash function that generates a pseudo-random but predictable index
 * based on row and column indices.
 */
export function getSkeletonWidth<T extends string>(
  rowIndex: number,
  columnIndex: number,
  widths: T[],
): T {
  // Use prime numbers to create a more sparse and varied distribution
  const hash = (rowIndex * 31 + columnIndex * 17) % widths.length
  return widths[hash]
}
