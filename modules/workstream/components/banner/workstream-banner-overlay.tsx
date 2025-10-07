import { cn } from '@/modules/shared/lib/utils'

interface WorkstreamBannerOverlayProps {
  isNetworkBanner: boolean
}

export default function WorkstreamBannerOverlay({ isNetworkBanner }: WorkstreamBannerOverlayProps) {
  if (isNetworkBanner) {
    return null
  }

  return (
    <div className="absolute inset-0 z-10">
      <div
        className={cn(
          'bg-popover absolute -right-94 -bottom-33 size-112 rounded-full blur-[50px] transition-all duration-300 ease-in-out',
          'sm:-right-32 sm:-bottom-88',
          'lg:-right-10',
          'xl:top-32 xl:-right-7',
          '2xl:right-20 2xl:-bottom-97',
        )}
      />
      <div
        className={cn(
          'bg-popover absolute -top-25 -left-23 size-50 rounded-full blur-[50px] transition-all duration-300 ease-in-out',
          'md:-top-17 md:-left-22',
          'lg:-left-10',
        )}
      />
    </div>
  )
}
