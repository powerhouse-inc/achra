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
        'text-primary-foreground relative flex w-full flex-col gap-4 overflow-hidden rounded-xl px-6 pt-[22px] pb-[124px] transition-all duration-300 ease-in-out sm:pb-[86px] md:px-6 md:pt-8 md:pb-[23px] lg:px-8 lg:pt-8 lg:pb-[47px] xl:p-8',
        !isExpanded && 'min-h-[154px] !py-7 pl-6 sm:min-h-[86px] lg:pl-8 xl:!py-6',
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
      <span className="z-1 text-2xl leading-[1.2] font-bold xl:text-[32px]">{title}</span>
      <CollapsibleContent
        ref={collapsibleElement}
        className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down z-1 max-w-[524px] overflow-hidden text-sm leading-[22px] md:max-w-[399px] lg:max-w-[647px] xl:max-w-[675px] xl:text-base xl:leading-[1.5]"
      >
        {description}
      </CollapsibleContent>
      {isLoggedIn && (
        <div
          className={cn(
            'absolute right-6 bottom-4 z-1 w-[calc(100%-48px)] max-w-[295px] transition-all duration-300 ease-in-out sm:right-4 sm:w-fit md:right-6 md:bottom-6 lg:right-6 lg:bottom-6',
            !isExpanded && '!right-[unset] !bottom-4 !left-6 sm:!right-15 sm:!left-[unset]',
          )}
        >
          <ConnectLink />
        </div>
      )}
    </Collapsible>
  )
}
