import { Globe, Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import {
  HoverPopover,
  HoverPopoverContent,
  HoverPopoverTrigger,
} from '@/modules/shared/components/hover-popover'
import { Button } from '@/modules/shared/components/ui/button'
import type { Route } from 'next'

interface LinksProps {
  isMobile?: boolean
}

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

export function Links({ isMobile }: LinksProps) {
  return (
    <HoverPopover>
      <HoverPopoverTrigger asChild>
        {isMobile ? (
          <Button variant="secondary" size="icon">
            <LinkIcon />
          </Button>
        ) : (
          <Button variant="secondary" size="lg" className="focus-visible:ring-0">
            <LinkIcon />
            Links
          </Button>
        )}
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
