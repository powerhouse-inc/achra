import { ExternalLinkIcon, LinkIcon } from 'lucide-react'
import { GenericChip } from '@/modules/shared/components/chips/generic-chip/generic-chip'
import { Avatar, AvatarFallback, AvatarImage } from '@/modules/shared/components/ui/avatar'
import { Button } from '@/modules/shared/components/ui/button'
import { BuilderHeaderDescription } from './builder-header-description'

function BuilderHeader() {
  return (
    <div className="bg-background border-input mt-13 w-full border-b">
      <div className="container flex flex-col gap-4 pt-4 pb-2">
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <Avatar className="size-14">
              <AvatarImage
                src="https://fusion.sky.money/_next/image?url=https%3A%2F%2Fmakerdao-ses.github.io%2Fecosystem-dashboard%2Fecosystem-actors%2FPOWERHOUSE%2FPOWERHOUSE_logo.png&w=1920&q=85"
                alt="avatar"
              />
              <AvatarFallback>P</AvatarFallback>
            </Avatar>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                {/* builder name */}
                <div className="flex items-center gap-1">
                  <div className="text-muted-foreground text-base/6 font-semibold uppercase">
                    PH
                  </div>
                  <div className="text-foreground text-lg leading-[120%] font-bold">Powerhouse</div>
                </div>

                {/* builder status */}
                <div className="ml-3 flex items-center gap-1">
                  <GenericChip variant="filled" color="green">
                    Accepted
                  </GenericChip>

                  <Button variant="ghost" className="h-6">
                    Since 25-MAY-2021 <ExternalLinkIcon />
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
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
            </div>
          </div>

          <div>
            <Button variant="secondary">
              <LinkIcon /> Links
            </Button>
          </div>
        </div>

        <BuilderHeaderDescription description="Lorem ipsum dolor sit amet consectetur. Quisque et venenatis hac vel est aenean dui. Enim eu venenatis tristique aliquet tincidunt lacus. Donec etiam nunc mi lacus libero purus. Sed faucibus fringilla aliquet ac bibendum lorem sed amet. Convallis." />
      </div>
    </div>
  )
}

export { BuilderHeader }
