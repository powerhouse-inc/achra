'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/shared/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import { cn } from '@/shared/lib/utils'
import { ConnectLink } from './components/connect-link'
import { useHomepageBanner } from './use-homepage-banner'

export interface HomepageBannerProps {
  title: string
  description: string
  isLoggedIn?: boolean
  className?: string
  defaultExpanded?: boolean
}

export function HomepageBanner({
  title,
  description,
  isLoggedIn = false,
  className,
  defaultExpanded = true,
}: HomepageBannerProps) {
  const { isExpanded, collapsibleElement, handleIsExpanded } = useHomepageBanner({
    defaultExpanded,
  })

  return (
    <Collapsible
      open={isExpanded}
      onOpenChange={handleIsExpanded}
      className={cn(
        'text-primary-foreground relative flex w-full flex-col gap-4 overflow-hidden rounded-xl px-6 pt-8 pb-31 transition-all duration-300 ease-in-out sm:pt-5.5 sm:pb-21.5 md:px-6 md:pt-8 md:pb-5.75 lg:px-8 lg:pt-8 lg:pb-11.75 xl:p-8',
        !isExpanded && 'min-h-38.5 !py-7 pl-6 sm:min-h-21.5 lg:pl-8 xl:!py-6',
        className,
      )}
    >
      <Image
        src="/networks/backgrounds/sky.png"
        alt="Header card background"
        fill
        priority
        quality={100}
        objectFit="cover"
        className="absolute z-0"
      />
      <CollapsibleTrigger asChild className="absolute top-3 right-3 z-1">
        <Button className="hover:bg-secondary-foreground/30 h-6 w-6 bg-transparent shadow-none [&:has(>svg)]:p-1">
          {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
        </Button>
      </CollapsibleTrigger>
      <span className="z-1 text-xl leading-[1.2] font-bold sm:text-2xl xl:text-[32px]">
        {title}
      </span>
      <CollapsibleContent
        ref={collapsibleElement}
        className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down z-1 max-w-131 overflow-hidden text-sm leading-5.5 md:max-w-99.75 lg:max-w-161.75 xl:max-w-168.75 xl:text-base xl:leading-[1.5]"
      >
        {description}
      </CollapsibleContent>
      {isLoggedIn && (
        <div
          className={cn(
            'absolute right-6 bottom-4 z-1 w-[calc(100%-48px)] max-w-73.75 transition-all duration-300 ease-in-out sm:right-4 sm:w-fit md:right-6 md:bottom-6 lg:right-6 lg:bottom-6',
            !isExpanded && '!right-[unset] !bottom-4 !left-6 sm:!right-15 sm:!left-[unset]',
          )}
        >
          <ConnectLink />
        </div>
      )}
    </Collapsible>
  )
}
