'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/shared/components/ui/collapsible'
import Image from 'next/image'
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
        'text-primary-foreground relative flex w-full flex-col gap-4 overflow-hidden rounded-xl p-8 transition-all duration-300 ease-in-out',
        !isExpanded && 'py-6',
        className,
      )}
    >
      <Image
        src={'/networks/backgrounds/sky.png'}
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
      <span className="z-1 text-[32px] leading-[1.2] font-bold">{title}</span>
      <CollapsibleContent
        ref={collapsibleElement}
        className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down z-1 max-w-[675px] overflow-hidden text-base leading-[1.5]"
      >
        {description}
      </CollapsibleContent>
      {isLoggedIn && (
        <div
          className={cn(
            'z-1 w-fit transition-all duration-300 ease-in-out lg:absolute lg:right-6 lg:bottom-6',
            !isExpanded && 'lg:right-15 lg:bottom-4',
          )}
        >
          <ConnectLink />
        </div>
      )}
    </Collapsible>
  )
}
