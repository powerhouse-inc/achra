import { Link as LinkIcon } from 'lucide-react'
import type { BuilderLink } from '@/modules/__generated__/graphql/switchboard-generated'
import {
  LinksPopover,
  LinksPopoverItem,
  type MediaElement,
  type SocialMedia,
} from '@/modules/shared/components/links-popover'
import { Button } from '@/modules/shared/components/ui/button'
import type { MouseEvent } from 'react'

export function Links({ links }: { links: BuilderLink[] }) {
  const mediaElements: MediaElement[] = links.map((link) => ({
    type: link.label?.toLowerCase() as SocialMedia,
    href: link.url,
  }))

  const handlePopoverItemClick = (event: MouseEvent<HTMLElement>) => {
    // prevent the event to bubble up to the parent link to stop navigation to the builder page
    event.stopPropagation()
  }

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    // prevent the event to bubble up to the parent link to stop navigation to the builder page
    event.preventDefault()
  }

  if (mediaElements.length === 0) {
    return null
  }

  return (
    <LinksPopover
      links={mediaElements}
      renderLinkItem={(link) => (
        <LinksPopoverItem
          key={`${link.href}-${'type' in link ? link.type : link.label}`}
          link={link}
          onClick={handlePopoverItemClick}
        />
      )}
    >
      <Button variant="secondary" onClick={handleTriggerClick} asChild>
        {/* Render the button as a div to comply with HTML standard (buttons can not be nested in links) */}
        <div>
          <LinkIcon /> <span className="hidden lg:inline">Links</span>
        </div>
      </Button>
    </LinksPopover>
  )
}
