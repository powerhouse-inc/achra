import Link from 'next/link'
import { Suspense } from 'react'
import AchraLogo from '@/modules/shared/components/svgs/achra-logo.svg'
import { NetworkSpecificBrand } from './network-specific-brand'
import { NetworkSpecificBrandSkeleton } from './network-specific-brand-skeleton'

/**
 * Network brand area that displays Achra logo and network-specific branding
 */
function NetworkBrand() {
  return (
    <div className="flex items-center gap-4 md:gap-6" data-brand="network">
      <div className="text-border bg-primary/5 border-border flex items-center justify-center overflow-hidden border-r px-4 py-4.5 md:rounded-l-2xl md:px-6">
        <Link href="/" target="_self" className="cursor-pointer" aria-label="Achra homepage">
          <AchraLogo className="hover:text-primary/50 h-9 w-9 sm:flex" />
        </Link>
      </div>
      <Suspense fallback={<NetworkSpecificBrandSkeleton />}>
        <NetworkSpecificBrand />
      </Suspense>
    </div>
  )
}
NetworkBrand.displayName = 'NetworkBrand'

export { NetworkBrand }
