import { cn } from '@/modules/shared/lib/utils'

interface WorkstreamBannerContentProps {
  isNetworkBanner: boolean
}

function WorkstreamBannerContent({ isNetworkBanner }: WorkstreamBannerContentProps) {
  return (
    <div
      className={cn(
        'relative z-10 w-full px-4 pt-4 pb-8 sm:px-6 md:px-10 md:pt-7 md:pb-12 lg:px-16 lg:pb-10.5 xl:px-26 xl:pt-7 xl:pb-9',
        isNetworkBanner ? 'text-primary-foreground' : 'text-foreground',
      )}
    >
      <div className="flex w-full max-w-105 flex-col gap-4 md:max-w-148 md:gap-6 lg:max-w-full xl:max-w-223">
        <h1 className="text-2xl leading-[120%] font-bold lg:text-3xl">Workstreams</h1>
        <p className="font-semibold lg:text-lg lg:leading-[120%] lg:font-bold xl:text-xl">
          Find work, submit your proposal and start getting paid for your contributions
        </p>
        <p className="text-sm/5.5 xl:text-base/6">
          The Powerhouse finances section offers a complete breakdown of budget and expenditure data
          for contributor teams since the Network&apos;s launch in 2025
        </p>
      </div>
    </div>
  )
}

export { WorkstreamBannerContent }
