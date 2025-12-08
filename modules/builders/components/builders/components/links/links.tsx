import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import {
  HoverPopover,
  HoverPopoverContent,
  HoverPopoverTrigger,
} from '@/modules/shared/components/hover-popover'
import Discord from '@/modules/shared/components/svgs/discord.svg'
import Forum from '@/modules/shared/components/svgs/forum.svg'
import Github from '@/modules/shared/components/svgs/github.svg'
import Website from '@/modules/shared/components/svgs/website.svg'
import Twitter from '@/modules/shared/components/svgs/x.svg'
import { Button } from '@/modules/shared/components/ui/button'
import type { Route } from 'next'

const links = [
  {
    href: 'https://app.aave.com/',
    label: 'Website',
    icon: <Website className="size-4" />,
  },
  {
    href: 'https://governance.aave.com/t/arc-spark-lend-profit-share-proposal/11615/',
    label: 'Forum',
    icon: <Forum className="size-4" />,
  },
  {
    href: 'https://discord.com',
    label: 'Discord',
    icon: <Discord className="size-4" />,
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: <Twitter className="size-4" />,
  },
  {
    href: 'https://github.com',
    label: 'Github',
    icon: <Github className="size-4" />,
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
            <Link
              key={link.href}
              href={link.href as Route}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-accent text-foreground flex items-center gap-2 rounded-sm p-2 text-sm/5.5"
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </div>
      </HoverPopoverContent>
    </HoverPopover>
  )
}
