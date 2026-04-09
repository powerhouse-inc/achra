'use client'

import { useParams } from 'next/navigation'
import { use, useMemo } from 'react'
import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { getNetworkBySlug } from '@/modules/networks/services/networks-service'

/**
 * Module-level cache for stable Promise references
 */
const networkCache = new Map<string, Promise<Network | undefined>>()

/**
 * Cached network profile fetcher with stable Promise references
 */
// we expect this to return a promise, and we need it this way
// eslint-disable-next-line @typescript-eslint/promise-function-async
function getCachedNetworkProfile(slug: string) {
  if (!networkCache.has(slug)) {
    networkCache.set(slug, getNetworkBySlug(slug))
  }
  return networkCache.get(slug)!
}

/**
 * Hook to fetch and cache network profile by slug from URL params
 * @returns The network profile or undefined if not found
 */
function useNetworkProfile(): Network | undefined {
  const slug = useParams().slug?.toString() ?? ''

  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const networkProfilePromise = useMemo(() => getCachedNetworkProfile(slug), [slug])

  return use(networkProfilePromise)
}

export { useNetworkProfile }
