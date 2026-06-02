import Image from 'next/image'
import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { selectNetworkImages } from '@/modules/shared/lib/network-brand-utils'
import { NetworkImage } from './network-image'

/**
 * Network icon for mobile view
 */
function NetworkIcon({ network }: { network: Network }) {
  const imageSelection = selectNetworkImages(network, 'icon')

  // No images available - show unknown icon
  if (imageSelection.source === 'none') {
    return (
      <Image
        src="/networks/logos/unknown.png"
        alt={network.name ?? ''}
        width={36}
        height={36}
        priority
        fetchPriority="high"
        className="min-w-8 lg:hidden"
      />
    )
  }

  // Use NetworkImage component for all cases
  return (
    <NetworkImage
      lightImage={imageSelection.lightImage}
      darkImage={imageSelection.darkImage}
      alt={network.name ?? ''}
      size={36}
      lightClassName="block min-w-8 lg:hidden dark:hidden"
      darkClassName="hidden min-w-8 lg:hidden dark:block lg:dark:hidden"
      singleClassName="min-w-8 lg:hidden"
      useImgTag={false}
      showName={false}
    />
  )
}

export { NetworkIcon }
