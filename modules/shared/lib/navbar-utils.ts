import type { Maybe } from '@/modules/__generated__/graphql/switchboard-generated'

/**
 * Pattern(s) to match against pathname (string, regex string, or array)
 */
export type ActiveWhen = string | string[]

/**
 * Checks if a navigation item should be active based on current pathname
 * @param pathname - Current URL pathname
 * @param activeWhen - Pattern(s) to match (prefix, regex string, or array)
 * @example isActive('/network/powerhouse', '/network') // true
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

/**
 * Checks if an image field is empty
 * @param image - The image field to check
 */
export function isImageFieldEmpty(image: Maybe<string> | undefined): boolean {
  return typeof image !== 'string' || image.trim().length === 0
}
