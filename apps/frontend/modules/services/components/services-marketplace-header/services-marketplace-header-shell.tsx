import { Boxes, Briefcase, Layers, Package, Store } from 'lucide-react'
import { cn } from '@/modules/shared/lib/utils'
import type { ReactNode } from 'react'

interface ServicesMarketplaceHeaderShellProps {
  searchSlot?: ReactNode
}

function ServicesMarketplaceHeaderShell({
  searchSlot,
}: Readonly<ServicesMarketplaceHeaderShellProps>) {
  return (
    <div className="shadow-primary bg-accent relative overflow-hidden rounded-xl">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className={cn(
            'bg-primary absolute size-60 rounded-full opacity-30 blur-[75px]',
            '-top-24 -left-16',
            'sm:-top-16 sm:left-[12%]',
            'lg:left-[18%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute size-60 rounded-full opacity-40 blur-[60px]',
            '-right-16 -bottom-24',
            'sm:right-[10%] sm:-bottom-20',
            'lg:right-[18%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute hidden size-28 rounded-full opacity-50 blur-[50px]',
            'sm:top-[10%] sm:right-[6%] sm:block',
            'lg:top-[20%] lg:right-[8%]',
          )}
        />
        <div
          className={cn(
            'bg-primary absolute hidden size-24 rounded-full opacity-40 blur-[50px]',
            'sm:bottom-[12%] sm:left-[6%] sm:block',
            'lg:bottom-[18%] lg:left-[8%]',
          )}
        />

        <Store
          className={cn(
            'text-border absolute rotate-14',
            '-top-6 -left-6 size-28',
            'sm:-top-2 sm:left-[2%] sm:size-28',
            'lg:top-0 lg:left-[3%] lg:size-32',
          )}
          aria-hidden="true"
        />
        <Package
          className={cn(
            'text-muted-foreground/40 absolute -rotate-14',
            '-right-8 -bottom-8 size-36',
            'sm:right-[2%] sm:-bottom-2 sm:size-32',
            'lg:right-[3%] lg:bottom-0 lg:size-36',
          )}
          aria-hidden="true"
        />
        <Boxes
          className={cn(
            'text-muted-foreground/40 absolute hidden rotate-[-10deg]',
            'sm:top-3 sm:right-[22%] sm:block sm:size-16',
            'lg:top-4 lg:right-[24%] lg:size-20',
          )}
          aria-hidden="true"
        />
        <Boxes
          className={cn(
            'text-border absolute hidden rotate-10',
            'sm:bottom-3 sm:left-[22%] sm:block sm:size-16',
            'lg:bottom-4 lg:left-[24%] lg:size-20',
          )}
          aria-hidden="true"
        />
        <Layers
          className={cn(
            'text-muted-foreground/30 absolute hidden -rotate-[8deg]',
            'lg:top-3 lg:left-[42%] lg:block lg:size-14',
          )}
          aria-hidden="true"
        />
        <Briefcase
          className={cn(
            'text-border absolute hidden rotate-[8deg] opacity-60',
            'lg:right-[42%] lg:bottom-3 lg:block lg:size-14',
          )}
          aria-hidden="true"
        />

        <div className="border-accent bg-secondary/40 absolute inset-0 rounded-xl border-[3px] backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-4 px-4 py-14 text-center">
        <h1 className="text-foreground text-2xl font-bold sm:text-3xl lg:text-4xl">
          Services Marketplace
        </h1>
        <p className="text-foreground max-w-xl text-sm sm:text-base">
          Find the right tools and services for your organization. From operational hubs to
          compliance frameworks.
        </p>
        {searchSlot}
      </div>
    </div>
  )
}

export { ServicesMarketplaceHeaderShell }
