'use client'

import { Streamdown } from 'streamdown'
import { cn } from '../../lib/utils'
import { componentsOverrides } from './markdown-components'

interface MarkdownProps {
  children: string
  className?: string
}
function Markdown({ children, className }: MarkdownProps) {
  return (
    <Streamdown
      className={cn('text-xs/4.5 sm:text-sm/5.5 xl:text-base/6', className)}
      components={componentsOverrides}
      controls={{
        code: true,
        table: false,
      }}
    >
      {children}
    </Streamdown>
  )
}

export { Markdown }
