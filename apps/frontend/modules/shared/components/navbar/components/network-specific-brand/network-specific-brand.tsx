'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { NetworkIcon } from './network-icon'
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
      <div className="flex items-center gap-2">
        <NetworkIcon network={networkProfile} />
        <NetworkLogo network={networkProfile} />
      </div>
    </Link>
  )
}
NetworkSpecificBrand.displayName = 'NetworkSpecificBrand'

export { NetworkSpecificBrand }
