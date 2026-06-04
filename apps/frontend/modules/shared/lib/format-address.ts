/**
 * Truncates a wallet address for compact display,
 * e.g. `0x1234567890abcdef1234567890abcdef12345678` → `0x1234...5678`.
 */
export function formatAddress(address: string): string {
  if (!address) return ''

  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
