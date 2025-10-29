'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { use, useMemo } from 'react'
import type { NetworkProfile_NetworkProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { fetchNetworkProfile } from '@/modules/networks/lib/fetch-networks'

/**
 * Module-level cache ensures Promise stability across renders
 * Required for proper functionality with React's use() hook
 */
const networkCache = new Map<string, Promise<NetworkProfile_NetworkProfileState | undefined>>()

/**
 * Cached network profile fetcher with stable Promise references
 * The use() hook requires the same Promise instance across renders
 *
 * @param slug - Network slug to fetch profile for
 * @returns Promise that resolves to network profile or undefined
 */
// we expect this to return a promise, and we need it this way
// eslint-disable-next-line @typescript-eslint/promise-function-async
function getCachedNetworkProfile(slug: string) {
  if (!networkCache.has(slug)) {
    networkCache.set(slug, fetchNetworkProfile(slug))
  }
  return networkCache.get(slug)!
}

/**
 * Network-specific brand component that displays network logo and icon
 */
function NetworkSpecificBrand() {
  const slug = useParams().slug?.toString() ?? ''

  // Memoize the promise to ensure stability across renders (we expect this to return a promise)
  // eslint-disable-next-line @typescript-eslint/promise-function-async
  const networkProfilePromise = useMemo(() => getCachedNetworkProfile(slug), [slug])

  const networkProfile = use(networkProfilePromise)

  if (!networkProfile) {
    return null
  }

  return (
    <Link href={`/network/${slug}`} className="cursor-pointer hover:opacity-80">
      <div className="flex items-center gap-2">
        <NetworkIcon icon={networkProfile.icon} name={networkProfile.name} />
        <NetworkLogo logo={networkProfile.logo} name={networkProfile.name} />
      </div>
    </Link>
  )
}
NetworkSpecificBrand.displayName = 'NetworkSpecificBrand'

/**
 * Renders network icon with fallback for mobile view
 */
function NetworkIcon({ icon, name }: { icon: string | null | undefined; name: string }) {
  const iconSrc = icon ?? '/networks/logos/unknown.png'

  return <Image src={iconSrc} alt={name} width={36} height={36} className="min-w-8 lg:hidden" />
}

/**
 * Renders network logo with fallback for desktop view
 */
function NetworkLogo({ logo, name }: { logo: string | null | undefined; name: string }) {
  if (logo) {
    return (
      // We need to use img to avoid Image unknown size issues with dynamic logos
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo} alt={name} width="auto" height={32} className="hidden lg:flex" />
    )
  }

  return (
    <div className="hidden items-center justify-center gap-2 lg:flex">
      <Image src="/networks/logos/unknown.png" alt={name} width={32} height={32} />
      <span className="font-bold">{name}</span>
    </div>
  )
}

export { NetworkSpecificBrand }
