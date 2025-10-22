import { FolderGit2, FolderKanban } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/modules/shared/lib/utils'

interface WorkstreamBannerBackgroundProps {
  isNetworkBanner: boolean
  network?: string
}

export default function WorkstreamBannerBackground({
  isNetworkBanner,
  network,
}: WorkstreamBannerBackgroundProps) {
  if (isNetworkBanner) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="relative h-full w-full">
          <Image
            src={`/networks/backgrounds/${network}.png`}
            alt={`${network} network background`}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    )
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Primary background elements */}
      <div
        className={cn(
          'bg-primary absolute size-50 rounded-full opacity-30 blur-[75px] transition-all duration-1000 ease-in-out',
          '-top-18 -right-13',
          'sm:-top-11 sm:left-[48.1%]',
          'xl:-top-11 xl:left-[59%]',
          '2xl:left-[53%]',
        )}
      />
      <div
        className={cn(
          'bg-primary absolute size-50 rounded-full opacity-50 blur-[50px] transition-all duration-1000 ease-in-out',
          '-bottom-33 -left-1',
          'lg:-bottom-40',
          'xl:-bottom-39',
        )}
      />
      <div
        className={cn(
          'bg-primary absolute hidden size-24 rounded-full blur-[50px] transition-all duration-1000 ease-in-out',
          '-top-6 -right-24',
          'sm:-top-4 sm:-right-27 sm:block',
          'md:-top-3 md:-right-22',
          '2xl:right-6',
        )}
      />

      {/* Decorative icons */}
      <FolderKanban
        className={cn(
          'text-border absolute -top-4 right-1 size-24 rotate-[19deg] transition-all duration-500 ease-in-out',
          'sm:right-[15%]',
          'lg:-top-0 lg:right-[25%]',
          'xl:-top-1 xl:right-[22%]',
        )}
      />
      <FolderKanban
        className={cn(
          'text-muted-foreground/50 absolute -bottom-10 -left-4 size-39 -rotate-[19deg] transition-all duration-500 ease-in-out',
          'lg:-bottom-7 lg:-left-3',
        )}
      />
      <FolderGit2
        className={cn(
          'text-muted-foreground/50 absolute right-0 bottom-0 hidden size-32 -rotate-[15deg] transition-all duration-500 ease-in-out',
          'sm:-right-5 sm:-bottom-4 sm:block',
          'md:-right-2 md:-bottom-1',
          'lg:-right-1 lg:bottom-3',
          'xl:right-1',
        )}
      />

      {/* Border overlay */}
      <div className="border-accent bg-secondary/50 absolute inset-0 rounded-lg border-[3px] backdrop-blur-[2px] transition-all duration-300 ease-in-out" />
    </div>
  )
}
