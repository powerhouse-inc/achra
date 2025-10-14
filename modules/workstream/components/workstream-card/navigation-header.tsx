import Link from 'next/link'
import { cn } from '@/modules/shared/lib/utils'

function NavigationHeader() {
  return (
    <div className="bg-secondary flex w-fit items-center gap-2 rounded-xl px-2 py-1 shadow-sm sm:gap-3 sm:px-3 sm:py-2 md:p-3">
      <div className="relative flex items-center self-stretch pr-7 sm:pr-8 md:pr-9">
        <Link
          href="/network/powerhouse"
          className="relative flex h-4 w-full items-center sm:h-4.5 md:h-6"
        >
          {/* Note: Here we don't use Nextjs Image component because it doesn't work well with unknown image sizes
          and the existing workarounds doesn't work well in all the devices/browsers */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/networks/logos/powerhouse.png"
            alt="Powerhouse" // TODO: replace it with the network logo once integrated with the API
            className="h-full dark:invert"
          />
        </Link>
        <div
          className={cn(
            'absolute -top-1 right-0 -bottom-1 sm:-top-2 sm:-bottom-2 md:-top-3 md:-bottom-3',
            'before:bg-secondary before:absolute before:top-0 before:bottom-0 before:-left-2 before:z-1 before:w-2',
          )}
        >
          <svg
            className="h-7 drop-shadow-sm sm:h-10 md:h-12"
            viewBox="0 0 25 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48H0.343146C1.40401 48 2.42143 47.5786 3.17157 46.8284L23.1716 26.8284C24.7337 25.2663 24.7337 22.7337 23.1716 21.1716L3.17157 1.17157C2.42143 0.421427 1.40401 0 0.343146 0H0V48Z"
              className="fill-secondary"
            />
          </svg>
        </div>
      </div>
      <Link
        className="truncate text-sm/5.5 font-semibold sm:text-base/6 md:text-xl md:leading-[120%] md:font-bold"
        href="/network/powerhouse/workstream/vetra-beta-launch"
      >
        Vetra Beta Launch
      </Link>
    </div>
  )
}

export { NavigationHeader }
