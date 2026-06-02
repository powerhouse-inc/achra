import { Download } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/modules/shared/components/ui/button'
import { cn } from '@/modules/shared/lib/utils'
import { ScrollToSectionButton } from './scroll-to-section-button'
import type { Route } from 'next'

interface ActionButtonsProps {
  infoLink?: string
  className?: string
}

function ActionButtons({ infoLink, className }: Readonly<ActionButtonsProps>) {
  const hasInfoLink = Boolean(infoLink)

  return (
    <div className={cn('flex items-end justify-end gap-6', className)}>
      {hasInfoLink ? (
        <Button variant="outline" asChild>
          <Link href={infoLink as Route} download target="_blank" rel="noreferrer">
            Self Assessment Checklist
            <Download className="size-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          Self Assessment Checklist
          <Download className="size-4" />
        </Button>
      )}
      <ScrollToSectionButton variant="outline" sectionId="faq">
        FAQ
      </ScrollToSectionButton>
    </div>
  )
}

export { ActionButtons }
