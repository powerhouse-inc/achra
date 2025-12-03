import { Globe, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import {
  HoverPopover,
  HoverPopoverContent,
  HoverPopoverTrigger,
} from '@/modules/shared/components/hover-popover'
import { Button } from '@/modules/shared/components/ui/button'
import type { Route } from 'next'

const links = [
  {
    href: 'https://app.aave.com/',
    label: 'Website',
    icon: Globe,
  },
  {
    href: 'https://governance.aave.com/t/arc-spark-lend-profit-share-proposal/11615/',
    label: 'Forum',
    icon: Globe,
  },
  {
    href: 'https://discord.com',
    label: 'Discord',
    icon: Globe,
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: Globe,
  },
  {
    href: 'https://github.com',
    label: 'Github',
    icon: Globe,
  },
]

export function Links() {
  return (
    <HoverPopover>
      <HoverPopoverTrigger asChild>
        <Button
          variant="secondary"
          className="size-9 focus-visible:ring-0 lg:h-10 lg:w-fit lg:rounded-md lg:px-6"
        >
          <LinkIcon />
          <span className="hidden lg:block">Links</span>
        </Button>
      </HoverPopoverTrigger>
      <HoverPopoverContent className="w-fit p-2" align="end">
        <div className="flex flex-col gap-2">
          {links.map((link) => (
            <Button asChild key={link.href} variant="secondary" className="justify-start">
              <Link href={link.href as Route} target="_blank" rel="noopener noreferrer">
                <link.icon />
                {link.label}
              </Link>
            </Button>
          ))}
        </div>
      </HoverPopoverContent>
    </HoverPopover>
  )
}
