'use client'

import { AnimatedSubtitle } from '@/modules/home/components/animated-subtitle'
import { getBuildNetworkSectionV2CellBorderClass } from '@/modules/home/lib/build-network-section-v2-cell-border'
import { BUILD_NETWORK_V2_FEATURES } from '@/modules/home/lib/constants'
import { cn } from '@/shared/lib/utils'
import { AchraOrbitAnimation } from '../achra-orbit-animation'
import { CtaBlock } from './cta-block'
import { FeatureBlock } from './feature-block'

function BuildNetworkSection() {
  return (
    <section
      className="relative z-10 w-full overflow-x-clip pb-16 sm:pb-20 lg:pb-24"
      aria-labelledby="build-network-v2-heading"
    >
      <div className="container">
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <h2
            id="build-network-v2-heading"
            className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Build your Network with Achra
          </h2>
          <AnimatedSubtitle className="text-foreground/80 mt-4 text-lg leading-relaxed text-pretty">
            Powering the next generation of networked organizations.
          </AnimatedSubtitle>
        </header>

        <div className="border-border bg-card overflow-hidden rounded-3xl border shadow-xs">
          <div className="grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-4">
            {BUILD_NETWORK_V2_FEATURES.map((feature, index) => (
              <div
                key={feature.variant}
                className={cn(getBuildNetworkSectionV2CellBorderClass(index), 'h-full')}
              >
                <FeatureBlock feature={feature} />
              </div>
            ))}
            <div className={cn(getBuildNetworkSectionV2CellBorderClass(3), 'h-full')}>
              <CtaBlock />
            </div>
          </div>

          <div className="border-border bg-background/40 border-t">
            <AchraOrbitAnimation />
          </div>
        </div>
      </div>
    </section>
  )
}

export { BuildNetworkSection }
