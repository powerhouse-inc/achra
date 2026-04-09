'use client'

import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import DiscordSVG from '@/modules/shared/components/svgs/discord.svg'
import ForumSVG from '@/modules/shared/components/svgs/forum.svg'
import GithubSVG from '@/modules/shared/components/svgs/github.svg'
import WebsiteSVG from '@/modules/shared/components/svgs/website.svg'
import TwitterSVG from '@/modules/shared/components/svgs/x.svg'
import YoutubeSVG from '@/modules/shared/components/svgs/youtube.svg'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { isSocialMediaType } from './utils/is-social-media-type'
import type { Route } from 'next'

type SocialMedia = 'website' | 'forum' | 'discord' | 'x' | 'github' | 'youtube'

const MEDIA_ICON_MAP: Record<SocialMedia, React.ReactNode> = {
  website: <WebsiteSVG className="size-4" />,
  forum: <ForumSVG className="size-4" />,
  discord: <DiscordSVG className="size-4" />,
  x: <TwitterSVG className="size-4" />,
  github: <GithubSVG className="size-4" />,
  youtube: <YoutubeSVG className="size-4" />,
}

const MEDIA_LABEL_MAP: Record<SocialMedia, string> = {
  website: 'Website',
  forum: 'Forum',
  discord: 'Discord',
  x: 'Twitter',
  github: 'Github',
  youtube: 'Youtube',
}

interface MediaElement {
  type: string
  href: string
}

interface LinkElement {
  href: string
  label: string
  icon: React.ReactNode
  isExternal?: boolean
}

interface LinksPopoverProps {
  links: Array<MediaElement | LinkElement>
  children?: React.ReactNode
  renderLinkItem?: (link: MediaElement | LinkElement) => React.ReactElement
  defaultOpen?: boolean
}

function defaultRenderLinkItem(link: MediaElement | LinkElement) {
  return (
    <LinksPopoverItem key={`${link.href}-${'type' in link ? link.type : link.label}`} link={link} />
  )
}

/**
 * A dropdown menu component that displays a list of links (social media or custom links).
 *
 * @example Basic Usage with Social Media Links
 * ```tsx
 * <LinksPopover links={[
 *     { type: 'website', href: 'https://example.com' },
 *     { type: 'twitter', href: 'https://twitter.com/example' },
 *     { type: 'github', href: 'https://github.com/example' },
 *   ]}
 * >
 *   <Button variant="secondary">Links</Button>
 * </LinksPopover>
 * ```
 *
 * @param links - Array of links to display in the popover
 * @param children - Trigger element that opens the popover on hover
 * @param renderLinkItem - Function to render a link item
 * @param defaultOpen - Whether the popover should be open by default (useful for testing purposes)
 */
function LinksPopover({
  links,
  children,
  renderLinkItem = defaultRenderLinkItem,
  defaultOpen = false,
}: LinksPopoverProps) {
  const [open, setOpen] = useState<boolean>(defaultOpen)

  const handleMouseLeave = useDebounceCallback(() => {
    setOpen(false)
  }, 100)

  return (
    <DropdownMenu
      modal={false}
      open={open}
      onOpenChange={(newState) => {
        setOpen(newState)
      }}
    >
      <DropdownMenuTrigger
        onMouseEnter={() => {
          handleMouseLeave.cancel()
          setOpen(true)
        }}
        onMouseLeave={handleMouseLeave}
        asChild
      >
        {children ?? (
          <Button variant="secondary">
            <LinkIcon /> <span className="sm:hidden md:inline">Links</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onMouseEnter={() => {
          handleMouseLeave.cancel()
        }}
        onMouseLeave={handleMouseLeave}
        align="end"
      >
        {links.map((link) => {
          return renderLinkItem(link)
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

interface LinksPopoverItemProps extends React.ComponentProps<typeof DropdownMenuItem> {
  link: MediaElement | LinkElement
}

function LinksPopoverItem({ link, ...props }: LinksPopoverItemProps) {
  const linkType = 'type' in link && link.type.toLowerCase()
  const isSocialMedia = linkType && isSocialMediaType(linkType)
  return (
    <DropdownMenuItem key={link.href} asChild className="hover:cursor-pointer" {...props}>
      {'type' in link ? (
        <Link href={link.href as Route} target="_blank" rel="noopener noreferrer">
          {isSocialMedia ? (
            <>
              {MEDIA_ICON_MAP[linkType]}
              {MEDIA_LABEL_MAP[linkType]}
            </>
          ) : (
            <>
              <WebsiteSVG className="size-4" />
              {link.type}
            </>
          )}
        </Link>
      ) : (
        <Link
          href={link.href as Route}
          {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {link.icon}
          {link.label}
        </Link>
      )}
    </DropdownMenuItem>
  )
}

export { LinksPopover, LinksPopoverItem, type SocialMedia, type MediaElement, type LinkElement }
