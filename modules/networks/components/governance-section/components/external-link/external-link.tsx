import { ExternalLinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/modules/shared/lib/utils'

export interface ExternalLinkProps extends Omit<React.ComponentProps<typeof Link>, 'children'> {
  imageSrc: string
  name: string
  description: string
  className?: string
}

export function ExternalLink({ href, imageSrc, name, description, className }: ExternalLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        'bg-background hover:bg-accent outline-border align-center flex w-full gap-2.5 rounded-xl p-4 shadow-sm outline lg:max-w-76 xl:max-w-96 2xl:max-w-105.5',
        className,
      )}
    >
      <div className="relative size-10">
        <Image src={imageSrc} alt={name} fill className="absolute" sizes="100%" />
      </div>
      <div className="flex flex-col">
        <div className="text-foreground/50 hover:text-foreground flex items-center gap-1">
          <span className="text-xs/4.5 font-medium uppercase">{description}</span>
          <ExternalLinkIcon className="h-3 w-4" />
        </div>
        <span className="text-foreground text-base/6 font-semibold">{name}</span>
      </div>
    </Link>
  )
}
