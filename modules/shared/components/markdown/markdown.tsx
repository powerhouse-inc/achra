import { Streamdown } from 'streamdown'
import { cn } from '../../lib/utils'

interface MarkdownProps {
  children: string
  className?: string
}
export function Markdown({ children, className }: MarkdownProps) {
  return (
    <Streamdown className={cn('text-xs/4.5 sm:text-sm/5.5 xl:text-base/6', className)}>
      {children}
    </Streamdown>
  )
}
