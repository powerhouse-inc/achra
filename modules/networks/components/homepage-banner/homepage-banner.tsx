'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import Image from 'next/image'
import { ConnectLink } from '@/modules/shared/components/connect-link'
import { Button } from '@/shared/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import { cn } from '@/shared/lib/utils'
import { useHomepageBanner } from './use-homepage-banner'

interface HomepageBannerProps {
  backgroundImage: string
  title: string
  description: string
  isLoggedIn?: boolean
  className?: string
}

function HomepageBanner({
  backgroundImage,
  title,
  description,
  isLoggedIn = true,
  className,
}: HomepageBannerProps) {
  const { isExpanded, collapsibleElement, handleIsExpanded, showWhitelistOverlay } =
    useHomepageBanner()

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={handleIsExpanded}
      className={cn(
        'text-primary-foreground relative flex w-full flex-col overflow-hidden rounded-xl px-6 pt-8 pb-31 transition-all duration-300 ease-out sm:pt-5.5 sm:pb-21.5 md:px-6 md:pt-8 md:pb-5.75 lg:px-8 lg:pt-8 lg:pb-11.75 xl:p-8',
        !isExpanded && 'min-h-21.5! py-7! pl-6 lg:pl-8 xl:py-6!',
        className,
      )}
    >
      <Image
        src={backgroundImage}
        alt="Banner background"
        fill
        priority
        fetchPriority="high"
        quality={75}
        sizes="100vw"
        style={{ objectFit: 'cover' }}
        className="absolute z-0"
      />
      {!showWhitelistOverlay && (
        <CollapsibleTrigger asChild className="absolute top-3 right-3 z-1">
          <Button
            className="hover:bg-secondary-foreground/30 h-6 w-6 bg-transparent shadow-none [&:has(>svg)]:p-1"
            aria-label="Toggle homepage banner"
          >
            {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </Button>
        </CollapsibleTrigger>
      )}
      <span
        className={cn(
          'z-1 pb-4 text-xl leading-[120%] font-bold transition-all duration-300 ease-out sm:text-2xl xl:text-3xl',
          !isExpanded && 'hidden sm:block sm:pb-0',
        )}
      >
        {title}
      </span>
      <CollapsibleContent
        ref={collapsibleElement}
        className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down z-1 max-w-131 overflow-hidden text-sm leading-5.5 md:max-w-99.75 lg:max-w-161.75 xl:max-w-168.75 xl:text-base xl:leading-normal"
      >
        {description}
      </CollapsibleContent>
      {isLoggedIn && (
        <div
          className={cn(
            'absolute right-6 bottom-4 z-1 w-[calc(100%-48px)] max-w-64 transition-all duration-300 ease-out sm:right-4 sm:w-fit sm:max-w-73.75 md:right-6 md:bottom-6 lg:right-6 lg:bottom-6',
            !isExpanded && 'right-11 bottom-4! sm:right-15!',
          )}
        >
          <ConnectLink
            disabled={true}
            href="https://connect.achra.network"
            action="edit"
            driveName="Sky Network Admin"
          />
        </div>
      )}
    </Collapsible>
  )
}

export { HomepageBanner }
