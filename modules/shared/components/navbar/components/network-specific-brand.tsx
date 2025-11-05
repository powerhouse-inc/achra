'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { use, useMemo } from 'react'
import type { NetworkProfile_NetworkProfileState } from '@/modules/__generated__/graphql/switchboard-generated'
import { fetchNetworkProfile } from '@/modules/networks/lib/fetch-networks'

/**
 * Module-level cache for stable Promise references
 */
const networkCache = new Map<string, Promise<NetworkProfile_NetworkProfileState | undefined>>()

/**
 * Cached network profile fetcher with stable Promise references
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
 * Network logo and icon display
 */
function NetworkSpecificBrand() {
  const slug = useParams().slug?.toString() ?? ''

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
 * Network icon for mobile view
 */
function NetworkIcon({ icon, name }: { icon: string | null | undefined; name: string }) {
  const iconSrc = icon ?? '/networks/logos/unknown.png'

  return (
    <Image
      src={iconSrc}
      alt={name}
      width={36}
      height={36}
      priority
      fetchPriority="high"
      className="min-w-8 lg:hidden"
    />
  )
}

/**
 * Network logo for desktop view
 */
function NetworkLogo({ logo, name }: { logo: string | null | undefined; name: string }) {
  if (logo) {
    return (
      // We need to use img to avoid Image unknown size issues with dynamic logos
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={name}
        width="auto"
        height={32}
        fetchPriority="high"
        className="hidden lg:flex"
      />
    )
  }

  return (
    <div className="hidden items-center justify-center gap-2 lg:flex">
      <Image
        src="/networks/logos/unknown.png"
        alt={name}
        width={32}
        height={32}
        priority
        fetchPriority="high"
      />
      <span className="font-bold">{name}</span>
    </div>
  )
}

export { NetworkSpecificBrand }
