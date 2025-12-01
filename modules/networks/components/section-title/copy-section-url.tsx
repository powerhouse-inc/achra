'use client'

import { LinkIcon } from 'lucide-react'
import React from 'react'
import { CopyButton, CopyTooltip, CopyTrigger } from '@/modules/shared/components/copy-butoon'
import { cn } from '@/modules/shared/lib/utils'
interface CopySectionUrlProps extends React.ComponentProps<typeof CopyTrigger> {
  hash: string
}

function CopySectionUrl({ hash, className, children, ...props }: CopySectionUrlProps) {
  const getUrlWithHash = React.useCallback(() => {
    if (typeof window === 'undefined') return ''
    const url = new URL(window.location.href)
    url.hash = hash
    return url.toString()
  }, [hash])

  return (
    <CopyButton value={getUrlWithHash}>
      <CopyTooltip tooltip="Copy link" side="bottom">
        <CopyTrigger className={cn(className)} {...props}>
          {children ?? <LinkIcon className="size-6" />}
        </CopyTrigger>
      </CopyTooltip>
    </CopyButton>
  )
}

export { CopySectionUrl }
