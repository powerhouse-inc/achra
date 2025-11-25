import Link from 'next/link'
import type { Network } from '@/modules/__generated__/graphql/switchboard-generated'
import { cn } from '@/modules/shared/lib/utils'
import type { Route } from 'next'

interface NavigationHeaderProps {
  network?: Pick<Network, 'name' | 'logo' | 'darkThemeLogo' | 'slug'>
  title: string
  workstreamSlug: string
}

export function NavigationHeader({ network, title, workstreamSlug }: NavigationHeaderProps) {
  const href = `/network/${network?.slug ?? ''}/workstream/${workstreamSlug}` as Route

  // Light theme now falls back to darkThemeLogo automatically when no regular logo exists,
  // so a logo always renders regardless of theme.
  const lightLogoSrc = network?.logo ?? network?.darkThemeLogo ?? null
  const darkLogoSrc = network?.darkThemeLogo ?? network?.logo ?? null
  const shouldRenderLightLogo = Boolean(lightLogoSrc)
  const shouldRenderDarkLogo = Boolean(darkLogoSrc && lightLogoSrc !== darkLogoSrc)

  return (
    <div className="bg-secondary flex w-fit items-center gap-2 rounded-xl px-2 py-1 shadow-sm sm:gap-3 sm:px-3 sm:py-2 md:p-3">
      <div className="relative flex items-center self-stretch pr-7 sm:pr-8 md:pr-9">
        {network && (
          <>
            <Link
              href={`/network/${network.slug ?? ''}` as Route}
              className="relative flex h-4 w-full items-center gap-2 sm:h-4.5 md:h-6"
            >
              {shouldRenderLightLogo && (
                // Note: Here we don't use Nextjs Image component because it doesn't work well with unknown image sizes
                // and the existing workarounds doesn't work well in all the devices/browsers
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={lightLogoSrc!}
                  alt={network.name ?? 'Network'}
                  className={cn('h-full', shouldRenderDarkLogo && 'dark:hidden')}
                />
              )}

              {shouldRenderDarkLogo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={darkLogoSrc!}
                  alt={network.name ?? 'Network'}
                  className="hidden h-full dark:block"
                />
              )}
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
          </>
        )}
      </div>
      <Link
        className="truncate text-sm/5.5 font-semibold sm:text-base/6 md:text-xl md:leading-[120%] md:font-bold"
        href={href}
      >
        {title}
      </Link>
    </div>
  )
}
