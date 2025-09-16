'use client'

import { ChevronDown, ChevronUp, ExternalLink, Globe } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'

interface HomepageBannerProps {
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
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 to-purple-800 text-white transition-all duration-300 ease-in-out',
        isExpanded ? 'h-auto p-6' : 'h-16 p-4',
        className,
      )}
    >
      {/* Expand/Collapse Button - Always visible */}
      <button
        onClick={toggleExpanded}
        className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
        aria-label={isExpanded ? 'Collapse banner' : 'Expand banner'}
      >
        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Collapsed State - Show only title */}
      {!isExpanded ? (
        <div className="flex items-center pr-12">
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
      ) : (
        /* Expanded State - Show full content */
        <div className="transition-all duration-300 ease-in-out">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h1 className="mb-3 text-3xl leading-tight font-bold">{title}</h1>
              <p className="text-lg leading-relaxed text-white/90">{description}</p>
            </div>

            {/* Edit in Connect Button - Only shown when logged in */}
            {isLoggedIn && (
              <div className="flex flex-col items-end space-y-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm hover:bg-white/20"
                  asChild
                >
                  <a href="#" className="flex items-center gap-1">
                    EDIT IN CONNECT
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-auto border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/20"
                  asChild
                >
                  <a href="#" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    Sky Network Admin
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
