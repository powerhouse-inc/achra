import { ExternalLink, Globe, Link as LinkIcon } from 'lucide-react'
import type {
  LinkElement,
  MediaElement,
} from '@/modules/shared/components/links-popover/links-popover'

export const defaultLinks: MediaElement[] = [
  { type: 'website', href: 'https://example.com' },
  { type: 'x', href: 'https://x.com/example' },
  { type: 'github', href: 'https://github.com/example' },
]

export const allSocialMediaLinks: MediaElement[] = [
  { type: 'website', href: 'https://example.com' },
  { type: 'forum', href: 'https://forum.example.com' },
  { type: 'discord', href: 'https://discord.gg/example' },
  { type: 'x', href: 'https://x.com/example' },
  { type: 'github', href: 'https://github.com/example' },
]

export const customLinks: LinkElement[] = [
  {
    href: '/network/powerhouse',
    label: 'Network Profile',
    icon: <Globe className="size-4" />,
  },
  {
    href: '/builders',
    label: 'Builders',
    icon: <LinkIcon className="size-4" />,
  },
  {
    href: 'https://external-site.com',
    label: 'External Site',
    icon: <ExternalLink className="size-4" />,
    isExternal: true,
  },
]

export const mixedLinks: Array<MediaElement | LinkElement> = [
  { type: 'website', href: 'https://example.com' },
  { type: 'x', href: 'https://x.com/example' },
  {
    href: '/network/powerhouse',
    label: 'Network Profile',
    icon: <Globe className="size-4" />,
  },
  {
    href: 'https://external-site.com',
    label: 'External Site',
    icon: <ExternalLink className="size-4" />,
    isExternal: true,
  },
]
