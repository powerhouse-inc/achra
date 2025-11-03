'use client'

import { LinkIcon } from 'lucide-react'
import { CopyButton, CopyTooltip, CopyTrigger } from '@/modules/shared/components/copy-butoon'

interface CopySectionUrlProps {
  hash: string
}

function CopySectionUrl({ hash }: CopySectionUrlProps) {
  return (
    <CopyButton
      value={() => {
        const url = new URL(window.location.href)
        url.hash = hash

        return url.toString()
      }}
    >
      <CopyTooltip tooltip="Copy link" side="bottom">
        <CopyTrigger>
          <LinkIcon className="size-6" />
        </CopyTrigger>
      </CopyTooltip>
    </CopyButton>
  )
}

export { CopySectionUrl }
