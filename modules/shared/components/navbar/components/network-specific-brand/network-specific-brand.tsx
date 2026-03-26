'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { NetworkLogo } from './network-logo'
import { useNetworkProfile } from './use-network-profile'

/**
 * Network logo display
 */
function NetworkSpecificBrand() {
  const slug = useParams().slug?.toString() ?? ''
  const networkProfile = useNetworkProfile()

  if (!networkProfile) {
    return null
  }

  return (
    <Link href={`/network/${slug}`} className="cursor-pointer hover:opacity-80">
      <NetworkLogo network={networkProfile} />
    </Link>
  )
}
NetworkSpecificBrand.displayName = 'NetworkSpecificBrand'

export { NetworkSpecificBrand }
