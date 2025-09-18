import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

interface ProjectLinkProps<T extends string = string> {
  href?: Route<T> | URL
  code: string
  name: string
}

function ProjectLink({ href, code, name }: ProjectLinkProps) {
  return (
    <Link
      href={href ?? '#'}
      className="group/project-link bg-popover hover:bg-secondary flex w-full justify-between overflow-hidden rounded-sm shadow-sm"
    >
      <div className="flex w-full max-w-[calc(100%-40px)] items-center gap-2 px-1 py-1 pl-2">
        <div
          className={cn(
            'text-foreground/30 group-hover/project-link:text-foreground/50 relative pr-2 text-xs/4.5 font-medium uppercase',
            "after:bg-foreground/30 after:absolute after:top-0 after:right-0 after:h-full after:w-px after:content-['']",
          )}
        >
          Project
        </div>
        <div
          className={`flex items-start gap-1 ${href ? 'w-[calc(100%-50px)]' : 'w-[calc(100%-40px)]'}`}
        >
          <span className="text-foreground/30 group-hover/project-link:text-foreground/50 text-sm/5.5 font-semibold">
            {code}
          </span>
          <span
            className={`truncate text-sm/5.5 font-semibold ${href ? 'max-w-[calc(100%-55px)]' : 'max-w-full'}`}
          >
            {name}
          </span>
        </div>
      </div>
      {href && (
        <div className="bg-accent group-hover/project-link:bg-muted flex h-8 w-8 items-center justify-center overflow-hidden">
          <ArrowRight className="text-accent-foreground size-4" />
        </div>
      )}
    </Link>
  )
}

export default ProjectLink
