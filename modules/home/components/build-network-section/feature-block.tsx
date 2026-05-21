'use client'

import Link from 'next/link'
import { AchraTabIsotype } from '@/modules/home/components/build-network-section/achra-tab-isotype'
import {
  BUILD_NETWORK_V2_BLUE_CTA_CLASS,
  BUILD_NETWORK_V2_PINK_CTA_CLASS,
  BUILD_NETWORK_V2_VIOLET_CTA_CLASS,
} from '@/modules/home/lib/constants'
import type { BuildNetworkFeatureColumn } from '@/modules/home/types'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface FeatureBlockProps {
  feature: BuildNetworkFeatureColumn
}

function FeatureBlock({ feature }: FeatureBlockProps) {
  const showCta = feature.enabled ?? true
  return (
    <div className="grid h-full grid-cols-[auto_1fr] grid-rows-[auto_auto_1fr_auto] gap-x-2.5 gap-y-2.5 p-4 lg:p-5">
      <span className="col-start-1 row-start-1 shrink-0">
        <AchraTabIsotype variant={feature.variant} />
      </span>
      <h3 className="text-foreground col-start-2 row-start-1 min-w-0 pt-0.5 text-lg font-semibold">
        {feature.title}
      </h3>
      <p className="text-muted-foreground col-start-2 col-end-3 row-start-2 min-w-0 text-sm leading-relaxed lg:col-start-1 xl:col-start-2">
        {feature.description}
      </p>
      {showCta && (
        <div className="col-start-2 col-end-3 row-start-4 min-w-0 pt-1 lg:col-start-1 xl:col-start-2">
          <Button
            asChild
            size="lg"
            className={cn(
              'w-44 md:w-full',
              feature.cta.tone === 'blue'
                ? BUILD_NETWORK_V2_BLUE_CTA_CLASS
                : feature.cta.tone === 'violet'
                  ? BUILD_NETWORK_V2_VIOLET_CTA_CLASS
                  : BUILD_NETWORK_V2_PINK_CTA_CLASS,
            )}
          >
            <Link href={feature.cta.href}>{feature.cta.label}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export { FeatureBlock }
