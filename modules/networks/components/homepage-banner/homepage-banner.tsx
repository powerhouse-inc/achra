'use client'

import { Maximize2, Minimize2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@/shared/components/ui/collapsible'
import Image from 'next/image'
import './styles.css'
import { HomepageBannerProps } from './types'
import { ConnectLink } from './components/connect-link'

export function HomepageBanner({
  title,
  description,
  isLoggedIn = false,
  className,
  defaultExpanded = true,
}: HomepageBannerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Collapsible
      defaultOpen={defaultExpanded}
      onOpenChange={setIsExpanded}
      className={cn(
        'relative flex w-full flex-col gap-4 overflow-hidden rounded-xl p-8 transition-all duration-300 ease-in-out text-primary-foreground',
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
      <span className="z-1 text-[32px] leading-[1.2] font-bold">
        {title}
      </span>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down z-1 max-w-[675px] text-base leading-[1.5]">
        {description}
      </CollapsibleContent>
      {isLoggedIn && (
        <div className={cn('lg:absolute lg:bottom-6 lg:right-6 z-1 w-fit transition-all duration-300 ease-in-out', !isExpanded && 'lg:bottom-4 lg:right-15')}>
          <ConnectLink />
        </div>
      )}
    </Collapsible>
  )
}
