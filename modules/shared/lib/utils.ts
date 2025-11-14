import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { NetworkSlug } from '../types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isNumeric(value: unknown): value is number | bigint {
  if (typeof value === 'number') {
    return Number.isFinite(value)
  }

  return typeof value === 'bigint'
}

export const VALID_NETWORK_SLUGS: readonly NetworkSlug[] = [
  'sky',
  'powerhouse',
  'spark',
  'grove',
  'launch-agent-2',
  'launch-agent-3',
] as const

/**
 * Validates if a string is a valid NetworkSlug
 * @param slug - The slug to validate
 * @returns true if the slug is valid, false otherwise
 */
export function isValidNetworkSlug(slug: string): slug is NetworkSlug {
  return VALID_NETWORK_SLUGS.includes(slug as NetworkSlug)
}
