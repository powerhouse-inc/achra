import { Link as LinkIcon } from 'lucide-react'
import {
  LinksPopover,
  LinksPopoverItem,
  type MediaElement,
} from '@/modules/shared/components/links-popover'
import { Button } from '@/modules/shared/components/ui/button'
import type { MouseEvent } from 'react'

const mediaElements: MediaElement[] = [
  {
    type: 'website',
    href: 'https://app.aave.com/',
  },
  {
    type: 'forum',
    href: 'https://governance.aave.com/t/arc-spark-lend-profit-share-proposal/11615/',
  },
  {
    type: 'discord',
    href: 'https://discord.com',
  },
  {
    type: 'twitter',
    href: 'https://twitter.com',
  },
  {
    type: 'github',
    href: 'https://github.com',
  },
]

export function Links() {
  const handlePopoverItemClick = (event: MouseEvent<HTMLElement>) => {
    // prevent the event to bubble up to the parent link to stop navigation to the builder page
    event.stopPropagation()
  }

  const handleTriggerClick = (event: MouseEvent<HTMLElement>) => {
    // prevent the event to bubble up to the parent link to stop navigation to the builder page
    event.preventDefault()
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
