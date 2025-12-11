import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
import { LinksPopover, type MediaElement } from '@/modules/shared/components/links-popover'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import { BuilderHeaderDescription } from './builder-header-description'

function BuilderHeader() {
  const chips = (
    <div className="flex flex-wrap gap-2">
      <GenericChip variant="compact" color="blue">
        Technical
      </GenericChip>
      <GenericChip variant="compact" color="red">
        Growth
      </GenericChip>
      <GenericChip variant="compact" color="yellow">
        Support
      </GenericChip>
      <GenericChip variant="compact" color="purple">
        Operational
      </GenericChip>
    </div>
  )

  const mediaElements: MediaElement[] = [
    {
      type: 'website',
      href: 'https://app.aave.com/',
    },
    {
      type: 'forum',
      href: 'https://governance.aave.com/t/arc-spark-lend-profit-share-proposal/11615/',
    },
    {
      type: 'discord',
      href: 'https://discord.com',
    },
  ]

  return (
    <div className="border-input mt-16 w-full border-b">
      <div className="relative container flex flex-col gap-2 pt-2 pb-2 md:gap-6 xl:gap-4">
        <div className="flex justify-between gap-4">
          <div className="flex w-full gap-2 lg:gap-4">
            <Avatar className="size-12 md:size-14">
              <AvatarImage
                src="https://fusion.sky.money/_next/image?url=https%3A%2F%2Fmakerdao-ses.github.io%2Fecosystem-dashboard%2Fecosystem-actors%2FPOWERHOUSE%2FPOWERHOUSE_logo.png&w=1920&q=85"
                alt="avatar"
              />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <div className="flex w-full flex-col gap-2">
              <div className="flex flex-col sm:gap-1 md:flex-row md:gap-4">
                {/* builder name */}
                <div className="flex items-center gap-1 sm:items-baseline md:items-start">
                  <div className="text-foreground/30 text-base/6 font-semibold uppercase sm:text-sm/5.5 md:text-base/6">
                    PH
                  </div>
                  <div className="text-foreground text-base/6 font-semibold md:text-lg md:leading-[120%] md:font-bold">
                    Powerhouse
                  </div>
                </div>

                {/* builder status */}
                <div className="flex flex-col gap-1 sm:flex-row">
                  <GenericChip variant="filled" color="green">
                    Accepted
                  </GenericChip>

                  <Button variant="ghost" className="max-w-fit sm:h-6">
                    Since 25-MAY-2021 <ExternalLinkIcon />
                  </Button>
                </div>
              </div>

              <div className="hidden md:block">{chips}</div>
            </div>
          </div>

          <div className="absolute top-15 right-4 sm:top-2 sm:right-6 md:top-9.5 md:right-8 xl:top-2 xl:right-0">
            <LinksPopover links={mediaElements}>
              <Button variant="secondary">
                <LinkIcon /> <span className="sm:hidden md:inline">Links</span>
              </Button>
            </LinksPopover>
          </div>
        </div>

        <div className="block md:hidden">{chips}</div>

        <BuilderHeaderDescription description="Lorem ipsum dolor sit amet consectetur. Quisque et venenatis hac vel est aenean dui. Enim eu venenatis tristique aliquet tincidunt lacus. Donec etiam nunc mi lacus libero purus. Sed faucibus fringilla aliquet ac bibendum lorem sed amet. Convallis." />
      </div>
    </div>
  )
}

export { BuilderHeader }
