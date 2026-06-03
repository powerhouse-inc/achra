import { cn } from '@achra/ui/lib/utils'
import { LinkIcon } from 'lucide-react'
import { CopySectionUrl } from './copy-section-url'

export interface SectionTitleProps {
  title: string
  hash: string
  className?: string
}

function SectionTitle({ title, hash, className }: SectionTitleProps) {
  return (
    <div className={cn('flex w-fit items-center gap-4', className)}>
      <span className="text-[32px] leading-[120%] font-bold">{title}</span>

      <CopySectionUrl hash={hash}>
        <LinkIcon className="size-6" />
      </CopySectionUrl>
    </div>
  )
}

export { SectionTitle }
