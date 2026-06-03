export function isNumeric(value: unknown): value is number | bigint {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  return typeof value === 'bigint'
}
