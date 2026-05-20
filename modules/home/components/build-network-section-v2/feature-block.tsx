'use client'

import Link from 'next/link'
import { AchraTabIsotype } from '@/modules/home/components/build-network-section/achra-tab-isotype'
import {
  BUILD_NETWORK_V2_BLUE_CTA_CLASS,
  BUILD_NETWORK_V2_PINK_CTA_CLASS,
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
    <div className="flex h-full gap-2.5 p-4 lg:p-5">
      <span className="shrink-0">
        <AchraTabIsotype variant={feature.variant} />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <h3 className="text-foreground pt-0.5 text-lg font-semibold">{feature.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
        {showCta && (
          <div className="mt-auto pt-1">
            <Button
              asChild
              size="lg"
              className={cn(
                feature.cta.tone === 'blue'
                  ? BUILD_NETWORK_V2_BLUE_CTA_CLASS
                  : BUILD_NETWORK_V2_PINK_CTA_CLASS,
              )}
            >
              <Link href={feature.cta.href}>{feature.cta.label}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export { FeatureBlock }
