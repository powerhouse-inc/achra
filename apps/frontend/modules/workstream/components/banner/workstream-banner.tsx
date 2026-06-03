'use client'

import { Button } from '@achra/ui/button'
import { cn } from '@achra/ui/lib/utils'
import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { useWorkstreamBanner } from './use-workstream-banner'
import { WorkstreamBannerBackground } from './workstream-banner-background'
import { WorkstreamBannerContent } from './workstream-banner-content'
import { WorkstreamBannerOverlay } from './workstream-banner-overlay'

interface WorkstreamBannerProps {
  backgroundImage?: string
}

function WorkstreamBanner({ backgroundImage }: WorkstreamBannerProps) {
  const { isNetworkBanner, handleHide, animationProps } = useWorkstreamBanner()

  return (
    <motion.div className="shadow-primary relative overflow-hidden rounded-xl" {...animationProps}>
      <WorkstreamBannerBackground
        isNetworkBanner={isNetworkBanner}
        backgroundImage={backgroundImage}
      />

      <WorkstreamBannerContent isNetworkBanner={isNetworkBanner} />

      <WorkstreamBannerOverlay isNetworkBanner={isNetworkBanner} />

      <Button
        variant="ghost"
        className={cn('absolute top-3 right-3 z-20 h-6 w-6', {
          'hover:bg-primary': isNetworkBanner,
        })}
        onClick={handleHide}
        aria-label="Close banner"
      >
        <X
          className={cn(isNetworkBanner ? 'text-primary-foreground' : 'text-primary')}
          aria-hidden="true"
          focusable="false"
        />
      </Button>
    </motion.div>
  )
}

export { WorkstreamBanner }
