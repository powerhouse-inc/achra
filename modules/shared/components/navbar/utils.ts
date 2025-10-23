/**
 * Type for defining when a navigation item should be considered active
 * Can be a string pattern or array of string patterns
 * Strings can contain regex patterns (using regex.source for serialization)
 */
export type ActiveWhen = string | string[]

/**
 * Determines if a navigation item should be active based on the current pathname
 * Supports string patterns (path prefix or regex string) and arrays of patterns
 *
 * @param pathname - Current URL pathname
 * @param activeWhen - Pattern(s) to match against pathname
 * @returns true if the item should be active
 *
 * @example
 * ```ts
 * isActive('/network/powerhouse', '/network') // true (startsWith)
 * isActive('/network/powerhouse', /\/network\/\w+/.source) // true (regex string)
 * isActive('/network/powerhouse', ['/network', '/networks']) // true (array)
 * ```
 */
export function isActive(pathname: string, activeWhen: ActiveWhen): boolean {
  // Handle string pattern (startsWith or regex string)
  if (typeof activeWhen === 'string') {
    // Try startsWith first for simple paths
    if (pathname.startsWith(activeWhen)) {
      return true
    }
    // Fallback to regex pattern matching for regex strings
    try {
      return new RegExp(activeWhen).test(pathname)
    } catch {
      // If regex is invalid, return false
      return false
    }
  }

  // Handle array of patterns (recursive)
  if (Array.isArray(activeWhen)) {
    return activeWhen.some((pattern) => isActive(pathname, pattern))
  }

  return false
}
