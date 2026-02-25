/**
 * Simple djb2 hash for sync checksum computation.
 * Used to detect when data has changed (e.g. API payloads for cache invalidation).
 *
 * Reference: https://www.cse.yorku.ca/~oz/hash.html
 */
export function djb2Hash(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i)
  }
  return (hash >>> 0).toString(36)
}
