/**
 * Extracts a human-readable domain from a URL, dropping the protocol and a
 * leading `www.` (e.g. "https://www.github.com/foo" -> "github.com").
 *
 * URLs without a protocol are still parsed, and the trimmed input is returned
 * as a fallback when the value can't be parsed as a URL.
 */
export function getDomain(url: string): string {
  const trimmed = url.trim()
  if (!trimmed) return ''

  try {
    const withProtocol = /^[a-z][\w+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
    const { hostname } = new URL(withProtocol)
    return hostname.replace(/^www\./i, '')
  } catch {
    return trimmed
  }
}
