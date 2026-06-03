import Image from 'next/image'
import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { selectNetworkImages } from '@/modules/shared/lib/network-brand-utils'
import { NetworkImage } from './network-image'

/**
 * Network logo for desktop view
 */
function NetworkLogo({ network }: { network: Network }) {
  const imageSelection = selectNetworkImages(network, 'logo')

  // No images available - show unknown icon with name
  if (imageSelection.source === 'none') {
    return (
      <div className="hidden items-center justify-center gap-2 lg:flex">
        <Image
          src="/networks/logos/unknown.png"
          alt={network.name ?? ''}
          width={32}
          height={32}
          priority
          fetchPriority="high"
        />
        <span className="font-bold">{network.name ?? ''}</span>
      </div>
    )
  }

  // Using icon - show icon with name using Image component
  if (imageSelection.source === 'icon') {
    return (
      <NetworkImage
        lightImage={imageSelection.lightImage}
        darkImage={imageSelection.darkImage}
        alt={network.name ?? ''}
        size={32}
        lightClassName="block dark:hidden"
        darkClassName="hidden dark:block"
        singleClassName=""
        useImgTag={false}
        showName={true}
        networkName={network.name ?? ''}
        containerClassName="hidden items-center justify-center gap-2 lg:flex"
      />
    )
  }

  // Using logo - use img tag to avoid Next.js Image unknown size issues
  return (
    <NetworkImage
      lightImage={imageSelection.lightImage}
      darkImage={imageSelection.darkImage}
      alt={network.name ?? ''}
      size={32}
      lightClassName="hidden h-8 w-auto lg:block dark:lg:hidden"
      darkClassName="hidden h-8 w-auto lg:hidden dark:lg:block"
      singleClassName="hidden h-8 w-auto lg:flex"
      useImgTag={true}
      showName={false}
    />
  )
}

export { NetworkLogo }
