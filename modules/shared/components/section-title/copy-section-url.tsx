'use client'

import React from 'react'
import { CopyButton, CopyTooltip, CopyTrigger } from '@/modules/shared/components/copy-button'
interface CopySectionUrlProps {
  hash: string
  children: React.ReactNode
}

function CopySectionUrl({ hash, children }: CopySectionUrlProps) {
  const getUrlWithHash = React.useCallback(() => {
    if (typeof window === 'undefined') return ''
    const url = new URL(window.location.href)
    url.hash = hash
    return url.toString()
  }, [hash])

  return (
    <CopyButton value={getUrlWithHash}>
      <CopyTooltip tooltip="Copy link" side="bottom">
        <CopyTrigger asChild>{children}</CopyTrigger>
      </CopyTooltip>
    </CopyButton>
  )
}

export { CopySectionUrl }
